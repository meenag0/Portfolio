const divSpaces = document.getElementById('flexibleContainer');
const divWidth = divSpaces.offsetWidth;
const divHeight = divSpaces.offsetHeight;

const horizontalSpacing = 10; // Adjust this value based on your design
const verticalSpacing = 10;

elementHeight = 2;
elementWidth = 5.45;

const elementsInRow = Math.floor((divWidth - horizontalSpacing) / (elementWidth + horizontalSpacing));
const rows = Math.floor((divHeight - verticalSpacing) / (elementHeight + verticalSpacing));
const totalElements = elementsInRow * rows;


let nums = [];
for (let i = 0; i < totalElements; i++) {
    nums[i] = Math.floor(Math.random()*2)
}

let displayNum = nums.join("");

let para = document.getElementById("randomNumString");
para.innerHTML = displayNum;

