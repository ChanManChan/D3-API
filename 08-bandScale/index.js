// Band scale splits up the data into bands of equal width depending on how many different elements we have in our domain (the original data) and how much horizontal room is available

const svg = d3.select('svg');

d3.json('../08-bandScale/menu.json').then((data) => {
  const y = d3.scaleLinear().domain([0, 1000]).range([0, 500]);

  /**
   * for x-axis :-
   * domain <- array of all of our different categories (names of each dish)
   * range  <- dimensions of our graph (width)
   */

  const x = d3
    .scaleBand()
    .domain(data.map((item) => item.name))
    .range([0, 500])
    .paddingInner(0.2)
    .paddingOuter(0.2);

  console.log(x('veg curry'));
  // op: 125 <- start this band at 125px along the x coordinate <- d3 worked out where this bar should start on the x-axis
  console.log(x('veg pasta'));
  // op: 250 <- starting point of this bar along the x-axis
  //! Bandwidth <- the value that represents the width of each bar (same for every bar)
  console.log(x.bandwidth());
  // op: 125px
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
