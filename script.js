/** 
  Prisha Bhavsar
  Jan 21, 2022
  Javascript for Flappy Bird Universe Game
  All needed Javascript needed for Flappy Bird Universe Game.
**/

/*******************************************************************************
 * Variables declaration 
********************************************************************/

let spaceBarKey; //variable for spacekey (used to move the bird)

let fly; //variable for sound played when flappy bird flys (when spacebar is pressed)

let score; //variable that counts the score

let bird;//variable for bird

//variable for all the pipes
let pipeNorth;
let pipeNorth1;
let pipeNorth2;
let pipeSouth1;
let pipeSouth;
let pipeSouth3;
let setOrigin;
let pipeNorth3;

let birdSpeed;//variable for bird moving 
let birdSpeedDown;//variable for falling down

//variable that are needed to move the bird up and down
let jumping=false;
let falling=true;
let jumps=0;

//score variables
let txtGameOver;
let scoreCount;
let scorePicture;
let count;
let scoreTouch;
let scoreTouch1;
let scoreTouch2;
let scoreText;

//beginning of screen variables
let play;
let title;

//bomb variables
let bomb;
let bomb1;
let bomb2;

//end screen variables
let gameOver;
let endScoreMessage;
let reloadInstructions;

//sounds variables
let theme;
let introSound;
let deadSound;
let youAreDead;
let aftermath;
let pressStart;

//bottom of play game screen sprite
let bottom;

//meteor variables
let meteor;
let meteorSpeed;

// for beginning of screen
class startGame extends Phaser.Scene {
  constructor(config) 
  {
    super(config);
    //super('startGame');
  }

  preload()
  {
    this.load.image('play','assests/sprites/play.png');
    this.load.image('bird','assests/sprites/bird.png');
    this.load.image('title','assests/sprites/title.png');
    this.load.audio('introSound', 'assests/sounds/introSound.mp3');
    this.load.audio('theme', 'assests/sounds/theme.mp3');
    this.load.audio('pressStart', 'assests/sounds/pressStart.webm');
  }

  create()
  {
    pressStart=this.sound.add("pressStart");
    pressStart.play()
    bird=this.physics.add.sprite(100,500, "bird");
    introSound=this.sound.add("introSound");
    introSound.play()
    theme=this.sound.add("theme");
    theme.loop = true;
    theme.play()
    title=this.physics.add.sprite(710, 200, 'title')

    //make bird move
    bird.setVelocityX(300);

    //when play clicked the game starts
    play=this.physics.add.sprite(710, 470, 'play')
    .setInteractive();
    play.inputEnabled = true;
    play.on('pointerdown', function (pointer) 
    {
      game.scene.remove("startGame");
      game.scene.start("playGame");
    });

  }//end of create

  update()
  {
    if(bird.x>1300)
    {
      bird.x=100
      bird.y = Math.round(Math.random()*500);	//Move to the left side  
    }
  }
}

//The playGame class holds a game scene. This is for the actual playing of the game.
class playGame extends Phaser.Scene {
  constructor(config) 
  {
    super(config);
  }

  preload() 
  { //Load assests (images, sprites, sounds, etc) - Runs once
    this.load.image('bird', 'assests/sprites/bird.png');
    this.load.image('bottom', 'assests/sprites/bottom.png');
    this.load.image('pipeNorth', 'assests/sprites/pipeNorth.png');
    this.load.image('pipeSouth', 'assests/sprites/pipeSouth.png');
    this.load.image('pipeNorth1', 'assests/sprites/pipeNorth1.png');
    this.load.image('pipeSouth1', 'assests/sprites/pipeSouth1.png');
    this.load.image('pipeNorth3', 'assests/sprites/pipeNorth3.png');
    this.load.image('pipeSouth3', 'assests/sprites/pipeSouth3.png');
    this.load.audio('score', 'assests/sounds/score.mp3');
    this.load.audio('fly', 'assests/sounds/fly.mp3');
    this.load.audio('aftermath', 'assests/sounds/aftermath.mp3');
    this.load.audio('youAreDead', 'assests/sounds/youAreDead.mp3');
    this.load.audio('deadSound', 'assests/sounds/deadSound.mp3');
    this.load.image('bomb', 'assests/sprites/bomb.png');
    this.load.image('scoreTouch', 'assests/sprites/scoreTouch.png');
    this.load.image('scoreTouch1', 'assests/sprites/scoreTouch1.png');
    this.load.image('scoreTouch2', 'assests/sprites/scoreTouch2.png');
    this.load.image('bomb1', 'assests/sprites/bomb1.png');
    this.load.image('bomb2', 'assests/sprites/bomb2.png');
    this.load.image('meteor', 'assests/sprites/meteor.png');
  }

