export default class MissingVariableException extends Error {
    constructor(variableName: string) {
        const msg = "The following variable is missing in your environment file: " + variableName;
        super(msg);
        this.name = 'MissingVariable';
    }
}