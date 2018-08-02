'use strict'
const click = {
    start : false,
    listening(){
        let id = event.toElement.id;
        let style = event.toElement.style;
        let game = document.getElementById('end').innerHTML;

        console.log(id);
        if(id==="text2"){
            p.setP=false;
            click.bgColor('text2','gray');
            click.bgColor('text3','white');
        }
        if(id==='text3') {
            p.setP=true;
            click.bgColor('text2','white');
            click.bgColor('text3','gray');
        }
        if(id==='text5'){
            p.setHS='X';
            p.setAiS='O';
            click.bgColor('text5','gray');
            click.bgColor('text6','white');
        }
        if(id==='text6'){
            p.setHS='O';
            p.setAiS='X';
            click.bgColor('text6','gray');
            click.bgColor('text5','white');
        }
        if(id==='settings'){
            let all= document.getElementsByClassName('square');
            for(let i of all){
                i.innerHTML = '';
            }
            modals.toBegin();
            //
            p.reset();

            game='';
        }

        let clicked = event.target.className;
        if(id=='game' &&!term.isTerm && !table.full){
            console.log('valasztas');
            if(p.p){
                let who = 'Player Starts';
                click.writesWhoStart(who);
            }
            else{
                let who = 'Computer Starts';
                click.writesWhoStart(who);
            }
            modals.stopIntroModal();
            click.reListen();
            click.start=true;
        }
        if(click.start===true){
            if(p.p && clicked=='square'  && !table.full ){
                console.log('human kezd');
                id = parseInt(id);
                draw.checkCond(id);
                table.isFull();
            }
            if(p.p===false &&  !table.full){
                console.log("ai kezd");
                table.emptySpace();
                if(p.choosen==='easy')
                    rand.easy();
                table.isFull();
            }
        }
    },
    //changes the bgcolor of the buttons on the modal to white or gray depending on what is needed
    bgColor(val,value){
        document.getElementById(val).style.backgroundColor=value;
    },
    writesWhoStart(who){
        document.getElementById('end').innerHTML=who;
        setTimeout(function(){
            document.getElementById('end').innerHTML=``;
        },1500);
    },
    reListen(){
        let all= document.getElementsByClassName('square');
        for(let i of all){
            i.addEventListener('click',click.listening);
        }
    },
    notListening(){
        //this.reset();
        let all= document.getElementsByClassName('square');
        for(let i of all){
            i.removeEventListener('click',click.listening);
        }
    },
    reset(){
        this.start=false;
    }

}
// modal object, all of the modals attributes are on this object


