import OnlinePlayer from "../components/OnlinePlayer";
import Player from "../components/Player";
import Collectible from "../components/Collectible";
import HUD from "../components/hud";
import { onlinePlayers, room } from '../utils/SocketServer';
import Phaser from "phaser";

let cursors, socketKey;

export class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    init(data) {
        // Map data
        this.mapName = data.map;

        // Player Texture starter position
        this.playerTexturePosition = data.playerTexturePosition;

        // Set container
        this.container = [];

        // Game state
        this.gameScore = 0;
        this.collectiblesCollected = 0;
        this.totalCollectibles = 0;
        this.consecutiveCollections = 0;
    }

    create() {
        // Set up multiplayer room listeners
        this.setupMultiplayerListeners();

        // Create the map
        this.setupMap();

        // Create player
        this.setupPlayer();

        // Create collectibles
        this.setupCollectibles();

        // Create HUD (this must come after collectibles to get accurate count)
        this.setupHUD();

        // Setup camera
        this.setupCamera();

        // Setup controls and debug
        this.setupControls();

        // Setup timers
        this.setupTimers();
    }

    setupMultiplayerListeners() {
        room.then((room) => room.onMessage((data) => {
            if (data.event === 'CURRENT_PLAYERS') {
                console.log('CURRENT_PLAYERS');

                Object.keys(data.players).forEach(playerId => {
                    let player = data.players[playerId];

                    if (playerId !== room.sessionId) {
                        onlinePlayers[player.sessionId] = new OnlinePlayer({
                            scene: this,
                            playerId: player.sessionId,
                            key: player.sessionId,
                            map: player.map,
                            x: player.x,
                            y: player.y
                        });
                    }
                })
            }
            if (data.event === 'PLAYER_JOINED') {
                console.log('PLAYER_JOINED');

                if (!onlinePlayers[data.sessionId]) {
                    onlinePlayers[data.sessionId] = new OnlinePlayer({
                        scene: this,
                        playerId: data.sessionId,
                        key: data.sessionId,
                        map: data.map,
                        x: data.x,
                        y: data.y
                    });
                }
            }
            if (data.event === 'PLAYER_LEFT') {
                console.log('PLAYER_LEFT');

                if (onlinePlayers[data.sessionId]) {
                    onlinePlayers[data.sessionId].destroy();
                    delete onlinePlayers[data.sessionId];
                }
            }
            if (data.event === 'PLAYER_MOVED') {
                // If player is in same map
                if (this.mapName === onlinePlayers[data.sessionId].map) {

                    // If player isn't registered in this scene (map changing bug..)
                    if (!onlinePlayers[data.sessionId].scene) {
                        onlinePlayers[data.sessionId] = new OnlinePlayer({
                            scene: this,
                            playerId: data.sessionId,
                            key: data.sessionId,
                            map: data.map,
                            x: data.x,
                            y: data.y
                        });
                    }
                    // Start animation and set sprite position
                    onlinePlayers[data.sessionId].isWalking(data.position, data.x, data.y);
                }
            }
            if (data.event === 'PLAYER_MOVEMENT_ENDED') {
                // If player is in same map
                if (this.mapName === onlinePlayers[data.sessionId].map) {

                    // If player isn't registered in this scene (map changing bug..)
                    if (!onlinePlayers[data.sessionId].scene) {
                        onlinePlayers[data.sessionId] = new OnlinePlayer({
                            scene: this,
                            playerId: data.sessionId,
                            key: data.sessionId,
                            map: data.map,
                            x: data.x,
                            y: data.y
                        });
                    }
                    // Stop animation & set sprite texture
                    onlinePlayers[data.sessionId].stopWalking(data.position)
                }
            }
            if (data.event === 'PLAYER_CHANGED_MAP') {
                console.log('PLAYER_CHANGED_MAP');

                if (onlinePlayers[data.sessionId]) {
                    onlinePlayers[data.sessionId].destroy();

                    if (data.map === this.mapName && !onlinePlayers[data.sessionId].scene) {
                        onlinePlayers[data.sessionId] = new OnlinePlayer({
                            scene: this,
                            playerId: data.sessionId,
                            key: data.sessionId,
                            map: data.map,
                            x: data.x,
                            y: data.y
                        });
                    }
                }
            }
            if (data.event === 'COLLECTIBLE_COLLECTED') {
                console.log('COLLECTIBLE_COLLECTED by other player');
                // Remove collectible from map when another player collects it
                this.removeCollectibleById(data.collectibleId);
            }
        })
        );
    }

    setupMap() {
        this.map = this.make.tilemap({ key: this.mapName });

        console.log("this.mapName", this.mapName);
        console.log("this.map", this.map);

        // Set current map Bounds
        this.scene.scene.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        const tileset = this.map.addTilesetImage("tuxmon-sample-32px-extruded", "TilesTown");

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        this.belowLayer = this.map.createLayer("Below Player", tileset, 0, 0);
        this.worldLayer = this.map.createLayer("World", tileset, 0, 0);

        // Check if Grass layer exists before creating it
        const grassLayerExists = this.map.layers.some(layer => layer.name === "Grass");
        if (grassLayerExists) {
            this.grassLayer = this.map.createLayer("Grass", tileset, 0, 0);
        } else {
            console.log("Grass layer not found in tilemap, skipping...");
            this.grassLayer = null;
        }

        this.aboveLayer = this.map.createLayer("Above Player", tileset, 0, 0);

        this.worldLayer.setCollisionByProperty({ collides: true });
        this.aboveLayer.setDepth(10);
    }

    setupPlayer() {
        // Get spawn point from tiled map
        const spawnPoint = this.map.findObject("SpawnPoints", obj => obj.name === "Spawn Point");

        // Set player
        this.player = new Player({
            scene: this,
            worldLayer: this.worldLayer,
            key: 'player',
            x: spawnPoint.x,
            y: spawnPoint.y
        });
    }

    setupCollectibles() {
        // Create collectibles group
        this.collectiblesGroup = this.add.group();

        // Generate collectibles across the map
        this.generateCollectibles();
    }

    generateCollectibles() {
        const collectibleTypes = ['coin', 'gem', 'crystal', 'star', 'health', 'energy'];
        const numCollectibles = 50; // Adjust based on map size

        // Get map bounds
        const mapWidth = this.map.widthInPixels;
        const mapHeight = this.map.heightInPixels;
        const tileSize = 32;

        for (let i = 0; i < numCollectibles; i++) {
            let attempts = 0;
            let validPosition = false;
            let x, y;

            // Try to find a valid position (not on collision tiles)
            while (!validPosition && attempts < 50) {
                x = Phaser.Math.Between(tileSize, mapWidth - tileSize);
                y = Phaser.Math.Between(tileSize, mapHeight - tileSize);

                // Check if position is on a walkable tile
                const tile = this.worldLayer.getTileAtWorldXY(x, y);
                if (!tile || !tile.collides) {
                    validPosition = true;
                } else {
                    attempts++;
                }
            }

            if (validPosition) {
                // Choose collectible type with weighted probability
                let type;
                const random = Math.random();
                if (random < 0.4) type = 'coin';
                else if (random < 0.6) type = 'gem';
                else if (random < 0.75) type = 'health';
                else if (random < 0.85) type = 'energy';
                else if (random < 0.95) type = 'crystal';
                else type = 'star';

                const collectible = new Collectible({
                    scene: this,
                    x: x,
                    y: y,
                    texture: type, // Using the simple textures we created
                    type: type,
                    points: this.getPointsForType(type),
                    id: `${type}_${x}_${y}_${i}`
                });

                this.collectiblesGroup.add(collectible);
                this.totalCollectibles++;
            }
        }

        console.log(`Generated ${this.totalCollectibles} collectibles`);
    }

    getPointsForType(type) {
        const points = {
            coin: 10,
            gem: 25,
            crystal: 50,
            star: 100,
            health: 20,
            energy: 15
        };
        return points[type] || 10;
    }

    setupHUD() {
        this.hud = new HUD(this);
        this.hud.updateCollectibles(this.collectiblesCollected, this.totalCollectibles);
        this.hud.setPlayerName('Player'); // You can get this from user data
    }

    setupCamera() {
        const camera = this.cameras.main;
        camera.startFollow(this.player);
        camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    }

    setupControls() {
        cursors = this.input.keyboard.createCursorKeys();

        // Help text that has a "fixed" position on the screen
        this.helpTextBg = this.add.graphics();
        this.helpTextBg.fillStyle(0x000000, 0.5);
        this.helpTextBg.fillRoundedRect(16, 150, 270, 70, 10);
        this.helpTextBg.setScrollFactor(0);
        this.helpTextBg.setDepth(29);

        // Help text positioned with proper padding
        this.helpText = this.add
            .text(26, 160, "Arrow keys to move\nCollect items to gain points!", {
                font: "16px monospace",
                fill: "#efe6e6ff"
            })
            .setScrollFactor(0)
            .setDepth(30);

        this.debugGraphics();
    }

    setupTimers() {
        this.movementTimer();

        // HUD update timer
        this.time.addEvent({
            delay: 1000, // Update every second
            callback: () => {
                if (this.hud) {
                    this.hud.updateTime();
                    this.hud.updateMiniMap(
                        this.player.x,
                        this.player.y,
                        this.map.widthInPixels,
                        this.map.heightInPixels,
                        this.collectiblesGroup.children.entries.filter(c => c.active)
                    );
                }
            },
            loop: true
        });
    }

    update(time, delta) {
        // Loop the player update method
        this.player.update(time, delta);

        // Handle movement and socket communication
        this.handleMovement();
    }

    handleMovement() {
        // Horizontal movement
        if (cursors.left.isDown) {
            if (socketKey) {
                if (this.player.isMoved()) {
                    room.then((room) => room.send(
                        "PLAYER_MOVED", {
                        position: 'left',
                        x: this.player.x,
                        y: this.player.y
                    }));
                }
                socketKey = false;
            }
        } else if (cursors.right.isDown) {
            if (socketKey) {
                if (this.player.isMoved()) {
                    room.then((room) => room.send(
                        "PLAYER_MOVED", {
                        position: 'right',
                        x: this.player.x,
                        y: this.player.y
                    }))
                }
                socketKey = false;
            }
        }

        // Vertical movement
        if (cursors.up.isDown) {
            if (socketKey) {
                if (this.player.isMoved()) {
                    room.then((room) => room.send(
                        "PLAYER_MOVED", {
                        position: 'back',
                        x: this.player.x,
                        y: this.player.y
                    }))
                }
                socketKey = false;
            }
        } else if (cursors.down.isDown) {
            if (socketKey) {
                if (this.player.isMoved()) {
                    room.then((room) => room.send(
                        "PLAYER_MOVED", {
                        position: 'front',
                        x: this.player.x,
                        y: this.player.y
                    }))
                }
                socketKey = false;
            }
        }

        // Horizontal movement ended
        if (Phaser.Input.Keyboard.JustUp(cursors.left) === true) {
            room.then((room) => room.send("PLAYER_MOVEMENT_ENDED", { position: 'left' }))
        } else if (Phaser.Input.Keyboard.JustUp(cursors.right) === true) {
            room.then((room) => room.send("PLAYER_MOVEMENT_ENDED", { position: 'right' }))
        }

        // Vertical movement ended
        if (Phaser.Input.Keyboard.JustUp(cursors.up) === true) {
            room.then((room) => room.send("PLAYER_MOVEMENT_ENDED", { position: 'back' }))
        } else if (Phaser.Input.Keyboard.JustUp(cursors.down) === true) {
            room.then((room) => room.send("PLAYER_MOVEMENT_ENDED", { position: 'front' }))
        }
    }

    // Method to add score (called by player when collecting items)
    addScore(points) {
        this.gameScore += points;
        this.collectiblesCollected++;
        this.consecutiveCollections++;

        // Update HUD with new score and collectibles count
        if (this.hud) {
            this.hud.updateScore(this.gameScore);
            this.hud.updateCollectibles(this.collectiblesCollected, this.totalCollectibles);

            // IMPORTANT: Notify HUD that a collectible was collected
            // This triggers the cybersecurity info/question system
            this.hud.collectItem();
        }

        // Check if all collectibles are collected
        if (this.collectiblesCollected >= this.totalCollectibles) {
            this.onAllCollectiblesCollected();
        }

        console.log(`Collectibles: ${this.collectiblesCollected}/${this.totalCollectibles}, Score: ${this.gameScore}`);
    }

    onAllCollectiblesCollected() {
        // Show completion message
        const completionText = this.add.text(400, 300, 'ALL ITEMS COLLECTED!\nWell Done!', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#FFD700',
            stroke: '#000000',
            strokeThickness: 3,
            fontStyle: 'bold',
            align: 'center'
        });

        completionText.setOrigin(0.5);
        completionText.setScrollFactor(0);
        completionText.setDepth(25);

        // Animate completion text
        this.tweens.add({
            targets: completionText,
            scaleX: 1.2,
            scaleY: 1.2,
            alpha: 0,
            y: 250,
            duration: 3000,
            ease: 'Power2',
            onComplete: () => {
                completionText.destroy();
                // REMOVED: Don't trigger question here, only on level up
                // Just respawn collectibles
                this.respawnCollectibles();
            }
        });
    }

    respawnCollectibles() {
        // Clear existing collectibles
        this.collectiblesGroup.clear(true, true);

        // Reset counters
        this.collectiblesCollected = 0;
        this.totalCollectibles = 0;
        this.consecutiveCollections = 0;

        // Generate new collectibles
        this.generateCollectibles();

        // Update HUD
        if (this.hud) {
            this.hud.updateCollectibles(this.collectiblesCollected, this.totalCollectibles);
            // Reset the info shown status for new round
            this.hud.resetInfoShown();
        }
    }

    removeCollectibleById(collectibleId) {
        // Remove collectible when collected by another player (multiplayer sync)
        this.collectiblesGroup.children.entries.forEach(collectible => {
            if (collectible.collectibleId === collectibleId) {
                collectible.destroy();
                this.collectiblesGroup.remove(collectible);
                this.totalCollectibles--;

                // Update HUD
                if (this.hud) {
                    this.hud.updateCollectibles(this.collectiblesCollected, this.totalCollectibles);
                }
            }
        });
    }

    movementTimer() {
        setInterval(() => {
            socketKey = true;
        }, 50)
    }

    debugGraphics() {
        // Debug graphics
        this.input.keyboard.once("keydown_D", event => {
            // Turn on physics debugging to show player's hitbox
            this.physics.world.createDebugGraphic();

            // Create worldLayer collision graphic above the player, but below the help text
            const graphics = this.add
                .graphics()
                .setAlpha(0.75)
                .setDepth(20);
            this.worldLayer.renderDebug(graphics, {
                tileColor: null, // Color of non-colliding tiles
                collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
                faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
            });

            // Show collectible hitboxes
            this.collectiblesGroup.children.entries.forEach(collectible => {
                if (collectible.body) {
                    const debugGraphic = this.add.graphics();
                    debugGraphic.lineStyle(2, 0x00FF00, 1);
                    debugGraphic.strokeRect(
                        collectible.body.x - this.cameras.main.scrollX,
                        collectible.body.y - this.cameras.main.scrollY,
                        collectible.body.width,
                        collectible.body.height
                    );
                    debugGraphic.setDepth(20);
                }
            });
        });
    }

    // Add a method to handle game over from HUD
    gameOver() {
        console.log("Game Over called from HUD");

        // Pause physics
        this.physics.pause();

        // Show game over screen
        this.showGameOverScreen();
    }

    showGameOverScreen() {
        const gameOverBg = this.add.graphics();
        gameOverBg.fillStyle(0x000000, 0.9);
        gameOverBg.fillRect(0, 0, 800, 600);
        gameOverBg.setScrollFactor(0);
        gameOverBg.setDepth(50);

        const gameOverTitle = this.add.text(400, 200, 'GAME OVER', {
            fontSize: '64px',
            fontFamily: 'Arial',
            color: '#ff4444',
            fontStyle: 'bold'
        });
        gameOverTitle.setOrigin(0.5);
        gameOverTitle.setScrollFactor(0);
        gameOverTitle.setDepth(51);

        const finalScore = this.add.text(400, 280, `Final Score: ${this.gameScore}`, {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#ffffff'
        });
        finalScore.setOrigin(0.5);
        finalScore.setScrollFactor(0);
        finalScore.setDepth(51);

        const levelReached = this.add.text(400, 320, `Level Reached: ${this.hud ? this.hud.level : 1}`, {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#00ff88'
        });
        levelReached.setOrigin(0.5);
        levelReached.setScrollFactor(0);
        levelReached.setDepth(51);

        const restartText = this.add.text(400, 380, 'Press R to Restart', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#00ff88'
        });
        restartText.setOrigin(0.5);
        restartText.setScrollFactor(0);
        restartText.setDepth(51);

        // Add restart functionality
        const restartKey = this.input.keyboard.addKey('R');
        restartKey.once('down', () => {
            this.scene.restart();
        });
    }

    // Methods for testing cybersecurity features
    testCybersecurityInfo() {
        if (this.hud) {
            this.hud.showInfoForCurrentLevel();
        }
    }

    testCybersecurityQuestion() {
        if (this.hud) {
            this.hud.askQuestion();
        }
    }

    // Get cybersecurity status
    getCybersecurityStatus() {
        if (this.hud) {
            return {
                level: this.hud.level,
                collectionCount: this.hud.getCurrentCollectionCount(),
                collectionsNeeded: this.hud.getCollectionsBeforeInfo(),
                isQuestionActive: this.hud.isQuestionActive(),
                hasQuestionForLevel: this.hud.hasQuestionForLevel(this.hud.level)
            };
        }
        return null;
    }

    // Clean up when scene is destroyed or restarted
    destroy() {
        // Clean up collectibles first
        if (this.collectiblesGroup) {
            this.collectiblesGroup.children.entries.forEach(collectible => {
                if (collectible && collectible.destroy) {
                    // Stop tweens before destroying
                    if (this.tweens) {
                        this.tweens.killTweensOf(collectible);
                    }
                    collectible.destroy();
                }
            });
            this.collectiblesGroup.destroy();
            this.collectiblesGroup = null;
        }

        // Clean up HUD
        if (this.hud) {
            this.hud.destroy();
            this.hud = null;
        }

        // Clean up any remaining tweens
        if (this.tweens) {
            this.tweens.killAll();
        }

        super.destroy();
    }

    // Override the shutdown method to handle scene transitions
    shutdown() {
        // Clean up before scene shutdown
        this.destroy();
        super.shutdown();
    }
}