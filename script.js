const hamburger = document.getElementById('hamburger');
const menu = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.menu-list-items a:not(.dropdown-toggle)');
const dropdown = document.querySelector('.dropdown');
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownItems = document.querySelectorAll('.dropdown-item');
const sectionLinkBtns = document.querySelectorAll('.section-link-btn');
const toast = document.getElementById('toast');

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

// Toggle dropdown menu on click for touch/mobile or click interaction
if (dropdownToggle) {
    dropdownToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });
}

// Close dropdown when clicking outside
document.addEventListener('click', function (e) {
    if (dropdown && !dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

// Close mobile navbar & dropdown when selecting a project
dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
        if (dropdown) dropdown.classList.remove('active');
        if (menu && menu.classList.contains('active')) {
            menu.classList.remove('active');
            const hamIcon = hamburger.querySelector('.hamburger-icon');
            const crossIcon = hamburger.querySelector('.cross-icon');
            if (hamIcon) hamIcon.style.display = "inline-block";
            if (crossIcon) crossIcon.style.display = "none";
        }
    });
});

// Auto-close mobile menu when a standard menu link is clicked
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menu && menu.classList.contains('active')) {
            menu.classList.remove('active');
            const hamIcon = hamburger.querySelector('.hamburger-icon');
            const crossIcon = hamburger.querySelector('.cross-icon');
            if (hamIcon) hamIcon.style.display = "inline-block";
            if (crossIcon) crossIcon.style.display = "none";
        }
    });
});

// Copy direct link to clipboard when section link icon is clicked
sectionLinkBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        const fullUrl = window.location.origin + window.location.pathname + href;
        
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(fullUrl).then(() => {
                showToast('Direct link copied to clipboard!');
                window.location.hash = href;
            }).catch(() => {
                window.location.hash = href;
                showToast('Navigated to project section!');
            });
        } else {
            window.location.hash = href;
            showToast('Navigated to project section!');
        }
    });
});

let toastTimeout;
function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}
