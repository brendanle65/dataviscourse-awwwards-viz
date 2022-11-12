const awards = [
  'honorable mention',
  'mobile excellence',
  'developer',
  'site of the day',
  'site of the month',
  'site of the year'
];
const design = ['Adobe Photoshop', 'After Effects', 'Figma', 'Blender'];
const tech = ['HTML5', 'CSS', 'Javascript', 'React', 'Framer Motion', 'Unreal Engine'];

function renderTagCategoryOption(check) {
  const other = [...globalState.categories].filter(x => ![...awards, ...design, ...tech].includes(x));

  return `
      <ul class = "option-sections">
        ${renderOptions(awards, check, 'Awards')}
        ${renderOptions(design, check, 'Design Software')}
        ${renderOptions(tech, check, 'Tech Software')}
        ${renderOptions(other, check, 'Other')}
      </ul>
  `;
}

function renderOptions(options, check, name) {
  let html = '';
  options.forEach(option => {
    html += `<li class="select__option ${check(option)}" data-value='${option}'>
      ${option}
    </li>`;
  });

  return `
      <li class = "options-sections__item">
        <div class = "option-sections__title">${name}:</div>
          <ul class = "option-sections__list">
            ${html}
          </ul>
      </li>
    `;
}
