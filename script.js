document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM content loaded");

    const typedTextSpan = document.querySelector(".traitsClass"); // Change to class selector
    const cursorSpan = document.querySelector(".cursorIcon"); // Change to class selector

    const textArray = ["Creative", "Passionate", "Inquisitive"];
    const typingDelay = 150;
    const erasingDelay = 100;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    if (textArray.length) setTimeout(type, newTextDelay + 250);

    const getItemOffset = (item) => {
        return item.offsetTop;
      };
      
      const moveMarker = (offset) => {
        const marker = document.querySelector('.active-marker');
        marker.style.transform = `translateY(${offset}px)`;
        
      };
      
      const toggleActive = (e) => {
        e.preventDefault();
        
        // Remove any existing active classes
        const links = document.querySelectorAll('.vertical-menu-item');
        links.forEach((link => link.classList.remove('is-active')));
        
        // Add class to active link
        const activeItem = e.target.parentElement
        activeItem.classList.toggle('is-active');
        const offset = getItemOffset(activeItem);
        moveMarker(offset);
      };
      
      // Attach click event listener
      const menu = document.querySelector('.vertical-menu');
      
      menu.addEventListener('click', toggleActive);
      
      
});
