import puppeteer from 'puppeteer';

jest.setTimeout(300000);

describe('Tooltip', () => {
  let browser = null;
  let page = null;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      ignoreDefaultArgs: ['--disable-extensions'],
      headless: false,
      slowMo: 100,
      devtools: true,
    });
    page = await browser.newPage();
  });

  test('Tooltip should render on button click', async () => {
    await page.goto('http://localhost:9000');

    await page.waitForSelector('.form');
    const form = await page.$('.form');
    const button = await form.$('.button');
    await button.click();
    await page.waitForSelector('.tooltip');
  });

  test('Tooltip should disappear on second button click', async () => {
    await page.goto('http://localhost:9000');

    await page.waitForSelector('.form');
    const form = await page.$('.form');
    const button = await form.$('.button');

    await button.click();
    await page.waitForSelector('.tooltip');

    await button.click();
    expect(await page.$('.tooltip')).toBe(null);
  });

  afterEach(async () => {
    await browser.close();
  });
});
