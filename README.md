# {React-Native-E2E-Automation}

Step by step guide to implement E2E Automation for React-Native apps with Javascript(ES6), Appium, Jest and Jenkins.

## Acknowledgement

First things first, Accessbility Labels (AL) must be implemented in the React-Native apps repository in order to find the elements for automation. For instance, text labels, buttons, list and so on must have AL for the automation to work. You can read more here: https://facebook.github.io/react-native/docs/accessibility

Then the IOS .app and Android .apk must be build with AL for testing purpose. The IOS .app will run in the Simulator and the Android .apk in the Emulator.

With an .app and .apk built with AL, you can use the Appium Desktop Inspector to verify them and start writing code in the E2E framework describe below.

## 1 Prerequisites

## 2 Add file to React-Native Repository Utils and start adding AL

## 3 Build .apk and .app

## 4 Start Appium Desktop Inspector to verify the accessibility labels

## 5 Start building the automation framework

### 5.1 Add testID

### 5.2 Add ScreenObject

### 5.3 Add Action

### 5.4 Add Index

## 6 Start building the E2E automaiton test

## 7 Run your first test locally

## 8 Run your first test in Jenksin

## 1 Prerequisites

What things you need to install the software and how to install them

```
1. Yarn https://yarnpkg.com/lang/en/
2. Node
3. React-Native-App
4. Appium Desktop and Appium Server https://appium.io
5. Android Studio
6. Xcode

```

## 2 Add file to React-Native Repository Utils and start adding AL

The components in the React-Native apps repository must have AL for the automation to work.

1. Add the file e2eGenerateID.js to utils folder in your React-Native App repository
2. Install dotenv: https://www.npmjs.com/package/dotenv
3. Add the environmental variable "GENERATE_AL=true" in the .env file
4. Choose a component and add the accessibilityLabels property. The file has several examples and this is one of them:

   ```
   <Text {...setAccessibilityProps(accessibilityLabel)} color={color} semiBold style={styles.label}>{title}</Text>
   ```

5. Build-up the .apk and .app following next point

## 3 Build .apk and .app

The point is a bit generic as I do not know the architecture of your React-Native App. I just aim to describe how I did it in my project. I am building the .apk and .app locally by using xcodebuild and gradlew; however, I recommed you to checkout Fastlane: https://docs.fastlane.tools/

1. Add the two scripts below to the package.json in your React-Native repo:

   "build-android": "./scripts/buildAppLocal.sh android",
   "build-ios": "./scripts/buildAppLocal.sh ios",

2. Edit the script buildAppLocal.sh by adding the info <your_workspace_name> and <your_scheme_name>

3. Build with .apik and .app with this command

```
yarn build-android
yarn build-ios
```

Up to this point the guide is bit abstract and now I will give for granted that you succeed adding AL and building the apps for automation.

## 4 Start Appium Desktop Inspector to verify the accessibility labels

1. Start Appium Desktop and click Start Server
2. Then click search button "Start Inspector Session"
3. Add desired capabilities.For more information check: http://appium.io/docs/en/writing-running-appium/caps/
4. Start Session
5. In the Inspector you will see the hierarchy of elements and their attributes

```
{
  "deviceName": "Android Emulator",
  "platformName": "Android",
  "app": "<write-path>.apk",
  "noReset": "true"
}

{
  "deviceName": "iPhone X",
  "platformName": "ios",
  "app": "<write-path>.app",
  "automationName": "XCUITest",
  "platformVersion": "12.2",
  "autoLaunch": false,
  "noReset": "true"
}


```

Now with the elements located, it is time to start building the automationFramework.

## 5 Start building the automation framework

The automationFramework folder follows a modular architecture and contains two more folders. The e2e folder is where you will safe all the e2e automation test and the screen is the framework.

The screen folder has two examples and let´s look at one of them. The pageExampleLogin represent the loginPage for the app and that page has four .js files.

```
Where AL are specfied as json:
testID.js

Where all the components in the page like text labels, buttons, list , and icons are specified:
screenObject.js

Where user actions functions are written:
action.js

Where file are imported and exported:
index.js
```

### 5.1 Add testID

