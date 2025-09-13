import { CYBERSECURITY_QUESTIONS, CYBERSECURITY_INFO } from '../cyberSecurityQuestions/questions';

export default class HUD {
    constructor(scene) {
        this.scene = scene;
        this.score = 0;
        this.level = 1;
        this.collectiblesFound = 0;
        this.totalCollectibles = 0;
        this.questionActive = false;
        this.infoActive = false;
        this.gameOver = false;

        // Collection tracking for info display
        this.collectionsBeforeInfo = 3; // Show info after 3 collections
        this.currentCollectionCount = 0;
        this.infoShownForLevel = {};

        this.createHUD();
        this.setupQuestionSystem();
    }

    createHUD() {
        // Create HUD background
        this.hudBackground = this.scene.add.graphics();
        this.hudBackground.fillStyle(0x000000, 0.5);
        this.hudBackground.fillRoundedRect(10, 10, 240, 120, 10);
        this.hudBackground.setScrollFactor(0);
        this.hudBackground.setDepth(20);

        // Score display (top left)
        this.scoreLabel = this.scene.add.text(25, 25, 'Score', {
            fontSize: '14px',
            fontFamily: 'Arial',
            color: '#FFD700',
            fontStyle: 'bold'
        });
        this.scoreLabel.setScrollFactor(0);
        this.scoreLabel.setDepth(21);

        this.scoreValue = this.scene.add.text(25, 45, '0', {
            fontSize: '14px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            fontStyle: 'bold'
        });
        this.scoreValue.setScrollFactor(0);
        this.scoreValue.setDepth(21);

        // Items/Collectibles display (top middle)
        this.collectiblesLabel = this.scene.add.text(100, 25, 'Items', {
            fontSize: '14px',
            fontFamily: 'Arial',
            color: '#FF69B4',
            fontStyle: 'bold'
        });
        this.collectiblesLabel.setScrollFactor(0);
        this.collectiblesLabel.setDepth(21);

        this.collectiblesValue = this.scene.add.text(100, 45, '0 / 0', {
            fontSize: '14px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            fontStyle: 'bold'
        });
        this.collectiblesValue.setScrollFactor(0);
        this.collectiblesValue.setDepth(21);

        // Time display (top right)
        this.timeLabel = this.scene.add.text(180, 25, 'Time', {
            fontSize: '14px',
            fontFamily: 'Arial',
            color: '#32CD32',
            fontStyle: 'bold'
        });
        this.timeLabel.setScrollFactor(0);
        this.timeLabel.setDepth(21);

        this.timeValue = this.scene.add.text(180, 45, '00:00', {
            fontSize: '14px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            fontStyle: 'bold'
        });
        this.timeValue.setScrollFactor(0);
        this.timeValue.setDepth(21);

        // Level display (second row, left side)
        this.levelLabel = this.scene.add.text(25, 75, 'Level', {
            fontSize: '14px',
            fontFamily: 'Arial',
            color: '#00FFFF',
            fontStyle: 'bold'
        });
        this.levelLabel.setScrollFactor(0);
        this.levelLabel.setDepth(21);

        this.levelValue = this.scene.add.text(25, 95, '1', {
            fontSize: '14px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            fontStyle: 'bold'
        });
        this.levelValue.setScrollFactor(0);
        this.levelValue.setDepth(21);

        // Progress bar (second row, middle)
        this.createProgressBar();

        // Bonus display (second row, right side)
        this.bonusLabel = this.scene.add.text(180, 75, 'Bonus', {
            fontSize: '14px',
            fontFamily: 'Arial',
            color: '#FF4500',
            fontStyle: 'bold'
        });
        this.bonusLabel.setScrollFactor(0);
        this.bonusLabel.setDepth(21);

        this.bonusValue = this.scene.add.text(180, 95, 'x1.0', {
            fontSize: '14px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            fontStyle: 'bold'
        });
        this.bonusValue.setScrollFactor(0);
        this.bonusValue.setDepth(21);

        // Mini map area
        this.createMiniMap();
    }

    createProgressBar() {
        this.progressBarBg = this.scene.add.graphics();
        this.progressBarBg.fillStyle(0x333333, 0.8);
        this.progressBarBg.fillRoundedRect(100, 85, 70, 12, 6);
        this.progressBarBg.setScrollFactor(0);
        this.progressBarBg.setDepth(21);

        this.progressBarFill = this.scene.add.graphics();
        this.progressBarFill.setScrollFactor(0);
        this.progressBarFill.setDepth(22);

        this.startTime = Date.now();
        this.bonusMultiplier = 1.0;
        this.updateProgressBar();
    }

