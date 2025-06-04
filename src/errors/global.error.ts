class GlobalError{

    message: string;
    statusCode: number;
    internalErrorNumber?: number;
    constructor(message: string, statusCode: number, internalErrorNumber?: number) {
      this.message = message;
      this.statusCode = statusCode;
      this.internalErrorNumber = internalErrorNumber;
    }
}

export { GlobalError };