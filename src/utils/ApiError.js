class ApiError extends Error {
  constructor(statusCode, message = 'Something Went Wrong', errors = [], statck = '') {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.message = message;
    this.data = null;
    this.errors = errors;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
