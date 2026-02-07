// https://www.youtube.com/watch?v=adqwnu3gs2k
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
        if(!entry.isIntersecting && entry.target.classList.contains('in-view')) {
            entry.target.classList.remove('in-view');
        }
    });
}, {
    threshold: 0.4
});

const hiddenElements = document.querySelectorAll('.feature');
hiddenElements.forEach((el) => observer.observe(el));