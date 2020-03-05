
const puppeteer = require('puppeteer');
const uniqueNamesGenerator = require("unique-names-generator").uniqueNamesGenerator;
const names = require("unique-names-generator").names;
const colors = require("unique-names-generator").colors;

const getRandomFirstName = uniqueNamesGenerator({
    dictionaries: [names],
    length: 1,
});
const getRandomLastName = uniqueNamesGenerator({
    dictionaries: [colors],
    style: 'capital',
    length: 1,
});
const email = `${getRandomFirstName}-${getRandomFirstName}@gmail.com`.toLowerCase();
const password = getRandomFirstName + Date.now();

init();

async function init() {
    const key = await getPdfApiKey();
    console.log('Finish! Key: ', key);
    return key;
}

async function getPdfApiKey() {
    const browser = await puppeteer.launch({ headless: true });
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
    await page.keyboard.type(getRandomFirstName);
    await page.focus("form[action=\"/a/register\"] input#LastName");
    await page.keyboard.type(getRandomLastName);
    await page.focus("form[action=\"/a/register\"] input[name='Email']");
    await page.keyboard.type(email);
    await page.focus("form[action=\"/a/register\"] input[name='Password']");
    await page.keyboard.type(password);
    await page.click("form[action=\"/a/register\"] input[type='submit']");
    await page.waitFor(2000);
    await page.waitForSelector('#user-secret');
    const KEY = await page.evaluate(() => document.querySelector("#user-secret").value);
    await browser.close();
    return KEY;
}