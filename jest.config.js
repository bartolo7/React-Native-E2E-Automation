const { defaults } = require("jest-config");
module.exports = {
  verbose: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
  transform: {
    "^.+\\.js?$": "babel-jest"
  },
  setupFilesAfterEnv: ["./configurations/driverConfig.js"],
  reporters: [
    "default",
    [
      "./node_modules/jest-html-reporter",
      {
        pageTitle: "React-Native E2E Automation",
        outputPath: "test-report/index.html",
        includeConsoleLog: true,
        includeFailureMsg: true
      }
    ]
  ]
};
