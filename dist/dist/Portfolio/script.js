document.addEventListener('DOMContentLoaded', function () {
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
  const projectItems = document.getElementById('projectItems');
  const menu = document.querySelector('.vertical-menu');
  const menuItems = document.querySelectorAll('.vertical-menu-item');
  const projectsText = document.querySelector('.projectsText');
  const expText = document.getElementById("expText");
  const flexExp = document.getElementById("flexExp");
  const interestText = document.querySelector('.button');
  const intsText = document.getElementById("int");
  const conText = document.querySelector('.connectText');
  const button = document.querySelectorAll('.button');
  const buttonTexts = document.querySelectorAll('.button-text');
  const projectDescriptions = {
    'cine-fm': "cine.fm is a web application that uses machine learning to generate a playlist based on the user’s selection from 50,000+ movies. It was developed by conducting sentiment analysis using NLP transformers from hugging face, on the movie-descriptions gathered from wikipedia, and song lyrics acquired through the spotify and genius apis. It utilizes content-based filtering to generate the playlist based on a similarity matrix.",
    'ecotrackr': "EcoTrackr is a cross-platform mobile app I’m currently working on that allows users to track their carbon footprint, develop habits to live more eco-consciously, and see information related to the environment, such as air quality, solar distribution, and nearby conservatories/trails. It’s built using react-native, utilizing external apis as well as a backend server to implement a RESTful architecture for handling HTTP requests and responses.",
    'rust-web-crawler': "2Read is a Rust-based web scraping application that generates a reading list by gathering articles from some of my favourite publications-Quanta Magazine, Towards Data Science, Wired, and Scientific American. It utilizes reqwest for HTTP requests, scraper for HTML parsing, and actix-web for building the server. Asynchronous tasks are managed using async-std. The frontend uses Fetch API to asyncly retrieve article data from the server",
    'portfolio-website': "Portfolio Website is a personal portfolio showcasing skills, projects, and achievements of the developer.",
    'snake-game': "Snake Game is a classic arcade game implemented using HTML, CSS, and JavaScript."
  };
  const toolsDescriptions = {
    'cine-fm': "python \n pandas \n numpy \n scikitlearn \n streamlit \n rfargrg \n saggfsg \n fsfgfgbg",
    'ecotrackr': "react-native \n javascript \n typescript \n fastAPI \n python \n node.js \n expo cli \n REST APIs",
    'rust-web-crawler': "Rust Web Crawler is a command-line tool built with Rust programming language for scraping and crawling websites.",
    'portfolio-website': "Portfolio Website is a personal portfolio showcasing skills, projects, and achievements of the developer.",
    'snake-game': "Snake Game is a classic arcade game implemented using HTML, CSS, and JavaScript."
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
    projectImage.src = `images/${projectName}.png`;
    projectImage.alt = `${projectName} Image`;
    projectDescription.textContent = projectDescriptions[projectName];
    toolsDescription.textContent = toolsDescriptions[projectName];

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