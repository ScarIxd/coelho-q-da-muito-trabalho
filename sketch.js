const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;

var bg_img;
var food;
var rabbit;
var rabbit2;
var button;
var blink, eat, sad;
var bg_sound, cut_sound, sad_sound, eating_sound, air_sound;
var mute2 ,soprador;
var button2 , button3;
var rope2 , rope3 ; 
var fruit_con2 , fruit_con3 ; 



function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");

  bg_sound = loadSound("sound1.mp3");
  cut_sound = loadSound("rope_cut.mp3");
  sad_sound = loadSound("sad.wav");
  eating_sound = loadSound("eating_sound.mp3");
  air_sound = loadSound("air.wav");


  blink.playing = true;
  eat.playing = false;
  eat.looping = 0;
  sad.playing = 1;
  sad.looping = 0;
}


function setup() 
{

  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); 
  if(isMobile){ 
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(canW,canH); } 
    else{ 
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(canW,canH); }

  //createCanvas(500,700);
  frameRate(80);

  bg_sound.play();
  bg_sound.setVolume(0);


  button = createImg("cut_button.png");
  button.position(230,30);
  button.size(50,50);
  button.mouseClicked(cut);


  button2 = createImg("cut_button.png");
  button2.position(345,235);
  button2.size(50,50);
  button2.mouseClicked(cut2);
  
  
  button3 = createImg("cut_button.png");
  button3.position(80,30);
  button3.size(50,50);
  button3.mouseClicked(cut3);

  

  mute2 = createImg("mute.png");
  mute2.position(440,10);
  mute2.size(50,50);
  mute2.mouseClicked(mute);

  soprador = createImg("balloon.png");
  soprador.position(50,220);
  soprador.size(70,70);
  soprador.mouseClicked(soprar);


  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  rabbit2 = createSprite(250,canH - 130 ,300,300);
  rabbit2.addAnimation("piscando", blink);
  rabbit2.addAnimation("comendo", eat);
  rabbit2.addAnimation("triste", sad);
  
  rabbit2.scale = 0.3;

  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,canH - 1,600,20);

  rope = new Rope(6,{x:245,y:30});
  rope2 = new Rope(7,{x:370,y:235});
  rope3 = new Rope(7,{x:80,y:30});
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit);
  fruit_con3 = new Link(rope3,fruit);


  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);

  image(bg_img,canW/2,canH/2,canW,canH);

  rope.show();
  rope2.show();
  Engine.update(engine);
  rope3.show();



  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
    }
    rope.show();
    Engine.update(engine);
  
    if(collision(fruit,rabbit2) == true  ){
      rabbit2.changeAnimation('comendo');
      eating_sound.play();
    }
    
    if(fruit!=null && fruit.position.y  >= canH - 50  ){
      sad_sound.setVolume(0.001)
      rabbit2.changeAnimation('triste')
      sad_sound.play();
      
    }  

    
  drawSprites();

}

function cut(){
  rope.break();
  fruit_con.detach();

}

function cut2(){
  rope2.break();
  fruit_con2.detach();

}

function cut3(){
  rope3.break();
  fruit_con3.detach();

}


function mute(){
  if(bg_sound.isPlaying()){
    bg_sound.stop()
  }
  else {
    bg_sound.play()
  }




}

function soprar() {

  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.05,y:0});

}

function collision(body,sprite){
  if(body!=null){
    var distance=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(distance <= 75){
      World.remove(world,fruit);
      fruit = null
      return true
    }
      else {
        return false
      }
      
    }

  }
  