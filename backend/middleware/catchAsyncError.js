module.exports = (theFunc) => (req,res,next) => {
    Promise.resolve(theFunc(req,res,next)).catch(next)
}

// module.exports = (fn) => (req, res, next) => {
//     Promise.resolve(fn(req, res, next)).catch((error) => {
//         console.error(error);
//         return next(new ErrorHandler(error.message, 400)); // Adjust status code if needed
//     });
// };
