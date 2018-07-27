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
                    term.winner='You ';
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
        x.innerHTML= `${term.winner} won`;
        click.notListening();
        click.start=false;
    }
}