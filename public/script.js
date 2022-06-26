"use strict";
const body = document.querySelector("body");
const contactForm = document.querySelector(".contact__form");
const contactBox = document.querySelector(".contact");
const userName = document.getElementById("name");
const btnCloseModal = document.querySelector(".contact__icon-close");
const overlay = document.querySelector(".overlay");
const email = document.getElementById("email");
const message = document.getElementById("message");
const messageBox = document.querySelector(".message-box");
const contactBtn = document.querySelector(".nav__item-contact");
const contactPortfolio = document.querySelector(".contact-portfolio");
const spinnerBorder = document.querySelector(".spinner-border");
const heroSection = document.querySelector(".hero-section");
const header = document.querySelector(".header");
const portfolioSection = document.querySelector(".portfolio-section");
const aboutLink = document.querySelector(".about--link");
const heroPortfolioLink = document.querySelector(
  ".hero-section__portfolio-link"
);

const aboutSection = document.querySelector(".about-section");
const navBox = document.querySelector(".nav__box--main");

navBox.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    !e.target.classList.contains("nav__item") ||
    e.target.classList.contains("nav__item-contact")
  )
    return;
  if (e.target.textContent.trim() === "About")
    aboutSection.scrollIntoView({ behavior: "smooth" });
  else body.scrollIntoView({ behavior: "smooth" });
});

function HeroSection(entry, observer) {
  if (!entry[0].isIntersecting) header.classList.add("header__active");
  else header.classList.remove("header__active");
}

const observer = new IntersectionObserver(HeroSection, {
  root: null,
  threshold: 0,
});

observer.observe(heroSection);

function showModal() {
  contactBox.classList.remove("inactive");
  overlay.classList.remove("inactive");
}

function closeModal() {
  contactBox.classList.add("inactive");
  overlay.classList.add("inactive");
}

function showMessageSentResponse(message) {
  messageBox.firstElementChild.textContent = message;
  messageBox.classList.remove("inactive-message");
  setTimeout(() => messageBox.classList.add("inactive-message"), 5000);
}

contactBtn.addEventListener("click", (e) => {
  showModal();
});

contactPortfolio.addEventListener("click", (e) => {
  showModal();
});

btnCloseModal.addEventListener("click", (e) => {
  // e.preventDefault();
  closeModal();
});

// overlay.addEventListener("click", (e) => {
//   contactBox.classList.add("inactive")
// });

aboutLink.addEventListener("click", function (e) {
  e.preventDefault();
  portfolioSection.scrollIntoView({ behavior: "smooth" });
});

heroPortfolioLink.addEventListener("click", (e) => {
  e.preventDefault();
  portfolioSection.scrollIntoView({ behavior: "smooth" });
});

function checkEmailValid(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

function checkInputEmpty(...input) {
  input.filter((el, i) => {
    if (el.value.trim().length === 0) {
      el.nextElementSibling.classList.remove("contact__err--inactive");
    }
    if (el.value.trim().length !== 0) {
      el.nextElementSibling.classList.add("contact__err--inactive");
    }
  });
}

function checkLengthInput(...input) {
  return input.some((el) => el.value.trim().length === 0);
}

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (checkLengthInput(userName, email, message))
    return checkInputEmpty(userName, email, message);

  if (!checkEmailValid(email.value)) {
    email.nextElementSibling.classList.remove("contact__err--inactive");
    email.nextElementSibling.textContent = "Invalid email";
    message.nextElementSibling.classList.add("contact__err--inactive");
    userName.nextElementSibling.classList.add("contact__err--inactive");
    return;
  } else email.nextElementSibling.classList.add("contact__err--inactive");

  contactBox.classList.add("inactive");
  spinnerBorder.classList.remove("inactive");

  const data = {
    name: userName.value,
    email: email.value,
    message: message.value,
  };

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.onload = function () {
    console.log(xhr);
    if (xhr.responseText === "success") {
      userName.value = email.value = message.value = "";
      showMessageSentResponse("Your message has been received");
      closeModal();
      spinnerBorder.classList.add("inactive");
    } else {
      showMessageSentResponse(xhr.response);
      closeModal();
      spinnerBorder.classList.add("inactive");
    }
  };

  xhr.send(JSON.stringify(data));
});

const portfolioSectionContainer = document.querySelector(
  ".portfolio-section__container"
);

$(portfolioSectionContainer).slick();
