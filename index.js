
let selectedState;
let selectedStateElement;
let slider = document.getElementById("myRange");
let topPercent = 50;
let topPercentElement = document.getElementById("topPercent");
let countyCountElement = document.getElementById("countyCount");
let countyCount = data.length/2;
countyCountElement.innerText = countyCount;
slider.oninput = function() {
  topPercent = 100 - this.value;
  topPercentElement.innerText = topPercent;
  reRender();
};

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
  // if (selectAttr.value === "") return;
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
  }).sort((a,b) => {
    return (a[selectAttr.value] / a[denom]) - (b[selectAttr.value] / b[denom]);
  });
  let keys = stateData.map((c) => {return c.County});
  let vals = stateData.map((c) => {return c[selectAttr.value] / c[denom] * 100});
  let backgroundColor = stateData.map((c) => {
    if (c["Native Percent"] > 50.0) return "blue";
    return "gray";
  })

  renderChart(keys, vals, backgroundColor);
}


function renderWholeCountry() {
  let sortedCountry = data.sort((a, b) => {
    return (a[selectAttr.value] / a[denom]) - (b[selectAttr.value] / b[denom]);
  });
  countyCount = Math.floor(sortedCountry.length * (topPercent / 100));
  countyCountElement.innerText = countyCount;
  sortedCountry = sortedCountry.slice(-countyCount);

  let keys = sortedCountry.map((c) => {return c.County;});
  let vals = sortedCountry.map((c) => {return c[selectAttr.value] / c[denom] * 100;})
  let backgroundColor = sortedCountry.map((c) => {
    if (c["Native Percent"] > 50.0) return "blue";
    return "gray";
  })
  renderChart(keys, vals, backgroundColor)
}




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

reRender();



  