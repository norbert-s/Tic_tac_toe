'use strict'
const p={ //player
    currentSign:'X',p :true, hSign:'O', aiSign:'X',choosen:'easy',
    /*set init(sign){
        this.aiSign = sign;
        this.hSign = this.aiSign==='O' ? 'X' : 'O';
    },*/
    setP(value){
        this.p = value;
    },
    setHS(sign){
        this.hSign = sign;
    },
    setAiS(sign){
        this.aiSign = sign;
    },
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

