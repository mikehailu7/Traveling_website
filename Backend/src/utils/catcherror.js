//author: mikias hailu and yared tsgie
const catchAsync = func => {
    return (req, res, next) => {
        func(req, res, next).catch(err => next(err));
    };
}


module.exports = catchAsync;