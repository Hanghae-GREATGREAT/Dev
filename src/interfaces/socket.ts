

interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
    hello: () => void;
}

interface InterServerEvents {
    ping: () => void;
}

interface ChatInput {
    input: string;
}

interface ChatOutput {
    output: string;
}

export {
    ServerToClientEvents,
    ClientToServerEvents,
    InterServerEvents,
    ChatInput,
    ChatOutput,
}