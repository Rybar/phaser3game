class titleScene extends Phaser.Scene{

    constructor(config){
        super(config);
    }

    preload(){

    }

    create(){
        //creates keyboard keys for left, right, up, down, shift and space
        this.controls = this.input.keyboard.createCursorKeys();

        //so things won't fall out of the world, bounds set to screen
        this.physics.world.setBounds(0,0, 800, 480)
        
        //player red box generation; we're generating a sprite on the fly here
        //using Phaser's graphics object, which works similar to a 2d canvas context. 
        var boxGraphics = this.make.graphics({x: 0, y: 0, add: false});
        this.drawBox({
            graphics: boxGraphics,
            x: 0, y: 0, w: 800, h: 600, color: 0xff0000 
        });
        //now we create a texture key
        boxGraphics.generateTexture('box', 64, 64);
        //and add it to the gameworld
        this.box = this.physics.add.sprite(400, 300, 'box').setInteractive();
        this.box.setBounce(.4).setCollideWorldBounds(true);
        this.box.alphaBottomLeft = .5;

        //platforms
        this.platforms = this.physics.add.staticGroup();
        boxGraphics.generateTexture('floor', 800, 20);
        this.platforms.create(400, 480-20, 'floor');

        //collide player with platforms
        this.physics.add.collider(this.box, this.platforms);

        this.debugText = this.add.text(10,10, 'velocity y: ' + this.box.body.velocity.y, { fontSize: '10px', fill: '#fff'});


    }

    update(){
        //this.box.angle += 1;
        this.box.on('pointerdown', function() {
            this.setTint(Math.random() * 16000000);
        })

        if(this.controls.up.isDown && this.box.body.touching){
            this.box.setVelocity(0, -350);
        }
        if(this.controls.left.isDown){
            this.box.setVelocityX(-200);
        }
        else if(this.controls.right.isDown){
            this.box.setVelocityX(200);
        }
        else this.box.body.velocity.x *= 0.8;

        this.debugText.setText('' + this.box.body.touching.down)
    }

    drawBox(cfg){
        cfg.graphics.fillStyle(cfg.color, 1);
        cfg.graphics.fillRect(cfg.x, cfg.y, cfg.w, cfg.h);
    }

}

export default titleScene