// https://qiita.com/kozy4324/items/aa38a41685399fc330f7
const CDP = require('chrome-remote-interface');

(async () => {
    let client;
    let cssHeaders = {};

    try {
        client = await CDP();

        const {DOM, CSS, Page} = client;

        // Enable domains
        await DOM.enable();
        await CSS.enable();

        // Start css coverage
        CSS.styleSheetAdded(({header}) => cssHeaders[header.styleSheetId] = header);
        await CSS.startRuleUsageTracking();

        // Enable page reading
        await Page.enable();
        await Page.navigate({url: 'https://classi.jp'});
        await Page.loadEventFired(async () => {
            // Handle the CSS coverage data

            let {ruleUsage} = await CSS.stopRuleUsageTracking();
            let usages = ruleUsage.reduce((usages, ruleUsage) => {
                // The response property is like this:
                 /*
                    {
                        styleSheetId: '7213.0',
                        startOffset: 113451,
                        endOffset: 134314,
                        used: true
                     }
                 */
                let header = cssHeaders[ruleUsage.styleSheetId];
                if (header) {
                    let {sourceURL, disabled, isInline} = header;
                    if (sourceURL && !disabled && !isInline) {
                        if (usages[sourceURL]) {
                            usages[sourceURL].usages.push(ruleUsage);
                        } else {
                            usages[sourceURL] = { header, usages: [ruleUsage] };
                        }
                    }
                }
                return usages;
            }, {});

            let targetUrl = Object.keys(usages).filter(url => url.match(/top.css/))[0];
            let target = usages[targetUrl];
            let cssText = (await CSS.getStyleSheetText({ styleSheetId: target.header.styleSheetId })).text;
 
             // HTML
            let [buf, index] = target.usages.sort((a, b) => {
                return a.startOffset - b.startOffset;
            }).reduce(([buf, index], {startOffset, endOffset, used}) => {
                buf.push(cssText.substring(index, startOffset));
                buf.push(`<span style="color:${ used ? 'green' : 'red' };">`);
                buf.push(cssText.substring(startOffset, endOffset));
                buf.push(`</span>`);
                index = endOffset;
                return [buf, index];
            }, [[], 0]);

            buf.push(cssText.substring(index, cssText.length));
            let html = `<pre style="color:red;">${buf.join('')}</pre>`;
            require('fs').writeFileSync('usage.html', html);
            await client.close();
        });
    } catch (err) {
        console.error(err);
        if (client) {
            await client.close();
        }
    }
})();
