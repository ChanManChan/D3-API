const svg = d3
  .select('.canvas')
  .append('svg')
  .attr('width', 600)
  .attr('height', 600);

const margin = { top: 20, right: 20, bottom: 100, left: 100 };
const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

const graph = svg
  .append('g')
  .attr('width', graphWidth)
  .attr('height', graphHeight)
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

const xAxisGroup = graph
  .append('g')
  .attr('transform', `translate(0, ${graphHeight})`);

const yAxisGroup = graph.append('g');

d3.json('../12-invertingBars/menu.json').then((data) => {
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.orders)])
    .range([graphHeight, 0]);

  const x = d3
    .scaleBand()
    .domain(data.map((item) => item.name))
    .range([0, graphWidth])
    .paddingInner(0.2)
    .paddingOuter(0.2);

  const rects = graph.selectAll('rect').data(data);

  //! y <- added because of the inverted y-axis scale, bars (rects) start from top and then expand downwards toward their corresponding y-values (eg: veg soup, the bar starts at 1500 and then expands till 200 on y-scale) [[BAR STARTING POSITION VERTICALLY]]
  /** __     __          __
   * |  |    ^           ^
   * |  |    |           |
   * |  |    |           |
   * |1 | y(d.orders)    |
   * |  |    |       graphHeight
   * |  |    |           |
   * L__|    v           |
   * |  |   --           |
   * |2 |                |
   * |  |                |
   * L__|                v
   *                    __
   *
   *  height of 2 (required)= graphHeight - y(d.orders)
   */

  /*  __        __
   * |  |       |
   * |2 |       |
   * |  |       |
   * L__|   y(d.orders)
   *            |
   *            |
   *            v
   *           --
   * y = y(d.orders)
   * push the 2nd bar down by y(d.orders) magnitude
   */

  rects
    .attr('width', x.bandwidth)
    .attr('height', (d) => graphHeight - y(d.orders))
    .attr('fill', 'orange')
    .attr('x', (d) => x(d.name))
    .attr('y', (d) => y(d.orders));

  rects
    .enter()
    .append('rect')
    .attr('width', x.bandwidth)
    .attr('height', (d) => graphHeight - y(d.orders))
    .attr('fill', 'orange')
    .attr('x', (d) => x(d.name))
    .attr('y', (d) => y(d.orders));

  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y);

  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);
});
