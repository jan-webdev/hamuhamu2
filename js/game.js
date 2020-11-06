let fruits = [];

let score = 0;
// let seeds;
// let enemies;

class Game {
  constructor() {
   this.enemies = [];
  }
  preloadGame() {
    console.log("this is the game preload");
    this.playerImage = loadImage("./assets/player/bb8.gif");
    this.coinImage = loadImage("./assets/coins/tile000.png");
    this.goldhamsterImage = loadImage("./assets/goldhamster.jpg");
    this.backgroundImage = loadImage("./assets/farm3.png");
    this.seedImage = loadImage("./assets/seed-50x50.png");
    this.foxImage = loadImage("./assets/fox-50x50.png");
    this.hamsterImage50 = loadImage("./assets/hamster-gray-50.png");
  }
  setupGame() {
    console.log("this is the game setup");
    //  initialize background + player here
    // NB: we DON'T initialize the coins here because we create them dynamically in the draw
    // this.background = new Background(this.backgroundImages);
    this.player = new Player(this.playerImage);
    // this.background = this.farmImage;
    this.obstacles = [];
    let hamster = createSprite(width / 2, height / 2, 50, 50);
    this.hamster = hamster;
    this.hamster.addImage(this.hamsterImage50);
    this.hamster.height = 50;
    this.hamster.width = 50;
    this.hamster.area = (this.hamster.height * this.hamster.width);
    this.hamster.areaSqrt = Math.sqrt(this.hamster.area)
this.winning = false;
  }

  drawGame() {
    // console.log("this is the game draw");
    background(this.backgroundImage); //!
    if (frameCount % 4 === 0) {
      this.checkSeeds();
      // this.checkEnemies();
    }
    // this.player.drawPlayer();
    if (frameCount % 100 === 0) {
      // console.log("this will be the push event");
      // this.obstacles.push(new Obstacle(this.coinImage));
      this.makeSeeds();
    }
    if (frameCount % 120 === 0) {
      this.makeEnemies();
    }

    // this.obstacles.forEach(function (obstacle) {
    //   obstacle.drawObstacle();
    // });
    //  call the draw functions for the player + the background
    // this.obstacles = this.obstacles.filter((obstacle) => {
    //   if (obstacle.collision(this.player) || obstacle.x < 0) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // });

    // * SCORE * //
    score = this.hamster.width - 44; //tba -50 instead of 44
    strokeWeight(0);
    fill("#233C2B");
    rect(12, 12, 200, 50, 10, 10, 10, 10);
    fill(255, 255, 255);
    textSize(25);
    text(`Nom-Score: ${score}`, 20, 45);
  
    // * Ende Score * ///

  
  } // End of game.draw()
  makeSeeds() {
    console.log("this would be a seed")
    if (fruits.length < 9) {
      let fruit = createSprite(Math.round(random(width)), Math.round(random(height)), 50, 50);
      fruit.bonus = 22;
      fruit.addImage(this.seedImage);
      fruits.push(fruit);
      // fruits.push()(createSprite(mouseX, mouseY, 30, 30)); 
    }
  } //end makeSeeds()
  makeEnemies() {
    // console.log("this would be a seed")
    if (this.enemies.length < 4) {
      // let randomFoxSize =  Math.round(random(150,250));
      // console.log("randomFoxSize A", randomFoxSize);
      let enemy = createSprite(Math.round(random(width)), Math.round(random(height)), 150,150);
      enemy.addImage(this.foxImage);
      // console.log("randomFoxSize B", randomFoxSize);
      enemy.height = 150;
      enemy.width = 150;
      // this.foxImage.resize(randomFoxSize,randomFoxSize); 
      this.enemies.push(enemy);
      // if (this.enemies.length > 4) {
      //   console.log("enemies.length:", this.enemies.length);
      //   this.enemies.splice(-1,1);
      //   console.log("enemies.length after splice:", this.enemies.length);
        console.log("array after splice:", this.enemies);
        // enemy.remove // let's try this
    }
    // this.enemies.push(enemy);// let's try this
      // fruits.push()(createSprite(mouseX, mouseY, 30, 30)); 
    // }
  } //end makeSeeds()

