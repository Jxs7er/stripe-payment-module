export const notFounded = (req, res, next) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: `Not Found`,
    details: `Route not found: ${req.originalUrl}`,
    data: null,
  });

  next();
};
