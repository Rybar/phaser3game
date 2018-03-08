import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from "constants";

class gameScene extends Phaser.Scene{

    constructor(){
        super({key: 'gameScene'});
    }

    preload(){

    }

    create(){
        window.WIDTH = 320;
        window.HEIGHT = 180;
        window.W_WIDTH = 14;
        window.W_HEIGHT = 50;
        window.iter = 0;
        this.cameras.main.flash(500, 0,0,0); //fade in from black.

        //creates keyboard keys for left, right, up, down, shift and space
        this.controls = this.input.keyboard.createCursorKeys();

        //so things won't fall out of the world
        this.physics.world.setBounds(0,0, WIDTH*W_WIDTH, HEIGHT*W_HEIGHT)
        
        //we're generating our graphics on the fly here
        //using Phaser's graphics object, which works similar to a 2d canvas context. 
        var scratchSheet = this.make.graphics({x: 0, y: 0, add: false});

        //particles texture
        this.drawBox({
            graphics: scratchSheet,
            x: 0, y: 0, w: 5, h: 5, color: 0x112211 
        })
        //setup particles here for draw order, we want them to draw behind the player   
        scratchSheet.generateTexture('particle', 5, 5);
        var particles = this.add.particles('particle');
        
        var emitter = particles.createEmitter({
            speed: { min: -2, max: 2 },
            y: {min: -8, max: 8},
            alpha: {start: .5, end: 0},
            gravity: { x: 0, y: 200 },
            scale: { start: 1.5, end: 0 },
            quantity: 2,
            lifespan: 500,
            blendMode: 'ADD'
        });

        //circles background generation
        this.drawCircle({
            graphics: scratchSheet,
            x: 200, y: 200, r: 200, color: 0xEEEEEE 
        });
        scratchSheet.generateTexture('bgBox', 400,400);
        for(let i = 0; i < 10000; i++){
            var scale = Math.random()*.4;
            var bgBox = this.add.image( (Math.random()*WIDTH*W_WIDTH)|0, (Math.random()*HEIGHT*W_HEIGHT)|0, 'bgBox')
            .setScale(scale, scale);
            bgBox.alphaBottomLeft = Math.random()*.3;
            bgBox.alphaBottomRight = Math.random()*.3;
            bgBox.alphaTopLeft = Math.random()*.8;
            bgBox.alphaTopRight = Math.random()*.8;
            bgBox.tintTopRight = Math.random()*16000000;
            bgBox.tintTopLeft = Math.random()*16000000;
            bgBox.tintBottomRight = Math.random()*16000000;
            bgBox.tintBottomLeft = Math.random()*16000000;
            bgBox.scrollFactorX = bgBox.scrollFactorY = .8 - scale;
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
        this.box = this.physics.add.image(WIDTH*W_WIDTH/2, W_HEIGHT*HEIGHT-HEIGHT, 'box').setInteractive();
        //a bit of bounce feels good
        this.box.setBounce(.3).setCollideWorldBounds(true);

        //playing around with individual tint corners, just for kicks
        this.box.tintTopRight = 0x00FF00; //yellow
        this.box.tintTopLeft = 0xFFFF00;  //green  
        this.box.tintBottomRight = 0x0000FF;  //blue 
        this.box.tintBottomLeft = 0xFF0000;  //red  

        this.cameras.main.startFollow(this.box).setBounds(0,0,WIDTH*W_WIDTH,HEIGHT*W_HEIGHT);
        
        //platforms
        this.platforms = this.physics.add.staticGroup();
        for(let i = 0; i <=18000; i++){
            this.drawBox({
                graphics: scratchSheet,
            x: Math.random()*100|0, y: Math.random()*100|0, w: 1, h: 1, color: Math.random()*16000000
            })
        }
        
        scratchSheet.generateTexture('floor', 99, 99);
        
        for(let i = 0; i < 2000; i++){
            let bodyWidth = ((3 + Math.random()*7)|0)*9 + 1;
            var platform = this.add.tileSprite(
                Math.random()*WIDTH*W_WIDTH,
                Math.random()*HEIGHT*W_HEIGHT,
                bodyWidth, 10, 'floor')
                .setBlendMode('ADD')
            //gradient to transparent by setting bottom two corners
                .setAlpha(1,0,0,1)

            this.physics.world.enable(platform, 1);
            platform.body.width = bodyWidth;
            platform.body.height = 10;
            platform.tintTopLeft = 0x0088ff;
            platform.tintBottomRight = 0x0088ff;
            platform.tintBottomLeft = 0x0000ff;
            platform.tintTopRight = 0x0000ff;
        //so all platforms behave as 'cloud' platforms
            platform.body.checkCollision.down = false;
            this.platforms.add(platform);
            
        }

    //collide player with platforms
        this.physics.add.collider(this.box, this.platforms);

    //we init the emitter above and set after for draw order.
        emitter.startFollow(this.box);        

        console.log(this.platforms.children.entries[0])
    }

    update(){
        //

        let slabs = this.platforms.getChildren();
        for(let i = 0; i < slabs.length; i++){
            slabs[i].tilePositionY += .25;
        }
        
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