  create() //Initialize the scene (place assests on the screen) - Runs once
  {  
    bird = this.physics.add.sprite(100, 300, 'bird'); //Initialize bird
    bottom=this.physics.add.sprite(500, 700, 'bottom'); //Initialize bottom of screen sprite
    bottom.displayWidth=2000; //resize the width

    meteor = this.physics.add.sprite(1400, 300, 'meteor'); //meteor sprite

    //for all the pipes
    pipeNorth = this.physics.add.sprite(1400, 100, 'pipeNorth');
    pipeSouth = this.physics.add.sprite(1400, 500, 'pipeSouth');

    pipeNorth1 = this.physics.add.sprite(900, 100, 'pipeNorth1');
    pipeSouth1 = this.physics.add.sprite(900, 600, 'pipeSouth1');

    pipeNorth3 = this.physics.add.sprite(500, 50, 'pipeNorth3');
    pipeSouth3 = this.physics.add.sprite(500, 750, 'pipeSouth3');

    //for the invisible sprites that blend in with the background. used to help count score.
    scoreTouch = this.physics.add.sprite(900, 100, 'scoreTouch');
    scoreTouch1 = this.physics.add.sprite(500, 100, 'scoreTouch1');
    scoreTouch2 = this.physics.add.sprite(1400, 100, 'scoreTouch2');

    //initalizes the bombs
    bomb = this.physics.add.sprite(5, 400, 'bomb');
    bomb1 = this.physics.add.sprite(5, 400, 'bomb1');
    bomb2 = this.physics.add.sprite(5, 400, 'bomb2');

    // Use the bottom left corner as the origin
    pipeNorth.setOrigin(0, 1);	
    
    // Use the top left corner as the origin
    pipeSouth.setOrigin(0, 0);	
    
    //initializes the space bar
    spaceBarKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    
    // bird speed
    birdSpeedDown=800;
    birdSpeed=5

    //direction and speed for the pipes, bombs, meteor
    pipeNorth.setVelocityX(-125);
    pipeSouth.setVelocityX(-125);
    pipeNorth1.setVelocityX(-125);
    pipeSouth1.setVelocityX(-125);
    pipeNorth3.setVelocityX(-125);
    pipeSouth3.setVelocityX(-125);
    scoreTouch1.setVelocityX(-125);
    scoreTouch2.setVelocityX(-125);
    scoreTouch.setVelocityX(-125);
    bomb.setVelocityX(-125);
    bomb1.setVelocityX(-125);
    bomb2.setVelocityX(-125);
    meteorSpeed=8;

    //sounds
    fly=this.sound.add('fly');
    score=this.sound.add('score');
    deadSound=this.sound.add('deadSound');
    youAreDead=this.sound.add('youAreDead');
    aftermath=this.sound.add('aftermath');

    //score
    count=0;
    scoreCount=this.add.text(10,10,'Score: 0',
    {fontFamily:'Arial',fontSize:22,color:"#FFFFFF"});

  }
  /**************************************** 
   * REPETITION & SELECTION
  ****************************************/
  update()  //Game logic (movement, etc) - Runs 60/sec
  { 
   //for bird movement 
    if(spaceBarKey.isDown && jumping==false && falling==true){
      jumping=true;
      falling=false;
    }
    if(jumping==true)
    {
      bird.y=bird.y-birdSpeed;
      jumps++;
      if(jumps>1)//change this number to change how high the bird jumps
      {
        jumping=false;
        falling=true;
        jumps=0;
        fly.play();
      }
    }
    if(falling==true)
    {
      bird.y=bird.y+birdSpeed;
    }

    //stops game when bird collides with pipes, bombs, or meteors
    if(this.physics.world.overlap(bird,pipeNorth))
    {
      game.scene.remove("playGame");
      game.scene.start("endScene");
      deadSound.play();
      youAreDead.play();
      theme.pause();
      aftermath.play();
      aftermath.loop=true;
    }
    if(this.physics.world.overlap(bird,pipeSouth))
    {
      game.scene.remove("playGame");
      game.scene.start("endScene");
      deadSound.play();
      youAreDead.play();
      theme.pause();
      aftermath.play();
      aftermath.loop=true;
    }
    if(this.physics.world.overlap(bird,pipeNorth1))
    {
      game.scene.remove("playGame");
      game.scene.start("endScene");
      deadSound.play();
      youAreDead.play();
      theme.pause();
      aftermath.play();
      aftermath.loop=true;
    }
    if(this.physics.world.overlap(bird,pipeNorth3))
    {
      game.scene.remove("playGame");
      game.scene.start("endScene");
      deadSound.play();
      theme.pause();
      aftermath.play();
      aftermath.loop=true;
    }
    if(this.physics.world.overlap(bird,pipeSouth1))
    {
      game.scene.remove("playGame");
      game.scene.start("endScene");
      deadSound.play();
      youAreDead.play();
      theme.pause();
      aftermath.play();
      aftermath.loop=true;
    }
    if(this.physics.world.overlap(bird,pipeSouth3))
    {
      game.scene.remove("playGame");
      game.scene.start("endScene");
      deadSound.play();
      youAreDead.play();
      theme.pause();
      aftermath.play();
      aftermath.loop=true;
    }
    if(this.physics.world.overlap(bird,bomb1))
    {
      game.scene.remove("playGame");
      game.scene.start("endScene");
      deadSound.play();
      youAreDead.play();
      theme.pause();
      aftermath.play();
      aftermath.loop=true;
    }
    if(this.physics.world.overlap(bird,bomb))
    {
      game.scene.remove("playGame");
      game.scene.start("endScene");
      deadSound.play();
      youAreDead.play();
      theme.pause();
      aftermath.play();
      aftermath.loop=true;
    }
    if(this.physics.world.overlap(bird,bomb2))
    {
      game.scene.remove("playGame");
      game.scene.start("endScene");
      deadSound.play();
      youAreDead.play();
      theme.pause();
      aftermath.play();
      aftermath.loop=true;
    }
    if(this.physics.world.overlap(bird,meteor))
    {
      game.scene.remove("playGame");
      game.scene.start("endScene");
      deadSound.play();
      youAreDead.play();
      theme.pause();
      aftermath.play();
      aftermath.loop=true;
    }

    //If pipes, meteor have reached the end of the screen 
    if(pipeNorth.x<0){ 
      pipeNorth.x = 1200;	//Move to the right side
      pipeSouth.x = 1200;	//Move to the right side
      scoreTouch2.x=1200;
      scoreTouch2.y=100;
    }
    if(pipeNorth1.x<0)
    {
      pipeNorth1.x = 2400;	//Move to the right side
      pipeSouth1.x = 2400;	//Move to the right side
      scoreTouch.y=100;
      scoreTouch.x=2400;
      bomb.y=Math.round(Math.random()*300)+1;
      bomb.x=Math.round(Math.random()*300)+1;
      bomb1.y=Math.round(Math.random()*600)+1;
      bomb1.x=Math.round(Math.random()*600)+1;
      bomb2.y=Math.round(Math.random()*600)+1;
      bomb2.x=Math.round(Math.random()*900)+1;
    }
    if(pipeNorth3.x<0)
    {
      pipeNorth3.x = 2000;	//Move to the right side  
      pipeSouth3.x = 2000;	//Move to the right side
      scoreTouch1.y=100;
      scoreTouch1.x=2000;
    }
    meteor.x=meteor.x-meteorSpeed;
    if(meteor.x<100)
    {
      meteor.y=Math.round(Math.random()*500);
      meteor.x=1600;
      meteorSpeed=Math.round(Math.random()*10);
    }

    //stops game if bird touches the ground
    if(this.physics.world.overlap(bird,bottom))
    {
      game.scene.remove("playGame");
      game.scene.start("endScene");
      deadSound.play();
      youAreDead.play();
      theme.pause();
      aftermath.play();
      aftermath.loop=true;
    }

    //keeps track of the score
    if(this.physics.world.overlap(bird,scoreTouch))
    {
      count++;
      scoreTouch.y=-1000;
      score.play();
    }
    if(this.physics.world.overlap(bird,scoreTouch1))
    {
      count++;
      scoreTouch1.y=-1000;
      score.play();
    }
    if(this.physics.world.overlap(bird,scoreTouch2))
    {
      count++;
      scoreTouch2.y=-1000;
      score.play();
    } 
    //shows the score
    scoreCount.text="Score: " + count;
  } 
}

