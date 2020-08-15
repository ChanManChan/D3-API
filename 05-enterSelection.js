// This data wants to join with 3 different shapes but theres only one in the DOM
const data = [
  { width: 200, height: 100, fill: 'purple' },
  { width: 100, height: 60, fill: 'pink' },
  { width: 50, height: 30, fill: 'red' },
];

const svg = d3.select('svg');

//! UPDATING ELEMENTS ALREADY IN THE DOM
const rects = svg
  .selectAll('rect')
  .data(data)
  .attr('width', (d, i, n) => d.width)
  .attr('height', (d) => d.height)
  .attr('fill', (d) => d.fill);

console.log(rects);

/**
 * {…}
  _enter: (1) […]
      0: Array(3) [ <1 empty slot>, {…}, {…} ] <- We need to access these two virtual elements and use those to append a rectangle for each one
      length: 1
      <prototype>: Array []
  _exit: Array [ (1) […] ]
  _groups: Array [ (3) […] ]
  _parents: Array [ svg ]
  <prototype>: Object { constructor: Selection(groups, parents), select: selection_select(select), selectAll: selection_selectAll(select), … }
  05-enterSelection.js:17:9
 */

//! UPDATING THE ELEMENTS WHICH HASN'T YET ENTERED THE DOM INSIDE THE "ENTER" SELECTION
rects
  .enter()
  .append('rect')
  .attr('width', (d, i, n) => d.width)
  .attr('height', (d) => d.height)
  .attr('fill', (d) => d.fill);
