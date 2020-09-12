import { Browser } from "webextension-polyfill-ts";
import { deepMock, MockzillaDeep } from "mockzilla";

const [browser, mockBrowser, mockBrowserNode] = deepMock<Browser>("browser", false);

// eslint-disable-next-line @typescript-eslint/no-use-before-define
(global as any).mockBrowser = mockBrowser;

jest.mock("webextension-polyfill-ts", () => ({ browser }));

beforeEach(() => mockBrowserNode.enable());

afterEach(() => mockBrowserNode.verifyAndDisable());

declare global {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    export const mockBrowser: MockzillaDeep<Browser>;
}
