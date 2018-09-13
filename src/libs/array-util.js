let arrayUtil = {}

arrayUtil.sum = function (array) {
    if (array === undefined) {
        return 0
    }
    var total = 0;
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        total += element;
    }
    return total;
}

export default arrayUtil
