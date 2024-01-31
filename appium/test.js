const {remote} = require('webdriverio')

// https://appium.io/docs/en/2.2/guides/caps/
// 
const capabilities = {
    // required, The type of platform hosting the app or browser
    platformName: "Android",
    // required, The name of the Appium driver to use
    // UiAutomator2: https://github.com/appium/appium-uiautomator2-driver
    "appium:automationName": "UiAutomator2",
    // The name of a particular device to automate
    "appium:deviceName": "Android",
    "appium:appPackage": "com.android.settings",
    "appium:appActivity": ".Settings",
};

const wdOpts = {
    hostname: 'localhost',
    port: 4723,
    logLevel: 'info',
    capabilities,
};

async function runTest() {
    const driver= await remote(wdOpts);
    try {
        const batteryItem = await driver.$('//*[@text="Battery"]');
        await batteryItem.click();
    } finally {
        await driver.pause(1000);
        await driver.deleteSession();
    }
}

runTest().catch(console.error);
