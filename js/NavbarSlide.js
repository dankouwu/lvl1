// https://www.w3schools.com/howto/howto_js_navbar_slide.asp
window.onscroll = function() {scrollHandler()};

function scrollHandler() {
    const nav = document.querySelector('.navigation');
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        nav.style.backgroundColor = 'rgba(23, 23, 23, 0.85)';
        nav.style.backdropFilter = 'blur(10px)';
    } else {
        nav.style.backgroundColor = 'transparent';
        nav.style.backdropFilter = 'none';
    }
}