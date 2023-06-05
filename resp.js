burger = document.querySelector('.burger')
navbar = document.querySelector('.navigation')
nav_list = document.querySelector('.nav-list')

burger.addEventListener('click', () => {
    nav_list.classList.toggle('v-class-resp');
    navbar.classList.toggle('h-nav-resp');
})

//  Setup and start animation! 
var typed = new Typed('#element', {
    strings: ['<i>Web Developer.</i>', '<i>Android Developer.</i>', '<i>Software Developer.</i>'],
    typeSpeed: 50,
});