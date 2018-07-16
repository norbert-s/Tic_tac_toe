'use strict'

const click = {
    start : false,
    listening(){
        let id = event.toElement.id;
        console.log(id);
        if(id==='which'){
            id.innerHTML='O';
        }

        let clicked = event.target.className;
        if(id=='start' || click.start===true ){
            console.log('valasztas');
            click.start=true;
            if(player.player && clicked=='square' ){
                console.log('human kezd');
                id = parseInt(id);
                draw.checkCond(id);
            }
            if(player.player===false && term.isTerm===false){
                console.log("ai kezd");
                table.emptySpace();
                if(player.choosen==='easy')ai.easy();
                else hard.orBoard();
            }
        }
    },
    notListening(){
        window.removeEventListener('click',this.listening);
    }
}
//start button will be implemented, and that will trigger the draw.checkCond(id) function to take effect
//before that the set up of the player will take place based on provided settings via the modal UI
const player={
    currentSign:'X',player :true, hSign:'X', aiSign:'O',choosen:'easy',
    set signs(sign){
        this.hSign = 'O';
        this.aiSign = this.hSign==='O' ? 'X' : 'O';
    },
    switchOver(){
        if(this.player)
            this.player=false;
        else this.player=true;
        if(this.currentSign=='X')
            this.currentSign='O';
        else this.currentSign='X';
    },
    reset(){
    }
}
const term= {
    termState : [[1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7],[1,4,7],[2,5,8],[3,6,9]],isTerm : false,whoMoved:'',aiValue:0,humanValue:0,winner:'',
    check(){
        console.log('isplayer: '+player.player);
        this.termState.forEach((value)=>{
            this.aiValue = 0;
            this.humanValue=0;
            value.forEach((item)=>{
                console.log("terminal state check");
                if(table.aiTable.includes(item)) term.aiValue++;
                if(table.humanTable.includes(item)) term.humanValue++;
                if(term.humanValue >=3){
                    term.winner='human';
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
        console.log(`a nyertes : ${this.winner}`);
    }
}
const table = {
    full : false, already : false, table : [], aiTable:[], humanTable:[],
    tableFull : [1,2,3,4,5,6,7,8,9], missing : [], origBoard:[1,2,3,4,5,6,7,8,9],
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

            player.reset();
            click.notListening()};
    },
    tablePush(id){
        table.table.push(id);
        if(player.player){
            this.humanTable.push(id);
            this.origBoard[id-1]=player.hSign;
            console.log('origboard'+this.origBoard);
        }
        if(player.player===false){
            this.aiTable.push(id);
            this.origBoard[id-1]=player.aiSign;
            console.log('origboard'+this.origBoard);
        }

        console.log('aitable:'+this.aiTable);
        console.log('humantable'+this.humanTable);
    }
}
const hard = {
    minMax(){

    }
}

const ai={
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
        let human = player.player;
        console.log("ki ez , csak nem a player? :"+human);
        if(human)document.getElementById(id).innerHTML = player.currentSign;
        else if(!human){
            //const player = player.player;
            console.log("id miutan random legeneralta: "+ id);
            console.log("missing table :" +table.missing);
            pos = table.missing[id];
            console.log("ahova ai jele kerul: "+pos);
            document.getElementById(pos).innerHTML = player.currentSign;
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
        player.switchOver();
        table.isFull();
        if(!player.player && !term.isTerm){
            if(player.choosen=='easy')
                ai.easy();
            if(player.choosen=='hard')
                hard.orBoard();
        }
    }
}
/*window.onload = modals.startIntroModal()*/
window.onload = ()=>{window.addEventListener('click',click.listening)};