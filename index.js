
let selectedState;
let selectedStateElement;
let denom = "Population";


let selectAttr = document.getElementById("attr-select");


selectAttr.onchange = reRender;

function reRender() {
  if (selectAttr.value === "") return;
  if (selectAttr.value === "Vehicle Access.20 Miles") {
    denom = "Housing Data.Total Housing Units";
  } else {
    denom = "Population"
  }
  if (selectedState === undefined) {
    renderWholeCountry();
    return;
  } 
  renderStateChart()
}

function renderStateChart() {
  const stateData = data.filter((c) => {
    return c.State === selectedState;
  });
  let keys = stateData.map((c) => {return c.County});
  let vals = stateData.map((c) => {return c[selectAttr.value]});
  let backgroundColor = stateData.map((c) => {
    if (c["Native Percent"] > 50.0) return "blue";
    return "gray";
  })

  renderChart(keys, vals, backgroundColor);
}


function renderWholeCountry() {
  let sortedCountry = data.sort((a, b) => {
    return a[selectAttr.value] - b[selectAttr.value];
  });
  let keys = sortedCountry.map((c) => {return c.County;});
  let vals = sortedCountry.map((c) => {return c[selectAttr.value];})
  let backgroundColor = sortedCountry.map((c) => {
    if (c["Native Percent"] > 50.0) return "blue";
    return "gray";
  })
  renderChart(keys, vals, backgroundColor)
}

// const keys = alaskData.sort((a, b) => {
//   return ((a["Vehicle Access.20 Miles"] / a["Housing Data.Total Housing Units"]) )
//   - ((b["Vehicle Access.20 Miles"] / b["Housing Data.Total Housing Units"]) )
// }).map((c) => {return c.County;});
// let vehicleAccessOver20Miles = alaskData.map((c) => 
// {return (c["Vehicle Access.20 Miles"] / c["Housing Data.Total Housing Units"]) * 100}
// );
// const backgroundColor = alaskData.sort((a, b) => {
//   return ((a["Vehicle Access.20 Miles"] / a["Housing Data.Total Housing Units"]) )
//   - ((b["Vehicle Access.20 Miles"] / b["Housing Data.Total Housing Units"]) )
// }).map((c) => {
//   if(c["Native Percent"] > 50.0) {
//     return "blue";
//   }
//   return "gray";
// });


paths = document.getElementsByTagName("path");

for (let path of paths) {
  path.onclick = function() {
    if (selectedStateElement != undefined) selectedStateElement.setAttribute('style', 'fill: none');
      selectedStateElement = path;
      selectedStateElement.setAttribute('style', 'fill: blue');
      selectedState = path.getAttribute("data-name");

      reRender();
  }
}


const ctx = document.getElementById('myChart');



function renderChart(keys, vals, backgroundColor) {
  if (window.agroChart) {
    window.agroChart.destroy();
}
  window.agroChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: keys,
      datasets: [{
        label: 'Percentage',
        data: vals,
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
}



  