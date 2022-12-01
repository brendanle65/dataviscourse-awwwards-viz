/** Class representing the line view. */
class LineView {
  /**
   * Creates a Line View.
   * @param globalApplicationState The shared global application state
   */
  constructor(globalApplicationState) {
    this.globalApplicationState = globalApplicationState;
    this.svg = d3.select('#line-chart');
    this.tickPadding = 75;
    this.height = 500;
    this.yAxisPadding = 80;
    this.xAxisPadding = 50;

    this.render();
    console.log(this.globalApplicationState.createdTags);

    window.addEventListener('createdTagsChange', () => {
      //console.log(this.globalApplicationState.createdTags);
      this.render();
    });
  }

  render() {
    // reset before each rerender
    this.svg.select('#x-axis').html('');
    this.svg.select('#y-axis').html('');
    this.svg.select('#lines').html('');

    // extract date information from all partitions
    const mergedPartitions = this.globalApplicationState.createdTags.map(tag => tag.partition).flat();
    const mergedDates = mergedPartitions.map(site => new Date(site.date));

    // add x axis --> it is a date format
    this.xAxis = d3.scaleTime().domain(d3.extent(mergedDates));

    // dynamically set width of chart and x-axis depending on how many ticks
    const tickLength = this.xAxis.ticks(d3.timeMonth).length;
    this.width = tickLength * this.tickPadding;
    this.xAxis = this.xAxis.range([0, this.width - this.yAxisPadding]);
    this.svg.attr('width', this.width + this.yAxisPadding);

    // render x axis
    this.svg
      .select('#x-axis')
      .append('g')
      .attr('transform', `translate(${this.yAxisPadding}, ${this.height - this.xAxisPadding})`)
      .call(d3.axisBottom(this.xAxis).ticks(d3.timeMonth));

    // Append x axis text
    this.svg
      .select('#x-axis')
      .append('text')
      .text('Months')
      .attr('x', this.width / 2 - 100)
      .attr('y', this.height);

    // extract frequency information from all groupings
    const mergedGroupings = this.globalApplicationState.createdTags.map(tag => tag.grouped).flat();
    const mergedValues = mergedGroupings.map(group => [...group.values()]).flat();
    const mergedFrequency = mergedValues.map(group => group.length);
    const maxY = d3.max(mergedFrequency);

    // add y axis
    this.yAxis = d3
      .scaleLinear()
      .domain([0, maxY])
      .range([this.height - this.xAxisPadding, 10])
      .nice();

    // when dividing by 10 yields floats, filter them out from the axis
    const keepOnlyInt = this.yAxis.ticks().filter(tick => Number.isInteger(tick));

    this.svg.attr('height', this.height + this.yAxisPadding);

    // render y axis
    this.svg
      .select('#y-axis')
      .append('g')
      .attr('transform', `translate(${this.yAxisPadding},0)`)
      .call(d3.axisLeft(this.yAxis).tickValues(keepOnlyInt).tickFormat(d3.format('d')));

    // append y axis text
    this.svg
      .select('#y-axis')
      .append('text')
      .text('Frequency of Selected Tag')
      .attr('x', -300)
      .attr('y', 20)
      .attr('transform', 'rotate(-90)');

    // render the lines
    this.svg
      .select('#lines')
      .selectAll('.line')
      .data(this.globalApplicationState.createdTags)
      .join('path')
      .attr('fill', 'none')
      .attr('stroke', d => d.color)
      .attr('stroke-width', 1)
      .attr('d', ({ grouped }) => {
        const generator = d3
          .line()
          .x(([date, values]) => {
            const pass = new Date(values[0].date);
            return this.xAxis(pass) + this.yAxisPadding;
          })
          .y(([date, values]) => {
            return this.yAxis(values.length);
          });

        // the last part of this call forwards the data into the line generator (d) is iterated over this provided data
        return generator(grouped);
      });
  }
}
