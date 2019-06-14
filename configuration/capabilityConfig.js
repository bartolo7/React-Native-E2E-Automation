import path from "path";
import {
  ANDROID_APK_PATH,
  IOS_APP_PATH,
  IOS_IPA_PATH
} from "../utils/constant";

// Write down your project folder name in '../example-project-folder'
export function buildAppPath(appPath) {
  const workingDirectory = path.resolve("../example-project-folder");
  const finalPath = `${workingDirectory}/${appPath}`;
  return finalPath;
}

export const androidEmulator = {
  platformName: "Android",
  deviceName: "Android Emulator",
  app: buildAppPath(ANDROID_APK_PATH),
  noReset: "true"
};

export const androidGalaxyS8 = {
  platformName: "Android",
  deviceName: "Galaxy S8",
  app: buildAppPath(ANDROID_APK_PATH),
  platformVersion: "9",
  udid: "ce071827ade9c91305"
};

export const iphoneSimulator = {
  platformName: "IOS",
  deviceName: "iPhone 8",
  app: buildAppPath(IOS_APP_PATH),
  automationName: "XCUITest",
  platformVersion: "12.2",
  noReset: "true"
};

export const iphoneDevice = {
  platformName: "IOS",
  deviceName: "iPhone 8 plus",
  app: buildAppPath(IOS_IPA_PATH),
  automationName: "XCUITest",
  platformVersion: "12.1",
  newCommandTimeout: 300,
  autoLaunch: false,
  clearSystemFiles: true,
  noReset: false
};
