import http from 'node:http';
import { URL } from 'node:url';
import Browserbase from '@browserbasehq/sdk';
import { chromium } from 'playwright-core';

const PORT = Number(process.env.PORT || 8787);
const HOST = process.env.HOST || '0.0.0.0';
const ORIGIN = process.env.ALLOWED_ORIGIN || '*';
const TARGET = 'https://www.instagram.com/accounts/emailsignup/';
const sessions = new Map();

function json(res, status, body) {
  res.writeHead(status, {'Content-Type':'application/json; charset=utf-8','Access-Control-Allow-Origin':ORIGIN,'Cache-Control':'no-store'});
  res.end(JSON.stringify(body));
}
function readBody(req) {
  return new Promise((resolve,reject)=>{ let raw=''; req.on('data',c=>{raw+=c;if(raw.length>10000) reject(new Error('Request too large'));}); req.on('end',()=>{try{resolve(JSON.parse(raw||'{}'));}catch(e){reject(new Error('Invalid JSON'));}}); req.on('error',reject); });
}
function clean(value, max=160) { return typeof value === 'string' ? value.trim().slice(0,max) : ''; }

async function createSession(input) {
  if (!process.env.BROWSERBASE_API_KEY || !process.env.BROWSERBASE_PROJECT_ID) throw new Error('Cloud browser is not configured. Set BROWSERBASE_API_KEY and BROWSERBASE_PROJECT_ID.');
  const bb = new Browserbase({apiKey: process.env.BROWSERBASE_API_KEY});
  const session = await bb.sessions.create({ projectId: process.env.BROWSERBASE_PROJECT_ID });
  const browser = await chromium.connectOverCDP(session.connectUrl);
  const context = browser.contexts()[0] || await browser.newContext();
  const page = context.pages()[0] || await context.newPage();
  await page.goto(TARGET, {waitUntil:'domcontentloaded', timeout:45000});
  const selectors = {
    email: ['input[name="emailOrPhone"]','input[autocomplete="email"]','input[type="email"]'],
    fullName: ['input[name="fullName"]','input[autocomplete="name"]'],
    username: ['input[name="username"]','input[autocomplete="username"]'],
    dob: ['input[name="birthday"]','input[type="date"]']
  };
  async function fillFirst(key, value) {
    if (!value) return;
    for (const selector of selectors[key]) {
      const locator = page.locator(selector).first();
      if (await locator.count()) { await locator.fill(value); return; }
    }
  }
  await fillFirst('email', input.email);
  await fillFirst('fullName', input.fullName);
  await fillFirst('username', input.username);
  await fillFirst('dob', input.dob);
  sessions.set(session.id, {browser, page});
  return {id: session.id, liveUrl: session.debuggerUrl || session.liveViewUrl || '', viewerUrl: session.debuggerUrl || session.liveViewUrl || ''};
}

const server = http.createServer(async (req,res)=>{
  if (req.method === 'OPTIONS') { res.writeHead(204, {'Access-Control-Allow-Origin':ORIGIN,'Access-Control-Allow-Headers':'Content-Type','Access-Control-Allow-Methods':'POST,GET,OPTIONS'}); return res.end(); }
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (req.method === 'GET' && url.pathname === '/api/health') return json(res,200,{ok:true,provider:'browserbase'});
  if (req.method === 'POST' && url.pathname === '/api/browser/session') {
    try {
      const body = await readBody(req);
      const input = {email:clean(body.email,254), fullName:clean(body.fullName), username:clean(body.username), dob:clean(body.dob,20)};
      if (!input.email) return json(res,400,{error:'Email is required.'});
      const result = await createSession(input);
      return json(res,201,{sessionId:result.id,liveUrl:result.liveUrl,viewerUrl:result.viewerUrl,status:'Fields filled. Enter password and CAPTCHA manually in the cloud browser.'});
    } catch (e) { console.error(e); return json(res,500,{error:e.message || 'Failed to start cloud browser.'}); }
  }
  json(res,404,{error:'Not found'});
});
server.listen(PORT,HOST,()=>console.log(`secure-form-launcher server listening on ${HOST}:${PORT}`));