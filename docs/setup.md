# Setup

## Requirements

You need to be using [webextension-polyfill](https://github.com/mozilla/webextension-polyfill) and [@types/webextension-polyfill](https://github.com/lusito/webextension-polyfill-ts) in your webextension for this project to work.

If you don't want to use the above in your webextension, you might want to take a look at [mockzilla](https://lusito.github.io/mockzilla/) instead and find a custom solution. Take a look at the [deep-mock](https://lusito.github.io/mockzilla/deep-mock.html) documentation to get an idea.

## Install With NPM

```
npm i -D mockzilla
```

## Install With Yarn

```
yarn add --dev mockzilla
```

## Jest

Aside from mockzilla and mockzilla-webextension itself, you'll only need [jest](https://jestjs.io/).

Here's a quick setup guide for jest with TypeScript and mockzilla-webextension:

Install with NPM

```
npm i -D jest @types/jest ts-jest
```

Or with Yarn:
```
yarn add --dev jest @types/jest ts-jest
```

Create a file `jest.config.js`:
```TypeScript
module.exports = {
    transform: {
        ".+\\.ts$": "ts-jest",
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts$",
    moduleFileExtensions: ["ts", "js"],
    setupFilesAfterEnv: ["./src/setupTests.ts"],
};
```

Add a test script to your package.json:

```json
  "scripts": {
    ...
    "test": "jest"
  }
```

In order to setup afterEach callbacks and initialize the mockBrowser object. You'll need to create a setup file:

`src/setupTests.ts`
```typescript
import "mockzilla-webextension";
```

Now all you need to do is write test files and run the tests with NPM:
```
npm t
```

Or with Yarn:
```
yarn test
```
