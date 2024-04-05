const textArray = ["DEVELOPER", "ENGINEER", "CREATIVE"];
const traitsBox = document.getElementById("traitsBox");
const title = document.getElementById("nameText"); 

let currentIndex = 0;
let currentText = "";
let letterIndex = 0;
let scrambleInterval;

function startScramble() {
    scrambleInterval = setInterval(() => {
        if (letterIndex <= textArray[currentIndex].length) {
            scrambleWord();
        } else {
            // If reached end of current word, pause for 1 second before transitioning to the next word
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % textArray.length;
                letterIndex = 0;
            }, 1000); 
        }
    }, 150);
}

function scrambleWord() {
    currentText = textArray[currentIndex].slice(0, letterIndex);
    for (let i = letterIndex; i < textArray[currentIndex].length; i++) {
        currentText += randomChar(); // Replace remaining characters with random ones
    }
    traitsBox.textContent = currentText;
    letterIndex++;
}

function randomChar() {
    const characters = "01";
    return characters.charAt(Math.floor(Math.random() * characters.length));
}


// Hover effect on nameText
if (title) {
    title.addEventListener("mouseenter", () => {
        gsap.to(".distort feDisplacementMap", 1, {
            attr: {
                scale: 45
            },
            ease: "circ.out"
        });
        gsap.to(".distort feTurbulence", 1, {
            attr: {
                baseFrequency: '2.08 .08'
            },
            ease: "circ.out"
        }, 1);
        gsap.to(title, 1, {
            fontVariationSettings: "'wght' 650",
            ease: "back.out"
        });
    });
    title.addEventListener("mouseleave", () => {
        gsap.to(".distort feDisplacementMap", 1, {
            attr: {
                scale: 0
            },
            ease: "circ.out"
        }, 1);
        gsap.to(".distort feTurbulence", 1, {
            attr: {
                baseFrequency: '2.01 .01'
            },
            ease: "circ.out"
        }, 1);
        gsap.to(title, 1, {
            fontVariationSettings: "'wght' 700",
            ease: "back.out"
        }, 1);
    });
}


startScramble();
