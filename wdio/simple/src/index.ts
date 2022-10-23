import { remote } from "webdriverio";

(async() => {
    // Standalone mode
    // ref: https://webdriver.io/docs/setuptypes#standalone-mode
    const client = await remote({
        logLevel: 'trace',
        capabilities: {
            browserName: 'chrome'
        }
    })
    // Protocol Binding mode
    // ref: https://webdriver.io/docs/setuptypes#package-api
    // const client = await WebDriver.newSession({
    //     capabilities: {
    //         browserName: 'chrome'
    //     }
    // })

    try {
        await client.navigateTo('http://www.google.com/ncr')

        const searchInput = await client.findElement('css selector', '#lst-ib')
        await client.elementClick(searchInput['element-6066-11e4-a52e-4f735466cecf'])
    
        console.log(await client.getTitle())    
    } finally {
        await client.deleteSession()
    }
})();

