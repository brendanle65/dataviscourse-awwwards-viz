function renderCriteria() {
  const filters = document.querySelector('#tag-list');
  filters.innerHTML = '';
  globalState.tags.forEach(filter => {
    renderTag(filter);
    filter.data = getSubset(filter.logics);
  });
  attachTagListeners();
}
