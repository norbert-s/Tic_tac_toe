'use strict'
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