import { Browser } from "webextension-polyfill";
import { deepMock, MockzillaDeep, MockzillaNode } from "mockzilla";

const [, mockBrowser, mockBrowserRootNode] = deepMock<Browser>("browser", false);

(global as any).mockBrowser = mockBrowser;
(global as any).mockBrowserRootNode = mockBrowserRootNode;

const proxy = new Proxy(
    {},
    {
        get: (...args) => {
            if (args[1] === "__esModule") return false;
            return mockBrowserRootNode.traps.get(...args);
        },
        // forward the rest to mockBrowserRootNode traps
        ownKeys: (...args) => mockBrowserRootNode.traps.ownKeys(...args),
        has: (...args) => mockBrowserRootNode.traps.has(...args),
        apply: (...args) => mockBrowserRootNode.traps.apply(...args),
        getPrototypeOf: (...args) => mockBrowserRootNode.traps.getPrototypeOf(...args),
        setPrototypeOf: (...args) => mockBrowserRootNode.traps.setPrototypeOf(...args),
        isExtensible: (...args) => mockBrowserRootNode.traps.isExtensible(...args),
        preventExtensions: (...args) => mockBrowserRootNode.traps.preventExtensions(...args),
        set: (...args) => mockBrowserRootNode.traps.set(...args),
        deleteProperty: (...args) => mockBrowserRootNode.traps.deleteProperty(...args),
        construct: (...args) => mockBrowserRootNode.traps.construct(...args),
        getOwnPropertyDescriptor: (...args) => mockBrowserRootNode.traps.getOwnPropertyDescriptor(...args),
        defineProperty: (...args) => mockBrowserRootNode.traps.defineProperty(...args),
    }
);

jest.mock("webextension-polyfill", () => ({ __esModule: true, default: proxy }));

beforeEach(() => mockBrowserRootNode.enable());

afterEach(() => mockBrowserRootNode.verifyAndDisable());

declare global {
    export const mockBrowser: MockzillaDeep<Browser>;
    export const mockBrowserRootNode: MockzillaNode;
}
