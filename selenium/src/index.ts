import {Builder, Browser, By, Key, until} from 'selenium-webdriver';
import * as fs from 'fs'

(async function googleSearch() {
    const driver = await new Builder().forBrowser(Browser.CHROME).build();

    try {
        await driver.get('http://www.google.com/ncr');
        await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
        await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    } finally {
        await driver.quit();
    }
})();

(async function emulateGeoLocation() {
    const driver = await new Builder().forBrowser(Browser.CHROME).build();
    try {
         // CDPコネクションを作成する
         const cdpConn = await driver.createCDPConnection('page')
         // 皇居の位置情報です
         const location = {
            latitude: 35.6799901,
            longitude: 139.7582825,
            accuracy: 100
         }

         // 位置情報の上書きをするCDPコマンドを実行
         await cdpConn.execute('Emulation.setGeolocationOverride', location)

         // 位置情報に依存したウェブサイトにアクセスする
         await driver.get('https://my-location.org/')

         // スクリーンの位置を調整
         await driver.executeScript('window.scrollBy(0, 500);')

         // スクリーンショットを取り保存する
         const encodedString = await driver.takeScreenshot() 
         await fs.promises.writeFile('my-location.png', encodedString, 'base64') 
    } finally {
        await driver.quit();
    }
})();
