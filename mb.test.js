const {
  clickDay,
  clickSessionTime,
  selectASeat,
  clickButton,
  selectASeats,
  selectASeatDisable,
  isDisabled,
} = require("./lib/commands");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php");
});

afterEach(async () => {
  await page.close();
});

describe("Positive booking flow tests", () => {
  test("NFS movie booking", async () => {
    await clickDay(page, "[data-time-stamp='1791406800']");
    await clickSessionTime(page, "[data-seance-id='243']");
    await selectASeat(
      page,
      "[class='buying__info-description']",
      ".buying-scheme__chair_standart",
    );
    await clickButton(page, "button");
    await page.waitForSelector("[class='tichet__check']", {
      visible: true,
      timeout: 10000,
    });
    const headerText = await page.$eval(
      "h2.ticket__check-title",
      (el) => el.innerText,
    );
    expect(headerText).toEqual("ВЫ ВЫБРАЛИ БИЛЕТЫ:");
  }, 40000);

  test("should book 2 VIP seats for 'Ведьмак' on Saturday 20:00 in Modern Hall", async () => {
    await clickDay(page, "[data-time-stamp='1791579600']");
    await clickSessionTime(page, "[data-seance-id='225']");
    await selectASeats(
      page,
      ".buying-scheme__wrapper",
      ".buying-scheme__chair_vip",
    );
    await clickButton(page, "button");
    await page.waitForSelector("[class='tichet__check']", {
      visible: true,
      timeout: 10000,
    });
    const headerText = await page.$eval(
      "h2.ticket__check-title",
      (el) => el.innerText,
    );
    expect(headerText).toEqual("ВЫ ВЫБРАЛИ БИЛЕТЫ:");
  }, 40000);
});

describe("Negative booking flow tests", () => {
  test("should prevent booking for 'Ведьмак' when no standard seats are free", async () => {
    await clickDay(page, "[data-time-stamp='1791579600']");
    await clickSessionTime(page, "[data-seance-id='234']");
    await selectASeatDisable(
      page,
      "[class='buying__info-description']",
      ".buying-scheme__chair_disabled",
    );
    await isDisabled(page, "button");
    const expected = true;
    const actual = await isDisabled(page, "button");
    expect(actual).toEqual(expected);
  }, 40000);
});
