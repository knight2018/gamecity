//清空字符串前后空格
let trim;
trim = function(str){
    return str.replace(/(^\s*)|(\s*$)/g,'');
}
export default trim