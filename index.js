let selectAttr = document.getElementById("attr-select");
alaskData = data.filter((c) => {
  return c.State === "Alaska";
})

// selectAttr.onchange = function() {
//     console.log(data.filter((county) => {
//       return county[selectAttr.value] > 0;
//     }))
// }

const keys = alaskData.map((c) => {return c.County;});
console.log(keys)



const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });