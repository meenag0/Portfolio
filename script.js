// file.js

document.addEventListener('DOMContentLoaded', function () {


    function getDisplayNums(resolve){
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
                resolve();
              }, 850); // 5000 milliseconds = 5 seconds (should match or exceed the transition duration)
            }, 2000);
    } 


    function AnimatedIntro() {

        // creating span for the 'not moving' and assigning to namebox var
        let nameBox = document.createElement("span");  
        nameBox.className = "firstText anim-typewriter";  //setting class of namebox span
        nameBox.id = "nameText";
        nameBox.innerHTML = "   Hi, I am Meena.   <br> I am ";  
 
        //creating another span element for combining moving and non-moving string elemtents, and assigning to introText
        var introText = document.createElement("span");
        introText.className = "firstText";
        introText.id = "fullText";
    
        introText.appendChild(nameBox); //appening nameBox element to introText container
    
        //appends the introText container (with non-moving text atp to flexibleContainer in HTML (which is just the screen)
        document.body.appendChild(introText); 

        // another span element for moving string elemtents
        let traitsBox = document.createElement("span");
        traitsBox.className = "traitsClass";
        traitsBox.setAttribute('data-type', JSON.stringify(["Creative.", "Passionate.", "Inquisitive."])); //Holds a JSON string representing an array of strings
        traitsBox.setAttribute('data-period', '2000');
        //innerHTML set to non-breaking space: placeholder and will be dynamically updated during the text typing animation
        traitsBox.innerHTML = "&nbsp;";  

        //appends container for moving text into container for full into text
        introText.appendChild(traitsBox);
    
        //setTimeout introduces a delay, before callback function is executed and nested code is performed iteratively
        setTimeout(() => {  
    
            // creates cursorTraits span, assign class cursorIcon, appends to introText container 
            let cursorTraits = document.createElement("span");
            cursorTraits.className = "cursorIcon";
            introText.appendChild(cursorTraits);
    
            //appends updated introText to screen container
            document.body.appendChild(introText);
            
    
            // constructor funct for the 'typewriter' effect ()
            //el: HTML element to apply effect to, toAnimate: array of strings to display in sequence, period: duration of animation
            let TxtTypeTraits = function (el, toAnimate, period) {
                this.toAnimate = toAnimate; //property to store array of chars in strings to display in animation
                this.el = el; // Stores HTML element to which typewriter effect will be applied
                this.loopNum = 0; //counter to keep track of current string being displayed
                this.period = parseInt(period, 10) || 2000; // duration of the animation
                this.txt = ''; //stores current string being displayed
                this.tick(); //creates tick method to start animation
                this.isDeleting = false; //boolean to track if animation is currently deleting characters
            };
    
            //tick method: creates typewriter animtion and displays updsted text
            TxtTypeTraits.prototype.tick = function () {


                //this.loopNum: counter that keeps track of the current iteration of the char in string
                //this.toAnimate: length of the string array
                //when this.loopNum exceeds length of the array, modulo ensures index wraps around to beginning of array. (cycle through a set of elements repeatedly)
                let i = this.loopNum % this.toAnimate.length; //calculates remainder when this.loopNum is divided by this.toRotate.length
                let fullTxt = this.toAnimate[i]; 
    
                //if chars are being deleted, extract a substring from the beginning of fullTxt up to the length of this.txt minus 1.
                if (this.isDeleting) {
                    this.txt = fullTxt.substring(0, this.txt.length - 1);
                } else {
                    //extracts a substring from the beginning of fullTxt up to the length of this.txt plus 1.
                    this.txt = fullTxt.substring(0, this.txt.length + 1);
                }
    
                this.el.innerHTML = this.txt;  //updates inner HTML of element (this.el) with current text.

                // toggle visibility of the cursor based on the current text
                cursorTraits.style.visibility = this.isDeleting && this.txt === '' ? 'hidden' : 'visible';
    

                let that = this;  //capturing current value of this in a var
                let delta = 40 - Math.random() * 20;  //variability in the typing speed
    
                //if deleting, setting speed
                if (this.isDeleting) {
                    delta /= 2;
                }
    
                //if not deleting, and current text is the end, start deleting
                if (!this.isDeleting && this.txt === fullTxt) {
                    delta = this.period;
                    this.isDeleting = true;
    

                  // if deleting and current text empty, start typing
                } else if (this.isDeleting && this.txt === '') {
                    this.isDeleting = false;
                    this.loopNum++;
                    delta = 0;
                }

                //schedules next iteration of animation (tick method) after a delay specified by delta.
                setTimeout(function () {
                    that.tick();
                }, delta);
                
            };

            //retrieves the attributes 'data-type' and 'data-period' from traitsBox
            var toAnimate = traitsBox.getAttribute('data-type') || '[]';
            var period = traitsBox.getAttribute('data-period') || '200';
            // creates an instance of TxtTypeTraits with these attributes
            new TxtTypeTraits(traitsBox, JSON.parse(toAnimate), period);
        }, 3500);

    }

    function printDescription() {
        let descriptionDiv = document.createElement("div");
        descriptionDiv.className = "descriptionClass";
        descriptionDiv.id="descriptionId";
        // and give it some content
        let descriptionVar = document.createTextNode("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."

        );
      
        // add the text node to the newly created div
        descriptionDiv.appendChild(descriptionVar);

        document.body.appendChild(descriptionDiv);

    }

    // wrap getDisplayNums function in a promise
    function runDisplayNums() {
        return new Promise((resolve) => {
            getDisplayNums(resolve);
        });
    }

    // call functions in sequence using promises
    runDisplayNums()
        .then(() => AnimatedIntro())
        .then(() => printDescription());


    

});

