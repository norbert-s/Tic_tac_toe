'use strict'

const click = {
    start : false,

    listening(){
        let id = event.toElement.id;
        let style = event.toElement.style;
        let game = document.getElementById('end').innerHTML;
        console.log(id);
        if(id==="text2"){
            p.p=false;
            document.getElementById('text2').style.backgroundColor='gray';
            document.getElementById('text3').style.backgroundColor='white';
        }
        if(id==='text3') {
            p.p = true;
            document.getElementById('text2').style.backgroundColor='white';
            document.getElementById('text3').style.backgroundColor='gray';
        }
        if(id==='text5'){
            p.hSign='X';
            p.aiSign='O';
            document.getElementById('text5').style.backgroundColor='gray';
            document.getElementById('text6').style.backgroundColor='white';
        }
        if(id==='text6'){
            p.hSign='O';
            p.aiSign='X';
            document.getElementById('text6').style.backgroundColor='gray';
            document.getElementById('text5').style.backgroundColor='white';
        }
        if(id==='settings'){
            let all= document.getElementsByClassName('square');
            //console.log(all);
            for(let i of all){
                i.innerHTML = '';
            }
            modals.toBegin();

            p.reset();
            game='';
        }

        let clicked = event.target.className;
        if(id==='game' ){
            console.log('valasztas');
            if(p.p){
                document.getElementById('end').innerHTML=`Player starts`;
                setTimeout(function(){
                    document.getElementById('end').innerHTML=``;
                },3000);
            }
            else{
                document.getElementById('end').innerHTML=`Computer starts`;
                setTimeout(function(){
                    document.getElementById('end').innerHTML=``;
                },3000);
            }
            modals.stopIntroModal();
            click.reListen();
            click.start=true;
        }
        if(click.start===true){
            if(p.p && clicked=='square'  && !table.full ){
                console.log('human kezd');
                id = parseInt(id);
                draw.checkCond(id);
                table.isFull();
            }
            if(p.p===false &&  !table.full){
                console.log("ai kezd");
                table.emptySpace();
                if(p.choosen==='easy')
                    rand.easy();
                table.isFull();
            }
        }
    },
    reListen(){
        let all= document.getElementsByClassName('square');
        //console.log(all);
        for(let i of all){
            i.addEventListener('click',click.listening);
        }
    },
    notListening(){
        click.start=false;
        let all= document.getElementsByClassName('square');
        //console.log(all);
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
    stopIntroModal(){this.styling("modal","none")
        document.getElementById('content').style.backgroundColor='white;'
    },
    deleteBoxes(){
        this.styling("text2","none");
        this.styling("text3","none");
        this.styling("text4","none");
        this.styling("text","none");
        this.styling("text2","none");
        this.styling("text2","none");
    },
    activate(){
        this.styling("game","block");
        this.styling("text2","block");
    },
    toBegin(){
        this.styling("modal","block");
        this.styling("game","block");
        this.msgConst(this.$text1,'Who starts?');
        this.msgConst(this.$text2,'Computer');
        this.msgConst(this.$text3,'Player');
        this.msgConst(this.$text4,'Please choose your sign!');
        this.msgConst(this.$text5,'X');
        this.msgConst(this.$text6,'O');
        document.getElementById('text2').style.backgroundColor='white';
        document.getElementById('text3').style.backgroundColor='white';
        document.getElementById('text5').style.backgroundColor='white';
        document.getElementById('text6').style.backgroundColor='white';
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
    styling(st1,st2){document.getElementById(st1).style.display = st2;},
    msgConst(value,value1){
        value.innerHTML = value1;
    }
}

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
        //console.log(all);

        for(let i of all){

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
        //console.log(this.table);
        for(let value of this.table){
            if(value===id)this.already = true;}
    },
    isFull(){
        console.log(`elemek szama ${this.table.length}`);
        this.full = this.table.length>=9 ? true: false;
        if(table.full ){
            console.log("game over")
        }
        if(table.full){
            document.getElementById('end').innerHTML = `It's a tie!`;
            term.isTerm=true;
            click.notListening();
        };
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
        /*console.log('aitable:'+this.aiTable);
        console.log('humantable'+this.humanTable);*/
    }
}
const term= {
    termState : [[1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7],[1,4,7],[2,5,8],[3,6,9]],isTerm : false,whoMoved:'',aiValue:0,humanValue:0,winner:'',
    check(){
        console.log('is p: '+p.p);
        this.termState.forEach((value)=>{
            this.aiValue = 0;
            this.humanValue=0;
            value.forEach((item)=>{
                //console.log("terminal state check");
                if(table.aiTable.includes(item)) term.aiValue++;
                if(table.humanTable.includes(item)) term.humanValue++;
                if(term.humanValue >=3){
                    term.winner='Player';
                    term.isTerm = true;
                    //console.log('player nyert')
                }
                if(term.aiValue >=3){
                    term.winner='Computer';
                    term.isTerm = true;
                    //console.log('comp nyert nyert')
                }
            });
        });
        if(term.isTerm)term.termEnd();
    },
    termEnd() {
        console.log(`${term.winner} nyert`);
        let x = document.getElementById('end');
        x.innerHTML= `${term.winner}  nyert`;
        click.notListening();
        click.start=false;
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
        if(!term.isTerm && !table.full) {
            draw.execute(randomNumber);
        }
    }
}
const draw = {
    level:0,
    checkCond(id){
        table.alreadyThere(id);
        if(table.already ===false && !term.isTerm && !table.full)this.execute(id);
    },
    execute(id){
        if(table.full ){
            console.log("game over")
        }
        //console.log(id);
        let pos=0;
        let human = p.p;
        console.log("ki ez , csak nem a p? :"+human);
        if(p.p)document.getElementById(id).innerHTML = p.hSign;
        else if(!p.p &&  !table.full){
            //const p = p.p;
            /*console.log("id miutan random legeneralta: "+ id);
            console.log("missing table :" +table.missing);*/
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
        table.isFull();
        //if(term.isTerm) click.notListening();
        p.switchOver();
        if(!p.p && !table.full ){
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
//let square = document.addEventListener('click',click.square);
window.onload = ()=>{window.addEventListener('click',click.listening)};