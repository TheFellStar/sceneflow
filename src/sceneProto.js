let pmenu;
let paused = 0;

class Menu extends Phaser.Scene{
    constructor(){
        super('menu');
    }
    preload(){

    }
    create(){
        this.title = this.add.text(-500, 50, "Game Title").setFontSize(100);
        this.start = this.add.text(-300, 500, "Start", {color: '#ffffff'}).setFontSize(50);
        this.start.setInteractive();
        this.resume = this.add.text(-375, 575, "Resume").setFontSize(50);
        this.resume.setInteractive();
        this.options = this.add.text(-450, 650, "Options").setFontSize(50);
        this.options.setInteractive();
        this.exit = this.add.text(-525, 725, "Credits").setFontSize(50);
        this.exit.setInteractive();

        this.tweens.add({
            targets: this.title,
            x:50,
            y:50,
            duration:200,
            ease: 'Linear',
        })

        this.time.delayedCall(200, () => {
            this.tweens.add({
                targets: this.start,
                x:300,
                y:500,
                duration:200,
                ease: 'Linear',
            })
            this.tweens.add({
                targets: this.resume,
                x:375,
                y:575,
                duration:200,
                ease: 'Linear',
            })
            this.tweens.add({
                targets: this.options,
                x:450,
                y:650,
                duration:200,
                ease: 'Linear',
            })
            this.tweens.add({
                targets: this.exit,
                x:525,
                y:725,
                duration:200,
                ease: 'Linear',
            })
        })

        this.start.on('pointerover', () =>{
            this.resume.setColor('#ffffff');
            this.start.setColor('#0000ff');
            this.options.setColor('#ffffff');
            this.exit.setColor('#ffffff');
        })
        this.resume.on('pointerover', () => {
            this.resume.setColor('#0000ff');
            this.start.setColor('#ffffff');
            this.options.setColor('#ffffff');
            this.exit.setColor('#ffffff');
        })
        this.options.on('pointerover', () => {
            this.resume.setColor('#ffffff');
            this.start.setColor('#ffffff');
            this.options.setColor('#0000ff');
            this.exit.setColor('#ffffff');
        })
        this.exit.on('pointerover', () => {
            this.resume.setColor('#ffffff');
            this.start.setColor('#ffffff');
            this.options.setColor('#ffffff');
            this.exit.setColor('#0000ff');
        })
        this.start.on('pointerdown', () => {
            this.cameras.main.fadeOut(1000,0,0,0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) =>{
                this.scene.start('scene1');
            })
        })
        this.exit.on('pointerdown', () => {
            this.cameras.main.fadeOut(1000,0,0,0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) =>{
                this.scene.start('credits');
            })
        })
    }
}

class Scene1 extends Phaser.Scene{
    constructor(){
        super('scene1');
    }
    create(){
        this.cameras.main.fadeIn(1000,0,0,0);
        this.text1 = this.add.text(400, 500, "This scene will have the opening cinematic").setFontSize(50);
        
        this.tweens.add({
            targets: this.text1,
            alpha:{from: 0, to: 1},
            duration: 1000,
            ease: 'Linear',
        })
        this.time.delayedCall(1000, () => {
            this.text2 = this.add.text(450, 600, "As well as text exposition").setFontSize(50);
            this.tweens.add({
                targets: this.text2,
                alpha: {from: 0, to: 1},
                duration: 1000,
                ease: 'Linear',
            })
            this.time.delayedCall(1000, () => {
                this.add.text(50, 50, "Press anywhere to continue").setFontSize(30);
                this.input.on('pointerdown', () => {
                    this.cameras.main.fadeOut(1000, 0, 0,0);
                    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) =>{
                        this.scene.start('room1');
                    })
                })
            })
        })
    }
}

class Credits extends Phaser.Scene{
    constructor(){
        super('credits');
    }
    create(){
        this.add.text(800, 500, "Credits go here").setFontSize(50);
        this.back = this.add.text(50, 50, "Go back").setFontSize(30);
        this.back.setInteractive();
        this.back.on('pointerdown', () => {
            this.cameras.main.fadeOut(1000,0,0,0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) =>{
                this.scene.start('menu');
            })
        })
    }
}

let changed = false;

class Room1 extends Phaser.Scene{
    constructor(){
        super('room1');
    }
    create() {
        paused = 1;
        this.cameras.main.fadeIn(1000,0,0,0);
        this.add.text(50, 50, "This scene will be the first level\nEach level will be a top-down view where the player moves around interacting with stuff\nFor this prototype we will simply use clickable buttons to simulate interactable objects").setFontSize(30);
        this.rect1 = this.add.rectangle(300, 500, 50, 50, 0xff0000, 1);
        this.add.text(200, 400, "This button will travel you forward/backwards in time").setFontSize(30);
        this.rect1.setInteractive();
        this.rect1.on('pointerdown', () => {
            this.cameras.main.fadeOut(1000,0,0,0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) =>{
                this.scene.start('room1alt');
            })
        })
        if(changed == true){
            this.add.text(1000, 700, "TA-DA\nyou will need to use this mechanic to solve puzzles").setFontSize(30);
            this.rect2 = this.add.rectangle(1100, 800, 50, 50, 0x00ff00, 1);
            this.rect2.setInteractive();
            this.rect2.on('pointerdown', () => {
                this.scene.start('room2');
            })
        }
        this.add.text(50, 800, "There will be clues").setFontSize(30);
        this.rect3 = this.add.rectangle(100, 900, 50, 50, 0xffffff, 1);
        this.rect3.setInteractive();
        this.rect3.on('pointerdown', () => {
            this.scene.pause('room1');
            this.scene.launch('clue1');
        })

