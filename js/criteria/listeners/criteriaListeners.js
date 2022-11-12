const add = document.querySelector('.actions__add');

const colors = ['#4AE7CA', '#5B618A', '#A09ABC', '#F7EF81', '#BF3100', '#313715', '#443850', '#D81E5B', '#99C2A2'];

add.addEventListener('click', () => {
  globalState.tags.push({
    name: `Tag ${globalState.tags.length + 1}`,
    color: colors[Math.floor(Math.random() * colors.length)],
    logics: ['Adobe Photoshop']
  });
  renderCriteria();
});

const clear = document.querySelector('.actions__clear');

clear.addEventListener('click', () => {
  globalState.tags = [];
  renderCriteria();
});
