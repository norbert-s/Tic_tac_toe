'use strict'

const click = {
    start : false,
    listening(){
        let id = event.toElement.id;
        console.log(id);
        if(id==="text2")p.p=false;
        if(id==='text3')p.p=true;
        if(id==='text5'){
            if(p.p===true){
                p.hSign='X';
                p.aiSign='O';
            }
            else {
                p.hSign='O';
                p.aiSign='X';
            }
        }
        if(id==='text6'){
            if(p.p===true){
                p.hSign='O';
                p.aiSign='X';
            }
            else {
                p.hSign='X';
                p.aiSign='O';
            }
        }
        if(id==="close"){
            modals.stopIntroModal();
            click.reListen();
        }
        let clicked = event.target.className;
        if(id==='settings'){
            modals.toBegin();
            p.reset();
        }

        if(id=='start' || click.start===true ){

            console.log('valasztas');
            click.start=true;
            if(p.p && clicked=='square' ){
                console.log('human kezd');
                id = parseInt(id);
                draw.checkCond(id);
            }
            if(p.p===false && term.isTerm===false){
                console.log("ai kezd");
                table.emptySpace();
                if(p.choosen==='easy')rand.easy();
            }
        }
    },
    reListen(){
        let all= document.getElementsByClassName('square');
        console.log(all);
        for(let i of all){
            i.addEventListener('click',click.listening);
        }
    },
    notListening(){
        let all= document.getElementsByClassName('square');
        console.log(all);
        for(let i of all){
            i.removeEventListener('click',click.listening);
        }
    }
}
// modal object, all of the modals attributes are on this object
const modals = {
    modal : document.getElementById("modal"),
    $text1 : document.getElementById("text1"),
    $text2 : document.getElementById("text2"),
    $text3 : document.getElementById("text3"),
    $text4 : document.getElementById("text4"),
    $text5 : document.getElementById("text5"),
    $text6 : document.getElementById("text6"),

    stopIntroModal(){this.styling("modal","none")},
    deleteXO(){
        this.styling("x","none");
        this.styling("o","none");
    },
    activate(){
        this.styling("close","block");
        this.styling("text2","block");
    },
    toBegin(){
        this.styling("modal","block");
        this.styling("close","block");
        this.msgConst(this.$text1,'Who starts?');
        this.msgConst(this.$text2,'Computer');
        this.msgConst(this.$text3,'Player');
        this.msgConst(this.$text4,'Which one will you choose?');
        this.msgConst(this.$text5,'X');
        this.msgConst(this.$text6,'O');
    },
    tie(){
        this.styling("modal","block");
        this.styling("close","block");
        this.msgConst(this.$text1,`it's a tie?`);
    },

    draw(){this.msgConst("It's a draw")},
    aiWon(){this.msgConst("Ai have won","Do you want to play again?")},
    youWon(){this.msgConst("You've won!! Congrats")},
    styling(st1,st2){document.getElementById(st1).style.display = st2;},
    msgConst(value,value1){
        value.innerHTML = value1;
    }
}

//start button will be implemented, and that will trigger the draw.checkCond(id) function to take effect

const term= {
    termState : [[1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7],[1,4,7],[2,5,8],[3,6,9]],isTerm : false,whoMoved:'',aiValue:0,humanValue:0,winner:'',
    check(){
        console.log('isp: '+p.p);
        this.termState.forEach((value)=>{
            this.aiValue = 0;
            this.humanValue=0;
            value.forEach((item)=>{
                console.log("terminal state check");
                if(table.aiTable.includes(item)) term.aiValue++;
                if(table.humanTable.includes(item)) term.humanValue++;
                if(term.humanValue >=3){
                    term.winner='player';
                    term.isTerm = true;
                }
                if(term.aiValue >=3){
                    term.winner='ai';
                    term.isTerm = true;
                }
            });
        });
        if(term.isTerm)term.termEnd();
    },

    termEnd(){
        click.notListening();
        this.callMsg();
    },
    callMsg(){

        document.getElementById('end').innerHTML= `a nyertes : ${this.winner}`;
    }
}
//before that the set up of the p will take place based on provided settings via the modal UI
const p={ //player
    currentSign:'X',p :true, hSign:'O', aiSign:'X',choosen:'easy',
    /*set init(sign){
        this.aiSign = sign;
        this.hSign = this.aiSign==='O' ? 'X' : 'O';
    },*/
    switchOver(){
        if(this.p)
            this.p=false;
        else this.p=true;
        if(this.currentSign=='X')
            this.currentSign='O';
        else this.currentSign='X';
    },
    reset(){
        table.aiTable=[],table.humanTable=[],table.missing=[],table.table=[],click.start=false,
            term.isTerm=false,table.full=false;
        let all= document.getElementsByClassName('square');
        console.log(all);

        for(let i of all){
            i.innerHTML = '';
            i.removeEventListener('click',click.listening);
        }

    }
}
const table = {
    full : false, already : false, table : [], aiTable:[], humanTable:[],
    tableFull : [1,2,3,4,5,6,7,8,9], missing : [],
    emptySpace(){
        let tableCopy = this.table.map(value=>parseInt(value));
        table.missing = [];
        this.tableFull.forEach((value)=>{
            let ez= tableCopy.includes(value);
            if(!ez)this.missing.push(value);
        });
    },
    alreadyThere(id){
        this.already = false;
        console.log(this.table);
        for(let value of this.table){
            if(value===id)this.already = true;}
    },
    isFull(){
        console.log(`elemek szama ${this.table.length}`);
        this.full = this.table.length>=9 ? true: false;
        if(this.full){
            click.notListening()};
    },
    tablePush(id){
        table.table.push(id);
        if(p.p){
            this.humanTable.push(id);
            //this.origBoard[id-1]=p.hSign;
            //console.log('origboard'+this.origBoard);
        }
        if(p.p===false){
            this.aiTable.push(id);
            //this.origBoard[id-1]=p.aiSign;
            //console.log('origboard'+this.origBoard);
        }
        console.log('aitable:'+this.aiTable);
        console.log('humantable'+this.humanTable);
    }
}
const rand={
    easy(){
        let missingTable = [...table.missing];

        let j=0;
        missingTable.forEach(()=>{j++});
        let length = j;
        let randomNumber = Math.floor(Math.random() * length);
        console.log('ai random:' +randomNumber);
        draw.execute(randomNumber);
    }
}
const draw = {
    level:0,
    checkCond(id){
        table.alreadyThere(id);
        if(table.already ===false)this.execute(id);
    },
    execute(id){
        console.log(id);
        let pos=0;
        let human = p.p;
        console.log("ki ez , csak nem a p? :"+human);
        if(human)document.getElementById(id).innerHTML = p.hSign;
        else if(!human){
            //const p = p.p;
            console.log("id miutan random legeneralta: "+ id);
            console.log("missing table :" +table.missing);
            pos = table.missing[id];
            console.log("ahova ai jele kerul: "+pos);
            document.getElementById(pos).innerHTML = p.aiSign;
        }
        draw.level = draw.level+1;
        console.log("hanyadik szint: "+draw.level);
        if(human)
            table.tablePush(id);
        if(!human)
            table.tablePush(pos);
        if(human)
            table.emptySpace();
        console.log(table.table);
        if(draw.level>=5)term.check();
        p.switchOver();
        if(table.full && !term.isTerm){
            p.reset();
            modals.tie();
        };
        if(!p.p && !term.isTerm){
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
}
window.onload = modals.toBegin();
window.onload = ()=>{window.addEventListener('click',click.listening)};