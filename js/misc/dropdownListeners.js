// javascript file handling of expanding and collapsing sections

const expandArrows = document.querySelectorAll('span[data-expand]');
const expandContent = document.querySelectorAll('div[data-expand-content]');

expandArrows.forEach((arrow, idx) =>
  arrow.addEventListener('click', () => {
    const previousIcon = arrow.innerHTML.trim();
    arrow.innerHTML = previousIcon === 'expand_more' ? 'expand_less' : 'expand_more';

    const previousDisplay = expandContent[idx].style.display;
    expandContent[idx].style.display = previousDisplay === 'none' ? '' : 'none';
  })
);
