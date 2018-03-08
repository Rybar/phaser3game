class titleScene extends Phaser.Scene{

    constructor(){
        super({key: 'titleScene'});
    }

    preload(){
        this.load.bitmapFont('gem', 'dist/assets/fonts/gem.png', 'dist/assets/fonts/gem.xml')
    }

    create(){

        window.textWave = 0;
        this.exiting = false;

        //we're generating our graphics on the fly here
        //using Phaser's graphics object, which works similar to a 2d canvas context. 
        var scratchSheet = this.make.graphics({x: 0, y: 0, add: false});
        //make a screen-sized green box, a placeholder for the title screen
        this.drawBox({
            graphics: scratchSheet, x: 0, y:0, w:WIDTH, h:HEIGHT, color: 0x008800
        })
        scratchSheet.generateTexture('titleSplash', WIDTH,HEIGHT);
        this.add.image(WIDTH/2,HEIGHT/2, 'titleSplash');

        var text = this.add.dynamicBitmapText(16*1.25,(90-32)*1.25, 'gem', 'PROTOGAME', 64*1.25);
        var text2 = this.add.bitmapText(120*1.25,150*1.25,'gem','Click to start', 16);
        text.setDisplayCallback(this.waveText);
        //
        this.input.once('pointerdown', function(){
            this.cameras.main.fade(250);
            var that = this;
            setTimeout(function(){that.scene.start('gameScene')}, 250)
        }, this )
    }

    update(){
        
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

}

export default titleScene