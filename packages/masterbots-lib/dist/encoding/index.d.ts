declare const base64Encode: (obj: {}) => string;
declare const base64Decode: (str: string) => any;
declare function getBase64(file: File): Promise<any>;
declare function validateUUID(str?: string): boolean | undefined;

export { base64Decode, base64Encode, getBase64, validateUUID };
