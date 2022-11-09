(async () => {
  const { data: sites } = await d3.json('data/Sites.json');

  const categories = new Set(sites.map(({ categories }) => categories).flat());
  const awards = new Set(sites.map(({ awards }) => awards).flat());
  awards.delete(undefined);

  console.log(categories);
  console.log(awards);
})();

//todo - go through each category and filter by awards
