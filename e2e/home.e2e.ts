/// <reference path="../config/typings/tsd.d.ts" />

describe('Home page', () => {

    it('should say the app name', () => {
        browser.get('/');

        expect(element(by.css('app h1')).getText()).toEqual('App');
    });

});