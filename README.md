# mockzilla-webextension

[![Minified + gzipped size](https://badgen.net/bundlephobia/minzip/mockzilla-webextension)](https://www.npmjs.com/package/mockzilla-webextension)
[![NPM version](https://badgen.net/npm/v/mockzilla-webextension)](https://www.npmjs.com/package/mockzilla-webextension)
[![License](https://badgen.net/github/license/lusito/mockzilla-webextension)](https://github.com/lusito/mockzilla-webextension/blob/master/LICENSE)
[![Stars](https://badgen.net/github/stars/lusito/mockzilla-webextension)](https://github.com/lusito/mockzilla-webextension)
[![Watchers](https://badgen.net/github/watchers/lusito/mockzilla-webextension)](https://github.com/lusito/mockzilla-webextension)

mockzilla-webextension is a mocking toolkit for web-extensions leveraging the power of TypeScript to enhance your jest experience.

This is a **Work In Progress**! The API might change before version 1.0 is released.

#### Features

- Combines [webextension-polyfill-ts](https://github.com/lusito/webextension-polyfill-ts) with [mockzilla](https://github.com/lusito/mockzilla) to create a [deep mock of the browser object](https://lusito.github.io/mockzilla-webextension/browser.html).
- Adds an additional function [mockEvent](https://lusito.github.io/mockzilla-webextension/mock-event.html) to enable special support for webextension events.

#### Why use mockzilla-webextension

- Integrates with jest
- Typesafety and code-completion out of the box.
- Deadsimple to use
- Liberal license: [zlib/libpng](https://github.com/Lusito/mockzilla-webextension/blob/master/LICENSE)

### Installation via NPM

```npm i -D mockzilla-webextension```

### Getting Started

Check out the [documentation page](https://lusito.github.io/mockzilla-webextension/) for examples

### Example

This is an example of how a mocking with mockzilla-webextension looks like:

```TypeScript
describe("Web-Extension Helpers", () => {
    describe("getActiveTabs()", () => {
        it("should return active tabs", async () => {
            const tabs: any[] = [{id: 1}, {id: 2}];
            mockBrowser.tabs.query.expect({ active: true }).andResolve(tabs);

            expect(await getActiveTabs()).toEqual(tabs);
        });
    });

    describe("onBeforeRedirect()", () => {
        it("should register a listener and return a handle to remove the listener again", () => {
            const listener = jest.fn();
            mockBrowser.webRequest.onBeforeRedirect.addListener.expect(listener, expect.anything());

            const removeListener = onBeforeRedirect(listener);

            mockBrowser.webRequest.onBeforeRedirect.removeListener.expect(listener);
            removeListener();
        });
    });
});
```

### Report issues

Something not working quite as expected? Do you need a feature that has not been implemented yet? Check the [issue tracker](https://github.com/Lusito/mockzilla-webextension/issues) and add a new one if your problem is not already listed. Please try to provide a detailed description of your problem, including the steps to reproduce it.

### Contribute

Awesome! If you would like to contribute with a new feature or submit a bugfix, fork this repo and send a pull request. Please, make sure all the unit tests are passing before submitting and add new ones in case you introduced new features.

### License

mockzilla-webextension has been released under the [zlib/libpng](https://github.com/Lusito/mockzilla-webextension/blob/master/LICENSE) license, meaning you
can use it free of charge, without strings attached in commercial and non-commercial projects. Credits are appreciated but not mandatory.
