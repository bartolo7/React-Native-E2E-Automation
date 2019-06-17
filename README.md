# {React-Native-E2E-Automation}

Step by step guide to implement E2E Automation for React-Native apps with Javascript(ES6), Appium and Jest.

## Acknowledgement

First things first, Accessbility Labels (AL) must be implemented in the React-Native apps repository in order to find the elements for automation. For instance, text labels, buttons, list and so on must have AL for the automation to work. You can read more here: https://facebook.github.io/react-native/docs/accessibility 

Then the IOS .app and Android .apk must be build with AL for testing purpose. The IOS .app will run in the Simulator and the Android .apk in the Emulator. 

With an .app and .apk built with AL, you can use the Appium Desktop Inspector to verify them and start writing code in the E2E framework describe below.

## 1. Getting Started

### 1.1 Prerequisites

### 1.2 React-Native Repository Utils and Componenent Example 

### 1.3 Build .apk and .app

### 1.4 Start Appium Desktop Inspector to verify the accessibility labels 

### Prerequisites

What things you need to install the software and how to install them

```
1. Yarn
   https://yarnpkg.com/lang/en/
2. Node
3. React-Native-App with Accessibility Labels
4. Appium Desktop and Appium Server
   https://appium.io
5. Android Studio
6. Xcode

```
### React-Native Repository Utils and Component with Accessbility Label
The components in the React-Native apps repository must have AL for the automation to work. 

1. Add the file e2eGenerateID.js to utils folder in your React-Native App repository
2. Install dotenv: https://www.npmjs.com/package/dotenv
3. Add the environmental variable "GENERATE_AL=true" in the .env file 
4. Choose a component and add the accessibilityLabels property. For example:
   <Text {...setAccessibilityProps(accessibilityLabel)} color={color} semiBold style={styles.label}>{title}</Text>
5. Build-up the .apk and .app following point 1.3


### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

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

* **David Bartolomé** 


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc

