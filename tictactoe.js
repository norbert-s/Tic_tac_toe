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
        if(id=='game' &&!term.isTerm && !table.full){
            console.log('valasztas');
            if(p.p){
                document.getElementById('end').innerHTML=`Player starts`;
                setTimeout(function(){
                    document.getElementById('end').innerHTML=``;
                },1500);
            }
            else{
                document.getElementById('end').innerHTML=`Computer starts`;
                setTimeout(function(){
                    document.getElementById('end').innerHTML=``;
                },1500);
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