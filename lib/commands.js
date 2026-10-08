 module.exports = {
   clickMonday: async function (page, selector) {
     try {
       const mondayDateButton = await page.$(selector);
       await mondayDateButton.click();
     } catch (error) {
       throw new Error(
         `The selector: ${selector} is not found or can not be clicked`,
       );
     }
   },

   clickSessionTime: async function (page, selector) {
     try {
       const SessionTime = await page.$(selector);
       await SessionTime.click();
     } catch (error) {
       throw new Error(
         `The selector: ${selector} is not found or can not be clicked`,
       );
     }
   },

   selectASeat: async function (page, selector1, selector2) {
     try {
       await page.waitForSelector(selector1);
       const selectASeats = await page.$$(selector2);
       await selectASeats[19].click();
     } catch (error) {
       throw new Error(
         `Could not find the selector: ${selector1} or there is no any selector: ${selector2}`,
       );
     }
   },

   clickButton: async function (page, selector) {
     try {
       const clickButton = await page.$(selector);
       await clickButton.click();
     } catch (error) {
       throw new Error(
         `The selector: ${selector} is not found or can not be clicked`,
       );
     }
   },

   getText: async function (page, selector) {
     try {
       const getCodeButton = await page.waitForSelector(selector);
       return await getCodeButton.evaluate((btn) => btn.textContent);
     } catch (error) {
       throw new Error(`Could not get text from selector: ${selector}`);
     }
   },

   selectASeats: async function (page, selector1, selector2) {
     try {
       await page.waitForSelector(selector1);
       const selectASeats = await page.$$(selector2);
       await selectASeats[1].click();
       await selectASeats[5].click();
     } catch (error) {
       throw new Error(
         `Could not find the selector: ${selector1} or there is no any selector: ${selector2}`,
       );
     }
   },

   selectASeatDisable: async function (page, selector1, selector2) {
     try {
       await page.waitForSelector(selector1);
       const selectASeatDisable = await page.$$(selector2);
       await selectASeatDisable[1].click();
     } catch (error) {
       throw new Error(
         `Could not find the selector: ${selector1} or there is no any selector: ${selector2}`,
       );
     }
   },

   isDisabled: async function (page, selector) {
     try {
       const bookingButton = await page.$(selector);
       return await page.evaluate((btn) => btn.disabled, bookingButton);
     } catch (error) {
       throw new Error(`That selector: ${selector} has not "/disabled"`);
     }
   },
 };