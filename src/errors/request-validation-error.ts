import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

//Option 1 Interface Implementation===============
// interface CustomError {
//   statusCode: number;
//   serializeError(): {
//     message: string;
//     field?: string;
//   }[];
// }
//Below Class will implement this Interface. Not using this because interface code goes away in javascript translation. Abstract doesn't
//and u also get to have instanceOf check still in place.
//=================================================

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super("Invalid request parameters");

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
