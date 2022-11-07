// javascript file handling of expanding and collapsing sections

const expandArrows = document.querySelectorAll("span[data-expand]");
const expandContent = document.querySelectorAll("div[data-expand-content]");

expandArrows.forEach((arrow, idx) =>
  arrow.addEventListener("click", () => {
    const previousIcon = arrow.innerHTML.trim();
    if (previousIcon === "expand_more") arrow.innerHTML = "expand_less";
    else arrow.innerHTML = "expand_more";

    const previousDisplay = expandContent[idx].style.display;
    if (previousDisplay === "none") expandContent[idx].style.display = "";
    else expandContent[idx].style.display = "none";
  })
);
