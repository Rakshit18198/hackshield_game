import TownJSON from "../assets/tilemaps/town.json";
import TilesTown from "../assets/tilesets/tuxmon-sample-32px-extruded.png";

import Route1JSON from "../assets/tilemaps/route1";

import AtlasJSON from "../assets/atlas/atlas";
import AtlasPNG from "../assets/atlas/atlas.png";
import PlayersAtlasJSON from "../assets/atlas/players";
import PlayersAtlasPNG from "../assets/images/players/players.png";

export class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        // Load Town
        this.load.image("TilesTown", TilesTown);
        this.load.tilemapTiledJSON("town", TownJSON);

        // Load Route1
        this.load.tilemapTiledJSON("route1", Route1JSON);

        // Load atlas
        this.load.atlas("currentPlayer", AtlasPNG, AtlasJSON);
        this.load.atlas("players", PlayersAtlasPNG, PlayersAtlasJSON);

        // Load collectibles assets
        this.loadCollectiblesAssets();

        // Load UI assets
        this.loadUIAssets();

        // Load sound assets
        this.loadSoundAssets();
    }

    loadCollectiblesAssets() {
        // For now, we'll create simple colored shapes as collectibles
        // In a real game, you would load actual sprite images

        // Create collectible textures programmatically
        this.load.image('sparkle', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdgAAAHYBTnsmCAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFYSURBVCiRpZM9SwNBEIafgwiKhYWFhYWFjY2NjY2NjVZaWFhYWNjY2NhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhY+A8iItJut9vtdrud2Z2ZfWeGmZkZZmZmmJmZYWZmmJmZYWZmmJmZYWZmmJmZYWZm');

        // Load collectible atlas or create programmatically
        this.createCollectibleTextures();
    }

    createCollectibleTextures() {
        // Create coin texture
        const coinGraphics = this.add.graphics();
        coinGraphics.fillStyle(0xFFD700);
        coinGraphics.fillCircle(12, 12, 10);
        coinGraphics.lineStyle(2, 0xFFA500);
        coinGraphics.strokeCircle(12, 12, 10);
        coinGraphics.generateTexture('coin', 24, 24);
        coinGraphics.destroy();

        // Create gem texture
        const gemGraphics = this.add.graphics();
        gemGraphics.fillStyle(0xFF69B4);
        gemGraphics.beginPath();
        gemGraphics.moveTo(12, 4);
        gemGraphics.lineTo(20, 12);
        gemGraphics.lineTo(12, 20);
        gemGraphics.lineTo(4, 12);
        gemGraphics.closePath();
        gemGraphics.fillPath();
        gemGraphics.lineStyle(2, 0xFF1493);
        gemGraphics.strokePath();
        gemGraphics.generateTexture('gem', 24, 24);
        gemGraphics.destroy();

        // Create crystal texture
        const crystalGraphics = this.add.graphics();
        crystalGraphics.fillStyle(0x00FFFF);
        crystalGraphics.beginPath();
        crystalGraphics.moveTo(12, 2);
        crystalGraphics.lineTo(20, 8);
        crystalGraphics.lineTo(16, 22);
        crystalGraphics.lineTo(8, 22);
        crystalGraphics.lineTo(4, 8);
        crystalGraphics.closePath();
        crystalGraphics.fillPath();
        crystalGraphics.lineStyle(2, 0x00CED1);
        crystalGraphics.strokePath();
        crystalGraphics.generateTexture('crystal', 24, 24);
        crystalGraphics.destroy();

        // Create star texture (draw manually since fillStar doesn't exist)
        const starGraphics = this.add.graphics();
        starGraphics.fillStyle(0xFFFFFF);

        // Draw a 5-pointed star manually
        const centerX = 12;
        const centerY = 12;
        const outerRadius = 10;
        const innerRadius = 4;

        starGraphics.beginPath();
        for (let i = 0; i < 5; i++) {
            const outerAngle = (i * Math.PI * 2) / 5 - Math.PI / 2;
            const innerAngle = ((i + 0.5) * Math.PI * 2) / 5 - Math.PI / 2;

            const outerX = centerX + Math.cos(outerAngle) * outerRadius;
            const outerY = centerY + Math.sin(outerAngle) * outerRadius;
            const innerX = centerX + Math.cos(innerAngle) * innerRadius;
            const innerY = centerY + Math.sin(innerAngle) * innerRadius;

            if (i === 0) {
                starGraphics.moveTo(outerX, outerY);
            } else {
                starGraphics.lineTo(outerX, outerY);
            }
            starGraphics.lineTo(innerX, innerY);
        }
        starGraphics.closePath();
        starGraphics.fillPath();
        starGraphics.lineStyle(2, 0xFFD700);
        starGraphics.strokePath();
        starGraphics.generateTexture('star', 24, 24);
        starGraphics.destroy();

        // Create health potion texture
        const healthGraphics = this.add.graphics();
        // Bottle body
        healthGraphics.fillStyle(0xFF4500);
        healthGraphics.fillRoundedRect(8, 8, 8, 12, 2);
        // Bottle neck
        healthGraphics.fillStyle(0x8B0000);
        healthGraphics.fillRect(10, 6, 4, 4);
        // Liquid inside
        healthGraphics.fillStyle(0xFF0000);
        healthGraphics.fillRoundedRect(9, 9, 6, 8, 1);
        // Cork/cap
        healthGraphics.fillStyle(0x654321);
        healthGraphics.fillRect(10, 4, 4, 3);
        healthGraphics.generateTexture('health', 24, 24);
        healthGraphics.destroy();

        // Create energy bottle texture
        const energyGraphics = this.add.graphics();
        // Bottle body
        energyGraphics.fillStyle(0x228B22);
        energyGraphics.fillRoundedRect(8, 8, 8, 12, 2);
        // Bottle neck
        energyGraphics.fillStyle(0x006400);
        energyGraphics.fillRect(10, 6, 4, 4);
        // Liquid inside
        energyGraphics.fillStyle(0x32CD32);
        energyGraphics.fillRoundedRect(9, 9, 6, 8, 1);
        // Cork/cap
        energyGraphics.fillStyle(0x654321);
        energyGraphics.fillRect(10, 4, 4, 3);
        energyGraphics.generateTexture('energy', 24, 24);
        energyGraphics.destroy();
    }

    loadUIAssets() {
        // Check if sparkle texture already exists
        if (!this.textures.exists('sparkle')) {
            const sparkleGraphics = this.add.graphics();
            sparkleGraphics.fillStyle(0xFFFFFF, 0.8);
            sparkleGraphics.fillCircle(2, 2, 2);
            sparkleGraphics.generateTexture('sparkle', 4, 4);
            sparkleGraphics.destroy();
        }
    }

    loadSoundAssets() {
        // Load sound effects (placeholder URLs - replace with actual sound files)
        // this.load.audio('coinCollect', ['assets/sounds/coin.ogg', 'assets/sounds/coin.mp3']);
        // this.load.audio('gemCollect', ['assets/sounds/gem.ogg', 'assets/sounds/gem.mp3']);
        // this.load.audio('crystalCollect', ['assets/sounds/crystal.ogg', 'assets/sounds/crystal.mp3']);
        // this.load.audio('starCollect', ['assets/sounds/star.ogg', 'assets/sounds/star.mp3']);
        // this.load.audio('healthCollect', ['assets/sounds/health.ogg', 'assets/sounds/health.mp3']);
        // this.load.audio('energyCollect', ['assets/sounds/energy.ogg', 'assets/sounds/energy.mp3']);
        // this.load.audio('levelUp', ['assets/sounds/levelup.ogg', 'assets/sounds/levelup.mp3']);
    }

    create() {
        this.add.text(20, 20, "Loading game...");

        this.scene.start("playGame", {map: 'town', playerTexturePosition: 'front'});

        // Create the player's walking animations from the texture currentPlayer. These are stored in the global
        // animation manager so any sprite can access them.
        this.anims.create({
            key: "misa-left-walk",
            frames: this.anims.generateFrameNames("currentPlayer", {
                prefix: "misa-left-walk.",
                start: 0,
                end: 3,
                zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "misa-right-walk",
            frames: this.anims.generateFrameNames("currentPlayer", {
                prefix: "misa-right-walk.",
                start: 0,
                end: 3,
                zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "misa-front-walk",
            frames: this.anims.generateFrameNames("currentPlayer", {
                prefix: "misa-front-walk.",
                start: 0,
                end: 3,
                zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "misa-back-walk",
            frames: this.anims.generateFrameNames("currentPlayer", {
                prefix: "misa-back-walk.",
                start: 0,
                end: 3,
                zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });

        // onlinePlayer animations
        this.anims.create({
            key: "onlinePlayer-left-walk", frames: this.anims.generateFrameNames("players", {
                start: 0,
                end: 3,
                zeroPad: 3,
                prefix: "bob_left_walk.",
                suffix: ".png"
            }), frameRate: 10, repeat: -1
        });
        this.anims.create({
            key: "onlinePlayer-right-walk", frames: this.anims.generateFrameNames("players", {
                start: 0,
                end: 3,
                zeroPad: 3,
                prefix: "bob_right_walk.",
                suffix: ".png"
            }), frameRate: 10, repeat: -1
        });
        this.anims.create({
            key: "onlinePlayer-front-walk", frames: this.anims.generateFrameNames("players", {
                start: 0,
                end: 3,
                zeroPad: 3,
                prefix: "bob_front_walk.",
                suffix: ".png"
            }), frameRate: 10, repeat: -1
        });
        this.anims.create({
            key: "onlinePlayer-back-walk", frames: this.anims.generateFrameNames("players", {
                start: 0,
                end: 3,
                zeroPad: 3,
                prefix: "bob_back_walk.",
                suffix: ".png"
            }), frameRate: 10, repeat: -1
        });

        // Create collectible animations
        this.createCollectibleAnimations();
    }

    createCollectibleAnimations() {
        // Coin spin animation (if using sprite sheets)
        // this.anims.create({
        //     key: 'coin-spin',
        //     frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 7 }),
        //     frameRate: 10,
        //     repeat: -1
        // });

        // Gem sparkle animation
        // this.anims.create({
        //     key: 'gem-sparkle',
        //     frames: this.anims.generateFrameNumbers('gem', { start: 0, end: 3 }),
        //     frameRate: 8,
        //     repeat: -1
        // });

        // For now, we'll use the programmatically created textures without frame animations
        // The floating and rotation effects are handled in the Collectible class
    }
}