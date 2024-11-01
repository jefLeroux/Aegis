// src/global.d.ts
interface Window {
    api: {
        sendMessage: (message: string) => void;
        onMessage: (callback: (arg: any) => void) => void;
    };
}
