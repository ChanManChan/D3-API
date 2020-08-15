// Height of the bar chart is going to be driven by the orders property in menu.json

const svg = d3.select('svg');

d3.json('../07-linearScale/menu.json').then((data) => {
  /**
   * for y-axis :-
   * domain :- [0 ... 900] <- min and max values of the imports
   * range  :- [0 ... 500] <- output scale
   */

  const y = d3.scaleLinear().domain([0, 1000]).range([0, 500]);

  // scale downs <- use these scales to output the heights of the bar charts
  console.log(y(400));
  // op: 200
  console.log(y(900));
  // op: 450
  console.log(y(150));
  // op: 75

  // join the data to rects
  const rects = svg.selectAll('rect').data(data);

  // height of the rects are going to be driven by the orders property from menu.json
  rects
    .attr('width', 50)
    .attr('height', (d) => y(d.orders))
    .attr('fill', 'orange')
    .attr('x', (d, i) => i * 70);

  // append the enter selection (virtual elements) to the DOM
  rects
    .enter()
    .append('rect')
    .attr('width', 50)
    .attr('height', (d) => y(d.orders))
    .attr('fill', 'orange')
    .attr('x', (d, i) => i * 70);
});