  checkSeeds() {
    fruits = fruits.filter((element) => {
      // fruits.forEach((element) => {
      // console.log("this is the checkSeed", element)
      if (this.hamster.collide(element)) {
        console.log("it's collided");
        // adjust hamster size
        // tbd: put in external function
        let areaSqrt = (Math.round(Math.sqrt((element.width * element.height) + (this.hamster.width * this.hamster.height))));
        this.hamster.height = areaSqrt;
        this.hamster.width = this.hamster.height;
        this.hamsterImage50.resize(this.hamster.height, this.hamster.width)
        console.log("new area sqrt", areaSqrt);
        element.remove();
        return false;

      } else {
        console.log("it didn't collide");
        return true;
      }
      // }) // end fruits.end forEach
    })
  } // end check checkSeeds()

  // checkEnemies() {

    // console.log("randomFoxSize checkEnemies", this.randomFoxSize);
    // enemies = enemies.filter((element) => {
    //   // fruits.forEach((element) => {
    //   console.log("this is the checkSeed", element)
    //   if (this.hamster.collide(element)) {
    //     console.log("hamster collided with enemy");
    //     // if hamster < fox
    //     if (this.hamster.height < element.height) {
    //       console.log("The hamster was too tiny!")
    //       this.lose();
    //       return true;
    //     } else if (this.hamster.height >= element.height) {
    //       console.log("The hamster will eat you now!");
    //               // compareSize(this,hamster, element);
    //       // let areaSqrt = (Math.round(Math.sqrt((element.width * element.height) + (this.hamster.width * this.hamster.height))));
    //       // this.hamster.height = areaSqrt;
    //       // this.hamster.width = this.hamster.height;
    //       // this.hamsterImage50.resize(this.hamster.height, this.hamster.width)
    //       // console.log("new area sqrt", areaSqrt);
    //       element.remove();
    //       return false;
    //     } else {
    //       console.log(this.hamster.height);
    //       console.log(element.height);
    //       console.log("This shouldn't happen in the fox/hamster collision")
    //       return true;
    //     }


    //   } else {
    //     console.log("it didn't collide");
    //     return true;
    //   }
    //   // }) // end enemies.end forEach
    // })
  // } // end check checkEnemies()

  // * WIN & LOSE*
  // tbd: add pop-up
  // win () {
  //   if (this.hamster.width > 400) {
  //   console.log("You've won! Go on and nom some more!"); 
  //   }
  // }
  lose() {
    // if (hamster collided with enemy)
    console.log("Oh noes, that was scaryy! And so close! You run away and leave all your seeds behind.")
  }
} // end of draw



// // !!! 
// tbd: put this all into a filter 
// checkSeeds() {
//   fruits.forEach((element) => {
//     console.log(element);
//   //   if (this.hamster.collide(element)) {
//   //     return false;
//   //   } else {
//   //     console.log("it collided");
//   //     score += 10;
//   //     // tbd: increase hamster size
//   //     // game.hamster.width+= Math.sqrt(element.width*element.height+this.hamster.width*this.hamster.height)
//   //     consolelog("updated score", score);
//   //     return true; 
//   //   }
//   }
//   )
// }

// //if no image or animation is associated it will be a rectancle of the specified size
// //and a random color

// //now you can use the variable to set properties
// //e.g. a random velocity on the x and y coordinates
// // s.velocity.x = random(-5, 5);
// // s.velocity.y = random(-5, 5);
// console.log("fruits Array now", fruits);
// }

// * WIN & LOSE * //
// tbd: add pop-up
// win () {
//   if (this.hamster.width > 400) {
//   console.log("You've won! Go on and nom some more!"); 
//   }
// }
// loose () {
//   if (hamster collided with enemy)
//   console.log("Oh noes, that was scaryy! And so close! You run away and leave all your seeds behind.")
// }

// falls was kaputt geht nochmal der loop. er muss ausserhalb der draw! 
// checkSeeds() {
//   fruits.forEach((element) => {
//     console.log("this is the checkSeed", element)
//     if (this.hamster.collide(element)) {
//       console.log("it's collided")
//     }
//     else {
//       console.log("it didn't collide");
//     }

//   }

//   )
// }