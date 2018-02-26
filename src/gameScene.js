class gameScene extends Phaser.Scene{

    constructor(){
        super({key: 'gameScene'});
    }

    preload(){

    }

    create(){
        window.WIDTH = 320;
        window.HEIGHT = 180;
        window.W_WIDTH = 50;
        window.W_HEIGHT = 50;
        this.cameras.main.flash(500, 0,0,0); //fade in from black.

        //creates keyboard keys for left, right, up, down, shift and space
        this.controls = this.input.keyboard.createCursorKeys();

        //so things won't fall out of the world
        this.physics.world.setBounds(0,0, WIDTH*W_WIDTH, HEIGHT*W_HEIGHT)
        
        //we're generating our graphics on the fly here
        //using Phaser's graphics object, which works similar to a 2d canvas context. 
        var scratchSheet = this.make.graphics({x: 0, y: 0, add: false});

        //particles--------
        this.drawBox({
            graphics: scratchSheet,
            x: 0, y: 0, w: 5, h: 5, color: 0x112211 
        })
        scratchSheet.generateTexture('particle', 5, 5);
        var particles = this.add.particles('particle');
        var emitter = particles.createEmitter({
            speed: { min: -40, max: 40 },
            y: {min: -8, max: 8},
            alpha: {start: .7, end: 0},
            gravity: { x: 0, y: 200 },
            scale: { start: 1, end: 3 },
            quantity: 4,
            lifespan: 500,
            blendMode: 'ADD'
        });

        //background generation
        this.drawCircle({
            graphics: scratchSheet,
            x: 200, y: 200, r: 200, color: 0x888888 
        });
        scratchSheet.generateTexture('bgBox', 400,400);
        for(let i = 0; i < 25600; i++){
            var scale = Math.random()*.5;
            var bgBox = this.add.image( (Math.random()*WIDTH*W_WIDTH)|0, (Math.random()*HEIGHT*W_HEIGHT)|0, 'bgBox')
            .setScale(scale, scale);
            bgBox.alphaBottomLeft = Math.random()*.3;
            bgBox.alphaBottomRight = Math.random()*.3;
            bgBox.alphaTopLeft = Math.random()*.3;
            bgBox.alphaTopRight = Math.random()*.3;
            bgBox.tintTopRight = Math.random()*16000000;
            bgBox.tintTopLeft = Math.random()*16000000;
            bgBox.tintBottomRight = Math.random()*16000000;
            bgBox.tintBottomLeft = Math.random()*16000000;
            bgBox.scrollFactorX = bgBox.scrollFactorY = .8 - Math.random()*.3;
            //bgBox.angle = Math.random()*360;
        }

        //player box generation-----------------
        this.drawBox({
            graphics: scratchSheet,
            x: 0, y: 0, w: 8, h: 16, color: 0xAAAAAA 
        });
        //now we create a texture key
        scratchSheet.generateTexture('box', 8, 16);
        //and use it to make an image object, add it to the game world
        this.box = this.physics.add.image(160, 90, 'box').setInteractive();
        this.box.setBounce(.4).setCollideWorldBounds(true);
        //this.box.alphaBottomRight = .2;
        this.box.tintTopRight = 0x00FF00; //yellow
        this.box.tintTopLeft = 0xFFFF00;  //green  
        this.box.tintBottomRight = 0x0000FF;  //blue 
        this.box.tintBottomLeft = 0xFF0000;  //red  

        this.cameras.main.startFollow(this.box).setBounds(0,0,WIDTH*W_WIDTH,HEIGHT*W_HEIGHT);
        


        //platforms
        this.platforms = this.physics.add.staticGroup();
        this.drawBox({
            graphics: scratchSheet,
            x: 0, y: 0, w: WIDTH, h: 10, color: 0x444488 
        });
        scratchSheet.generateTexture('floor', WIDTH, 10);
        this.platforms.create(160, HEIGHT-10, 'floor').setBlendMode('ADD');

        for(let i = 0; i < 1200; i++){
            var platform = this.platforms.create(Math.random()*WIDTH*W_WIDTH, Math.random()*HEIGHT*W_HEIGHT, 'floor')
            .setScale(.4 + Math.random() * .2, 1)
            .refreshBody().setBlendMode('ADD');
            
        }

        //collide player with platforms
        this.physics.add.collider(this.box, this.platforms);


        // this.debugText = this.add.text(10,10, ' ', { fontSize: '10px', fill: '#fff'})
        // this.debugText.scrollFactorX = this.debugText.scrollFactorY = 0;

        emitter.startFollow(this.box);

        
    }

    update(){
        
        this.box.on('pointerdown', function() {
            this.setTint(Math.random() * 16000000);
        })
        if(this.box.body.touching.down || this.box.body.blocked.down || this.box.body.velocity.y > 0)this.box.canJump = true;
        if(this.controls.up.isDown && this.box.canJump){
            this.box.setVelocity(0, -350);
            this.box.canJump = false;
        }
        if(this.controls.left.isDown){
            this.box.setVelocityX(-100);
        }
        else if(this.controls.right.isDown){
            this.box.setVelocityX(100);
        }
        else this.box.body.velocity.x *= 0.8;

        //this.debugText.setText('' + this.box.body.touching.down)

        this.box.setScale( 1 + this.box.body.velocity.y/600 * .5, 1 - this.box.body.velocity.y/600 * .5  ) 
    }

    drawBox(cfg){
        cfg.graphics.fillStyle(cfg.color, 1);
        cfg.graphics.fillRect(cfg.x, cfg.y, cfg.w, cfg.h);
    }

    drawCircle(cfg){
        cfg.graphics.fillStyle(cfg.color, 1);
        cfg.graphics.fillCircle(cfg.x, cfg.y, cfg.r);
    }

}

export default gameScene