---
home: true
heroText: mockzilla-webextension
tagline: A mocking toolkit for web-extensions leveraging the power of TypeScript to enhance your jest experience.
actionText: Get Started →
actionLink: /setup
features:
- title: Painless
  details: Writing mocks should be simple and fun. With mockzilla-webextension you can skip writing manual mocks of the browser API and focus on writing tests.
- title: Typesafe
  details: You use TypeScript to have code-completion and type-safety? Great! mockzilla-webextension uses the types from webextension-polyfill-ts to ensure a pleasant experience!
- title: Good Errors
  details: Errors should point to where the errors come from. mockzilla will give you hints on where you expected calls and where they actually happened.
footer: Zlib/Libpng License | Copyright © 2020 Santo Pfingsten
---

This is a **Work In Progress**! The API might change before version 1.0 is released.

### Features

- global [mockBrowser](browser.md) object
- [Event Mocking](mock-event.md)

### Example

This is an example of how a deep mock with mockzilla-webextension looks like:

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
