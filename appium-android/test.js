// Based on the code in https://dev.classmethod.jp/articles/appium-android-web-browser/.
// The original code does not work. I modified it to work with the latest version of Appium.
const wdio = require('webdriverio')

// For local Appium server
// const opts = {
//     path: '/wd/hub',
//     port: 4723,
//     capabilities: {
//         // Capabilities: https://appium.io/docs/en/2.2/guides/caps/
//         platformName: 'Android',
//         browserName: 'Chrome',

//         "appium:deviceName": 'Android Emulator',
//         "appium:automationName": 'UiAutomator2',
//         // An unknown server-side error occurred while processing the command. Original error: Unable to find an active device or emulator with OS 2.1. The following are available:
//         //  emulator-5554 (14) <- 14
//         "appium:platformVersion": '14',

//     }
// }
// For AWS Device Farm
const opts = {
    path: '/wd/hub',
    port: 4723,
    capabilities: {
        // Capabilities: https://docs.aws.amazon.com/devicefarm/latest/testgrid/techref-support.html
        platformName: 'Android',
        browserName: 'Chrome',

        "appium:deviceName": 'Android Emulator',
        "appium:automationName": 'UiAutomator2',
        // An unknown server-side error occurred while processing the command. Original error: Unable to find an active device or emulator with OS 2.1. The following are available:
        //  emulator-5554 (14) <- 14
        "appium:platformVersion": '14',
    }
}

const DEFAULT_TIMEOUT = 15000
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

async function main () {
    const client = await wdio.remote(opts);

    await client.url('https://genesis.autify.com/')

    const menuButton = await client.$('a[href="#"]');
    await menuButton.waitForDisplayed(DEFAULT_TIMEOUT);
    await menuButton.click();

    await sleep(2000);

    await client.deleteSession();
}

main().catch(console.error);
