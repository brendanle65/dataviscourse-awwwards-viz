var filterDetails = [
  {
    name: 'General Design Tools',
    color: '#4AE7CA',
    logics: ['Adobe Photoshop', 'OR', 'Figma'],
    data: []
  },
  {
    name: 'Film Design Tools',
    color: '#4D4AE7',
    logics: ['OR'],
    data: []
  },
  {
    name: 'Front End Frameworks',
    color: '#E75D4A',
    logics: ['OR'],
    data: []
  },
  {
    name: 'Awards Won',
    color: '#188116',
    logics: ['AND'],
    data: []
  },
  {
    name: 'Tag 5',
    color: '#E34AE7',
    logics: ['OR'],
    data: []
  }
];

function renderCriteria() {
  const filters = document.querySelector('#tag-list');
  filters.innerHTML = '';
  filterDetails.forEach(filter => renderTag(filter));
  attachTagListeners();
}

renderCriteria();
