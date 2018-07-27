'use strict';

var p = { //player
    currentSign: 'X', p: true, hSign: 'O', aiSign: 'X', choosen: 'easy',
    /*set init(sign){
        this.aiSign = sign;
        this.hSign = this.aiSign==='O' ? 'X' : 'O';
    },*/
    switchOver: function switchOver() {
        if (this.p) this.p = false;else this.p = true;
        if (this.currentSign == 'X') this.currentSign = 'O';else this.currentSign = 'X';
    },
    reset: function reset() {
        table.aiTable = [], table.humanTable = [], table.missing = [], table.table = [], click.start = false, term.isTerm = false, table.full = false;
        var all = document.getElementsByClassName('square');
        //console.log(all);

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = all[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var i = _step.value;


                i.removeEventListener('click', click.listening);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
};
var table = {
    full: false, already: false, table: [], aiTable: [], humanTable: [],
    tableFull: [1, 2, 3, 4, 5, 6, 7, 8, 9], missing: [],
    emptySpace: function emptySpace() {
        var _this = this;

        var tableCopy = this.table.map(function (value) {
            return parseInt(value);
        });
        table.missing = [];
        this.tableFull.forEach(function (value) {
            var ez = tableCopy.includes(value);
            if (!ez) _this.missing.push(value);
        });
    },
    alreadyThere: function alreadyThere(id) {
        this.already = false;
        //console.log(this.table);
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = this.table[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var value = _step2.value;

                if (value === id) this.already = true;
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }
    },
    isFull: function isFull() {
        console.log('elemek szama ' + this.table.length);
        this.full = this.table.length >= 9 ? true : false;
        if (table.full) {
            console.log("game over");
        }
        if (table.full && !term.isTerm) {

            if (!term.isTerm) {
                document.getElementById('end').innerHTML = 'It\'s a tie!';
            }

            click.notListening();
        };
    },
    tablePush: function tablePush(id) {
        table.table.push(id);
        if (p.p) {
            this.humanTable.push(id);
            //this.origBoard[id-1]=p.hSign;
            //console.log('origboard'+this.origBoard);
        }
        if (p.p === false) {
            this.aiTable.push(id);
            //this.origBoard[id-1]=p.aiSign;
            //console.log('origboard'+this.origBoard);
        }
        /*console.log('aitable:'+this.aiTable);
        console.log('humantable'+this.humanTable);*/
    }
};
var term = {
    termState: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 5, 9], [3, 5, 7], [1, 4, 7], [2, 5, 8], [3, 6, 9]], isTerm: false, whoMoved: '', aiValue: 0, humanValue: 0, winner: '',
    check: function check() {
        var _this2 = this;

        console.log('is p: ' + p.p);
        this.termState.forEach(function (value) {
            _this2.aiValue = 0;
            _this2.humanValue = 0;
            value.forEach(function (item) {
                //console.log("terminal state check");
                if (table.aiTable.includes(item)) term.aiValue++;
                if (table.humanTable.includes(item)) term.humanValue++;
                if (term.humanValue >= 3) {
                    term.winner = 'You ';
                    term.isTerm = true;
                    //console.log('player nyert')
                }
                if (term.aiValue >= 3) {
                    term.winner = 'Computer';
                    term.isTerm = true;
                    //console.log('comp nyert nyert')
                }
            });
        });
        if (term.isTerm) term.termEnd();
    },
    termEnd: function termEnd() {
        console.log(term.winner + ' nyert');
        var x = document.getElementById('end');
        x.innerHTML = term.winner + ' won';
        click.notListening();
        click.start = false;
    }
};