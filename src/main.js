import phaser from '../../phaser/build/phaser' ///Users/ryanmalm/Sites/dev/phaser/build/phaser.js
import titleScene from './titleScene'
import gameScene from './gameScene'


let config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: (1280/3)|0,
    height: (720/3)|0,
    resolution: 1,
    zoom: 3,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 700 },
            debug: false
        }
    },
    scene: [
      titleScene,
      gameScene
    ]
};
window.WIDTH = config.width;
window.HEIGHT = config.height;
console.log(config.width)
let game = new Phaser.Game(config);
