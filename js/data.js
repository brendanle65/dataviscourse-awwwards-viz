(async () => {
  const { data: sites } = await d3.json('data/Sites.json');
  const { data: geoJSON } = await d3.json('data/geoJSON.json');


  console.log(geoJSON)
  const categories = new Set(sites.map(({ categories }) => categories).flat());
  const awards = new Set(sites.map(({ awards }) => awards).flat());
  const countries = new Set(sites.map(({ countries }) => countries).flat());
  awards.delete(undefined);
  console.log(categories);
  console.log(awards);
  const worldMap = new MapVis(sites, countries,categories, geoJSON);
})();
//todo - go through each category and filter by awards

