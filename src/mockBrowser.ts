import { Browser } from "webextension-polyfill-ts";
import { deepMock, MockzillaDeep } from "mockzilla";

const [browser, mockBrowser, mockBrowserNode] = deepMock<Browser>("browser", false);

(global as any).mockBrowser = mockBrowser;

jest.mock("webextension-polyfill-ts", () => ({ browser }));

beforeEach(() => mockBrowserNode.enable());

afterEach(() => mockBrowserNode.verifyAndDisable());

declare global {
    export const mockBrowser: MockzillaDeep<Browser>;
}
