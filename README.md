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
3. Add desired capabilities, see two examples below: 

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
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
