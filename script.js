// file.js

document.addEventListener('DOMContentLoaded', function () {

    // getting div element "FlexibleContainer" and p element "randomNumString"
    const divSpaces = document.getElementById('flexibleContainer');
    const randomNumString = document.getElementById('randomNumString');


    function getDisplayNums(){
        // getting div element "FlexibleContainer" and p element "randomNumString"
        const divSpaces = document.getElementById('flexibleContainer');
        const randomNumString = document.getElementById('randomNumString');

        //arbitrary numbers used to find APPROXIMATE (not actual) number of characters that can fit on screen
        charHeight = 2;
        charWidth = 5.45;

        const divWidth = divSpaces.offsetWidth;   //width of div flexibleContainer
        const divHeight = divSpaces.offsetHeight; //height of div flexibleContainer

        //finding int (rounded) value of # of chars that can fit on screen
        const elementsInRow = Math.floor(divWidth / charWidth);  //dividing div width by arbitrary char width value
        const rows = Math.floor(divHeight / charHeight);  //same for height
        const totalElements = elementsInRow * rows;  //multiplying both to find total chars that can fit in space; area

        //function to print the 1s and 0s
        function updateRandomNumbers() {

            // p container is cleared when funct called
            randomNumString.innerHTML = ''; 

            // for loop in which a random int between 0 and 2 is 
            for (let i = 0; i < totalElements; i++) {

                let element = document.createElement('span');    //creating element <span> within loop and assining to element
                element.classList.add('randomElement');    // adding newly created span to a class for easier css modification
                element.textContent = Math.floor(Math.random() * 2);    //
                randomNumString.appendChild(element);
            }
        }

        // initial update
        updateRandomNumbers();

        // update periodically (every 1000 milliseconds or 1 second)
        const intervalTime = setInterval(() => {updateRandomNumbers();}, 1);

        setTimeout(() => {
            randomNumString.style.transition = "opacity 0.3s ease-out"; // Adjust the duration as needed
            randomNumString.style.opacity = 0;
            setTimeout(() => {
                randomNumString.parentNode.removeChild(randomNumString);
              }, 850); // 5000 milliseconds = 5 seconds (should match or exceed the transition duration)
            }, 2000);
    } 


    function AnimatedIntro() {
        let nameBox = document.createElement("span");
        nameBox.className = "firstText anim-typewriter";
        nameBox.id = "nameText";
        nameBox.innerHTML = "Hi, I am Meena. <br> I am ";
    
        var introText = document.createElement("span");
        introText.className = "firstText";
        introText.id = "fullText";
    
        introText.appendChild(nameBox);
    
        document.getElementById('flexibleContainer').appendChild(introText);
    
        setTimeout(() => {
            let traitsBox = document.createElement("span");
            traitsBox.className = "traitsClass";
            traitsBox.setAttribute('data-type', JSON.stringify(["Creative.", "Passionate.", "A Problem Solver.", ""]));
            traitsBox.setAttribute('data-period', '2000');
            traitsBox.innerHTML = "&nbsp;";
    
            introText.appendChild(traitsBox);
    
            let cursorTraits = document.createElement("span");
            cursorTraits.className = "cursorIcon";
            introText.appendChild(cursorTraits);
    
            document.getElementById('flexibleContainer').appendChild(introText);
    
            let TxtTypeTraits = function (el, toRotate, period) {
                this.toRotate = toRotate;
                this.el = el;
                this.loopNum = 0;
                this.period = parseInt(period, 10) || 2000;
                this.txt = '';
                this.tick();
                this.isDeleting = false;
            };
    
            TxtTypeTraits.prototype.tick = function () {
                var i = this.loopNum % this.toRotate.length;
                var fullTxt = this.toRotate[i];
    
                if (this.isDeleting) {
                    this.txt = fullTxt.substring(0, this.txt.length - 1);
                } else {
                    this.txt = fullTxt.substring(0, this.txt.length + 1);
                }
    
                this.el.innerHTML = this.txt;
    
                // Toggle visibility of the cursor based on the current text
                cursorTraits.style.visibility = this.isDeleting && this.txt === '' ? 'hidden' : 'visible';
    
                var that = this;
                var delta = 40 - Math.random() * 20;
    
                if (this.isDeleting) {
                    delta /= 2;
                }
    
                if (!this.isDeleting && this.txt === fullTxt) {
                    delta = this.period;
                    this.isDeleting = true;
    
                    if (i === this.toRotate.length - 1) {
                        return;
                    }
                } else if (this.isDeleting && this.txt === '') {
                    this.isDeleting = false;
                    this.loopNum++;
                    delta = 0;
                }
    
                setTimeout(function () {
                    that.tick();
                }, delta);
            };
    
            var toRotate = traitsBox.getAttribute('data-type') || '[]';
            var period = traitsBox.getAttribute('data-period') || '200';
            new TxtTypeTraits(traitsBox, JSON.parse(toRotate), period);
        }, 3500);
    }

    getDisplayNums();
    AnimatedIntro();

});