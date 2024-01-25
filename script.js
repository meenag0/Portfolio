// file.js

document.addEventListener('DOMContentLoaded', function () {

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

    // Initial update
    updateRandomNumbers();

    // Update periodically (every 1000 milliseconds or 1 second)
    setInterval(() => {
        updateRandomNumbers();
    }, 0.1);



});
