//variables defined
let direction={x:0,y:0};
const foodSound=new Audio('food.mp3');
const gameoverSound=new Audio('gameover.mp3');
const moveSound=new Audio('move.mp3');
const musicSound=new Audio('bg.mp3');
let speed=6;
let score=0;
let lastPaintTime=0;
let snakeAr=[
    {x:13,y:15}
];
let food={x:6,y:7};
const screen = document.getElementById("screen");

function main(currtime){
    window.requestAnimationFrame(main);
    //console.log(currtime);
    if((currtime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=currtime;
    gameEngine();
    }

    function isCollide(snake) {
        //if the snake touches itself
        for (let i=1; i<snakeAr.length; i++){
            if(snake[i].x==snake[0].x && snake[i].y==snake[0].y){
                return true;
            }       
        }
        //snake hits the wall
        if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
            return true;
        }
    }

function gameEngine(){    
        if(isCollide(snakeAr)){
            gameoverSound.play();
            musicSound.pause();
            direction={x:0,y:0};
            alert("Game is up!!.Press any key to play again");
            snakeAr=[{x:13,y:15}];
            musicSound.play(); 
            score=0;
        }
      //if the food is eaten ,increment the score and generate the food
       if(snakeAr[0].y == food.y && snakeAr[0].x == food.x){
        foodSound.play();
        score+=5;
        if(score> hiscoreval){
            hiscoreval= score;
            localStorage.setItem('hiscore',JSON.stringify(hiscoreval));
            highscore.innerHTML="Highscore: "+hiscoreval;
        }
        scorecard.innerHTML="Your Score: "+score;
        snakeAr.unshift({x:snakeAr[0].x + direction.x,y:snakeAr[0].y + direction.y});
       let a=2;
       let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
       }
      
       //moving the snake
       for (let i = snakeAr.length-2; i>=0; i--) {
        const element = snakeAr[i];
        snakeAr[i+1]= {...snakeAr[i]};
       }

       snakeAr[0].x += direction.x;
       snakeAr[0].y += direction.y;

       //display food and snake
       //display snake
        screen.innerHTML="";
        snakeAr.forEach((e,index) =>{
                snakeElement=document.createElement("div");
                snakeElement.style.gridRowStart= e.y;
                snakeElement.style.gridColumnStart= e.x;
                
                if(index==0){
                    snakeElement.classList.add("head");
                }
                else{
                snakeElement.classList.add('snake');
                }
                screen.appendChild(snakeElement);
        });
        //display food
        foodElement=document.createElement("div");
        foodElement.style.gridRowStart= food.y;
        foodElement.style.gridColumnStart= food.x;
        foodElement.classList.add("food");
        screen.appendChild(foodElement);
    }

    //main logic
    musicSound.play();
    let hiscore=localStorage.getItem('hiscore');
    if(hiscore==null){
        hiscoreval= 0;
        localStorage.setItem('hiscore',JSON.stringify(hiscoreval));
    }
    else{
        hiscoreval= JSON.parse(hiscore);
        highscore.innerHTML='Highscore: '+hiscore;
    }

window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
        direction={x:0,y:1} //start the game
        moveSound.play();
        musicSound.play();
        switch (e.key) {
            case 'ArrowUp':
                console.log('ArrowUp');
                direction.x=0;
                direction.y=-1;
                break;
            case 'ArrowDown':
                console.log('ArrowDown');
                direction.x=0;
                direction.y=1;
                break;
            case 'ArrowLeft':
                console.log('ArrowLeft');
                direction.x=-1;
                direction.y=0;
                break;
            case 'ArrowRight':
                console.log('ArrowRight');
                direction.x=1;
                direction.y=0;
                break;
            default:
                break;
        }
});