//end game screen
class endScene extends Phaser.Scene {
  constructor (config)
  {
    super(config);
  }
  
  preload()
  {
    this.load.image('gameOver', 'assests/sprites/gameOver.png');
    this.load.image('scorePicture', 'assests/sprites/scorePicture.png');
    this.load.image('play1', 'assests/sprites/play.png');
  }

  create()
  {
    //create all game objects
    gameOver=this.physics.add.sprite(750, 200, 'gameOver');
    scorePicture=this.physics.add.sprite(700,440, 'scorePicture');
    endScoreMessage=this.add.text(685,440,count,{fontFamily:'Arial',fontSize:88,color:"#FEFCAD"});
    scorePicture.displayWidth=170; //resize the scorePicture width
    scorePicture.displayHeight=245; //resize the scorePicture height

    //reload instructions since I was not able to make a button to bring me to the homepage.
    reloadInstructions=this.add.text(350,570, "Press refresh to reload the game." ,{fontFamily:'Arial',fontSize:60,color:"#FEFCAD"}); 
  }

  update()
  {
  }
}
  //end of endScene screen

let gameConfig = {
  width: 1500,   // Width of the game in pixels
  height: 900,  // Height of the game in pixels
  backgroundColor: '#87ceeb', // The background color
  physics: {              //The type of physics engine to use
      default: 'arcade',  //Use simple arcade-style physics engine
      arcade: {
          gravity: {
              y: 0    //Vertical gravity for the whole scene
          }
      }
  },
    audio: { disableWebAudio: true }  // Use HTML5 audio instead of WebAudio
}
game = new Phaser.Game(gameConfig); //Start P
     game.scene.add("startGame", startGame);
     game.scene.add("playGame",playGame);
     game.scene.add("endScene",endScene);
     game.scene.start("startGame");
    //game.scene.start("endScene");