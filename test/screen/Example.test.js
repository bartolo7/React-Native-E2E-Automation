import { driver, isAndroid } from "../../configurations/driverConfig";
import {
  menu,
  instrument,
  searchAction,
  loginAction,
  profile,
  profileAction,
  accountOverview,
  order
} from "./../screens";
import { user, asserter, constant } from "../../utils";

const { user1, user2 } = user;
const { LANGUAGE } = constant;

describe("Login username and password", () => {
  beforeAll(async () => {
    await driver.launchApp();
  });
  
  it(`Login example 1`, async () => {
    await menu.tabAccount().click();
    await loginAction.loginWithUsernamePassword(swedishUser);
    const view = await accountOverview.screen();
    view.isDisplayed();
  });

  it(`Login example 2`, async () => {
    await menu.tabOrder().click();
    await loginAction.loginWithUsernamePassword(swedishUser);
    /* Jira ticket for IOS MD-4156 that´s why the if condition*/
    if (isAndroid) {
      const view = await order.screen();
      view.isDisplayed();
    }
  });

  afterAll(async () => {});
});
