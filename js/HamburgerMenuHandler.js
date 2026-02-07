function toggleMenu() {
    const menu = document.querySelector('.mobileNavigation');
    menu.classList.toggle('open');
}

window.addEventListener('click', (e) => {
    const menu = document.querySelector('.mobileNavigation');
    if (menu.classList.contains('open') && !menu.contains(e.target)) {
        menu.classList.remove('open');
    }
});