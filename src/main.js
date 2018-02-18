import phaser from '../../phaser/dist/phaser'
import titleScene from './titleScene'


let config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 800,
    height: 480,
    resolution: 1,
    pixelArt: true,
    scaleMode: 1, //nearest neighbor
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: true
        }
    },
    scene: [
      titleScene
    ]
};

let game = new Phaser.Game(config);
