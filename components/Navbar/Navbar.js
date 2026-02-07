class Navbar extends HTMLElement {
    async connectedCallback() {
        const response = await fetch('./components/Navbar/navbar.html');
        this.innerHTML = await response.text();
        this.init();
    }

    init() {
        const menuBtn = this.querySelector('.menu');
        const mobileNav = this.querySelector('.mobileNavigation');
        const nav = this.querySelector('.navigation');

        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileNav.classList.toggle('open');
        });

        // add event listener (clicking anywhere on the page to close the menu)

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.style.backgroundColor = 'rgba(20, 20, 20, 0.85)';
                nav.style.backdropFilter = 'blur(10px)';
            } else {
                nav.style.backgroundColor = 'transparent';
                nav.style.backdropFilter = 'none';
            }
        });
    }
}

customElements.define('app-navbar', Navbar);
