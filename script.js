

// NAVBAR SHADOW

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if(window.scrollY > 50){
        navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
    }
    else{
        navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
    }

});


// DARK MODE TOGGLE

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    // Change icon

    if(document.body.classList.contains("dark-mode")){
        themeToggle.innerHTML = "☀️";
    }
    else{
        themeToggle.innerHTML = "🌙";
    }

});


// NAME TYPING EFFECT

const text = " Vinolan Martin D ";

let index = 0;

const typingTarget = document.querySelector(".name-typing");

function typeName(){

    if(index < text.length){

        typingTarget.innerHTML += text.charAt(index);

        index++;

        setTimeout(typeName, 120);
    }

}

window.onload = typeName;





const words = [
    " Full Stack Developer " ,
    " Python Developer " ,
    " " ,
    " ASP.NET Developer "
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingElement = document.querySelector(".typing");

function typeEffect(){

    const currentWord = words[wordIndex];

    if(isDeleting){
        typingElement.textContent =
        currentWord.substring(0, charIndex--);
    }
    else{
        typingElement.textContent =
        currentWord.substring(0, charIndex++);
    }

    let speed = isDeleting ? 60 : 120;

    if(!isDeleting && charIndex === currentWord.length){
        speed = 1500;
        isDeleting = true;
    }
    else if(isDeleting && charIndex === 0){
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();



// SCROLL REVEAL ANIMATION

// SCROLL ANIMATION

const hiddenElements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }
        else{

            entry.target.classList.remove("show");

        }

    });

},
{
    threshold:0.15
});

hiddenElements.forEach((el) => observer.observe(el));