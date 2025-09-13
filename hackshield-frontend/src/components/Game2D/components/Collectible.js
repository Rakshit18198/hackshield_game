import Phaser from "phaser";

export default class Collectible extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.texture, config.frame);

        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this);

        // Collectible properties
        this.collectibleType = config.type || 'coin';
        this.points = config.points || 10;
        this.collectibleId = config.id || Math.random().toString(36).substr(2, 9);

        // Set up physics body
        this.body.setSize(24, 24);
        this.body.setImmovable(true);

        // Visual properties
        this.setDepth(3);
        this.setScale(0.8);

        // Add floating animation
        this.createFloatAnimation();

        // Add sparkle effect
        this.createSparkleEffect();

        // Play collect sound when created (optional)
        this.collectSound = null;

        // Flag to prevent multiple collections
        this.isCollected = false;
    }

    createFloatAnimation() {
        // Create a gentle floating animation
        this.floatTween = this.scene.tweens.add({
            targets: this,
            y: this.y - 5,
            duration: 1500,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });

        // Add a subtle rotation
        this.rotateTween = this.scene.tweens.add({
            targets: this,
            rotation: Math.PI * 2,
            duration: 3000,
            ease: 'Linear',
            repeat: -1
        });
    }

    createSparkleEffect() {
        // Create sparkle particles around the collectible
        const particles = this.scene.add.particles(this.x, this.y, 'sparkle', {
            scale: { start: 0.3, end: 0 },
            speed: { min: 20, max: 40 },
            lifespan: 800,
            frequency: 200,
            alpha: { start: 0.8, end: 0 },
            tint: this.getSparkleColor()
        });

        this.sparkleEffect = particles;
        particles.setDepth(4);

        // Make particles follow the collectible
        particles.startFollow(this);
    }

    getSparkleColor() {
        const colors = {
            coin: 0xFFD700,      // Gold
            gem: 0xFF69B4,       // Pink
            crystal: 0x00FFFF,   // Cyan
            star: 0xFFFFFF,      // White
            health: 0xFF4500,    // Red
            energy: 0x32CD32     // Green
        };
        return colors[this.collectibleType] || 0xFFFFFF;
    }

    collect(player) {
        // Prevent multiple collections
        if (this.isCollected) {
            return;
        }
        this.isCollected = true;

        console.log(`Collecting ${this.collectibleType} worth ${this.points} points`);

        // Play collection sound
        if (this.scene.collectSounds && this.scene.collectSounds[this.collectibleType]) {
            this.scene.sound.play(this.collectibleType + 'Collect', { volume: 0.3 });
        }

        // IMPORTANT: Add points to scene first
        // This will trigger the HUD cybersecurity system through scene.addScore()
        this.scene.addScore(this.points);

        // Create collection effect
        this.createCollectionEffect();

        // Show floating text
        this.showFloatingText();

        // Remove from collectibles group
        if (this.scene.collectiblesGroup) {
            this.scene.collectiblesGroup.remove(this);
        }

        // Send to server (for multiplayer sync)
        this.sendCollectEvent();

        // Destroy the collectible after a short delay
        this.scene.time.delayedCall(200, () => {
            this.destroy();
        });
    }

    createCollectionEffect() {
        // Create a burst effect when collected
        const burstParticles = this.scene.add.particles(this.x, this.y, 'sparkle', {
            speed: { min: 50, max: 100 },
            scale: { start: 0.5, end: 0 },
            lifespan: 400,
            quantity: 8,
            tint: this.getSparkleColor(),
            alpha: { start: 1, end: 0 }
        });

        burstParticles.setDepth(10);
        burstParticles.explode();

        // Remove burst particles after animation
        this.scene.time.delayedCall(500, () => {
            if (burstParticles && !burstParticles.destroyed) {
                burstParticles.destroy();
            }
        });

        // Scale up and fade out effect
        this.scene.tweens.add({
            targets: this,
            scaleX: 1.5,
            scaleY: 1.5,
            alpha: 0,
            duration: 200,
            ease: 'Power2'
        });
    }

    showFloatingText() {
        // Create floating score text
        const scoreText = this.scene.add.text(this.x, this.y - 30, `+${this.points}`, {
            fontSize: '16px',
            fontFamily: 'Arial',
            color: '#FFD700',
            stroke: '#000000',
            strokeThickness: 2
        });

        scoreText.setDepth(15);
        scoreText.setOrigin(0.5);

        // Animate the floating text
        this.scene.tweens.add({
            targets: scoreText,
            y: scoreText.y - 40,
            alpha: 0,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                scoreText.destroy();
            }
        });
    }

    sendCollectEvent() {
        // Send collection event to server for multiplayer sync
        if (this.scene.room) {
            this.scene.room.then((room) => {
                room.send("COLLECTIBLE_COLLECTED", {
                    collectibleId: this.collectibleId,
                    type: this.collectibleType,
                    points: this.points,
                    x: this.x,
                    y: this.y,
                    map: this.scene.mapName
                });
            });
        }
    }

    destroy() {
        // Clean up sparkle effect
        if (this.sparkleEffect) {
            this.sparkleEffect.destroy();
            this.sparkleEffect = null;
        }

        // Stop any running tweens - check if scene and tweens exist
        if (this.scene && this.scene.tweens) {
            this.scene.tweens.killTweensOf(this);
        }

        // Stop specific tweens
        if (this.floatTween) {
            this.floatTween.stop();
            this.floatTween = null;
        }

        if (this.rotateTween) {
            this.rotateTween.stop();
            this.rotateTween = null;
        }

        super.destroy();
    }

    // Static method to create different types of collectibles
    static createCollectible(scene, x, y, type = 'coin') {
        const collectibleConfigs = {
            coin: {
                texture: 'collectibles',
                frame: 'coin.png',
                points: 10,
                type: 'coin'
            },
            gem: {
                texture: 'collectibles',
                frame: 'gem.png',
                points: 25,
                type: 'gem'
            },
            crystal: {
                texture: 'collectibles',
                frame: 'crystal.png',
                points: 50,
                type: 'crystal'
            },
            star: {
                texture: 'collectibles',
                frame: 'star.png',
                points: 100,
                type: 'star'
            },
            health: {
                texture: 'collectibles',
                frame: 'health.png',
                points: 20,
                type: 'health'
            },
            energy: {
                texture: 'collectibles',
                frame: 'energy.png',
                points: 15,
                type: 'energy'
            }
        };

        const config = collectibleConfigs[type] || collectibleConfigs.coin;

        return new Collectible({
            scene: scene,
            x: x,
            y: y,
            texture: config.texture,
            frame: config.frame,
            type: config.type,
            points: config.points,
            id: `${type}_${x}_${y}_${Date.now()}`
        });
    }
}