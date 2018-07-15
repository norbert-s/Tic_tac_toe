'use strict'

const click = {
  listening(){
    let id = event.toElement.id; 
    id = parseInt(id);
    let clicked = event.target.className;
    if(clicked=='square' )draw.checkCond(id);
  },
  notListening(){
    window.removeEventListener('click',click.listening);
  }
}
//start button will be implemented, and that will trigger the draw.checkCond(id) function to take effect
//before that the set up of the player will take place based on provided settings via the modal UI
const player={
  currentSign:'X',player :true, hSign:'X', aiSign:'O',choosen:'easy',
  set signs(sign){
    this.hSign = 'O';
    this.aiSign = this.hSign==='O' ? 'X' : 'O'; 
  },
  switchOver(){
    if(this.player)
      this.player=false;
    else this.player=true;
    if(this.currentSign=='X') 
      this.currentSign='O';
    else this.currentSign='X';
  },
  reset(){
  }
}
const term= {
  termState : [[1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7],[1,4,7],[2,5,8],[3,6,9]],isTerm : false,whoMoved:'',aiValue:0,humanValue:0,winner:'',
  check(){
    console.log('isplayer: '+player.player);
    this.termState.forEach((value)=>{
      this.aiValue = 0; 
      this.humanValue=0;
      value.forEach((item)=>{
          console.log("terminal state check");
        if(table.aiTable.includes(item)) term.aiValue++;
        if(table.humanTable.includes(item)) term.humanValue++;
        if(term.humanValue >=3){
          term.winner='human';
          console.log('nyertes: '+this.winner);
          term.isTerm = true;
          click.notListening();
        }
        if(term.aiValue >=3){
          term.winner='ai';
          console.log('nyertes: '+this.winner);
          term.isTerm = true;
          click.notListening();
        }
      });
    });
  }
}
const table = {
  full : false, already : false, table : [], aiTable:[], humanTable:[], tableFull : [1,2,3,4,5,6,7,8,9], missing : [],
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
    console.log(this.table);
    for(let value of this.table){
      if(value===id)this.already = true;}
  },
  isFull(){
    console.log(`elemek szama ${this.table.length}`);
    this.full = this.table.length>=9 ? true: false;
    if(this.full){
      player.reset();
      click.notListening()};
  },
  tablePush(id){
    table.table.push(id);
    if(player.player)this.humanTable.push(id);
    if(!player.player)this.aiTable.push(id);
      console.log('aitable:'+this.aiTable);
      console.log('humantable'+this.humanTable);
  }
}
const ai={
  easy(){
    let missingTable = table.missing;
    console.log("array : "+ai.array);
    let j=0;
    missingTable.forEach(()=>{j++});
    let length = j;
    let randomNumber = Math.floor(Math.random() * length);
    console.log('ai random:' +randomNumber);
    draw.execute(randomNumber);
  }
}
const draw = {
  level:0,
  checkCond(id){
    table.alreadyThere(id);
    if(table.already ===false)this.execute(id); 
  },
  execute(id){
    console.log(id);
    let pos=0;
    let human = player.player;
    console.log("ki ez , csak nem a player? :"+human);
    if(human)document.getElementById(id).innerHTML = player.currentSign;
    else if(!human){
      //const player = player.player;
      console.log("id miutan random legeneralta: "+ id);
      console.log("missing table :" +table.missing);
      pos = table.missing[id];
      console.log("ahova ai jele kerul: "+pos);
      document.getElementById(pos).innerHTML = player.currentSign;
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
    player.switchOver();
    table.isFull(); 
    if(!player.player && !term.isTerm){
      if(player.choosen=='easy')
        ai.easy();
      if(player.choosen=='difficult')
        ai.unbeaten();
    }
  }
}
/*window.onload = modals.startIntroModal()*/
window.onload = function(){window.addEventListener('click',click.listening)};