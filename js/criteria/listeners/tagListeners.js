function attachTagListeners() {
  const tags = document.querySelectorAll('.tag__item');
  tags.forEach((tag, tagIdx) => {
    const filter = globalState.tags[tagIdx];

    const picker = tag.querySelector('.color__picker');
    picker.addEventListener('input', e => {
      filter.color = picker.value;
    });

    const name = tag.querySelector('.tag__text');
    name.addEventListener('input', e => {
      filter.name = name.value;
    });

    const add = tag.querySelector('.tag__add');
    add.addEventListener('click', () => {
      filter.logics.push('OR');
      filter.logics.push('Adobe Photoshop');
      renderCriteria();
    });

    const selects = tag.querySelectorAll('.tag__select');
    selects.forEach((select, selectIdx) => {
      const dropdownInput = select.querySelector('div[data-dropdown]');
      const dropdownContent = select.querySelector('div[data-dropdown-content]');

      // handle toggling of dropdown button
      dropdownInput.addEventListener('click', () => {
        const arrow = dropdownInput.querySelector('.select__arrow');
        const previousIcon = arrow.innerHTML.trim();
        arrow.innerHTML = previousIcon === 'arrow_drop_down' ? 'arrow_drop_up' : 'arrow_drop_down';

        const previousDisplay = dropdownContent.style.display;
        dropdownContent.style.display = previousDisplay === 'none' ? '' : 'none';

        dropdownInput.classList.toggle('select__input--active');
      });

      dropdownContent.addEventListener('click', e => {
        if (e.target.classList.contains('select__option')) {
          // handle toggle style of options
          const options = dropdownContent.querySelectorAll('.select__option');
          options.forEach(option => option.classList.remove('select__option--selected'));
          e.target.classList.add('select__option--selected');

          // update dropdownInput value and tags value
          const value = e.target.getAttribute('data-value');
          dropdownInput.querySelector('.select__value').innerHTML = value;
          filter.logics[selectIdx] = value;

          // close dropdown and update dropdownInput
          dropdownContent.style.display = 'none';
          dropdownInput.querySelector('.select__arrow').innerHTML = 'arrow_drop_down';
          dropdownInput.classList.toggle('select__input--active');

          filter.data = getSubset(filter.logics);
        }
      });
    });
  });
}
