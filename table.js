'use strict'
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
        if(table.full && !term.isTerm){
            if(!term.isTerm){
                document.getElementById('end').innerHTML = `It's a tie!`;
            }
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