class Navbar extends HTMLElement {
    async connectedCallback() {
        const response = await fetch('./components/Navbar/navbar.html');
        this.innerHTML = await response.text();
        this.init();
    }

    init() {
        const menuBtn = this.querySelector('.menu');
        const mobileNav = this.querySelector('.mobileNavigation');
        const nav = this.querySelector('.navWrapper');

        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileNav.classList.toggle('open');
        });

        window.addEventListener('click', (e) => {
            if (mobileNav.classList.contains('open') && !mobileNav.contains(e.target)) {
                mobileNav.classList.remove('open');
            }
        });

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('notTop');
            } else {
                nav.classList.remove('notTop');
            }
        });
    }
}

customElements.define('app-navbar', Navbar);