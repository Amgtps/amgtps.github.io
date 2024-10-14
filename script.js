// document.addEventListener("DOMContentLoaded", function() {
//   const cursor = document.querySelectorAll(".cursor");
//   const links = document.querySelectorAll("a");

//   window.addEventListener("mousemove", (e) => {
//     let x = e.pageX;
//     let y = e.pageY;

//     cursor.forEach(el => {
//       el.style.left = `${x}px`;
//       el.style.top = `${y}px`;

//       links.forEach(link => {
//         link.addEventListener("mouseenter", () => {
//           el.classList.add("hover");
//         });
//         link.addEventListener("mouseleave", () => {
//           el.classList.remove("hover");
//         });
//       });
//     });
//   });
// });
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const cursor = document.querySelector(".cursor");

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = "#C34444";
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
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";

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
