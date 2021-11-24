const ObjectToString = Object.prototype.toString;

export function isFunction(input: any): input is Function {
    return '[object Function]' === ObjectToString.call(input);
}