document.addEventListener('DOMContentLoaded', function() {
    // Game data
    const gameData = {
        title: "Waking Was a Blur",
        metadata: {
            author: "Your Name",
            genre: "Poetic Prose",
            language: "English",
            created_at: "2025-05-09",
            version: "1.0"
        },
        structure: {
            introduction: {
                title: "The Blur of Waking",
                text: "Waking was a blur. The sudden grace that once lay upon us swiftly torn..."
            },
            body: [
                {
                    section_id: 1,
                    theme: "Loss of Grace",
                    paragraph: "The sudden grace that once lay upon us swiftly torn as each time our eye shut the world consumed.",
                    devices: ["imagery", "enjambment", "metaphor"]
                },
                {
                    section_id: 2,
                    theme: "Cyclical Oblivion",
                    paragraph: "Each blink a surrender, a slip deeper into what we cannot name.",
                    devices: ["personification", "alliteration"]
                }
            ],
            reflection: {
                title: "Endless Dreamongade",
                question: "Are we writings in this endless dreamongade?",
                interpretation: {
                    meaning: "A philosophical musing on identity and reality within an eternal dream-state.",
                    open_to_reader: true
                }
            }
        },
        stylistic_elements: {
            tone: "Ethereal, introspective, melancholic",
            point_of_view: "First person plural",
            tense: "Past and present",
            syntax_style: "Fragmented, poetic, non-linear"
        },
        annotations: {
            dreamongade: {
                type: "neologism",
                definition: "A portmanteau of 'dream' and 'promenade', suggesting a surreal, unending journey through dreamscapes."
            }
        }
    };

    // Device explanations for the literary devices
    const deviceExplanations = {
        imagery: "Imagery is descriptive language that appeals to the senses, creating vivid mental pictures.",
        enjambment: "Enjambment is the continuation of a sentence beyond the end of a line, couplet, or stanza.",
        metaphor: "Metaphor is a figure of speech in which a word or phrase is applied to an object or action to which it is not literally applicable.",
        personification: "Personification is the attribution of human qualities to non-human things.",
        alliteration: "Alliteration is the occurrence of the same letter or sound at the beginning of adjacent or closely connected words."
    };

    // Other dreamers' interpretations
    const otherInterpretations = [
        "Perhaps we are all just characters in someone else's dream.",
        "I see it as our consciousness being trapped in an endless cycle of waking and dreaming.",
        "To me, it represents how our perception of reality is constantly shifting and uncertain.",
        "I think it's about how memory works - blurry, dreamlike, and often unreliable.",
        "It reminds me of the Buddhist concept of samsara - the endless cycle of death and rebirth."
    ];

    // Game elements
    const titleScreen = document.getElementById('title-screen');
    const introScreen = document.getElementById('introduction-screen');
    const section1Screen = document.getElementById('section1-screen');
    const section2Screen = document.getElementById('section2-screen');
    const reflectionScreen = document.getElementById('reflection-screen');
    
    const startButton = document.querySelector('.start-button');
    const continueButtons = document.querySelectorAll('.continue-button');
    const words = document.querySelectorAll('.word');
    const deviceExplanation = document.querySelector('.device-explanation');
    const deviceText = document.getElementById('device-text');
    const eye = document.querySelector('.eye');
    const blinkText = document.querySelector('.blink-text');
    const blinkCount = document.getElementById('blink-count');
    const submitButton = document.querySelector('.submit-button');
    const playerInterpretation = document.getElementById('player-interpretation');
    const otherInterpretationsDiv = document.querySelector('.other-interpretations');
    const interpretationList = document.querySelector('.interpretation-list');
    const restartButton = document.querySelector('.restart-button');

    // Navigation between screens
    function showScreen(screen) {
        document.querySelector('.screen.active').classList.remove('active');
        screen.classList.add('active');
    }

    startButton.addEventListener('click', function() {
        showScreen(introScreen);
    });

    continueButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentScreen = this.closest('.screen');
            let nextScreen;
            
            if (currentScreen === introScreen) {
                nextScreen = section1Screen;
            } else if (currentScreen === section1Screen) {
                nextScreen = section2Screen;
            } else if (currentScreen === section2Screen) {
                nextScreen = reflectionScreen;
            }
            
            if (nextScreen) {
                showScreen(nextScreen);
            }
        });
    });

    restartButton.addEventListener('click', function() {
        resetGame();
        showScreen(titleScreen);
    });

    // Section 1: Interactive words and literary devices
    words.forEach(word => {
        word.addEventListener('click', function() {
            const device = this.getAttribute('data-device');
            deviceText.textContent = deviceExplanations[device];
            deviceExplanation.classList.remove('hidden');
            
            // Highlight the word
            words.forEach(w => w.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Section 2: Blinking mechanism
    let blinks = 0;
    eye.addEventListener('click', function() {
        this.classList.add('closed');
        blinkText.classList.add('blurred');
        
        setTimeout(() => {
            this.classList.remove('closed');
            blinkText.classList.remove('blurred');
        }, 500);
        
        blinks++;
        blinkCount.textContent = blinks;
        
        if (blinks >= 5) {
            section2Screen.querySelector('.continue-button').classList.remove('hidden');
        }
    });

    // Reflection section: Submit interpretation
    submitButton.addEventListener('click', function() {
        const interpretation = playerInterpretation.value.trim();
        if (interpretation) {
            // Add player's interpretation to displayed list
            const entry = document.createElement('div');
            entry.classList.add('interpretation-entry');
            entry.textContent = interpretation + " (You)";
            interpretationList.prepend(entry);
            
            // Show other interpretations
            populateOtherInterpretations();
            otherInterpretationsDiv.classList.remove('hidden');
            
            // Clear input
            playerInterpretation.value = '';
        }
    });

    function populateOtherInterpretations() {
        // Only populate if not already populated
        if (interpretationList.children.length <= 1) {
            otherInterpretations.forEach(text => {
                const entry = document.createElement('div');
                entry.classList.add('interpretation-entry');
                entry.textContent = text;
                interpretationList.appendChild(entry);
            });
        }
    }

    function resetGame() {
        // Reset blink counter
        blinks = 0;
        blinkCount.textContent = 0;
        section2Screen.querySelector('.continue-button').classList.add('hidden');
        
        // Reset interpretations
        playerInterpretation.value = '';
        interpretationList.innerHTML = '';
        otherInterpretationsDiv.classList.add('hidden');
        
        // Reset device explanation
        deviceExplanation.classList.add('hidden');
        words.forEach(w => w.classList.remove('active'));
    }

    // Create floating words animation
    function createFloatingWords() {
        const container = document.getElementById('game-container');
        const words = [
            "blur", "grace", "dream", "surrender", 
            "blink", "oblivion", "dreamongade", "writings"
        ];
        
        words.forEach(word => {
            const wordElem = document.createElement('div');
            wordElem.classList.add('floating-word');
            wordElem.textContent = word;
            
            // Random position and animation
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const delay = Math.random() * 30;
            const duration = 15 + Math.random() * 20;
            
            wordElem.style.left = `${x}%`;
            wordElem.style.top = `${y}%`;
            wordElem.style.animationDelay = `${delay}s`;
            wordElem.style.animationDuration = `${duration}s`;
            
            container.appendChild(wordElem);
        });
    }
    
    // Add this to styles.css for floating words
    const style = document.createElement('style');
    style.textContent = `
        .floating-word {
            position: absolute;
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.15);
            pointer-events: none;
            animation: float-word 20s linear infinite;
        }
        
        @keyframes float-word {
            0% { transform: translate(0, 0); }
            25% { transform: translate(50px, 30px); }
            50% { transform: translate(0, 60px); }
            75% { transform: translate(-50px, 30px); }
            100% { transform: translate(0, 0); }
        }
    `;
    document.head.appendChild(style);
    
    createFloatingWords();
});