The values in the json object below are the AL, which were set in the React-Native app repo.

```
const testID = {
  SCREEN: 'SCREEN',
  button: {
    LOGIN: 'LOGIN',
  },
  input: {
    USERNAME: 'LOGIN_USERNAME',
    PASSWORD: 'LOGIN_PASSWORD',
  },
};

```

### 5.2 Add ScreenObject

In the ScreenObject file add the elements in the page. For instance, the login page may have two input text labels and a button. The screen is the page so it is easy to verify the location when navigating from page to page.

In the file, the elementUtil.js utility is used to find the elements. It contains functions to finds elements in Android an IOS, you can read more about them here: https://github.com/admc/wd/blob/master/doc/api.md

```
const screen = () => elementUtil.getElementByAccessibilityId(SCREEN);

const txtUserName = () => elementUtil.getElementByAccessibilityId(input.USERNAME);

const txtPassword = () => elementUtil.getElementByAccessibilityId(input.PASSWORD);

const btnLogin = () => elementUtil.getElementByAccessibilityId(button.LOGIN);

```

### 5.3 Add Action

In the Action file write functions with the most commont actions for the page. For instance, the login will be perform serveral times so create a function for the login.

```
import screenObject from './screenObject';

const { txtUserName, txtPassword, btnLogin } = screenObject;

const loginUsernamePassword = async (user) => {
  const { name, password } = user;
  await txtUserName()
    .click()
    .sendKeys(name);
  await txtPassword()
    .click()
    .sendKeys(password);
  await btnLogin().click();
};

export default { loginUsernamePassword };

```

### 5.4 Add Index

Import and export testID, screenObject and action for each page in the index.js file inside the page folder. See example below:

```
import testID from './testID';
import screenObject from './screenObject';
import action from './action';

export { testID, screenObject, action };

```

Import and export

In the screen folder, there is index.js file to import and export all the page folder, see example below. Hence, they can be accessed from the e2e folder where the automaiton test are written.

```
import { screenObject as login, action as loginAction } from './pageExampleLogin';
import { screenObject as menu } from './pageExampleMenu';


export {
  login,
  menu,
  loginAction
};

```

## 6 Start building the E2E automaiton test

After creating the page in point 5, now it is time to start writing automatic test. In the e2e folder, you will find the folowing example. To know more about Jest and writing test, check this web: https://jestjs.io/docs/en/expect#tobevalue

```
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
```

## 7 Run your first test locally

In the utils folder, you will find the constant.js file where you will specify the path for .apk and .app. So Appium can fetch them to run the automated test.

```

```

In the configuration folder, you will find the capabilityConfig.js file. In that file there is the next function:

```
// Write down your the React App folder name '../example-project-folder'
const localRootDir = path.resolve('../example-project-folder');

/* The function will fetch the apk or app path locally or from the Jenkins workspace if the env variable is created **/
export function buildAppPath(appPath) {
  const dir = !process.env.WORKSPACE ? localRootDir : process.env.PIPELINE_ROOT_DIR;
  const finalPath = `${dir}/${appPath}`;
  return finalPath;
}
```

At this point, you should be ready to run the first test locally. Hence, cd into the project and write the next commands in the console:

1. To install all the dependencies

```
yarn
```

2. Depending which device you want to check, start Android Emulator or IOS Simulator:

```
yarn runAndroid
```

or

```
yarn runIOS
```

Tip: If you run into issue, check that at least there is one device created in Anddroid Studio or that the ANDROID_HOME=/Users/Jerry/Library/Android/sdk is exported.

After running both command, the Emulator and Simulator must be up and running.

3. Run the test for Android or IOS.

Run a single test for Android by pass the test name to the env variable TEST

```
TEST="pipeLine" yarn testAndroid:singleTest
```

Run all the test Anroid

```
TEST="pipeLine" yarn testAndroid:singleTest
```

Run a single test for Android by pass the test name to the env variable TEST

```
TEST="pipeLine" yarn testAndroid:singleTest
```

Run all the test for Android

```
yarn testAndroid
```

## 8 Run your first test in Jenksin

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

```
until finished
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Authors

- **David Bartolomé**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc
