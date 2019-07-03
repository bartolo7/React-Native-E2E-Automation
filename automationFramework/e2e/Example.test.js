import { driver } from "../../configurations/driverConfig";
import {login, loginAction, menu} from "../screen";
import { user } from "../../utils";


const { user1 } = user;

describe("Login username and password", () => {
  beforeAll(async () => {
    await driver.launchApp();
  });

  it(`Login example 1`, async () => {
    menu.tabONE().click();
    loginAction.loginUsernamePassword(user1)
    const view = await login.screen();
    view.isDisplayed();
  })

  it(`Login example 2`, async () => {
      //continue writing test 
  });

  afterAll(async () => {});
});
