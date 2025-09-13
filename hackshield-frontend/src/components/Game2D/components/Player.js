import Phaser from "phaser";
import { room } from '../utils/SocketServer';

export default class Player extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);

        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this);
        this.scene.physics.add.collider(this, config.worldLayer);

        this.setTexture("currentPlayer", `misa-${this.scene.playerTexturePosition}`);

        // Register cursors for player movement
        this.cursors = this.scene.input.keyboard.createCursorKeys();

        // Player Offset
        this.body.setOffset(0, 24);

        // Player can't go out of the world
        this.body.setCollideWorldBounds(true)

        // Set depth (z-index)
        this.setDepth(5);

        // Container to store old data
        this.container = [];

        // Player speed
        this.speed = 150;

        this.canChangeMap = true;

        // Player nickname text
        this.playerNickname = this.scene.add.text((this.x - this.width * 1.4), (this.y - (this.height / 2)), 'Player');

        // Add spacebar input
        this.spacebar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Player stats
        this.score = 0;
        this.collectiblesCollected = 0;
        this.health = 100;
        this.energy = 100;

        // Collection range
        this.collectionRange = 32;

        // Collection cooldown to prevent double collection
        this.collectionCooldown = false;
    }

    update(time, delta) {
        const prevVelocity = this.body.velocity.clone();

        // Show player nickname above player
        this.showPlayerNickname();

        // Player door interaction
        this.doorInteraction();

        // Player world interaction
        this.worldInteraction();

        // Check for collectible interactions
        this.collectibleInteraction();

        // Stop any previous movement from the last frame
        this.body.setVelocity(0);

        // Horizontal movement
        if (this.cursors.left.isDown) {
            this.body.setVelocityX(-this.speed);
        } else if (this.cursors.right.isDown) {
            this.body.setVelocityX(this.speed);
        }

        // Vertical movement
        if (this.cursors.up.isDown) {
            this.body.setVelocityY(-this.speed);
        } else if (this.cursors.down.isDown) {
            this.body.setVelocityY(this.speed);
        }

        // Normalize and scale the velocity so that player can't move faster along a diagonal
        this.body.velocity.normalize().scale(this.speed);

        // Update the animation last and give left/right animations precedence over up/down animations
        if (this.cursors.left.isDown) {
            this.anims.play("misa-left-walk", true);
        } else if (this.cursors.right.isDown) {
            this.anims.play("misa-right-walk", true);
        } else if (this.cursors.up.isDown) {
            this.anims.play("misa-back-walk", true);
        } else if (this.cursors.down.isDown) {
            this.anims.play("misa-front-walk", true);
        } else {
            this.anims.stop();

            // If we were moving, pick and idle frame to use
            if (prevVelocity.x < 0) this.setTexture("currentPlayer", "misa-left");
            else if (prevVelocity.x > 0) this.setTexture("currentPlayer", "misa-right");
            else if (prevVelocity.y < 0) this.setTexture("currentPlayer", "misa-back");
            else if (prevVelocity.y > 0) this.setTexture("currentPlayer", "misa-front");
        }
    }

    showPlayerNickname() {
        this.playerNickname.x = this.x - (this.playerNickname.width / 2);
        this.playerNickname.y = this.y - (this.height / 2);
    }

    isMoved() {
        if (this.container.oldPosition && (this.container.oldPosition.x !== this.x || this.container.oldPosition.y !== this.y)) {
            this.container.oldPosition = {x: this.x, y: this.y};
            return true;
        } else {
            this.container.oldPosition = {x: this.x, y: this.y};
            return false;
        }
    }

    doorInteraction() {
        this.scene.map.findObject("Doors", obj => {
            if ((this.y >= obj.y && this.y <= (obj.y + obj.height)) && (this.x >= obj.x && this.x <= (obj.x + obj.width))) {
                console.log('Player is by ' + obj.name);
                if (this.spacebar.isDown) {
                    console.log('Door is open!')
                }
            }
        });
    }

    worldInteraction() {
        this.scene.map.findObject("Worlds", world => {
            if ((this.y >= world.y && this.y <= (world.y + world.height)) && (this.x >= world.x && this.x <= (world.x + world.width))) {
                console.log('Player is by world entry: ' + world.name);

                // Get playerTexturePosition from from Worlds object property
                let playerTexturePosition;
                if (world.properties) playerTexturePosition = world.properties.find((property) => property.name === 'playerTexturePosition');
                if (playerTexturePosition) this.playerTexturePosition = playerTexturePosition.value;

                // Clean up current scene before transitioning
                if (this.scene.collectiblesGroup) {
                    this.scene.collectiblesGroup.children.entries.forEach(collectible => {
                        if (collectible && this.scene.tweens) {
                            this.scene.tweens.killTweensOf(collectible);
                        }
                    });
                    this.scene.collectiblesGroup.destroy();
                }

                if (this.scene.hud) {
                    this.scene.hud.destroy();
                }

                // Load new level (tiles map)
                this.scene.registry.destroy();
                this.scene.events.off();
                this.scene.scene.restart({map: world.name, playerTexturePosition: this.playerTexturePosition});

                room.then((room) => room.send(
                     "PLAYER_CHANGED_MAP",{
                    map: world.name
                }));
            }
        });
    }

    collectibleInteraction() {
        if (this.collectionCooldown) return;

        // Check collision with collectibles group
        if (this.scene.collectiblesGroup && this.scene.collectiblesGroup.children) {
            this.scene.collectiblesGroup.children.entries.forEach(collectible => {
                if (collectible && collectible.active) {
                    const distance = Phaser.Math.Distance.Between(this.x, this.y, collectible.x, collectible.y);

                    if (distance < this.collectionRange) {
                        this.collectItem(collectible);
                    }
                }
            });
        }
    }

    collectItem(collectible) {
        // Set cooldown to prevent multiple collections
        this.collectionCooldown = true;

        // Apply bonus multiplier from HUD
        const bonusMultiplier = this.scene.hud ? this.scene.hud.getBonusMultiplier() : 1.0;
        const finalPoints = Math.floor(collectible.points * bonusMultiplier);

        // Update player stats
        this.score += finalPoints;
        this.collectiblesCollected++;

        // Special effects based on collectible type
        switch (collectible.collectibleType) {
            case 'health':
                this.health = Math.min(100, this.health + 20);
                this.showStatusEffect('Health +20', 0x32CD32);
                break;
            case 'energy':
                this.energy = Math.min(100, this.energy + 25);
                this.showStatusEffect('Energy +25', 0x1E90FF);
                break;
            case 'star':
                // Star gives temporary speed boost
                this.giveSpeedBoost();
                break;
        }

        // Trigger collection on the collectible
        collectible.collect(this);

        // Update HUD
        if (this.scene.hud) {
            this.scene.hud.updateScore(this.score);
        }

        // Reset cooldown after a short delay
        this.scene.time.delayedCall(100, () => {
            this.collectionCooldown = false;
        });
    }

    showStatusEffect(text, color) {
        // Create floating status text
        const statusText = this.scene.add.text(this.x + 20, this.y - 20, text, {
            fontSize: '14px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 2
        });

        statusText.setDepth(15);
        statusText.setOrigin(0.5);

        // Animate the status text
        this.scene.tweens.add({
            targets: statusText,
            y: statusText.y - 30,
            alpha: 0,
            duration: 1500,
            ease: 'Power2',
            onComplete: () => {
                statusText.destroy();
            }
        });
    }

    giveSpeedBoost() {
        // Temporary speed boost
        const originalSpeed = this.speed;
        this.speed = 200;

        // Visual effect for speed boost
        this.setTint(0xFFFF00);

        // Show speed boost status
        this.showStatusEffect('Speed Boost!', 0xFFFF00);

        // Reset after 5 seconds
        this.scene.time.delayedCall(5000, () => {
            this.speed = originalSpeed;
            this.clearTint();
        });
    }

    getScore() {
        return this.score;
    }

    getCollectiblesCollected() {
        return this.collectiblesCollected;
    }

    getHealth() {
        return this.health;
    }

    getEnergy() {
        return this.energy;
    }

    // Method to be called when player takes damage
    takeDamage(amount) {
        this.health = Math.max(0, this.health - amount);
        this.showStatusEffect(`-${amount} Health`, 0xFF4500);

        // Flash red when taking damage
        this.setTint(0xFF0000);
        this.scene.time.delayedCall(200, () => {
            this.clearTint();
        });

        return this.health <= 0;
    }

    // Method to restore health
    heal(amount) {
        const oldHealth = this.health;
        this.health = Math.min(100, this.health + amount);
        const actualHealing = this.health - oldHealth;

        if (actualHealing > 0) {
            this.showStatusEffect(`+${actualHealing} Health`, 0x32CD32);
        }
    }

    // Reset player stats for new game/level
    resetStats() {
        this.score = 0;
        this.collectiblesCollected = 0;
        this.health = 100;
        this.energy = 100;
    }
}