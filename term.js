'use strict'
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
        click.reset();
    },
    reset(){
        this.isTerm=false;
    }
}