'use strict';
document.querySelectorAll('.project-link').forEach(link => {
  link.addEventListener('click', function (e) {
    // Prevent default link behavior
    e.preventDefault();

    // Show loader
    const loader = document.querySelector('.loader');
    loader.style.display = 'flex'; // Make the loader visible

    // Allow some time for the loader to show before redirect
    setTimeout(() => {
      // Redirect to the link's href
      window.location.href = this.href;
    }, 2000); // Adjust the timeout duration as needed (e.g., 1000 ms = 1 second)
  });
});


// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}


const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Function to show the correct page based on the fragment
function showPageFromHash() {
  const hash = window.location.hash.substring(1); // Get the hash without the "#"
  if (hash) {
    for (let i = 0; i < pages.length; i++) {
      if (pages[i].id === hash) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  } else {
    // If there's no hash, show the first article by default
    pages[0].classList.add("active");
    navigationLinks[0].classList.add("active");
  }

  // Remove the logo after displaying the page
  removeLogo();
}

// Function to remove the logo from the shadow DOM
function removeLogo() {
  const splineViewer = document.querySelector('spline-viewer');
  if (splineViewer && splineViewer.shadowRoot) {
    const logo = splineViewer.shadowRoot.querySelector('#logo');
    if (logo) {
      logo.remove();
    }
  }
}

// Initial check for the hash when the page loads
window.onload = function () {
  showPageFromHash();

  // Create a MutationObserver to watch for changes in the shadow DOM
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      removeLogo(); // Remove the logo whenever a node is added
    });
  });

  // Start observing the shadow root for child node changes
  if (splineViewer && splineViewer.shadowRoot) {
    observer.observe(splineViewer.shadowRoot, { childList: true, subtree: true });
  }

  // Optionally disconnect the observer after a certain time
  setTimeout(() => observer.disconnect(), 5000); // Adjust the time as necessary
};

// Add event listeners to all navigation links
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const targetPage = this.innerHTML.toLowerCase(); // Get the target page name from the button
    for (let j = 0; j < pages.length; j++) {
      if (pages[j].dataset.page === targetPage) {
        // Set the hash in the URL
        window.location.hash = targetPage;
        showPageFromHash(); // Update the displayed page
        window.scrollTo(0, 0); // Scroll to the top
      }
    }
  });
}


const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const cursor = document.querySelector(".cursor");

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = "#fff";
});

window.addEventListener("mousemove", function (e) {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  cursor.style.top = x;
  cursor.style.left = y;
  
  circles.forEach(function (circle, index) {
    circle.style.left = x - 0 + "px";
    circle.style.top = y -0  + "px";

    circle.style.scale = (circles.length - index) / circles.length;

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();
