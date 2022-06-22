declare function main(target_list: string[]): Promise<void>;
declare function onUrlChange(fn: () => void): Promise<void>;
declare function watchDomChange(fn: () => void): void;
declare function isReady(): Promise<void>;
declare function getSearchKey(key: string): string;
