
document.addEventListener('DOMContentLoaded', function() {

    const textArray = ["DEVELOPER", "ENGINEER", "INNOVATOR"];
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

    const projectItems = document.getElementById('projectItems');
    const projectImage = document.getElementById('projectImage');
    const projectDescription = document.getElementById('projectDescription');
    const menuItems = document.querySelectorAll('.vertical-menu-item');
    const toolsDescription = document.getElementById('tools'); 


    const projectDescriptions = {
        'cine-fm': "Cine.fm is a movie recommendation website where users can discover new movies based on their preferences.",
        'ecotrackr': "EcoTrackr is a web application designed to help users track their carbon footprint and adopt more sustainable lifestyle choices.",
        'rust-web-crawler': "Rust Web Crawler is a command-line tool built with Rust programming language for scraping and crawling websites.",
        'portfolio-website': "Portfolio Website is a personal portfolio showcasing skills, projects, and achievements of the developer.",
        'snake-game': "Snake Game is a classic arcade game implemented using HTML, CSS, and JavaScript."
    };

    const toolsDescriptions = {
        'cine-fm': "python \n pandas \n numpy \n scikitlearn \n streamlit \n rfargrg \n saggfsg \n fsfgfgbg",
        'ecotrackr': "python \n pandas \n numpy \n scikitlearn \n streamlit \n rfargrg \n saggfsg \n fsfgfgbg",
        'rust-web-crawler': "Rust Web Crawler is a command-line tool built with Rust programming language for scraping and crawling websites.",
        'portfolio-website': "Portfolio Website is a personal portfolio showcasing skills, projects, and achievements of the developer.",
        'snake-game': "Snake Game is a classic arcade game implemented using HTML, CSS, and JavaScript."
    };

    function showProjectItems(projectName) {
        // Set the project image source and description
        projectImage.src = `images/${projectName}.png`; 
        projectImage.alt = `${projectName} Image`; 
        projectDescription.textContent = projectDescriptions[projectName];
        toolsDescription.textContent = toolsDescriptions[projectName]; 
      
        // Slide out animation for previous project items
        const previousProjectItems = document.querySelectorAll('.project.slide-in');
        previousProjectItems.forEach(function (item) {
          item.classList.remove('slide-in');
          item.classList.add('slide-out');
        });
      
        setTimeout(function() {

            projectItems.style.display = 'block';
      
          projectItems.classList.remove('slide-out');
      
          // Add slide-in class 
          projectItems.classList.add('slide-in');
        }, 500); 
      }
      
      function setupMenuItems() {
        menuItems.forEach(function (menuItem) {
          menuItem.addEventListener('click', function (event) {
            event.preventDefault(); 
      
            // Remove any previously selected menu item
            menuItems.forEach(function (item) {
              item.classList.remove('selected');
            });
      
            this.classList.add('selected');
      
            const projectName = this.getAttribute('data-project');
      
            showProjectItems(projectName);
          });
        });
      
        // Initially show the project items
        showProjectItems(menuItems[0].getAttribute('data-project'));
      }
      
      setupMenuItems();

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

});