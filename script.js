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
            randomNumString.style.transition = "opacity 0.85s ease-out"; // Adjust the duration as needed
            randomNumString.style.opacity = 0;
            setTimeout(() => {
                randomNumString.parentNode.removeChild(randomNumString);
              }, 850); // 5000 milliseconds = 5 seconds (should match or exceed the transition duration)
            }, 3500);
    } 

    getDisplayNums();  

    let nameBox = document.createElement("span");
    nameBox.className = "firstText";
    nameBox.id = "nameText";
    nameBox.innerHTML = "Hi, I am Meena. <br> I am ";

    let traitsBox = document.createElement("span");
    traitsBox.setAttribute('data-type', JSON.stringify(["Creative", "Passionate", "A Problem Solver"]));
    traitsBox.setAttribute('data-period', '2000');
    traitsBox.innerHTML = "&nbsp;";

    let introText = document.createElement("span");
    introText.className = "firstText";
    introText.id = "fullText";

    // Append nameBox, traitsBox, and cursor as separate elements
    introText.appendChild(nameBox);
    introText.appendChild(traitsBox);

    // Create cursor element
    let cursor = document.createElement("span");
    cursor.className = "cursorIcon";
    introText.appendChild(cursor);

    document.getElementById('flexibleContainer').appendChild(introText);

 
    // function introText(){

        var TxtType = function(el, toRotate, period) {
            this.toRotate = toRotate;
            this.el = el;
            this.loopNum = 0;
            this.period = parseInt(period, 10) || 2000;
            this.txt = '';
            this.tick();
            this.isDeleting = false;
        };
    
        TxtType.prototype.tick = function() {
            var i = this.loopNum % this.toRotate.length;
            var fullTxt = this.toRotate[i];
    
            if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
            }
    
            this.el.innerHTML = '<span class="cursorIcon">'+this.txt+'</span>';
    
            var that = this;
            var delta = 200 - Math.random() * 100;
    
            if (this.isDeleting) { delta /= 2; }
    
            if (!this.isDeleting && this.txt === fullTxt) {
                delta = this.period;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.loopNum++;
                delta = 500;
            }
    
            setTimeout(function() {
            that.tick();
            }, delta);
        };
    
        var toRotate = traitsBox.getAttribute('data-type') || '[]';
        var period = traitsBox.getAttribute('data-period') || '2000';
        new TxtType(traitsBox, JSON.parse(toRotate), period);
});
