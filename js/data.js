(async () => {
  const { data: sites } = await d3.json("data/Sites.json");
  console.log(sites);
})();
