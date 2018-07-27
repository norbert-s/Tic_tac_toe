'use strict';

var click = {
    start: false,

    listening: function listening() {
        var id = event.toElement.id;
        var style = event.toElement.style;
        var game = document.getElementById('end').innerHTML;
        console.log(id);
        if (id === "text2") {
            p.p = false;
            document.getElementById('text2').style.backgroundColor = 'gray';
            document.getElementById('text3').style.backgroundColor = 'white';
        }
        if (id === 'text3') {
            p.p = true;
            document.getElementById('text2').style.backgroundColor = 'white';
            document.getElementById('text3').style.backgroundColor = 'gray';
        }
        if (id === 'text5') {
            p.hSign = 'X';
            p.aiSign = 'O';
            document.getElementById('text5').style.backgroundColor = 'gray';
            document.getElementById('text6').style.backgroundColor = 'white';
        }
        if (id === 'text6') {
            p.hSign = 'O';
            p.aiSign = 'X';
            document.getElementById('text6').style.backgroundColor = 'gray';
            document.getElementById('text5').style.backgroundColor = 'white';
        }
        if (id === 'settings') {
            var all = document.getElementsByClassName('square');
            //console.log(all);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = all[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var i = _step.value;

                    i.innerHTML = '';
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

            modals.toBegin();

            p.reset();
            game = '';
        }

        var clicked = event.target.className;
        if (id == 'game' && !term.isTerm && !table.full) {
            console.log('valasztas');
            if (p.p) {
                document.getElementById('end').innerHTML = 'Player starts';
                setTimeout(function () {
                    document.getElementById('end').innerHTML = '';
                }, 1500);
            } else {
                document.getElementById('end').innerHTML = 'Computer starts';
                setTimeout(function () {
                    document.getElementById('end').innerHTML = '';
                }, 1500);
            }
            modals.stopIntroModal();
            click.reListen();
            click.start = true;
        }
        if (click.start === true) {
            if (p.p && clicked == 'square' && !table.full) {
                console.log('human kezd');
                id = parseInt(id);
                draw.checkCond(id);
                table.isFull();
            }
            if (p.p === false && !table.full) {
                console.log("ai kezd");
                table.emptySpace();
                if (p.choosen === 'easy') rand.easy();
                table.isFull();
            }
        }
    },
    reListen: function reListen() {
        var all = document.getElementsByClassName('square');
        //console.log(all);
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = all[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var i = _step2.value;

                i.addEventListener('click', click.listening);
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
    notListening: function notListening() {
        click.start = false;
        var all = document.getElementsByClassName('square');
        //console.log(all);
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = all[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var i = _step3.value;

                i.removeEventListener('click', click.listening);
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }
    }
};
// modal object, all of the modals attributes are on this object
var modals = {
    modal: document.getElementById("modal"),
    $text1: document.getElementById("text1"),
    $text2: document.getElementById("text2"),
    $text3: document.getElementById("text3"),
    $text4: document.getElementById("text4"),
    $text5: document.getElementById("text5"),
    $text6: document.getElementById("text6"),
    stopIntroModal: function stopIntroModal() {
        this.styling("modal", "none");
        document.getElementById('content').style.backgroundColor = 'white;';
    },
    deleteBoxes: function deleteBoxes() {
        this.styling("text2", "none");
        this.styling("text3", "none");
        this.styling("text4", "none");
        this.styling("text", "none");
        this.styling("text2", "none");
        this.styling("text2", "none");
    },
    activate: function activate() {
        this.styling("game", "block");
        this.styling("text2", "block");
    },
    toBegin: function toBegin() {
        this.styling("modal", "block");
        this.styling("game", "block");
        this.msgConst(this.$text1, 'Who starts?');
        this.msgConst(this.$text2, 'Computer');
        this.msgConst(this.$text3, 'Player');
        this.msgConst(this.$text4, 'Please choose your sign!');
        this.msgConst(this.$text5, 'X');
        this.msgConst(this.$text6, 'O');
        document.getElementById('text2').style.backgroundColor = 'white';
        document.getElementById('text3').style.backgroundColor = 'white';
        document.getElementById('text5').style.backgroundColor = 'white';
        document.getElementById('text6').style.backgroundColor = 'white';
    },

    /*tie(){
        this.styling("modal","block");
        this.styling("close","block");
        this.msgConst(this.$text1,`it's a tie`);
    },*/
    /*win(winner){
        this.styling("modal","block");
        this.styling("close","block");
        this.msgConst(this.$text1,`${winner} nyert.
        Who Starts?`);
    },*/
    /*draw(){this.msgConst("It's a draw")},
    aiWon(){this.msgConst("Ai have won","Do you want to play again?")},
    yo*/
    styling: function styling(st1, st2) {
        document.getElementById(st1).style.display = st2;
    },
    msgConst: function msgConst(value, value1) {
        value.innerHTML = value1;
    }
};

var draw = {
    level: 0,
    checkCond: function checkCond(id) {
        table.alreadyThere(id);
        if (table.already === false && !term.isTerm && !table.full) this.execute(id);
    },
    execute: function execute(id) {
        if (table.full) {
            console.log("game over");
        }
        //console.log(id);
        var pos = 0;
        var human = p.p;
        console.log("ki ez , csak nem a p? :" + human);
        if (p.p) document.getElementById(id).innerHTML = p.hSign;else if (!p.p && !table.full) {
            //const p = p.p;
            /*console.log("id miutan random legeneralta: "+ id);
            console.log("missing table :" +table.missing);*/
            pos = table.missing[id];
            console.log("ahova ai jele kerul: " + pos);
            document.getElementById(pos).innerHTML = p.aiSign;
        }
        draw.level = draw.level + 1;
        console.log("hanyadik szint: " + draw.level);
        if (human) table.tablePush(id);
        if (!human) table.tablePush(pos);
        if (human) table.emptySpace();
        console.log(table.table);
        if (draw.level >= 5) term.check();
        table.isFull();
        //if(term.isTerm) click.notListening();
        p.switchOver();
        if (!p.p && !table.full) {
            //if(p.choosen=='easy')
            rand.easy();
            /*if(p.choosen=='hard') {
                let board = table.origBoard;
                let missing = table.missing;
                let sign = p.aiSign;
                flow(sign, board,missing);
            }*/
        }
    }
};
window.onload = modals.toBegin();
//let square = document.addEventListener('click',click.square);
window.onload = function () {
    window.addEventListener('click', click.listening);
};