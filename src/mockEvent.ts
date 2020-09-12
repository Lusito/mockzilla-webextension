import { Events } from "webextension-polyfill-ts";
import { MockzillaDeep, MockzillaError } from "mockzilla";

export class MockzillaEvent<T extends (...args: any[]) => any> {
    private listeners: T[] = [];

    private disabled = false;

    private prefix: string;

    public constructor(prefix: string) {
        this.prefix = prefix;
    }

    public addListener = jest.fn((callback: T) => {
        this.disabledCheck("addListener");
        this.listeners.push(callback);
    });

    public removeListener = jest.fn((callback: T) => {
        this.disabledCheck("removeListener");
        this.listeners = this.listeners.filter((listener) => listener !== callback);
    });

    public hasListener = jest.fn((callback: T) => {
        this.disabledCheck("hasListener");
        return this.listeners.includes(callback);
    });

    public hasListeners = jest.fn(() => {
        this.disabledCheck("hasListeners");
        return this.listeners.length > 0;
    });

    public disable() {
        this.disabled = true;
    }

    public emit(...args: Parameters<T>) {
        this.listeners.forEach((listener) => listener(...args));
    }

    private disabledCheck(what: string) {
        if (this.disabled)
            throw new MockzillaError(
                `Mock "${this.prefix}.${what}" has been used after tests have finished! You might have a memory leak there.`
            );
    }
}

export type MockzillaEventParameters<T> = T extends (...args: any[]) => any ? Parameters<T> : any[];

export type MockzillaEventFunction<T> = T extends Events.Event<infer TFun>
    ? (...args: MockzillaEventParameters<TFun>) => void
    : (...args: any[]) => void;

export type MockzillaEventOf<T> = T extends MockzillaDeep<infer TD>
    ? MockzillaEvent<MockzillaEventFunction<TD>>
    : unknown;

export function mockEvent<T>(builder: MockzillaDeep<T>) {
    const mock = new MockzillaEvent<MockzillaEventFunction<T>>(builder.mockPath);
    builder.mock(mock as any);
    return mock;
}
