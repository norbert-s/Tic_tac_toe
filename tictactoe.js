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
    currentSign:'O',player :false, hSign:'O', aiSign:'X',choosen:'hard',
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
let hardAi = {
    origboard:['O',1 ,'X','X',4 ,'X', 6 ,'O','O'],player:true,winComb:[],aiPieces:0,humanPieces:0,winner:'',level:0,
    hSign:'X',aiSign:'0',fc:0,bestSpot:[],
    bestSpotSetter(){
        this.bestSpot = this.minimax(this.origboard,aiSign);
    },
    emptyInd(board){
        return board.filter(i=>i!='O' &&i !='X')
    },
    winning(board,player){
        let ai=(item)=>{
            if (this.aiTable.includes(item)) this.aiPieces++;
            if (term.aiValue >= 3)
                return true;
            else
                return false;
        }
        let h=(item)=>{
            if (this.humanTable.includes(item)) this.humanPieces++;
            if (this.humanPieces >= 3)
                return true;
            else
                return false;
        }
        this.aiPieces=0;
        this.humanPieces=0;
        term.termState.forEach((value) => {
            value.forEach((item) => {
                if(player===aiSign)
                    ai(item);
                if(player===hSign)
                    h(item);
            });
        });
    },
    minimax(newBoard,player){
        this.fc++;
        let availSpots = emptyIndexies(newBoard);
        if (winning(newBoard, hSign)){
            return {score:-10};
        }
        else if (winning(newBoard, aiSign)){
            return {score:10};
        }
        else if (availSpots.length === 0){
            return {score:0};
        }
        let moves = [];
        availSpots.forEach((value)=> {
            let move = {};
            move.index = newBoard[availSpots[value]];
            newBoard[availSpots[value]] = player;

            if (player === aiSign)
                move.score = minimax(newBoard, huSign).score;
            else
                move.score =  minimax(newBoard, aiSign).score;
            newBoard[availSpots[value]] = move.index;
            if ((player === aiSign && move.score === 10) || (player === huSign && move.score === -10))
                return move;
            else
                moves.push(move);
        });

        let bestMove, bestScore;
        if (player === aiSign) {
            bestScore = -1000;
            moves.forEach((value)=> {
                if (moves[value].score > bestScore) {
                    [moves[value].score,bestScore] = [bestScore,moves[value].score];
                }
            });
        }
        else {
            bestScore = 1000;
            moves.forEach((value)=>{
                if (moves[value].score < bestScore) {
                    [moves[value].score,bestScore] = [bestScore,moves[value].score];
                }
            });
        }

        return moves[bestMove];
    },
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
                hard.basicSet();
        }
    }
}
/*window.onload = modals.startIntroModal()*/
window.onload = ()=>{window.addEventListener('click',click.listening)};