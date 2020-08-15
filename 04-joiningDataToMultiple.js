//! one object for each rectangle
//? D3 takes each one of these data elements and it's joining it into each "rect" element inside our selection
const data = [
  { width: 200, height: 100, fill: 'red' },
  { width: 100, height: 60, fill: 'green' },
  { width: 50, height: 30, fill: 'blue' },
];

const svg = d3.select('svg');

const rect = svg
  .selectAll('rect')
  .data(data)
  .attr('width', (d, i, n) => d.width)
  .attr('height', (d) => d.height)
  .attr('fill', (d) => d.fill);

//! for each time, the "d" references the data on that individual rectangle that's been joined to it

console.log(rect);
