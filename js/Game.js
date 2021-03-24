class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

 async start(){
    if(gameState === 0){
      player = new Player();
      
      var playercountref = await database.ref("playerCount").once("value");
      if (playercountref.exists()){
        playerCount = playercountref.val();
        player.getCount();
      }

      form = new Form()
      form.display();
    }
  }
  play(){
    form.formHide();
    textSize(40);
    text("Game Start",120,100);
    Player.getPlayerInfo();
    if (allPlayers!==undefined){
      var playerpos = 130;
      for (var i in allPlayers){
        if (i === "player"+player.index){
          fill("red");
        }else{
          fill("black");
        }
        playerpos+=20;
        textSize(20);
        text(allPlayers[i].name+":"+allPlayers[i].distance);
      }
    }
    if (keyIsDown(UP_ARROW)){
      player.distance+=50;
      player.update();
    }
  }
}
