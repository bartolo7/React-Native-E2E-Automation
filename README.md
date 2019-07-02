# {React-Native-E2E-Automation}

Step by step guide to implement E2E Automation for React-Native apps with Javascript(ES6), Appium and Jest.

## Acknowledgement

First things first, Accessbility Labels (AL) must be implemented in the React-Native apps repository in order to find the elements for automation. For instance, text labels, buttons, list and so on must have AL for the automation to work. You can read more here: https://facebook.github.io/react-native/docs/accessibility

Then the IOS .app and Android .apk must be build with AL for testing purpose. The IOS .app will run in the Simulator and the Android .apk in the Emulator.

With an .app and .apk built with AL, you can use the Appium Desktop Inspector to verify them and start writing code in the E2E framework describe below.

## 1. Getting Started

### 1.1 Prerequisites

### 1.2 Add file to React-Native Repository Utils and start adding AL

### 1.3 Build .apk and .app

### 1.4 Start Appium Desktop Inspector to verify the accessibility labels

### 1.5 Start building the automation framework

  #### 1.5.1 Add testID

  #### 1.5.2 Add ScreenObject

  #### 1.5.3 Add Action

  #### 1.5.4 Index

### 1.6 Start building the E2E automaiton test

### 1.7 Run your first test locally

### 1.8 Run your first test in Jenksin 



### Prerequisites

What things you need to install the software and how to install them

```
1. Yarn https://yarnpkg.com/lang/en/
2. Node
3. React-Native-App
4. Appium Desktop and Appium Server https://appium.io
5. Android Studio
6. Xcode

```

### Add file to React-Native repository utils folder and start adding AL to react-component

The components in the React-Native apps repository must have AL for the automation to work.

1. Add the file e2eGenerateID.js to utils folder in your React-Native App repository
2. Install dotenv: https://www.npmjs.com/package/dotenv
3. Add the environmental variable "GENERATE_AL=true" in the .env file
4. Choose a component and add the accessibilityLabels property. The file has several examples and this is one of them:

   ```
   <Text {...setAccessibilityProps(accessibilityLabel)} color={color} semiBold style={styles.label}>{title}</Text>
   ```

5. Build-up the .apk and .app following next point

### Build .apk and .app

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

### Start Appium Desktop Inspector to verify the accessibility labels

1. Start Appium Desktop and click Start Server
2. Then click search button "Start Inspector Session"
3. Add desired capabilities, see two examples below.
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

## Start building the automation framework

The automationFramework folder follows a modular architecture and contains two more folders. The e2e folder is where you will safe all the e2e automation test and the screen is the framework.

The screen folder has two examples and let´s look at one of them. The pageExampleLogin represent the loginPage for the app and that page has four .js files.

```
testID.js: where AL are specfied as json
screenObject.js = where all the components in the page like text labels, buttons, list , icons are specified
action.js: where user actions functions are written, for instance, login
index.js: where we export all the files of the folder
```

#### 1.5.1 Add testID

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

#### 1.5.2 Add ScreenObject

In the ScreenObject file add the elements in the page. For instance, the login page may have two input text labels and a button.

```
const txtUserName = () => elementUtil.getElementByAccessibilityId(input.USERNAME);

const txtPassword = () => elementUtil.getElementByAccessibilityId(input.PASSWORD);

const btnLogin = () => elementUtil.getElementByAccessibilityId(button.LOGIN);

```


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
