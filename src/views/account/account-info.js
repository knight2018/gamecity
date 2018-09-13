export const accountInfoRender = function (createElement) {
    var func = function () {
        return {
            template: '<div> \
            <Input size="large" placeholder="账户名称"></Input> \
            <Input size="large" placeholder="密码"></Input> \
            <Input size="large" placeholder="备注"></Input> \
             </div>'
        }
    }
    return createElement(func())
};
