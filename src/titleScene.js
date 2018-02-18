class titleScene extends Phaser.Scene{

    constructor(config){
        super(config);
    }

    preload(){

    }

    create(){
        //creates keyboard keys for left, right, up, down, shift and space
        this.controls = this.input.keyboard.createCursorKeys();

        //so things won't fall out of the world
        this.physics.world.setBounds(0,0, 800*5, 480*5)
        
        //we're generating our graphics on the fly here
        //using Phaser's graphics object, which works similar to a 2d canvas context. 
        var scratchSheet = this.make.graphics({x: 0, y: 0, add: false});

        //background generation
        this.drawBox({
            graphics: scratchSheet,
            x: 0, y: 0, w: 200, h: 200, color: 0x888888 
        });
        scratchSheet.generateTexture('bgBox', 200,200);
        for(let i = 0; i < 1600; i++){
            var bgBox = this.add.image( (Math.random()*800*5)|0, (Math.random()*480*5)|0, 'bgBox')
            .setScale(Math.random(), Math.random());;
            bgBox.alphaBottomLeft = Math.random()*.5;
            bgBox.alphaBottomRight = Math.random()*.5;
            bgBox.alphaTopLeft = Math.random()*.5;
            bgBox.alphaTopRight = Math.random()*.5;
            bgBox.tintTopRight = Math.random()*16000000;
            bgBox.tintTopLeft = Math.random()*16000000;
            bgBox.tintBottomRight = Math.random()*16000000;
            bgBox.tintBottomLeft = Math.random()*16000000;
            //bgBox.angle = Math.random()*360;
        }

        //player box generation-----------------
        this.drawBox({
            graphics: scratchSheet,
            x: 0, y: 0, w: 800, h: 600, color: 0xff0000 
        });
        //now we create a texture key
        scratchSheet.generateTexture('box', 16, 32);
        //and use it to make an image object, add it to the game world
        this.box = this.physics.add.image(400, 300, 'box').setInteractive();
        this.box.setBounce(.4).setCollideWorldBounds(true);
        this.box.alphaBottomLeft = .5;
        this.cameras.main.startFollow(this.box);

        //platforms
        this.platforms = this.physics.add.staticGroup();
        this.drawBox({
            graphics: scratchSheet,
            x: 0, y: 0, w: 800, h: 20, color: 0x000088 
        });
        scratchSheet.generateTexture('floor', 800, 20);
        this.platforms.create(400, 480-20, 'floor');

        for(let i = 0; i < 100; i++){
            this.platforms.create(Math.random()*800*5, 480+Math.random()*480*4, 'floor')
            .setScale(.2 * Math.random(), 1)
            .refreshBody();
        }

        //collide player with platforms
        this.physics.add.collider(this.box, this.platforms);


        this.debugText = this.add.text(10,10, 'velocity y: ' + this.box.body.velocity.y, { fontSize: '10px', fill: '#fff'});


    }

    update(){
        
        this.box.on('pointerdown', function() {
            this.setTint(Math.random() * 16000000);
        })
        if(this.box.body.touching.down || this.box.body.blocked.down)this.box.canJump = true;
        if(this.controls.up.isDown && this.box.canJump){
            this.box.setVelocity(0, -550);
            this.box.canJump = false;
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