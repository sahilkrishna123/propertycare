// module.exports = fn => {
//     return (req, res, next) => {
//       fn(req, res, next).catch(next);
//     };
//   };
export const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
