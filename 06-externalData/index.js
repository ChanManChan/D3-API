const svg = d3.select('svg');

d3.json('../06-externalData/planets.json').then((data) => {
  // Join the data
  const circles = svg.selectAll('circle').data(data);

  // add attrs to circles already in DOM
  circles
    .attr('cy', 200)
    .attr('cx', (d) => d.distance)
    .attr('r', (d) => d.radius)
    .attr('fill', (d) => d.fill);

  //! append a circle to each of these virtual elements in the enter selection (append the enter selection to the DOM)
  circles
    .enter()
    .append('circle')
    .attr('cy', 200)
    .attr('cx', (d) => d.distance)
    .attr('r', (d) => d.radius)
    .attr('fill', (d) => d.fill);
});
