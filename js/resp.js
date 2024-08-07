burger = document.querySelector(".burger");
navbar = document.querySelector(".navigation");
nav_list = document.querySelector(".nav-list");

burger.addEventListener("click", () => {
  nav_list.classList.toggle("v-class-resp");
  navbar.classList.toggle("h-nav-resp");
});

//  Setup and start animation!
var typed = new Typed("#element", {
  strings: [
    // "<i>Web Developer.</i>",
    // "<i>Android Developer.</i>",
    "<i>Software Developer.</i>",
    "<i>Java FullStack Developer.</i>",
  ],
  typeSpeed: 50,
});

document.addEventListener("DOMContentLoaded", function () {
  const startDate = new Date("2024-03-04");
  const today = new Date();
  const monthsCompleted = getMonthsCompleted(startDate, today);
  document.getElementById("months-completed").innerText = `${monthsCompleted} months`;

  function getMonthsCompleted(startDate, endDate) {
    const years = endDate.getFullYear() - startDate.getFullYear();
    const months = endDate.getMonth() - startDate.getMonth();
    let totalMonths = years * 12 + months;
    // If the current date is before the start date day, subtract one month
    if (endDate.getDate() < startDate.getDate()) {
      totalMonths--;
    }
    return totalMonths;
  }
});
