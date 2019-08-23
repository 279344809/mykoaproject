var range = function (start, end) {
    var array = [];
    for (var i = start; i < end; ++i) array.push(i);
    return array;
};
var randomstr = function () {
    let a = range(0, 6).map(function (x) {
        return Math.floor(Math.random() * 10);
    }).join('');
     return a
}

module.exports = randomstr