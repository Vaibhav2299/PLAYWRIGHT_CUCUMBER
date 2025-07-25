import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 2)

Given('User navigates to the application', async function () {
    await fixture.page.goto(process.env.BASEURL);
    fixture.logger.info("Navigated to the application")
})

Given('User click on the login link', async function () {
    await fixture.page.locator("//span[contains(text(),'Login')]").click();
});

Given('User enter the username as {string}', async function (username) {
    await fixture.page.locator("input[formcontrolname='username']").fill(username);
});

Given('User enter the password as {string}', async function (password) {
    await fixture.page.locator("input[formcontrolname='password']").fill(password);
})

When('User click on the login button', async function () {
    await fixture.page.locator("//span[text()='Login']").click();
    await fixture.page.waitForLoadState();
    fixture.logger.info("Waiting for 2 seconds")
    await fixture.page.waitForTimeout(2000);
});


Then('Login should be success', async function () {
    const user = fixture.page.locator("//a[@aria-haspopup='menu']//span[contains(@class,'mdc-button__label')]");
    await expect(user).toBeVisible();
    const userName = await user.textContent();
    console.log("Username: " + userName);
    fixture.logger.info("Username: " + userName);
})

When('Login should fail', async function () {
    const failureMesssage = fixture.page.locator("//mat-card-title[@class='mat-mdc-card-title mat-h1'][contains(text(),'Login')]");
    await expect(failureMesssage).toBeVisible();
});
