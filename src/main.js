import phaser from '../../phaser/dist/phaser'
import titleScene from './titleScene'


let config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 800,
    height: 480,
    resolution: 1,
    zoom: 2,
    pixelArt: true,
    scaleMode: 1, //nearest neighbor
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 900 },
            debug: true
        }
    },
    scene: [
      titleScene
    ]
};

let game = new Phaser.Game(config);
