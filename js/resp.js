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
  const duration = getYearsAndMonths(startDate, today);
  document.getElementById("months-completed").innerText = duration;

  function getYearsAndMonths(startDate, endDate) {
    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();

    // Adjust for incomplete month
    if (endDate.getDate() < startDate.getDate()) {
      months--;
    }

    // Normalize negative months (e.g., if months = -1 after adjustment)
    if (months < 0) {
      years--;
      months += 12;
    }

    let yearText = years > 0 ? `${years} year${years > 1 ? "s" : ""}` : "";
    let monthText = months > 0 ? `${months} month${months > 1 ? "s" : ""}` : "";

    if (yearText && monthText) {
      return `${yearText} ${monthText}`;
    } else {
      return yearText || monthText || "0 months";
    }
  }
});
