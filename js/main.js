// ******* DATA LOADING *******
// We took care of that for you
async function loadData() {
  const sites = await d3.json('data/sites.json');
  const siteData = sites.data;
  siteData.forEach(site => {
    site.date = new Date(site.date);
    if (site.awards) site.categories = [...site.awards, ...site.categories];
  });
  const mapData = await d3.json('data/world.json');

  console.log(new Set(siteData.map(({ categories }) => categories).flat()));

  return { siteData, mapData };
}

// ******* STATE MANAGEMENT *******
// This should be all you need, but feel free to add to this if you need to
// communicate across the visualizations
const globalApplicationState = {
  createdTags: [
    {
      name: 'Design Tag 1',
      color: '#4AE7CA',
      conditions: ['Adobe Photoshop', 'OR', 'Figma'],
      partition: [], // will be populated at runtime
      grouped: [] // will be populated at runtime
    },
    {
      name: 'Design Tag 2',
      color: '#4D4AE7',
      conditions: ['Adobe Photoshop', 'OR', 'Blender'],
      partition: [],
      grouped: []
    },
    {
      name: 'Design Tag 3',
      color: '#E75D4A',
      conditions: ['Adobe Photoshop', 'AND', 'Art & Illustration'],
      partition: [],
      grouped: []
    },
    {
      name: 'Design Tag 4',
      color: '#188116',
      conditions: ['Photography'],
      partition: [],
      grouped: []
    },
    {
      name: 'Design Tag 5',
      color: '#E34AE7',
      conditions: ['Adobe Photoshop', 'AND', 'site of the day', 'OR', 'Blender'],
      partition: [],
      grouped: []
    }
  ],
  siteData: null,
  mapData: null,

  // views
  tagView: null,
  mapView: null,
  lineView: null
};

//******* APPLICATION MOUNTING *******
loadData().then(loadedData => {
  // Store the loaded data into the globalApplicationState
  globalApplicationState.siteData = loadedData.siteData;
  globalApplicationState.mapData = loadedData.mapData;

  // Creates the view objects with the global state passed in
  globalApplicationState.tagView = new TagView(globalApplicationState);
  globalApplicationState.lineView = new LineView(globalApplicationState);
  globalApplicationState.mapView = new MapView(globalApplicationState);

  // Attach listeners to control expand and collapsing of sections
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
});
