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

const y = d3
  .scaleLinear()
  .range([graphHeight, 0]);

const x = d3
  .scaleBand()
  .range([0, graphWidth])
  .paddingInner(0.2)
  .paddingOuter(0.2);

const xAxis = d3.axisBottom(x);

const yAxis = d3
  .axisLeft(y)
  .ticks(3)
  .tickFormat((d) => d + ' orders');

xAxisGroup
  .selectAll('text')
  .attr('transform', 'rotate(-40)')
  .attr('text-anchor', 'end')
  .attr('fill', '#635F5D');


const t500 = d3.transition().duration(500)

const update = (data) => {
  y.domain([0, d3.max(data, d => d.orders)])
  x.domain(data.map(item => item.name))

  const rects = graph.selectAll('rect').data(data);

  rects.exit().remove()

  // update current shapes in DOM
  // rects
  // .attr('width', x.bandwidth)
  // .attr('fill', 'orange')
  // .attr('x', (d) => x(d.name))
  // ending conditions
  // .transition(t500)
  // .attr('height', (d) => graphHeight - y(d.orders))
  // .attr('y', (d) => y(d.orders));

  // append the enter selection to the DOM
  //! combining enter and update selection
  rects
    .enter()
    .append('rect')
    // starting conditions
    .attr('height', 0)
    .attr('y', graphHeight)
    .merge(rects)
    // applying width to 0 is not necessary here before we are already doing that in the tween
    // .attr('width', 0)
    .attr('x', (d) => x(d.name))
    .attr('fill', 'orange')
    // ending conditions
    .transition(t500)
    .attrTween('width', widthTween)
    .attr('height', (d) => graphHeight - y(d.orders))
    .attr('y', (d) => y(d.orders))

  // anything below .merge() applies to both the enter selection and the current selection already in the DOM. The stuff above the .merge() is applied only to the enter selection

  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);

}

let data = []

db.collection('dishes').onSnapshot(res => {

  res.docChanges().forEach(change => {

    const doc = { ...change.doc.data(), id: change.doc.id }

    switch (change.type) {
      case 'added':
        data.push(doc)
        break;
      case 'modified':
        const index = data.findIndex(item => item.id == doc.id)
        data[index] = doc
        break;
      case 'removed':
        data = data.filter(item => item.id !== doc.id)
        break;
      default:
        break;
    }
  });

  update(data)

})


// TWEENS

const widthTween = d => {
  // define interpolation
  // d3.interpolate returns a function which we call 'i'

  let i = d3.interpolate(0, x.bandwidth())

  // return a function which takes in a time ticker 't'
  return function (t) {
    // return the value from passing the ticker into the interpolation
    return i(t)
  }
}


// Starting conditions:
// Y = graphHeight
// Height = 0

// Ending conditions:
// Y = y(d.orders)
// Height = graphHeight - y(d.orders)
