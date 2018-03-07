import phaser from '../../phaser/build/phaser' ///Users/ryanmalm/Sites/dev/phaser/build/phaser.js
import titleScene from './titleScene'
import gameScene from './gameScene'


let config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 320,
    height: 180,
    resolution: 1,
    zoom: 4,
    pixelArt: true,
    scaleMode: 1, //nearest neighbor
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 700 },
            debug: true
        }
    },
    scene: [
      titleScene,
      gameScene
    ]
};

let game = new Phaser.Game(config);
