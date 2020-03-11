
const puppeteer = require('puppeteer');
import UserCredentials from '../modules/userCredentials/index.js';

export async function init() {
    const user = new UserCredentials();
    const key = await getPdfApiKey(user);
    console.log('Finish! Key: ', key);
    return key;
}

async function getPdfApiKey(user) {
    const browser = await puppeteer.launch({ headless: false });
    const context = await browser.createIncognitoBrowserContext();

    const page = await context.newPage();
    await page.deleteCookie();
    await page.setViewport({
        width: 993,
        height: 600,
    });
    await page.goto("https://www.convertapi.com/", { waitUntil: 'networkidle2' });
    await page.waitForSelector('nav .open-sign-up');
    await page.click('nav .open-sign-up');
    await page.waitFor(2000);
    await page.focus("form[action=\"/a/register\"] input#FirstName");
    await page.keyboard.type(user.firstName);
    await page.focus("form[action=\"/a/register\"] input#LastName");
    await page.keyboard.type(user.lastName);
    await page.focus("form[action=\"/a/register\"] input[name='Email']");
    await page.keyboard.type(user.getEmail());
    await page.focus("form[action=\"/a/register\"] input[name='Password']");
    await page.keyboard.type(user.getPassword());
    await page.click("form[action=\"/a/register\"] input[type='submit']");
    await page.waitFor(2000);
    await page.waitForSelector('#user-secret');
    const KEY = await page.evaluate(() => document.querySelector("#user-secret").value);
    await browser.close();
    
    return KEY;
}