import { ErrorRequestHandler, Handler } from 'express';

const resourceNotFound: Handler = (req, res, next) => {
  res.json({
    status: 'fail',
    message: `Cannot find resource ${req.originalUrl}`,
  });
};

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);
  console.log('-------------------------------------------------------');
  res.json({ status: 'fail', error: err });
};

export { globalErrorHandler, resourceNotFound };
