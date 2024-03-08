document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM content loaded");


  function AnimatedIntro() {
      // assuming traitsBox already exists in your HTML
      let traitsBox = document.querySelector("#traitsBox");
      console.log("traitsBox:", traitsBox); // Log the result of querySelector

      let words = traitsBox.querySelectorAll(".word");
      console.log("Words inside traitsBox:", words); // Log the elements with class '.word'
      let wordArray = [];
      words.forEach(function(word) {
          wordArray.push(word.innerHTML);
      });
      // traitsBox.innerHTML = ""; // Clearing the content of traitsBox

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
              let delta = 300 - Math.random() * 20;

              if (this.isDeleting) {
                  delta /= 1.5;
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

          // create an instance of TxtTypeTraits with words array
          new TxtTypeTraits(traitsBox, wordArray, 200);
      }, 500);
  }


  // execute AnimatedIntro
  AnimatedIntro();


});