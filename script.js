const hamburger = document.getElementById('hamburger');
const menu = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.menu-list-items a');

hamburger.addEventListener('click', function () {
    const hamIcon = this.querySelector('.hamburger-icon');
    const crossIcon = this.querySelector('.cross-icon');
    
    menu.classList.toggle('active');
    
    if (menu.classList.contains('active')) {
        hamIcon.style.display = "none";
        crossIcon.style.display = "inline-block";
    } else {
        hamIcon.style.display = "inline-block";
        crossIcon.style.display = "none";
    }
});

// Auto-close menu when a link is clicked on mobile
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menu.classList.contains('active')) {
            menu.classList.remove('active');
            const hamIcon = hamburger.querySelector('.hamburger-icon');
            const crossIcon = hamburger.querySelector('.cross-icon');
            hamIcon.style.display = "inline-block";
            crossIcon.style.display = "none";
        }
    });
});

