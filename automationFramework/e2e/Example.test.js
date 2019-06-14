import { driver, isAndroid } from "../../configurations/driverConfig";
import {
  
} from "../screens";
import { user, constant } from "../../utils";

const { user1, user2 } = user;
const { LANGUAGE } = constant;

describe("Login username and password", () => {
  beforeAll(async () => {
    await driver.launchApp();
  });
  
  it(`Login example 1`, async () => {
   ;
    //view.isDisplayed();
  });

  it(`Login example 2`, async () => {
    
      //view.isDisplayed();
    }
  });

  afterAll(async () => {});
});
