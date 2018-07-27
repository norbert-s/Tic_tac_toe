const rand={
    easy(){
        let missingTable = [...table.missing];
        let j=0;
        missingTable.forEach(()=>{j++});
        let length = j;
        let randomNumber = Math.floor(Math.random() * length);
        console.log('ai random:' +randomNumber);
        if(!term.isTerm && !table.full) {
            draw.execute(randomNumber);
        }
    }


}