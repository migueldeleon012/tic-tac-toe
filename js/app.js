const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
const links = document.querySelectorAll('.nav-link');
console.log(links)

hamburger.addEventListener('click', ()=>{
  nav.classList.toggle('active')
});

links.forEach((link) =>{
  link.addEventListener('click', ()=>{
    nav.classList.remove('active')
  })
})
