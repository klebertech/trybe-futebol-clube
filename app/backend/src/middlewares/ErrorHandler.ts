import { Response, Request, NextFunction } from 'express';

class ErrorHandler {
  public static handle(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): Response {
    if (err instanceof Error && err.stack) {
      return res.status(Number(err.stack)).json({ message: err.message });
    }

    return res.status(500).json({ message: 'Internal Error' });
  }
}

export default ErrorHandler;
