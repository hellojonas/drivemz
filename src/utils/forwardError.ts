import { Handler, NextFunction, Request, Response } from 'express';

interface ErrorForwarder<T> {
  (req: Request, res: Response, next: NextFunction): Promise<T>;
}

const forwarder = (fn: ErrorForwarder<any>) => {
  const handler: Handler = async (req, res, next) => {
    fn(req, res, next).catch((err: Error) => next(err));
  };
  return handler;
};

export default forwarder;