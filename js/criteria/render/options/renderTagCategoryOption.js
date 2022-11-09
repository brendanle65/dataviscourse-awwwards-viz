const awards = ['Honorable Mention', 'Site of the Day'];
const design = ['Adobe Photoshop', 'After Effects'];

function renderTagCategoryOption(check) {
  return `
      <ul class = "option-sections">
        <li class = "options-sections__item">
          <div class = "option-sections__title">Awards:</div>
          <ul class = "option-sections__list">
            ${renderOptions(awards, check)}
          </ul>
        </li>
        <li class = "options-sections__item">
        <div class = "option-sections__title">Design:</div>
        <ul class = "option-sections__list">
          ${renderOptions(design, check)}
        </ul>
      </li>
      </ul>
  `;
}

function renderOptions(options, check) {
  let html = '';
  options.forEach(option => {
    html += `<li class="select__option ${check(option)}" data-value='${option}'>
      ${option}
    </li>`;
  });

  return html;
}
