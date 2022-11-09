function renderTag({ name, color, logics }) {
  const filters = document.querySelector('#tag-list');
  const tag = document.createElement('li');
  tag.classList.add('tag__item');
  tag.innerHTML = `
      <div class="tag__color">
        <input class="color__picker" type="color" id="favcolor" name="favcolor" value="${color}" />
      </div>
      <input class="tag__text" type="text" value="${name}" name="tag-1" />
      <span class="tag__divider">:</span>
      <ul class = "tags__chain">
        ${renderTagOptions(logics)}
      </ul>
      <span class="material-symbols-outlined tag__add"> add_circle </span>
    `;

  filters.appendChild(tag);
}
