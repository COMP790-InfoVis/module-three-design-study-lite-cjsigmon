
let selectedState;
let selectedStateElement;
let displayStateSelected = document.getElementById("displayStateSelected");
let denom = "Population";

let statesWithNativeMajorityCounties = new Set([
  "Alaska", "Arizona", "Montana", "Nebraska",
  "New Mexico", "North Dakota", "South Dakota",
  "Utah", "Wisconsin"
])


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
  if (statesWithNativeMajorityCounties.has(path.getAttribute("data-name"))) {
    path.setAttribute('style', 'fill: blue');

  } else {
    path.setAttribute('style', 'fill: darkgray');
  }

  path.onclick = function() {
    if (selectedStateElement != undefined) selectedStateElement.classList.remove('chosen-one')
      selectedStateElement = path;
      selectedStateElement.classList.add("chosen-one")
      selectedState = path.getAttribute("data-name");
      displayStateSelected.innerText = path.getAttribute("data-name");
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



  