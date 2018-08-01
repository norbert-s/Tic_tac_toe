'use strict'

const rand={
    easy(){
        let missingTable = [...table.missing];
        let length = missingTable.length;
        let randomNumber = Math.floor(Math.random() * length);
        console.log('computer random:' +randomNumber);
        if(!term.isTerm && !table.full) {
            draw.execute(randomNumber);
        }
    }
}