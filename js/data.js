const globalState = {
  data: null,
  categories: null,
  tags: [
    {
      name: 'Design Tag 1',
      color: '#4AE7CA',
      logics: ['Adobe Photoshop', 'OR', 'Figma'],
      data: [] //will be initalized by algorithm (a.k.a getSubset function)
    },
    {
      name: 'Design Tag 2',
      color: '#4D4AE7',
      logics: ['Adobe Photoshop', 'OR', 'Blender'],
      data: []
    },
    {
      name: 'Design Tag 3',
      color: '#E75D4A',
      logics: ['Adobe Photoshop', 'AND', 'Art & Illustration'],
      data: []
    },
    {
      name: 'Design Tag 4',
      color: '#188116',
      logics: ['Photography'],
      data: []
    },
    {
      name: 'Design Tag 5',
      color: '#E34AE7',
      logics: ['Adobe Photoshop', 'AND', 'site of the day', 'OR', 'Blender'],
      data: []
    }
  ]
};

(async () => {
  const { data: sites } = await d3.json('data/Sites.json');
  const geoJSON = await d3.json('data/geoJSON.json');

  console.log(geoJSON);
  const categories = new Set(sites.map(({ categories }) => categories).flat());
  const countries = new Set(sites.map(({ countries }) => countries).flat());
  const worldMap = new MapVis(sites, countries, categories, geoJSON);
})();
