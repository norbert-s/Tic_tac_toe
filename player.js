'use strict'
// noinspection JSAnnotator
const p={ //player
    // 'p' variable is for determining which player is the current one, if its true its the player
    currentSign:'X',p :true, hSign:'O', aiSign:'X',choosen:'easy',
    set setP(value){
        this.p = value;
    },
    set setHS(sign){
        this.hSign = sign;
    },
    set setAiS(sign){
        this.aiSign = sign;
    },
    set setCurr(sign){
        this.currentSign=sign;
    },
    getAll(value){
        return this.value;
    },
    switchOver(){
        if(this.p)
            this.setP=false;
        else this.setP=true;
        if(this.currentSign=='X')
            this.setCurr='O';
        else this.setCurr='X';
    },
    reset(){
        table.reset();
        term.reset();
        click.reset();
        click.notListening();
    }
}

