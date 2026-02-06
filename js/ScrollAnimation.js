// https://www.youtube.com/watch?v=adqwnu3gs2k
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target); 
        }
    });
}, {
    threshold: 0.4
});

const hiddenElements = document.querySelectorAll('.feature');
hiddenElements.forEach((el) => observer.observe(el));