function renderTagConjunctionOption(check) {
  return `
      <ul>
        <li class="select__option ${check('AND')}" data-value="AND">AND</li>
        <li class="select__option ${check('OR')}" data-value="OR">OR</li>
      </ul>
    `;
}
