/**
 * Centralized global error handling middleware for the Express server.
 * Ensures that API failures (e.g. LangChain timeouts, search failures, missing parameters)
 * are returned in a standard, developer-friendly format instead of leaking stack traces or crashing the process.
 */
export function errorHandler(err, req, res, next) {
  console.error('❌ Express Server Error:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method
  });

  const statusCode = err.status || 500;
  
  return res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
}
