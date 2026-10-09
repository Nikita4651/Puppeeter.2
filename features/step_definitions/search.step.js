const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");

const {
  clickDay,
  clickSessionTime,
  selectASeat,
  clickButton,
  selectASeats,
  selectASeatDisable,
  isDisabled,
} = require("../../lib/commands");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 80 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user navigated to the cinema page", async function () {
  return await this.page.goto(`https://qamid.tmweb.ru/client/index.php`, {
    setTimeout: 10000,
  });
});
When("user clicks the day button", async function () {
  return await clickDay(this.page, "[data-time-stamp='1791752400']");
});
When("user clicks the session time 20:00", async function () {
  return await clickSessionTime(this.page, "[data-seance-id='243']");
});
When("user selects the seat", async function () {
  return await selectASeat(
    this.page,
    "[class='buying__info-description']",
    ".buying-scheme__chair_standart",
  );
});
When("user clicks the Book button", async function () {
  return await clickButton(this.page, "button");
});
Then("user sees the course suggested {string}", async function (string) {
  const actual = await selectASeats(this.page, "h2.ticket__check-title");
  const expected = string;
  expect(actual).contain(expected);
});

When("user clicks the saturday button", async function () {
  return await clickDay(this.page, "[data-time-stamp='1791579600']");
});
When("user clicks the session time", async function () {
  return await clickSessionTime(this.page, "[data-seance-id='234']");
});
When("user clicks the booked tickets link", async function () {
  return await selectASeatDisable(
    this.page,
    "[class='buying__info-description']",
    ".buying-scheme__chair_disabled",
  );
});
Then("booking button is disabled", async function () {
  const actual = await isDisabled(this.page, "button");
  const expected = true;
  expect(actual).to.equal(expected);
});
