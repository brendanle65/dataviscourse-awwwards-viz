
/** Class representing the map view. */
class MapVis {
    /**
     * Creates a Map Visuzation
     * @param data The site data
     */
    constructor(data, countries, categories, geoJSON) {
      this.data = data;
      this.countries = countries;
      this.geoJSON = geoJSON;
      this.categories = categories;
      console.log(categories)
      console.log(countries);
      console.log(data)
      // Set up the map projection
      let margin = {top: 20, right: 10, bottom: 40, left: 100},
      width = 600 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    //   this.countries = this.countries.filter(function( element ) {
    //     return element !== undefined;
    //  });
      let svg = d3.select("#the_map")
       .attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom)
       .append("g")
       .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

      const projection = d3.geoMercator()
        .scale(70)
        .center([0,20])
        .translate([width / 2 - margin.left, height / 2]);

        var domain = [0, 5];
        var range = ["#F8CAEE","#BF76AF","#852170"];
        let color = d3.scaleOrdinal().domain(countries).range(d3.schemePaired)
      // const projection = d3.geoWinkel3()
      //   .scale(300) // This set the size of the map
      //   .translate([400, 250]); // This moves the map to the center of the SVG
      console.log(this.geoJSON);

      svg.append("g")
      .selectAll("path")
      
      .data(geoJSON)
      .enter()
      .append("path")
      .attr("class", "topo")
        // draw each country
        .attr("d", d3.geoPath()
          .projection(projection)
        )
        // set the color of each country
        .attr("fill", (d) => color(d.category))
        .style("opacity", .7)
      
      //let svg = d3.select("#the_map");
      var geoPath = d3.geoPath().projection(projection);

      //let countries = topojson.feature(globalApplicationState.mapData, globalApplicationState.mapData.objects.countries);
      //   let countryData = globalApplicationState.covidData;
      let graticule = d3.geoGraticule(geoPath);
  
      // svg
      //   .select('#graticule')
      //   .append('path')
      //   .attr('d', geoPath(graticule))
      //   .attr('fill', 'none')
      //   .attr('stroke', 'black')
      //   .style('opacity', 0.2);
    //   let first_val = countryData[0];
    //   let max_cases = first_val.total_cases_per_million;
    //   let min_cases = max_cases;
    //   for (let i = 0; i < countryData.length; i++) {
    //     let temp = countryData[i];
    //     if (temp.total_cases_per_million > max_cases) {
    //       max_cases = temp.total_cases_per_million;
    //     }
    //     if (temp.total_cases_per_million < min_cases) {
    //       min_cases = temp.total_cases_per_million;
    //     }
    //   }
    //   max_cases = parseFloat(max_cases);
    //   min_cases = parseFloat(min_cases);
    //   if (isNaN(max_cases)) {
    //     max_cases = 0;
    //   }
    //   if (isNaN(min_cases)) {
    //     min_cases = 0;
    //   }
  
    //   let color = d3.scaleSequential(d3.interpolateReds).domain([min_cases, max_cases]);
      // const states = svg
      //   .select('#countries')
      //   .selectAll('path')
      //   .data(countries)
      //   .enter()
      //   .append('path')
      //   .attr('d', geoPath)
        // .style('fill', (d) => {
        //   let filteredarray = countryData.filter(countryEntry => countryEntry.iso_code === d.id)
        //   let first_val = filteredarray[0];
        //   if (first_val === undefined) {
  
        //   }
        //   else {
        //     let max_cases = first_val.total_cases_per_million;
        //     for (let i = 0; i < filteredarray.length; i++) {
        //       let temp = filteredarray[i];
        //       if (temp.total_cases_per_million > max_cases) {
        //         max_cases = temp.total_cases_per_million;
        //       }
        //     }
        //     return color(max_cases)
        //   }
        // })
        // .attr('stroke', 'lightgrey');
  
  
    //   let legend = d3.select('#legend')
    //     .append('rect')
    //     .attr('width', 120)
    //     .attr('y', 0)
    //     .attr('height', 30)
    //     .attr('fill', 'url(#color-gradient)')
    }
  
    // updateSelectedCountries() {
  
    // }
  }