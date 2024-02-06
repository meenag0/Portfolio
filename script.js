// file.js

document.addEventListener('DOMContentLoaded', function () {



    function AnimatedIntro() {
        // assuming traitsBox already exists in your HTML
        let traitsBox = document.getElementById("traitsBox");
    
        // set timeout to initiate typewriter effect after a delay
        setTimeout(() => {
            // constructor function for the 'typewriter' effect
            let TxtTypeTraits = function (el, toAnimate, period) {
                this.toAnimate = toAnimate;
                this.el = el;
                this.loopNum = 0;
                this.period = parseInt(period, 10) || 2000;
                this.txt = '';
                this.tick();
                this.isDeleting = false;
            };
    
            // tick method for typewriter animation
            TxtTypeTraits.prototype.tick = function () {
                let i = this.loopNum % this.toAnimate.length;
                let fullTxt = this.toAnimate[i];
    
                if (this.isDeleting) {
                    this.txt = fullTxt.substring(0, this.txt.length - 1);
                } else {
                    this.txt = fullTxt.substring(0, this.txt.length + 1);
                }
    
                this.el.innerHTML = this.txt;
    
                let that = this;
                let delta = 200 - Math.random() * 20;
    
                if (this.isDeleting) {
                    delta /= 2;
                }
    
                if (!this.isDeleting && this.txt === fullTxt) {
                    delta = this.period;
                    this.isDeleting = true;
                } else if (this.isDeleting && this.txt === '') {
                    this.isDeleting = false;
                    this.loopNum++;
                    delta = 0;
                }
    
                setTimeout(function () {
                    that.tick();
                }, delta);
            };
    
            // retrieve attributes 'data-type' and 'data-period' from traitsBox
            var toAnimate = traitsBox.getAttribute('data-type') || '[]';
            var period = traitsBox.getAttribute('data-period') || '200';
    
            // create an instance of TxtTypeTraits with these attributes
            new TxtTypeTraits(traitsBox, JSON.parse(toAnimate), period);
        }, 500);
    }

    function printDescription() {
        let descriptionDiv = document.createElement("div");
        descriptionDiv.className = "descriptionClass";
        descriptionDiv.id="descriptionId";
        // and give it some content
        descriptionDiv.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br><br> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    

        document.getElementById('introContainer').appendChild(descriptionDiv);

    }

    function createButtons() {
        let workButton = document.createElement("button");
        workButton.className="workClass";
        workButton.id = "workID";
        workButton.innerHTML = "*Work";
        document.getElementById('introContainer').appendChild(workButton);

        let playButton = document.createElement("button");
        playButton.className="playClass";
        playButton.id = "playID";
        playButton.innerHTML = "*Play";
        document.getElementById('introContainer').appendChild(playButton);

        let resumeButton = document.createElement("button");
        resumeButton.className="resumeClass";
        resumeButton.id = "resumeID";
        resumeButton.innerHTML = "*Resume";
        document.getElementById('introContainer').appendChild(resumeButton);


        // let mediaButton = document.createElement("button");
        // mediaButton.className="mediaClass";
        // mediaButton.id = "mediaID";
        // mediaButton.innerHTML = "*Media";
        // document.getElementById('introContainer').appendChild(mediaButton);

        let contactButton = document.createElement("button");
        contactButton.className="contactClass";
        contactButton.id = "contactID";
        contactButton.innerHTML = "*Contact";
        document.getElementById('introContainer').appendChild(contactButton);

    }


    // execute AnimatedIntro, printDescription, and createButtons simultaneously
    function runAnimations() {
        return Promise.all([AnimatedIntro(), printDescription(), createButtons()]);
    }

    // call functions in sequence using promises
    runAnimations()
        .catch((error) => console.error(error));

    window.addEventListener('scroll', function () {
        let scrollPosition = window.scrollY;
        // Calculate opacity based on scroll position
        let opacity = 1 - scrollPosition / 500;

        // Apply opacity to the body
        document.introContainer.style.opacity = opacity;
        if (scrollPosition > 100) {
            document.introContainer.classList.add('fade-out');
        } else {
            document.introContainer.classList.remove('fade-out');
        }
    });


});

