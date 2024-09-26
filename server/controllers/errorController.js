const sendErrorDev = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith("/api")) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  // B) Rendered Website
  console.log("ERROR 💥", err);
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  // console.log(err);

  sendErrorDev(err, req, res);
  // if (process.env.NODE_ENV === "development") {
  //   // sendErrorDev(err, req, res);
  // } else if (process.env.NODE_ENV === "production") {
  //   let error = { ...err };
  //   error.message = err.message;

  //   // sendErrorProd(error, req, res);
  // }
};
