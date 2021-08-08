import { Browser } from "webextension-polyfill";
import { deepMock, MockzillaDeep } from "mockzilla";

const [, mockBrowser, mockBrowserNode] = deepMock<Browser>("browser", false);

// eslint-disable-next-line @typescript-eslint/no-use-before-define
(global as any).mockBrowser = mockBrowser;

const proxy = new Proxy(
    {},
    {
        get: (...args) => {
            if (args[1] === "__esModule") return false;
            return mockBrowserNode.traps.get(...args);
        },
        // forward the rest to mockBrowserNode traps
        ownKeys: (...args) => mockBrowserNode.traps.ownKeys(...args),
        has: (...args) => mockBrowserNode.traps.has(...args),
        apply: (...args) => mockBrowserNode.traps.apply(...args),
        getPrototypeOf: (...args) => mockBrowserNode.traps.getPrototypeOf(...args),
        setPrototypeOf: (...args) => mockBrowserNode.traps.setPrototypeOf(...args),
        isExtensible: (...args) => mockBrowserNode.traps.isExtensible(...args),
        preventExtensions: (...args) => mockBrowserNode.traps.preventExtensions(...args),
        set: (...args) => mockBrowserNode.traps.set(...args),
        deleteProperty: (...args) => mockBrowserNode.traps.deleteProperty(...args),
        construct: (...args) => mockBrowserNode.traps.construct(...args),
        getOwnPropertyDescriptor: (...args) => mockBrowserNode.traps.getOwnPropertyDescriptor(...args),
        defineProperty: (...args) => mockBrowserNode.traps.defineProperty(...args),
    }
);

jest.mock("webextension-polyfill", () => proxy);

beforeEach(() => mockBrowserNode.enable());

afterEach(() => mockBrowserNode.verifyAndDisable());

declare global {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    export const mockBrowser: MockzillaDeep<Browser>;
}
