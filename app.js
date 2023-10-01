"use strict";
const body = document.body;
const faqs = document.querySelectorAll('.faq-list-button');
const faqAnswer = document.querySelectorAll(".faq-answer-wrapper");
const faqSvg = document.querySelectorAll('.faq-svg');
const heroLabel = document.querySelector(".hero-label");
const heroInput = document.querySelector(".hero-input");
const heroInputOverlay = document.querySelector(".hero-inputOverlay");
const faqLabel = document.querySelector(".faq-label");
const faqInput = document.querySelector(".faq-input");
const faqInputOverlay = document.querySelector(".faq-inputOverlay");
const heroForm = document.getElementById('hero-form');
const faqForm = document.getElementById('faq-form');
const heroError = document.querySelector(".hero-form-error-message");
const faqError = document.querySelector(".bottom-form-error-message");
const animatedElements = document.querySelectorAll(".animate-on-scroll");

const insertInput = function (x, y, z) {
    x.classList.add('label-position')
    y.classList.add('input-position');
    z.classList.add("inputOverlay-position");
};

heroInput.addEventListener('click', function () {
    insertInput(heroLabel, heroInput, heroInputOverlay);
});

faqInput.addEventListener('click', function () {
    insertInput(faqLabel, faqInput, faqInputOverlay);
});

const clearInputActions = function (x, y, z) {
    if (y.value === '') {
        x.classList.remove("label-position");
        y.classList.remove("input-position");
        z.classList.remove("inputOverlay-position");
    }
}

body.addEventListener('click', function (event) {
    if (event.target !== heroInput && event.target !== faqInput) {
     clearInputActions(heroLabel, heroInput, heroInputOverlay);
     clearInputActions(faqLabel, faqInput, faqInputOverlay);
    };
});

const displayFaq = function (event) {
    //Get the actual clicked button
    const clickedButton = event.currentTarget;
    //Find the index of the clicked button using array.from
    const faqIndex = Array.from(faqs).indexOf(clickedButton);
    //toggle its corresponding answer and svg icon
    faqAnswer[faqIndex].classList.toggle("faq-is-active");
    faqSvg[faqIndex].classList.toggle('rotate');

    //to close the previously opened FAQ answer when I open one I loop through the FAQ answers and write a logic that handles that...
    for (let i = 0; i < Array.from(faqAnswer).length; i++) {
        if (i !== faqIndex && faqAnswer[i].classList.contains("faq-is-active")) {
      faqAnswer[i].classList.remove("faq-is-active");
     }
    }

    if (faqAnswer[faqIndex].classList.contains('faq-is-active')) {
        setTimeout(() => {
            faqAnswer[faqIndex].style.maxHeight = 'none';
        }, 600);
    } else {
        faqAnswer[faqIndex].style.maxHeight = '';
    }
};


faqs.forEach((faq) => {
    faq.addEventListener('click', displayFaq)
});

//animation onscroll
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animation-is-active");
            observer.unobserve(entry.target);
        }
    })
});

animatedElements.forEach((element) => {
 observer.observe(element);
});

//email validation
const validateEmail = function(x,y,z) {
    const emailInput = x.value.trim();
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (emailRegex.test(emailInput)) {
        y.classList.add('input-success');
        y.style.outline = 'none';
         z.classList.remove("input-error-text");
    } else {
        y.classList.add('input-error');
        y.classList.remove("input-success");
        z.classList.add('input-error-text');
    }
};

heroForm.addEventListener('submit', function (e) {
    e.preventDefault();
    validateEmail(heroInput, heroInputOverlay, heroError);
});

faqForm.addEventListener('submit', function (e) {
    e.preventDefault();
    validateEmail(faqInput, faqInputOverlay, faqError);
});