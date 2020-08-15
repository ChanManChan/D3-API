const svg = d3.select('svg');

//! D3 expects data in an array format <- join this data array with the below rect
const data = [{ width: 200, height: 100, fill: 'yellow' }];

//! Dynamic attribute, make these attributes to be derived from some data <- join that data to this rectangle
// const rect = svg
//   .select('rect')
//   .data(data)
//   .attr('width', function (d, i, n) {
//     console.log('I: ', i, ' N: ', n);
//       console.log(d); <-- one object that is being joined to this rectangle
//     return d.width;
//   })
//   .attr('height', function (d) {
//     return d.height;
//   })
//   .attr('fill', function (d) {
//     return d.fill;
//   });

const rect = svg
  .select('rect')
  .data(data)
  .attr('width', (d, i, n) => {
    // i <- index of the element in the arary
    // n <- array of elements (currently we only have one rectangle)
    console.log('ARROW FUNCTION: ', this);
    // ARROW FUNCTION: Window
    //! way around the 'this' keyword for arrow functions
    console.log('SAME AS REGULAR FUNCTION: ', n[i]);
    //! "this" of regular function === "n[i]" in arrow function
    return d.width;
  })
  .attr('height', function (d) {
    console.log('REGULAR FUNCTION: ', this);
    // REGULAR FUNCTION: <rect width="200"> <- the element that we are applying data properties to
    return d.height;
  })
  .attr('fill', (d) => d.fill);
