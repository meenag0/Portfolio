

document.addEventListener('DOMContentLoaded', function() {

    
    const textArray = ["DEVELOPER", "ENGINEER", "INNOVATOR"];
    const traitsBox = document.getElementById("traitsBox");
    const title = document.getElementById("nameText"); 

    let currentIndex = 0;
    let currentText = "";
    let letterIndex = 0;
    let scrambleInterval;

    traitsBox.textContent = "00000000"; 

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

    startScramble();


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
    
        const navLinks = document.querySelectorAll('.nav-link');
  
        navLinks.forEach(link => {
          link.addEventListener('click', function() {
            navLinks.forEach(link => {
              link.classList.remove('nav-link-active');
            });
            this.parentNode.classList.add('nav-link-active');
          });
        });
    
    const projectItems = document.getElementById('projectItems');
    const menu = document.querySelector('.vertical-menu');
    const menuItems = document.querySelectorAll('.vertical-menu-item');
    const projectsText = document.querySelector('.projectsText'); 
    const expText = document.getElementById("expText");
    const flexExp = document.getElementById("flexExp");
    const interestText = document.querySelector('.button'); 
    const homeCont = document.getElementById("myName"); 
    const conText =  document.querySelector('.connectText');


    var workLink = document.querySelector('a[href="#work"]');
    var homeLink = document.querySelector('a[href="#home"]');
    var connectLink = document.querySelector('a[href="#connect"]');

    workLink.addEventListener('click', function(e) {
        e.preventDefault();
        projectsText.scrollIntoView({ behavior: 'smooth' });
      });

      var homeLink = document.querySelector('.nav-link-active a');
      homeLink.addEventListener('click', function(event) {
        event.preventDefault();
        var homeSection = document.getElementById("s1");
        homeSection.scrollIntoView({ behavior: 'smooth' });
      });

      connectLink.addEventListener('click', function(event) {
        event.preventDefault();
        var connectSection = document.getElementById("connectText");
        connectSection.scrollIntoView({ behavior: 'smooth' });
      });
    
    const projectDescriptions = {
        'cine-fm': "cine.fm is a web application that uses machine learning to generate a playlist based on the user’s selection from 50,000+ movies. It was developed by conducting sentiment analysis using NLP transformers from hugging face, on the movie-descriptions gathered from wikipedia, and song lyrics acquired through the spotify and genius apis. It utilizes content-based filtering to generate the playlist based on a similarity matrix.",
        'ecotrackr': "EcoTrackr is a cross-platform mobile app I’m currently working on that allows users to track their carbon footprint, develop habits to live more eco-consciously, and see information related to the environment, such as air quality, solar distribution, and nearby conservatories/trails. It’s built using react-native, utilizing external apis as well as a backend server to implement a RESTful architecture for handling HTTP requests and responses.",
        'rust-web-crawler': "2Read is a Rust-based web scraping application that generates a reading list by gathering articles from some of my favourite publications-Quanta Magazine, Towards Data Science, Wired, and Scientific American. It utilizes reqwest for HTTP requests, scraper for HTML parsing, and actix-web for building the server. Asynchronous tasks are managed using async-std. The frontend uses Fetch API to asyncly retrieve article data from the server",
        'portfolio-website': "This is my portfolio website! It showcases my projects, experiences, interests, and more. It’s built using html, javascript, css, node.js, and vite. While making this, I also experimented with Three.js, React Three Fibre, and a variety of frameworks. This is a continuous work in progress, and I’ll be continually adding to it. ",
        'flappy-bird': "This browser-based Flappy Bird game is developed using Javascript, Phaser and HTML. It utilizes Phaser's Arcade physics system to handle game mechanics efficiently. The game features an angry bird sprite that players can control using the up arrow key to navigate through columns without colliding with them or the ground. The game logic continuously updates to check for user input and update the game state accordingly. ",
        'price-predictor': "This Housing Price Prediction Model uses python and regression models to predict housing prices using the California housing dataset. Pandas is used for data exploration/visualization to understand feature distributions. I encoded the categorical data, and created custom transformers to add attributes to the dataset. Random Forest, Support Vector Machine, and XGBoost are employed for regression tasks, and hyperparameter tuning is performed using Scikit-learn's GridSearchCV.",
        'mnist': "This is a MNIST classifier to recognize handwritten digits. It splits the data into a training and testing set, and a KNN classifier is then trained on the training data. Model evaluation is performed using cross-validation and the F1 score metric. I used various libraries in python for this, such as Pandas for data manipulation, NumPy for numerical computations, Matplotlib for visualization, and Scikit-learn for machine learning tasks."
    };
    
    const toolsDescriptions = {
        'cine-fm': "python\npandas\nnumpy\n sklearn\ntokenizers\ntransformers\nspotify api\ngenius api\nselenium",
        'ecotrackr': "react-native\njavascript\ntypescript\nfastAPI\npython\nnode.js\nexpo cli\nREST APIs",
        'rust-web-crawler': "rust\njavascript\nscraper\nheroku\nserde\nactix web \nreqwest\nhtml/css",
        'portfolio-website': "javascript\nreact\nnode.js\ngsap\nvite\nthree.js\nhtml/css\nspline",
        'flappy-bird': "javascript\nphaser\nhtml/css \nvscode\nsprites\nassets\nscenes",
        'price-predictor': "python\npandas\nnumpy\nscikitlearn\nmatplotlib\ntensorflow\nkeras\nxgboost",
        'mnist': "python\npandas\nnumpy\nsklearn\nmatplotlib\njupyter",
    };


    function showProjectItems(projectName) {
        const projects = document.querySelectorAll('.project');
        
        // Hide all projects
        projects.forEach(project => {
            project.style.opacity = 0;
        });
    
        // Set the project image source and description
        const projectImage = document.getElementById('projectImage');
        const projectDescription = document.getElementById('projectDescription');
        const toolsDescription = document.getElementById('tools'); 
        const viewButton = document.getElementById('viewButton');
        const projectLink = document.querySelector(`[data-project="${projectName}"] a`).getAttribute('href');
    

    
        projectImage.src = `/assets/${projectName}.png`; 
        projectImage.alt = `${projectName} Image`; 
        projectDescription.textContent = projectDescriptions[projectName];
        toolsDescription.textContent = toolsDescriptions[projectName]; 
        viewButton.setAttribute('data-link', projectLink);
        viewButton.setAttribute('href', projectLink);
    
        
        // Show the project items with slide-in effect
        projects.forEach(project => {
            project.classList.add('slide-in-right');
        });
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

    }
    
    let projectItemsAnimated = false;

    function slideInProjectItems() {
        const projectItemsPosition = projectItems.getBoundingClientRect().top;
        const projectsTextPosition = projectsText.getBoundingClientRect().top;
        const menuPosition = menu.getBoundingClientRect().top;
        const expTextPosition = expText.getBoundingClientRect().top;
        const flexExpPosition = flexExp.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

    
        if (!projectItemsAnimated && projectItemsPosition < screenHeight) {
            showProjectItems("cine-fm"); 
            projectItemsAnimated = true; // Set the flag to true after animation is triggered
        }

        if (projectsTextPosition < screenHeight) {
            projectsText.classList.add('slide-in-left');
        }
        if (menuPosition < screenHeight) {
            menu.classList.add('slide-in-left');
        }

        if (expTextPosition < screenHeight) {
            expText.classList.add('slide-in-left');
        }
        if (flexExpPosition < screenHeight) {
            flexExp.classList.add('slide-in-right');
        }

    }
    
    setupMenuItems();

    
    window.addEventListener('scroll', slideInProjectItems);

    
});