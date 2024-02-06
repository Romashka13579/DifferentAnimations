var carousel = document.querySelector('.carousel');
var carouselWrap = document.querySelector('.carousel-wrap');
var carouselOver = document.querySelector('.carousel-over');

var carouselItems = document.querySelectorAll('.carousel-item');
var hoverball = document.querySelector('.carousel-hoverball');

for (let j = 0; j < 5; j++) {
    for (let i = 0; i < carouselItems.length; i++) {
        var clone = carouselItems[i].cloneNode(true);
        carouselOver.append(clone);
    }
}

var carouselItems = document.querySelectorAll('.carousel-item');

for (let i = 0; i < carouselItems.length; i++) {
    carouselItems[i].style.transform = `rotateY(${12 * i}deg) translateZ(-170vw)`;
}

var carouselBlocks = document.querySelectorAll('.carousel-block');

var startDragging = false;
var position = 0;
var rotation = 0;
var startRotation = 0;
var scrolled = 0;

const dragstart = (e) => {
    e.preventDefault();
    startDragging = true;
    position = parseInt(e.clientX);
}

const dragging = (e) => {
    if (!startDragging) {
        const x = e.clientX -100;
        const y = e.pageY - carouselWrap.offsetTop - carousel.offsetTop -100;
        const keyframes = {
            left: `${x}px`,
            top: `${y}px`
        }
        hoverball.animate(keyframes, {
            duration: 1500,
            fill: "forwards"
        });
        return;
    };
    e.preventDefault();
    rotation = (position - parseInt(e.clientX)) / 14 + startRotation;
    carouselOver.style.transform = `perspective(600px) translateZ(170vw) rotateZ(-4deg) rotateY(${rotation + scrolled}deg)`;
}

const dragover = (e) => {
    e.preventDefault();
    startDragging = false;
    startRotation = rotation;
}

const scroll = (e) => {
    e.preventDefault();
    scrolled = document.documentElement.scrollTop / 40;
    carouselOver.style.transform = `perspective(600px) translateZ(170vw) rotateZ(-4deg) rotateY(${rotation + scrolled}deg)`;
}

// const mouseon = (e) => {
//     e.preventDefault();
//     console.log(e.target.boundingClientRect());
// }

const mouseon = (e) => {
    e.preventDefault();
    hoverball.style.display = "flex";
    setTimeout(() => {
        hoverball.style.opacity = 1;
    }, 10);
}

carouselWrap.addEventListener('mousemove', dragging);
carouselWrap.addEventListener('mousedown', dragstart);
carouselWrap.addEventListener('mouseup', dragover);
carouselWrap.addEventListener('mouseover', mouseon);
// carouselItems.forEach(item => {
//     item.addEventListener('mouseover', mouseon);
// });

window.addEventListener('scroll', scroll);

setTimeout(() => {
    carouselOver.style.transition = "transform 600ms cubic-bezier(.15,.52,.18,.95)";
}, 10);