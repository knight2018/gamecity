let stringUtil = {};

stringUtil.isBlank = function (s) {
    return s === undefined || s === null || s.toString().trim() === '';
};

export default stringUtil;
