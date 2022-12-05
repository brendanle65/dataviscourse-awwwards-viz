// import {Scrubber} from "@mbostock/scrubber"
/** Class representing the map view. */
class MapView {
  /**
   * Creates a Map View.
   * @param globalApplicationState The shared global application state
   */
  constructor(globalApplicationState) {
    this.globalApplicationState = globalApplicationState;
    this.render(this.globalApplicationState.createdTags[0].grouped.get('9/2021')); //some default value

    window.addEventListener('selectedDataPoint', e => {
      this.render(e.detail);
    });
  }

  render(data) {
    // reset before each render
    document.querySelector('#map').innerHTML = `
      <g id="graticules"></g>
      <g id="countries"></g>
    `;

    // Set up the map projection
    const projection = d3
      .geoWinkel3()
      .scale(150) // This set the size of the map
      .translate([400, 250]); // This moves the map to the center of the SVG

    const path = d3.geoPath().projection(projection);

    // Get the svg element for the map
    const svg = d3.select('#map').attr('width', '100%').attr('height', '700px').style('text-align', 'center');

    // Create and configure the graticule generator (one line every 10 degrees)
    const graticule = d3.geoGraticule();
    svg
      .select('#graticules')
      .append('path')
      .datum(graticule)
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .style('opacity', 0.2);

    svg
      .select('#graticules')
      .append('path')
      .datum(graticule.outline())
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .style('opacity', 1);

    // Get the country outlines and add the countries onto the map
    const cleanedMapData = topojson.feature(
      this.globalApplicationState.mapData,
      this.globalApplicationState.mapData.objects.countries
    ).features;

    // extract date information from all partitions
    const mergedPartitions = this.globalApplicationState.createdTags.map(tag => tag.partition).flat();

    const frequencyMappings = {};
    if (data) {
      for (let i = 0; i < data.length; i++) {
        const countries = data[i].countries;
        if (countries) {
          for (let j = 0; j < countries.length; j++) {
            const country = countries[j];
            if (country) {
              // accounting for null value
              // if not in map, set it's frequency to one
              // else, increment by one
              if (frequencyMappings[country]) {
                frequencyMappings[country] += 1;
              } else {
                frequencyMappings[country] = 1;
              }
            }
          }
        }
      }
    }

    //get max for color scale
    let max_sites = Object.values(frequencyMappings)[0];
    for (const property in frequencyMappings) {
      if (frequencyMappings[property] > max_sites) {
        max_sites = frequencyMappings[property];
      }
    }

    //get frequency from frequency table based on country name
    function getFrequency(country) {
      if (typeof frequencyMappings[country] != 'undefined') {
        return frequencyMappings[country];
      }
      return 0;
    }
    //color scale based on data ask about better colors to use?
    let color = d3.scaleSequential(d3.interpolateOranges).domain([0, max_sites]);
    //todo: fill based on filtered data

    let mapping_table = this.globalApplicationState.iso_mapping;

    //get country name from iso-countryname mapping table from countrydata iso code
    function getcountryname(code) {
      for (let i = 0; i < mapping_table.length; i++) {
        if (mapping_table[i].iso_code === code) {
          return mapping_table[i].location;
        }
      }
      return mapping_table[0].location;
    }

    svg
      .select('#countries')
      .selectAll('path')
      .data(cleanedMapData)
      .join('path')
      .attr('class', 'country')
      .attr('d', path)
      .style('fill', d => {
        return color(getFrequency(getcountryname(d.id)));
      })
      .attr('stroke', 'grey');

    let minNumCases = 0;
    let maxNumCases = max_sites;
    // Add legend
    const gradientDef = svg.append('defs').append('linearGradient').attr('id', 'gradient');
    gradientDef
      .append('stop')
      .attr('offset', '0%')
      .attr('style', `stop-color:${color(minNumCases)};stop-opacity:1`);
    gradientDef
      .append('stop')
      .attr('offset', '50%')
      .attr('style', `stop-color:${color((maxNumCases - minNumCases) / 2)};stop-opacity:1`);
    gradientDef
      .append('stop')
      .attr('offset', '100%')
      .attr('style', `stop-color:${color(maxNumCases)};stop-opacity:1`);

    svg.append('rect').attr('x', 0).attr('y', 480).attr('width', 150).attr('height', 20).attr('fill', 'url(#gradient)');

    svg.append('text').attr('x', 0).attr('y', 475).text(minNumCases);

    svg.append('text').attr('x', 130).attr('y', 475).text(d3.format('.2s')(maxNumCases));
  }
}