    createMiniMap() {
        this.miniMapBg = this.scene.add.graphics();
        this.miniMapBg.fillStyle(0x001122, 0.5);
        this.miniMapBg.fillRoundedRect(300, 10, 120, 120, 8);
        this.miniMapBg.lineStyle(2, 0x00FFFF);
        this.miniMapBg.strokeRoundedRect(300, 10, 120, 120, 8);
        this.miniMapBg.setScrollFactor(0);
        this.miniMapBg.setDepth(20);

        this.miniMapLabel = this.scene.add.text(360, 20, 'Map', {
            fontSize: '12px',
            fontFamily: 'Arial',
            color: '#00FFFF',
            fontStyle: 'bold'
        });
        this.miniMapLabel.setOrigin(0.5, 0);
        this.miniMapLabel.setScrollFactor(0);
        this.miniMapLabel.setDepth(21);

        this.playerDot = this.scene.add.graphics();
        this.playerDot.fillStyle(0xFF0000, 1);
        this.playerDot.fillCircle(360, 70, 3);
        this.playerDot.setScrollFactor(0);
        this.playerDot.setDepth(22);

        this.collectibleDots = this.scene.add.group();

        this.playerNameValue = this.scene.add.text(360, 135, 'Player', {
            fontSize: '12px',
            fontFamily: 'Arial',
            color: '#CCCCCC'
        });
        this.playerNameValue.setOrigin(0.5, 0);
        this.playerNameValue.setScrollFactor(0);
        this.playerNameValue.setDepth(21);
    }

    setupQuestionSystem() {
        this.questions = CYBERSECURITY_QUESTIONS.questions;
        this.questionSettings = CYBERSECURITY_QUESTIONS.settings;
        this.cybersecurityInfo = CYBERSECURITY_INFO;  // This line should now work
        this.questionElements = null;
        this.infoElements = null;
        this.currentQuestion = null;
        this.questionTimer = null;
        this.questionTimeRemaining = this.questionSettings.timeLimit;
        this.selectedAnswer = -1;
    }

    // Called when a collectible is picked up
    onCollectibleCollected() {
        this.currentCollectionCount++;

        // Check if we should show cybersecurity info
        if (this.currentCollectionCount >= this.collectionsBeforeInfo &&
            !this.infoShownForLevel[this.level] &&
            !this.infoActive &&
            !this.questionActive) {

            this.showCybersecurityInfo();
            this.infoShownForLevel[this.level] = true;
            this.currentCollectionCount = 0; // Reset counter
        }
    }

    showCybersecurityInfo() {
        if (this.infoActive || this.questionActive || this.gameOver) return;

        const infoData = this.cybersecurityInfo[this.level.toString()];
        if (!infoData) return;

        this.infoActive = true;

        // Hide help text during info display
        if (this.scene.helpTextBg) this.scene.helpTextBg.setVisible(false);
        if (this.scene.helpText) this.scene.helpText.setVisible(false);

        // Pause the game
        if (this.scene.physics) {
            this.scene.physics.pause();
        }

        this.createInfoOverlay(infoData);
    }

    createInfoOverlay(infoData) {
        this.infoElements = {};

        // Semi-transparent background
        this.infoElements.background = this.scene.add.graphics();
        this.infoElements.background.fillStyle(0x000033, 0.9);
        this.infoElements.background.fillRect(0, 0, 800, 600);
        this.infoElements.background.setScrollFactor(0);
        this.infoElements.background.setDepth(25);

        // Info container
        this.infoElements.container = this.scene.add.graphics();
        this.infoElements.container.fillStyle(0x1a1a3a, 0.98);
        this.infoElements.container.lineStyle(3, 0x4488ff);
        this.infoElements.container.fillRoundedRect(50, 60, 700, 480, 15);
        this.infoElements.container.strokeRoundedRect(50, 60, 700, 480, 15);
        this.infoElements.container.setScrollFactor(0);
        this.infoElements.container.setDepth(26);

        // Header with icon
        this.infoElements.icon = this.scene.add.text(150, 90, infoData.icon, {
            fontSize: '48px'
        });
        this.infoElements.icon.setOrigin(0.5, 0);
        this.infoElements.icon.setScrollFactor(0);
        this.infoElements.icon.setDepth(27);

        this.infoElements.title = this.scene.add.text(400, 100, infoData.title, {
            fontSize: '28px',
            fontFamily: 'Arial',
            color: '#4488ff',
            fontStyle: 'bold',
            align: 'center'
        });
        this.infoElements.title.setOrigin(0.5, 0);
        this.infoElements.title.setScrollFactor(0);
        this.infoElements.title.setDepth(27);

        // Main content
        this.infoElements.content = this.scene.add.text(400, 160, infoData.content, {
            fontSize: '16px',
            fontFamily: 'Arial',
            color: '#ffffff',
            wordWrap: { width: 600 },
            align: 'center',
            lineSpacing: 8
        });
        this.infoElements.content.setOrigin(0.5, 0);
        this.infoElements.content.setScrollFactor(0);
        this.infoElements.content.setDepth(27);

        // Key points header
        this.infoElements.keyPointsHeader = this.scene.add.text(400, 280, 'Key Security Tips:', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#ffaa44',
            fontStyle: 'bold'
        });
        this.infoElements.keyPointsHeader.setOrigin(0.5, 0);
        this.infoElements.keyPointsHeader.setScrollFactor(0);
        this.infoElements.keyPointsHeader.setDepth(27);

