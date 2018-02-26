class titleScene extends Phaser.Scene{

    constructor(){
        super({key: 'titleScene'});
    }

    preload(){
        this.load.bitmapFont('gem', '../assets/fonts/gem.png', '../assets/fonts/gem.xml')
    }

    create(){

        window.textWave = 0;
        this.exiting = false;

        //we're generating our graphics on the fly here
        //using Phaser's graphics object, which works similar to a 2d canvas context. 
        var scratchSheet = this.make.graphics({x: 0, y: 0, add: false});
        //make a screen-sized green box, a placeholder for the title screen
        this.drawBox({
            graphics: scratchSheet, x: 0, y:0, w:320, h:180, color: 0x008800
        })
        scratchSheet.generateTexture('titleSplash', 320,180);
        this.add.image(160,90, 'titleSplash');

        var text = this.add.dynamicBitmapText(8,90-32, 'gem', 'PROTOGAME', 64);
        var text2 = this.add.bitmapText(100,150,'gem','Click to start', 16);
        text.setDisplayCallback(this.waveText);
        //
        this.input.once('pointerdown', function(){
            this.cameras.main.fade(250);
            var that = this;
            setTimeout(function(){that.scene.start('gameScene')}, 250)
        }, this )
    }

    update(){
        //is there a better way to do this?
    //    if(this.cameras.main._fadeAlpha == 1.0){
    //        this.scene.start('gameScene');
    //    }     
    }

    drawBox(cfg){
        cfg.graphics.fillStyle(cfg.color, 1);
        cfg.graphics.fillRect(cfg.x, cfg.y, cfg.w, cfg.h);
    }

    waveText(data){
        data.y = Math.cos(data.index + textWave) * 6;
        textWave += .007
        return data;
    }

     transition(scene, key){
        
     }

}

export default titleScene