/** Class representing the map view. */
class MapView {
  /**
   * Creates a Map View.
   * @param globalApplicationState The shared global application state
   */
  constructor(globalApplicationState) {
    this.globalApplicationState = globalApplicationState;

    // Set up the map projection
    const projection = d3
      .geoWinkel3()
      .scale(150) // This set the size of the map
      .translate([400, 250]); // This moves the map to the center of the SVG

    // -------------------- BEGIN CUT ---------------------
    const path = d3.geoPath().projection(projection);

    // Get the svg element for the map
    const svg = d3.select('#map').attr('width', '100%').attr('height', '700px');

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
      .attr('stroke', 'black');

    // Get the country outlines and add the countries onto the map
    const cleanedMapData = topojson.feature(
      this.globalApplicationState.mapData,
      this.globalApplicationState.mapData.objects.countries
    ).features;

    svg
      .select('#countries')
      .selectAll('path')
      .data(cleanedMapData)
      .join('path')
      .attr('class', 'country')
      .attr('d', path);
  }
}
