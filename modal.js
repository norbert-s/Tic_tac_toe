'use strict'
const modals = {
    modal : document.getElementById("modal"),
    $text1 : document.getElementById("text1"),
    $text2 : document.getElementById("text2"),
    $text3 : document.getElementById("text3"),
    $text4 : document.getElementById("text4"),
    $text5 : document.getElementById("text5"),
    $text6 : document.getElementById("text6"),
    stopIntroModal(){this.styling("modal","none")
        document.getElementById('content').style.backgroundColor='white;'
    },
    activate(){
        this.styling("game","block");
        this.styling("text2","block");
    },
    toBegin(){
        this.styling("modal","block");
        this.styling("game","block");
        this.msgDisplay(this.$text1,'Who starts?');
        this.msgDisplay(this.$text2,'Computer');
        this.msgDisplay(this.$text3,'Player');
        this.msgDisplay(this.$text4,'Please choose your sign!');
        this.msgDisplay(this.$text5,'X');
        this.msgDisplay(this.$text6,'O');
        let white = ['text2','text3','text5','text6'];
        for (let i of white){
            document.getElementById(i).style.backgroundColor='white';
        }
    },
    styling(st1,st2){
        document.getElementById(st1).style.display = st2
    }, 
    msgDisplay(value,value1){
        value.innerHTML = value1;
    }
}

window.onload = modals.toBegin();
//let square = document.addEventListener('click',click.square);
window.onload = ()=>{window.addEventListener('click',click.listening)};