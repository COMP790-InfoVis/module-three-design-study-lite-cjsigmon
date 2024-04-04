let stateSelected = false;

let selectAttr = document.getElementById("attr-select");
alaskData = data.filter((c) => {
  return c.State === "Alaska";
})

// selectAttr.onchange = function() {
//     console.log(data.filter((county) => {
//       return county[selectAttr.value] > 0;
//     }))
// }

const keys = alaskData.sort((a, b) => {
  return ((a["Vehicle Access.20 Miles"] / a["Housing Data.Total Housing Units"]) )
  - ((b["Vehicle Access.20 Miles"] / b["Housing Data.Total Housing Units"]) )
}).map((c) => {return c.County;});
let vehicleAccessOver20Miles = alaskData.map((c) => 
{return (c["Vehicle Access.20 Miles"] / c["Housing Data.Total Housing Units"]) * 100}
);
const backgroundColor = alaskData.sort((a, b) => {
  return ((a["Vehicle Access.20 Miles"] / a["Housing Data.Total Housing Units"]) )
  - ((b["Vehicle Access.20 Miles"] / b["Housing Data.Total Housing Units"]) )
}).map((c) => {
  if(c["Native Percent"] > 50.0) {
    return "blue";
  }
  return "gray";
});
console.log(keys)
console.log(vehicleAccessOver20Miles)
console.log(alaskData)



const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: keys,
      datasets: [{
        label: 'Percentage',
        data: (vehicleAccessOver20Miles),
        borderWidth: 1,
        backgroundColor: backgroundColor
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