        // Key points list
        this.infoElements.keyPoints = [];
        infoData.keyPoints.forEach((point, index) => {
            const pointText = this.scene.add.text(120, 320 + (index * 25), `• ${point}`, {
                fontSize: '14px',
                fontFamily: 'Arial',
                color: '#cccccc',
                wordWrap: { width: 560 }
            });
            pointText.setScrollFactor(0);
            pointText.setDepth(27);
            this.infoElements.keyPoints.push(pointText);
        });

        // Continue button
        this.createInfoContinueButton();

        // Auto-continue after reading time (optional)
        setTimeout(() => {
            if (this.infoElements && this.infoActive) {
                this.infoElements.continueBtn.setTint(0x44ff44);
                this.infoElements.continueText.setColor('#44ff44');
                this.infoElements.continueText.setText('CLICK TO CONTINUE');
            }
        }, 8000); // 8 seconds reading time
    }

    createInfoContinueButton() {
        this.infoElements.continueBtn = this.scene.add.graphics();
        this.infoElements.continueBtn.fillStyle(0x4488ff, 0.9);
        this.infoElements.continueBtn.lineStyle(2, 0x66aaff);
        this.infoElements.continueBtn.fillRoundedRect(320, 470, 160, 40, 10);
        this.infoElements.continueBtn.strokeRoundedRect(320, 470, 160, 40, 10);
        this.infoElements.continueBtn.setScrollFactor(0);
        this.infoElements.continueBtn.setDepth(27);
        this.infoElements.continueBtn.setInteractive(new Phaser.Geom.Rectangle(320, 470, 160, 40), Phaser.Geom.Rectangle.Contains);

        this.infoElements.continueText = this.scene.add.text(400, 490, 'CONTINUE', {
            fontSize: '16px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        });
        this.infoElements.continueText.setOrigin(0.5);
        this.infoElements.continueText.setScrollFactor(0);
        this.infoElements.continueText.setDepth(28);

        this.infoElements.continueBtn.on('pointerdown', () => this.closeInfoOverlay());

        // Hover effects
        this.infoElements.continueBtn.on('pointerover', () => {
            this.infoElements.continueBtn.setTint(0xaaccff);
        });

        this.infoElements.continueBtn.on('pointerout', () => {
            this.infoElements.continueBtn.clearTint();
        });
    }

    closeInfoOverlay() {
        if (!this.infoElements) return;

        // Remove event handlers
        if (this.infoElements.continueBtn) {
            this.infoElements.continueBtn.removeAllListeners();
            this.infoElements.continueBtn.disableInteractive();
        }

        // Destroy all elements
        Object.values(this.infoElements).forEach(element => {
            if (Array.isArray(element)) {
                element.forEach(subElement => {
                    if (subElement && subElement.destroy && !subElement.destroyed) {
                        subElement.destroy();
                    }
                });
            } else if (element && element.destroy && !element.destroyed) {
                element.destroy();
            }
        });

        this.infoElements = null;
        this.infoActive = false;

        // Show help text again after info closes
        if (this.scene.helpTextBg) this.scene.helpTextBg.setVisible(true);
        if (this.scene.helpText) this.scene.helpText.setVisible(true);

        // Resume game - NO automatic question trigger here
        if (this.scene.physics) {
            this.scene.physics.resume();
        }
    }

    // Method to trigger question when level advances or collectibles are completed
    triggerLevelQuestion() {
        if (this.gameOver || this.questionActive) return;

        if (!this.questions[this.level.toString()]) {
            console.log(`No question found for level ${this.level}`);
            return;
        }

        // When called from level up, skip info and go straight to question
        this.showQuestion();
    }

    showQuestion() {
        if (this.questionActive || this.gameOver) return;

        this.questionActive = true;
        this.currentQuestion = this.questions[this.level.toString()];
        this.questionTimeRemaining = this.questionSettings.timeLimit;
        this.selectedAnswer = -1;

        // Pause the game
        if (this.scene.physics) {
            this.scene.physics.pause();
        }

        this.createQuestionOverlay();
        this.startQuestionTimer();
    }

    createQuestionOverlay() {
        this.questionElements = {};

        // Semi-transparent background
        this.questionElements.background = this.scene.add.graphics();
        this.questionElements.background.fillStyle(0x000000, 0.85);
        this.questionElements.background.fillRect(0, 0, 800, 600);
        this.questionElements.background.setScrollFactor(0);
        this.questionElements.background.setDepth(30);

        // Question container
        this.questionElements.container = this.scene.add.graphics();
        this.questionElements.container.fillStyle(0x1a1a2e, 0.98);
        this.questionElements.container.lineStyle(3, 0x00ff88);
        this.questionElements.container.fillRoundedRect(50, 80, 700, 450, 15);
        this.questionElements.container.strokeRoundedRect(50, 80, 700, 450, 15);
        this.questionElements.container.setScrollFactor(0);
        this.questionElements.container.setDepth(31);

        // Header
        this.questionElements.header = this.scene.add.text(400, 110, `LEVEL ${this.level} - CYBERSECURITY CHALLENGE`, {
            fontSize: '22px',
            fontFamily: 'Arial',
            color: '#00ff88',
            fontStyle: 'bold'
        });
        this.questionElements.header.setOrigin(0.5, 0);
        this.questionElements.header.setScrollFactor(0);
        this.questionElements.header.setDepth(32);

        // Timer display
        this.questionElements.timer = this.scene.add.text(400, 140, `⏰ Time: ${this.questionTimeRemaining}s`, {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#ffaa00',
            fontStyle: 'bold'
        });
        this.questionElements.timer.setOrigin(0.5, 0);
        this.questionElements.timer.setScrollFactor(0);
        this.questionElements.timer.setDepth(32);

        // Difficulty badge
        this.questionElements.difficulty = this.scene.add.text(680, 110, this.currentQuestion.difficulty.toUpperCase(), {
            fontSize: '12px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold',
            backgroundColor: this.getDifficultyColor(this.currentQuestion.difficulty),
            padding: { x: 8, y: 4 }
        });
        this.questionElements.difficulty.setOrigin(0.5, 0);
        this.questionElements.difficulty.setScrollFactor(0);
        this.questionElements.difficulty.setDepth(32);

        // Question text
        this.questionElements.question = this.scene.add.text(400, 190, this.currentQuestion.question, {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold',
            wordWrap: { width: 600 },
            align: 'center'
        });
        this.questionElements.question.setOrigin(0.5, 0);
        this.questionElements.question.setScrollFactor(0);
        this.questionElements.question.setDepth(32);

        // Answer options
        this.questionElements.options = [];
        this.questionElements.optionBgs = [];

        this.currentQuestion.options.forEach((option, index) => {
            const y = 260 + (index * 55);

            // Option background
            const optionBg = this.scene.add.graphics();
            optionBg.fillStyle(0x2d2d44, 0.9);
            optionBg.lineStyle(2, 0x666666);
            optionBg.fillRoundedRect(80, y - 20, 640, 45, 12);
            optionBg.strokeRoundedRect(80, y - 20, 640, 45, 12);
            optionBg.setScrollFactor(0);
            optionBg.setDepth(31);
            optionBg.setInteractive(new Phaser.Geom.Rectangle(80, y - 20, 640, 45), Phaser.Geom.Rectangle.Contains);

            // Option text
            const optionText = this.scene.add.text(100, y, option, {
                fontSize: '16px',
                fontFamily: 'Arial',
                color: '#ffffff'
            });
            optionText.setOrigin(0, 0.5);
            optionText.setScrollFactor(0);
            optionText.setDepth(32);

            this.questionElements.options.push(optionText);
            this.questionElements.optionBgs.push(optionBg);

            // Event handlers
            optionBg.on('pointerdown', () => this.selectAnswer(index));
            optionBg.on('pointerover', () => this.hoverOption(index, y, true));
            optionBg.on('pointerout', () => this.hoverOption(index, y, false));
        });

        // Submit button
        this.createSubmitButton();
    }

    createSubmitButton() {
        this.questionElements.submitBtn = this.scene.add.graphics();
        this.questionElements.submitBtn.fillStyle(0x007700, 0.9);
        this.questionElements.submitBtn.lineStyle(2, 0x00ff00);
        this.questionElements.submitBtn.fillRoundedRect(320, 480, 160, 40, 10);
        this.questionElements.submitBtn.strokeRoundedRect(320, 480, 160, 40, 10);
        this.questionElements.submitBtn.setScrollFactor(0);
        this.questionElements.submitBtn.setDepth(31);
        this.questionElements.submitBtn.setInteractive(new Phaser.Geom.Rectangle(320, 480, 160, 40), Phaser.Geom.Rectangle.Contains);

        this.questionElements.submitText = this.scene.add.text(400, 500, 'SUBMIT ANSWER', {
            fontSize: '16px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        });
        this.questionElements.submitText.setOrigin(0.5);
        this.questionElements.submitText.setScrollFactor(0);
        this.questionElements.submitText.setDepth(32);

        this.questionElements.submitBtn.on('pointerdown', () => this.submitAnswer());
    }

    hoverOption(index, y, isHover) {
        // Safety check to prevent errors when elements are destroyed
        if (!this.questionElements || !this.questionElements.optionBgs || this.selectedAnswer === index) {
            return;
        }

        const bg = this.questionElements.optionBgs[index];
        if (!bg || bg.destroyed) {
            return;
        }

        bg.clear();

        if (isHover) {
            bg.fillStyle(0x404060, 0.9);
            bg.lineStyle(2, 0x00ff88);
        } else {
            bg.fillStyle(0x2d2d44, 0.9);
            bg.lineStyle(2, 0x666666);
        }

        bg.fillRoundedRect(80, y - 20, 640, 45, 12);
        bg.strokeRoundedRect(80, y - 20, 640, 45, 12);
    }

    selectAnswer(index) {
        // Safety check to prevent errors when elements are destroyed
        if (!this.questionElements || !this.questionElements.optionBgs || this.selectedAnswer === index) {
            return;
        }

        // Clear previous selection
        if (this.selectedAnswer !== -1) {
            const prevY = 260 + (this.selectedAnswer * 55);
            const prevBg = this.questionElements.optionBgs[this.selectedAnswer];

            if (prevBg && !prevBg.destroyed) {
                prevBg.clear();
                prevBg.fillStyle(0x2d2d44, 0.9);
                prevBg.lineStyle(2, 0x666666);
                prevBg.fillRoundedRect(80, prevY - 20, 640, 45, 12);
                prevBg.strokeRoundedRect(80, prevY - 20, 640, 45, 12);
            }
        }

        // Highlight new selection
        this.selectedAnswer = index;
        const y = 260 + (index * 55);
        const bg = this.questionElements.optionBgs[index];

        if (bg && !bg.destroyed) {
            bg.clear();
            bg.fillStyle(0x0066cc, 0.9);
            bg.lineStyle(3, 0x00aaff);
            bg.fillRoundedRect(80, y - 20, 640, 45, 12);
            bg.strokeRoundedRect(80, y - 20, 640, 45, 12);
        }
    }

    startQuestionTimer() {
        this.questionTimer = setInterval(() => {
            this.questionTimeRemaining--;

            if (this.questionElements && this.questionElements.timer) {
                this.questionElements.timer.setText(`⏰ Time: ${this.questionTimeRemaining}s`);

                // Change color when time is running low
                if (this.questionTimeRemaining <= 10) {
                    this.questionElements.timer.setColor('#ff4444');
                } else if (this.questionTimeRemaining <= 20) {
                    this.questionElements.timer.setColor('#ffaa00');
                }
            }

            if (this.questionTimeRemaining <= 0) {
                this.timeUp();
            }
        }, 1000);
    }

    stopQuestionTimer() {
        if (this.questionTimer) {
            clearInterval(this.questionTimer);
            this.questionTimer = null;
        }
    }

    timeUp() {
        this.stopQuestionTimer();
        this.showMessage("Time's Up!", '#ff4444');

        setTimeout(() => {
            this.processAnswer();
        }, 1500);
    }

    submitAnswer() {
        // Safety check to prevent errors when elements are destroyed
        if (!this.questionElements || this.selectedAnswer === -1) {
            if (this.questionElements) {
                this.showMessage("Please select an answer!", '#ffaa00');
            }
            return;
        }

        this.stopQuestionTimer();
        this.processAnswer();
    }

    processAnswer() {
        const isCorrect = this.selectedAnswer === this.currentQuestion.correct;

        // Show correct answer highlighting
        this.highlightAnswers();

        // Calculate score if correct
        let earnedPoints = 0;
        if (isCorrect) {
            earnedPoints = this.currentQuestion.points;
            // Time bonus
            const timeBonus = Math.floor((this.questionTimeRemaining / this.questionSettings.timeLimit) * 50);
            earnedPoints += timeBonus;
            this.updateScore(this.score + earnedPoints);
        }

        // Show result after delay
        setTimeout(() => {
            if (isCorrect) {
                this.showCorrectAnswer(earnedPoints);
            } else {
                this.showIncorrectAnswer();
            }
        }, 1500); // Reduced delay to make it feel more responsive
    }

    highlightAnswers() {
        if (!this.questionElements || !this.questionElements.optionBgs) {
            return;
        }

        this.questionElements.optionBgs.forEach((bg, index) => {
            if (!bg || bg.destroyed) {
                return;
            }

            const y = 260 + (index * 55);

            if (index === this.currentQuestion.correct) {
                // Correct answer - green
                bg.clear();
                bg.fillStyle(0x006600, 0.9);
                bg.lineStyle(3, 0x00ff00);
                bg.fillRoundedRect(80, y - 20, 640, 45, 12);
                bg.strokeRoundedRect(80, y - 20, 640, 45, 12);
            } else if (index === this.selectedAnswer && index !== this.currentQuestion.correct) {
                // Wrong selected answer - red
                bg.clear();
                bg.fillStyle(0x660000, 0.9);
                bg.lineStyle(3, 0xff0000);
                bg.fillRoundedRect(80, y - 20, 640, 45, 12);
                bg.strokeRoundedRect(80, y - 20, 640, 45, 12);
            }
        });
    }

    showCorrectAnswer(earnedPoints) {
        this.showResultMessage('CORRECT!', '#00ff88', `+${earnedPoints} points`, true);
    }

    showIncorrectAnswer() {
        this.showResultMessage('INCORRECT!', '#ff4444', 'Game Over', false);
    }

    showResultMessage(title, color, subtitle, success) {
        // Store reference to elements that need to be cleaned up
        const elementsToCleanup = [];

        // Create result overlay
        const resultBg = this.scene.add.graphics();
        resultBg.fillStyle(0x000000, 0.8);
        resultBg.fillRect(0, 0, 800, 600);
        resultBg.setScrollFactor(0);
        resultBg.setDepth(40);
        elementsToCleanup.push(resultBg);

        const resultTitle = this.scene.add.text(400, 250, title, {
            fontSize: '48px',
            fontFamily: 'Arial',
            color: color,
            fontStyle: 'bold'
        });
        resultTitle.setOrigin(0.5);
        resultTitle.setScrollFactor(0);
        resultTitle.setDepth(41);
        elementsToCleanup.push(resultTitle);

        const resultSubtitle = this.scene.add.text(400, 320, subtitle, {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ffffff'
        });
        resultSubtitle.setOrigin(0.5);
        resultSubtitle.setScrollFactor(0);
        resultSubtitle.setDepth(41);
        elementsToCleanup.push(resultSubtitle);

        // Show explanation
        if (this.questionSettings.showExplanation) {
            const explanation = this.scene.add.text(400, 370, this.currentQuestion.explanation, {
                fontSize: '16px',
                fontFamily: 'Arial',
                color: '#cccccc',
                wordWrap: { width: 600 },
                align: 'center'
            });
            explanation.setOrigin(0.5, 0);
            explanation.setScrollFactor(0);
            explanation.setDepth(41);
            elementsToCleanup.push(explanation);
        }

        // Close the question overlay immediately (don't wait for the delay)
        this.closeQuestionOverlay();

        // Continue/Game Over after delay
        setTimeout(() => {
            // Clean up result elements
            elementsToCleanup.forEach(element => {
                if (element && element.destroy && !element.destroyed) {
                    element.destroy();
                }
            });

            if (success) {
                this.continueGame();
            } else {
                this.triggerGameOver();
            }
        }, 4000);
    }

    continueGame() {
        this.closeQuestionOverlay();
        this.questionActive = false;

        // Resume game
        if (this.scene.physics) {
            this.scene.physics.resume();
        }

        // Reset question-related variables
        this.currentQuestion = null;
        this.selectedAnswer = -1;
        this.questionTimeRemaining = this.questionSettings.timeLimit;
    }

    triggerGameOver() {
        this.gameOver = true;
        this.closeQuestionOverlay();

        // Trigger game over in scene
        if (this.scene.gameOver) {
            this.scene.gameOver();
        } else {
            // Fallback game over display
            this.showGameOverScreen();
        }
    }

    showGameOverScreen() {
        const gameOverBg = this.scene.add.graphics();
        gameOverBg.fillStyle(0x000000, 0.9);
        gameOverBg.fillRect(0, 0, 800, 600);
        gameOverBg.setScrollFactor(0);
        gameOverBg.setDepth(50);

        const gameOverTitle = this.scene.add.text(400, 200, 'GAME OVER', {
            fontSize: '64px',
            fontFamily: 'Arial',
            color: '#ff4444',
            fontStyle: 'bold'
        });
        gameOverTitle.setOrigin(0.5);
        gameOverTitle.setScrollFactor(0);
        gameOverTitle.setDepth(51);

        const finalScore = this.scene.add.text(400, 280, `Final Score: ${this.score}`, {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#ffffff'
        });
        finalScore.setOrigin(0.5);
        finalScore.setScrollFactor(0);
        finalScore.setDepth(51);

        const restartText = this.scene.add.text(400, 350, 'Press R to Restart', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#00ff88'
        });
        restartText.setOrigin(0.5);
        restartText.setScrollFactor(0);
        restartText.setDepth(51);

        // Add restart functionality
        this.scene.input.keyboard.once('keydown-R', () => {
            this.scene.scene.restart();
        });
    }

    closeQuestionOverlay() {
        if (this.questionElements) {
            // Remove event handlers from option backgrounds before destroying
            if (this.questionElements.optionBgs) {
                this.questionElements.optionBgs.forEach(bg => {
                    if (bg && !bg.destroyed) {
                        bg.removeAllListeners();
                        bg.disableInteractive();
                    }
                });
            }

            // Remove event handlers from submit button
            if (this.questionElements.submitBtn && !this.questionElements.submitBtn.destroyed) {
                this.questionElements.submitBtn.removeAllListeners();
                this.questionElements.submitBtn.disableInteractive();
            }

            // Destroy all elements safely
            Object.values(this.questionElements).forEach(element => {
                // Handle arrays of elements (like optionBgs and options)
                if (Array.isArray(element)) {
                    element.forEach(subElement => {
                        if (subElement && subElement.destroy && !subElement.destroyed) {
                            subElement.destroy();
                        }
                    });
                } else if (element && element.destroy && !element.destroyed) {
                    element.destroy();
                }
            });

            this.questionElements = null;
        }
    }

    showMessage(text, color) {
        const message = this.scene.add.text(400, 550, text, {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: color,
            fontStyle: 'bold'
        });
        message.setOrigin(0.5);
        message.setScrollFactor(0);
        message.setDepth(35);

        // Fade out message after 2 seconds
        this.scene.tweens.add({
            targets: message,
            alpha: 0,
            duration: 2000,
            onComplete: () => message.destroy()
        });
    }

    getDifficultyColor(difficulty) {
        switch (difficulty.toLowerCase()) {
            case 'easy': return '#4CAF50';
            case 'medium': return '#FF9800';
            case 'hard': return '#F44336';
            case 'expert': return '#9C27B0';
            default: return '#666666';
        }
    }

    updateScore(newScore) {
        this.score = newScore;
        this.scoreValue.setText(this.score.toString());

        // Add score animation
        this.scene.tweens.add({
            targets: this.scoreValue,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 150,
            yoyo: true,
            ease: 'Power2'
        });

        // Update level based on score
        const newLevel = Math.floor(this.score / 500) + 1;
        if (newLevel > this.level) {
            this.levelUp(newLevel);
        }
    }

    levelUp(newLevel) {
        this.level = newLevel;
        this.levelValue.setText(this.level.toString());

        // Level up animation
        this.scene.tweens.add({
            targets: [this.levelLabel, this.levelValue],
            scaleX: 1.5,
            scaleY: 1.5,
            duration: 300,
            yoyo: true,
            ease: 'Back.easeOut'
        });

        // Increase bonus multiplier
        this.bonusMultiplier += 0.1;
        this.bonusValue.setText(`x${this.bonusMultiplier.toFixed(1)}`);

        // Show level up message
        this.showLevelUpMessage();

        // Reset collection counter for new level
        this.currentCollectionCount = 0;

        // ONLY show question when leveling up (skip info)
        setTimeout(() => {
            this.showQuestion();
        }, 2000);
    }

    showLevelUpMessage() {
        const levelUpText = this.scene.add.text(400, 300, 'LEVEL UP!', {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#FFD700',
            stroke: '#000000',
            strokeThickness: 4,
            fontStyle: 'bold'
        });

        levelUpText.setOrigin(0.5);
        levelUpText.setScrollFactor(0);
        levelUpText.setDepth(25);

        // Animate level up text
        this.scene.tweens.add({
            targets: levelUpText,
            scaleX: 1.5,
            scaleY: 1.5,
            alpha: 0,
            y: 250,
            duration: 2000,
            ease: 'Power2',
            onComplete: () => {
                levelUpText.destroy();
            }
        });
    }

    updateCollectibles(found, total) {
        this.collectiblesFound = found;
        this.totalCollectibles = total;
        this.collectiblesValue.setText(`${found} / ${total}`);
        this.updateProgressBar();

        // If all collectibles found, trigger question (but show info first if not shown)
        if (found === total && total > 0) {
            setTimeout(() => {
                this.triggerLevelQuestion();
            }, 1000);
        }
    }

    updateProgressBar() {
        this.progressBarFill.clear();

        if (this.totalCollectibles > 0) {
            const progress = this.collectiblesFound / this.totalCollectibles;
            const barWidth = 70 * progress;

            // Choose color based on progress
            let color = 0xFF4500; // Red
            if (progress > 0.3) color = 0xFFD700; // Gold
            if (progress > 0.6) color = 0x32CD32; // Green
            if (progress === 1.0) color = 0x00FFFF; // Cyan

            this.progressBarFill.fillStyle(color, 0.9);
            this.progressBarFill.fillRoundedRect(100, 85, barWidth, 12, 6);
        }
    }

    updateTime() {
        const elapsed = Date.now() - this.startTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        this.timeValue.setText(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }

    updateMiniMap(playerX, playerY, mapWidth, mapHeight, collectibles) {
        // Update player position on mini map
        const miniMapWidth = 120;
        const miniMapHeight = 120;
        const miniMapX = 300;
        const miniMapY = 10;

        const playerMiniX = miniMapX + (playerX / mapWidth) * miniMapWidth;
        const playerMiniY = miniMapY + (playerY / mapHeight) * miniMapHeight;

        this.playerDot.clear();
        this.playerDot.fillStyle(0xFF0000, 1);
        this.playerDot.fillCircle(playerMiniX, playerMiniY, 3);

        // Update collectible dots
        this.updateCollectibleDots(collectibles, mapWidth, mapHeight, miniMapX, miniMapY, miniMapWidth, miniMapHeight);
    }

    updateCollectibleDots(collectibles, mapWidth, mapHeight, miniMapX, miniMapY, miniMapWidth, miniMapHeight) {
        // Clear existing dots
        this.collectibleDots.clear(true, true);

        // Add dots for remaining collectibles
        collectibles.forEach(collectible => {
            const dotX = miniMapX + (collectible.x / mapWidth) * miniMapWidth;
            const dotY = miniMapY + (collectible.y / mapHeight) * miniMapHeight;

            const dot = this.scene.add.graphics();
            dot.fillStyle(0xFFD700, 0.8);
            dot.fillCircle(dotX, dotY, 1.5);
            dot.setScrollFactor(0);
            dot.setDepth(22);

            this.collectibleDots.add(dot);
        });
    }

    setPlayerName(name) {
        this.playerNameValue.setText(name);
    }

    getBonusMultiplier() {
        return this.bonusMultiplier;
    }

    // Method to manually trigger question (can be called from game scenes)
    askQuestion() {
        if (!this.questionActive && !this.gameOver) {
            this.triggerLevelQuestion();
        }
    }

    // Check if question is available for current level
    hasQuestionForLevel(level) {
        return Boolean(this.questions[level.toString()]);
    }

    // Get current question status
    isQuestionActive() {
        return this.questionActive || this.infoActive;
    }

    // Method to be called when collectibles are collected (call this from your game scene)
    collectItem() {
        this.onCollectibleCollected();
    }

    // Method to manually show info (for testing or special triggers)
    showInfoForCurrentLevel() {
        if (!this.infoShownForLevel[this.level] && this.cybersecurityInfo[this.level.toString()]) {
            this.showCybersecurityInfo();
            this.infoShownForLevel[this.level] = true;
        }
    }

    // Reset info shown status (useful for testing or restarting)
    resetInfoShown() {
        this.infoShownForLevel = {};
        this.currentCollectionCount = 0;
    }

    // Configuration methods
    setCollectionsBeforeInfo(count) {
        this.collectionsBeforeInfo = Math.max(1, count);
    }

    getCollectionsBeforeInfo() {
        return this.collectionsBeforeInfo;
    }

    getCurrentCollectionCount() {
        return this.currentCollectionCount;
    }

    destroy() {
        // Stop any running timers
        this.stopQuestionTimer();

        // Close overlays
        this.closeQuestionOverlay();
        this.closeInfoOverlay();

        // Clean up all HUD elements
        if (this.hudBackground) this.hudBackground.destroy();
        if (this.scoreLabel) this.scoreLabel.destroy();
        if (this.scoreValue) this.scoreValue.destroy();
        if (this.levelLabel) this.levelLabel.destroy();
        if (this.levelValue) this.levelValue.destroy();
        if (this.collectiblesLabel) this.collectiblesLabel.destroy();
        if (this.collectiblesValue) this.collectiblesValue.destroy();
        if (this.progressBarBg) this.progressBarBg.destroy();
        if (this.progressBarFill) this.progressBarFill.destroy();
        if (this.miniMapBg) this.miniMapBg.destroy();
        if (this.miniMapLabel) this.miniMapLabel.destroy();
        if (this.playerDot) this.playerDot.destroy();
        if (this.collectibleDots) this.collectibleDots.destroy();
        if (this.timeLabel) this.timeLabel.destroy();
        if (this.timeValue) this.timeValue.destroy();
        if (this.bonusLabel) this.bonusLabel.destroy();
        if (this.bonusValue) this.bonusValue.destroy();
        if (this.playerNameValue) this.playerNameValue.destroy();
    }
}