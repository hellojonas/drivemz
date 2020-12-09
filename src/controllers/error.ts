import { ErrorRequestHandler, Handler } from 'express';
import createError from 'http-errors';

const resourceNotFound: Handler = (req, res, next) => {
  res.json({
    status: 'fail',
    message: `Cannot find resource ${req.originalUrl}`,
  });
};

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);
  console.log('-------------------------------------------------------');
  if (createError.isHttpError(err)) {
    return res
      .status(err.status)
      .json({ status: 'fail', message: err.message });
  }
  res.status(500).json({ status: 'fail', message: 'Something went wrong' });
};

export { globalErrorHandler, resourceNotFound };
