function renderTagOptions(logics) {
  html = '';
  logics.forEach(logic => {
    const renderOptions = logic === 'AND' || logic === 'OR' ? renderTagConjunctionOption : renderTagCategoryOption;
    html += `
      <div class="tag__select">
        <div class="select__input" data-dropdown>
          <span class="select__value">${logic}</span>
          <span class="material-symbols-outlined select__arrow"> arrow_drop_down </span>
        </div>
        <div class="select__dropdown" style = "display:none;" data-dropdown-content>
          ${renderOptions(checkIfSelected)}
        </div>
      </div>`;

    function checkIfSelected(option) {
      return logic === option ? 'select__option--selected' : '';
    }
  });

  return html;
}
