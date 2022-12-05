// ******* DATA LOADING *******
// We took care of that for you
async function loadData() {
  const sites = await d3.json('data/sites.json');
  const ISO_mapping = await d3.csv('data/iso_mapping_table.csv');
  const siteData = sites.data;
  siteData.forEach(site => {
    site.date = new Date(site.date);
    if (site.awards) site.categories = [...site.awards, ...site.categories];
  });
  const mapData = await d3.json('data/world.json');

  return { siteData, mapData, ISO_mapping };
}

// ******* STATE MANAGEMENT *******
// This should be all you need, but feel free to add to this if you need to
// communicate across the visualizations
const globalApplicationState = {
  createdTags: presets[1].tags,
  siteData: null,
  mapData: null,

  // views
  tagView: null,
  mapView: null,
  lineView: null,
  siteView: null
};

//******* APPLICATION MOUNTING *******
loadData().then(loadedData => {
  // Store the loaded data into the globalApplicationState
  globalApplicationState.siteData = loadedData.siteData;
  globalApplicationState.mapData = loadedData.mapData;
  globalApplicationState.iso_mapping = loadedData.ISO_mapping;
  // Creates the view objects with the global state passed in
  globalApplicationState.tagView = new TagView(globalApplicationState);
  globalApplicationState.lineView = new LineView(globalApplicationState);
  globalApplicationState.mapView = new MapView(globalApplicationState);
  globalApplicationState.SiteView = new SiteView(globalApplicationState);

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
