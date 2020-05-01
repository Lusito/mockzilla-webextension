---
layout: page
title: Deep Mock of Browser
---

## Problem

The `browser` object in web-extensions is a deeply nested API, which requires you to call it like this:

`my-web-extension.ts`

```javascript
async function getActiveTabs() {
    return await browser.tabs.query({ active: true });
}

function onBeforeRedirect(callback: () => void) {
    browser.webRequest.onBeforeRedirect.addListener(callback, filter);
    return () => browser.webRequest.onBeforeRedirect.removeListener(callback);
}
...
```

## Solution

By using the power of [mockzilla](https://lusito.github.io/mockzilla/) project, this project provides a globally available mockBrowser object to use in your tests:

`my-web-extension.spec.ts`

```javascript
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

## More Details

See the documentation of [mockzilla](https://lusito.github.io/mockzilla/) to find out more about how you can use this API.
