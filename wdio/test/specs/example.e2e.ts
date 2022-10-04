describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await browser.url(`https://the-internet.herokuapp.com/login`);

        await $('#username').setValue('tomsmith');
        await $('#password').setValue('SuperSecretPassword!');
        await $('button[type="submit"]').click();

        await expect($('#flash')).toBeExisting();
        await expect($('#flash')).toHaveTextContaining(
            'You logged into a secure area!');
    });

    it('session.Subscribed', () => {
        // await browser.send({
        //     method: 'session.subscribe',
        //     param: { events: ['log.entryAdded']}
        // })

        // browser.send({
        //     method: 'session.subscribe',
        //     params: { events: ['log.entryAdded'] }
        // })
    })
});

