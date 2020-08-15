const svg = d3.select('svg');

d3.json('../09-min,max,extent/menu.json').then((data) => {
  //! d3.min() <- This function is going through cycle through each of our data objects, it's going to evaluate one of our properties on each object inside the data (eg: orders), and it's going to return the lowest property value.
  //! d3.extent() <- find the lowest and the highest (min and max put together)

  const min = d3.min(data, (d) => d.orders);
  const max = d3.max(data, (d) => d.orders);
  const extent = d3.extent(data, (d) => d.orders);

  console.log(min);
  // op: 200
  console.log(max);
  // op: 900
  console.log(extent);
  // op: Array [ 200, 900 ]

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.orders)])
    .range([0, 500]);

  const x = d3
    .scaleBand()
    .domain(data.map((item) => item.name))
    .range([0, 500])
    .paddingInner(0.2)
    .paddingOuter(0.2);

  const rects = svg.selectAll('rect').data(data);

  rects
    .attr('width', x.bandwidth)
    .attr('height', (d) => y(d.orders))
    .attr('fill', 'orange')
    .attr('x', (d) => x(d.name));

  rects
    .enter()
    .append('rect')
    .attr('width', x.bandwidth)
    .attr('height', (d) => y(d.orders))
    .attr('fill', 'orange')
    .attr('x', (d) => x(d.name));
});
