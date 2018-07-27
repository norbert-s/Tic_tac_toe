'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var rand = {
    easy: function easy() {
        var missingTable = [].concat(_toConsumableArray(table.missing));
        var j = 0;
        missingTable.forEach(function () {
            j++;
        });
        var length = j;
        var randomNumber = Math.floor(Math.random() * length);
        console.log('ai random:' + randomNumber);
        if (!term.isTerm && !table.full) {
            draw.execute(randomNumber);
        }
    }
};