        pmenu = this.input.keyboard.addKey('P');
        pmenu.on('down', () => this.scene.start('pause'));
    }
}

class Clue1 extends Phaser.Scene {
    constructor(){
        super('clue1');
    }
    create(){
        this.rect1 = this.add.rectangle(1000, 500, 1500, 800, 0xffffff, 1);
        this.add.text(500, 500, "This is a clue: click on the green box for next level", {color: '0x000000'},).setFontSize(30);
        this.input.on('pointerdown', () => {
            this.scene.stop('clue1');
            this.scene.resume('room1');
        })
    }
}

class Room1Alt extends Phaser.Scene {
    constructor(){
        super('room1alt');
    }
    create(){
        this.cameras.main.fadeIn(1000,0,0,0);
        this.rect1 = this.add.rectangle(300, 500, 50, 50, 0xff0000, 1);
        this.add.text(200, 400, "This button will travel you forward/backwards in time").setFontSize(30);
        this.rect1.setInteractive();
        this.rect1.on('pointerdown', () => {
            this.cameras.main.fadeOut(1000,0,0,0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) =>{
                this.scene.start('room1');
            })
        })
        this.add.text(50,50, "This is the past/future version of the first level").setFontSize(30);
        this.add.text(1000, 700, "Messing with stuff here will change the future/past").setFontSize(30);
        this.rect2 = this.add.rectangle(1100, 800, 50, 50, 0x00ff00, 1);
        this.rect2.setInteractive();
        this.rect2.on('pointerdown', () => {
            this.add.text(1000, 900, "Something happened...").setFontSize(30);
            changed = true;
        })

        pmenu = this.input.keyboard.addKey('P');
        pmenu.on('down', () => this.scene.start('pause'));
    }
}

class Room2 extends Phaser.Scene {
    constructor(){
        super('room2');
    }
    create(){
        paused = 2;
        this.cameras.main.fadeIn(1000,0,0,0);
        this.add.text(50, 50, "This will be the second level").setFontSize(30);
        this.rect1 = this.add.rectangle(300, 500, 50, 50, 0xff0000, 1);
        this.add.text(200, 400, "This button will travel you forward/backwards in time").setFontSize(30);
        this.rect1.setInteractive();
        this.rect1.on('pointerdown', () => {
            this.cameras.main.fadeOut(1000,0,0,0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) =>{
                this.scene.start('room2alt');
            })
        })
        this.add.text(1000, 50, "Pressing 'P' at any time will pause the game").setFontSize(30);
        pmenu = this.input.keyboard.addKey('P');
        pmenu.on('down', () => this.scene.start('pause'));
    }
}

class Room2Alt extends Phaser.Scene {
    constructor(){
        super('room2alt');
    }
    create(){
        this.cameras.main.fadeIn(1000,0,0,0);
        this.rect1 = this.add.rectangle(300, 500, 50, 50, 0xff0000, 1);
        this.add.text(200, 400, "This button will travel you forward/backwards in time").setFontSize(30);
        this.rect1.setInteractive();
        this.rect1.on('pointerdown', () => {
            this.cameras.main.fadeOut(1000,0,0,0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) =>{
                this.scene.start('room2');
            })
        })
        this.add.text(1000, 800, "Each level will get 'harder'").setFontSize(30);
        this.add.text(1000, 50, "Click to continue").setFontSize(30);
        this.rect2 = this.add.rectangle(1100, 100, 50, 50, 0x00ff00, 1);
        this.rect2.setInteractive();
        this.rect2.on('pointerdown', () => {
            this.scene.start('room3');
        })
        pmenu = this.input.keyboard.addKey('P');
        pmenu.on('down', () => this.scene.start('pause'));
    }
}

class Room3 extends Phaser.Scene {
    constructor(){
        super('room3');
    }
    create(){
        paused = 3;
        let one = this.input.keyboard.addKey('A');
        let two = this.input.keyboard.addKey('H');
        let three = this.input.keyboard.addKey('I');
        let four = this.input.keyboard.addKey('W');
        let num = 0;
        one.on('down', () => {
            num = 1;
        })
        two.on('down', () => {
            if(num == 1){
                num = 2;
            }else{
                num = 0;
            }
        })
        three.on('down', () => {
            if(num == 2){
                num = 3;
            }else{
                num = 0;
            }
        })
        four.on('down', () => {
            if(num == 3){
                this.cameras.main.fadeOut(1000,0,0,0);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) =>{
                    this.scene.start('end');
                })
            }else{
                num = 0;
            }
        })

        this.cameras.main.fadeIn(1000,0,0,0);
        this.rect1 = this.add.rectangle(300, 500, 50, 50, 0xff0000, 1);
        this.add.text(200, 400, "This button will travel you forward/backwards in time").setFontSize(30);
        this.rect1.setInteractive();
        this.rect1.on('pointerdown', () => {
            this.cameras.main.fadeOut(1000,0,0,0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) =>{
                this.scene.start('room3alt');
            })
        })
        this.add.text(50,50, "This is the last and hardest level").setFontSize(30);
        pmenu = this.input.keyboard.addKey('P');
        pmenu.on('down', () => this.scene.start('pause'));
    }
}

class Room3Alt extends Phaser.Scene {
    constructor(){
        super('room3alt');
    }
    create(){
        this.cameras.main.fadeIn(1000,0,0,0);
        this.rect1 = this.add.rectangle(300, 500, 50, 50, 0xff0000, 1);
        this.add.text(200, 400, "This button will travel you forward/backwards in time").setFontSize(30);
        this.rect1.setInteractive();
        this.rect1.on('pointerdown', () => {
            this.cameras.main.fadeOut(1000,0,0,0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) =>{
                this.scene.start('room3');
            })
        })

        this.rect3 = this.add.rectangle(100, 900, 50, 50, 0xffffff, 1);
        this.rect3.setInteractive();
        this.rect3.on('pointerdown', () => {
            this.scene.pause('room3alt');
            this.scene.launch('clue2');
        })
        pmenu = this.input.keyboard.addKey('P');
        pmenu.on('down', () => this.scene.start('pause'));
    }
}

class Clue2 extends Phaser.Scene {
    constructor(){
        super('clue2');
    }
    create(){
        this.rect1 = this.add.rectangle(1000, 500, 1500, 800, 0xffffff, 1);
        this.add.text(500, 500, "On the main level screen, press 'A', 'H', 'I', 'W' in that order", {color: '0x000000'},).setFontSize(30);
        this.input.on('pointerdown', () => {
            this.scene.stop('clue2');
            this.scene.resume('room3alt');
        })
    }
}

class End extends Phaser.Scene {
    constructor(){
        super('end');
    }
    create(){
        this.cameras.main.fadeIn(1000,0,0,0);
        this.text1 = this.add.text(400, 500, "This scene will have the closing cinematic").setFontSize(50);
        
        this.tweens.add({
            targets: this.text1,
            alpha:{from: 0, to: 1},
            duration: 1000,
            ease: 'Linear',
        })
        this.time.delayedCall(1000, () => {
            this.text2 = this.add.text(450, 600, "As well as text exposition").setFontSize(50);
            this.tweens.add({
                targets: this.text2,
                alpha: {from: 0, to: 1},
                duration: 1000,
                ease: 'Linear',
            })
            this.time.delayedCall(1000, () => {
                this.add.text(50, 50, "The end...").setFontSize(30);
                this.input.on('pointerdown', () => {
                    this.cameras.main.fadeOut(1000, 0, 0,0);
                    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) =>{
                        this.scene.start('menu');
                    })
                })
            })
        })
    }
}

class Pause extends Phaser.Scene {
    constructor(){
        super('pause');
    }
    create(){
        this.add.text(800, 50, "Game Paused").setFontSize(50);
        this.cont = this.add.text(900, 500, "Continue").setFontSize(30);
        this.cont.setInteractive();
        this.check = this.add.text(900, 600, "Check Clues").setFontSize(30);
        this.check.setInteractive();
        this.options = this.add.text(900, 700, "Options").setFontSize(30);
        this.options.setInteractive();
        this.exit = this.add.test(900, 800, "Exit").setFontSize(30);
        this.exit.setInteractive();

        this.cont.on('pointerdown', () => {
            if(paused == 1){
                this.scene.start('room1');
            }
            if(paused == 2){
                this.scene.start('room2');
            }
            if(paused == 3){
                this.scene.start('room3');
            }
        })
        this.check.on('pointerdown', () => {
            this.scene.start('clues');
        })
        this.options.on('pointerdown', () => {
            this.scene.start('options');
        })
        this.exit.on('pointerdown', () => {
            this.scene.start('menu');
        })
    }
}

class Clues extends Phaser.Scene {
    constructor(){
        super('clues');
    }
    create(){
        this.add.text(800, 500, "Clues will appear here").setFontSize(50);
        this.input.on('pointerdown'){
            this.scene.start('pause');
        }
    }
}

class Options extends Phaser.Scene {
    constructor(){
        super('options');
    }
    create(){
        this.add.text(800, 500, "Options will go here").setFontSize(50);
        this.input.on('pointerdown'){
            this.scene.start('pause');
        }
    }
}

let config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    backgroundColor: '#301934',
    scene: [ Menu, Scene1, Credits, Room1, Room1Alt, Clue1, Room2, Room2Alt, Room3, Room3Alt, Clue2, End, Pause, Clues, Options],
}

let game = new Phaser.Game(config);