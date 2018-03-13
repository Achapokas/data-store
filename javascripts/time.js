// Convert time to hours only
// Grab select value and pair it up with appropriate IP address
function request() {
  const request = new Request('https://api.myjson.com/bins/11r4zx' );

  fetch(request)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(`Cannot locate ${request} file.`);
      }
    })
    .then(response => {
      parseObject(response)
    })
}

function timeConversion(response) {
  var dates = []

  for(let i = 0; i < response.length; i++) {
    const resultObj = response[i].result,
          newDate = new Date(response[i].result._time).toLocaleTimeString()
          assignNewDate = resultObj._time = newDate;

    dates.push(newDate);
  }

  return `
    ${dates.map((date, index) => `<text x="${200 * (index + 1)}" y="540">${date}</text>`).join('')}
  `
}

function bytesToSize(bytes) {
   const sizes = ['Bytes', 'KB', 'MB', 'GB'];
   if (bytes == 0) return '0 Byte';
   const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function createsSelectOptions(response) {
    const returnsKeys = Object.keys(response[0].result),
          returnsKeysShift = returnsKeys.shift();

    return `
      ${returnsKeys.map(returnsKey => `<option value="${returnsKey}">${returnsKey}</option>`).join('')}
    `
}

function parseObject(response) {

  var singleIP = {},
      setsFinal = [];

  for(let i = 0; i < response.length; i++) {
    const resultObj = response[i].result,
          fetchIP = Object.keys(resultObj),
          fetchBytes = Object.values(resultObj),
          shiftTime = fetchBytes.shift(),
          shiftDate = fetchIP.shift(),
          newDate = new Date(response[i].result._time).toLocaleTimeString()
          var sets = [];

          for(let t = 0; t < fetchBytes.length; t++){
            var convertBytes = bytesToSize(fetchBytes[t]);

            sets[t] = {time: newDate, ip: fetchIP[t], bytes: convertBytes};
          }

          setsFinal.push(sets)
  }


  const markup = `
    <div class="select">
      <select id="select">
        ${createsSelectOptions(response)}
      </select>
    </div>
      <svg version="1.2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="graph" aria-labelledby="title" role="img">
        <title id="title">A Line Chart: IP Addresses and Bytes</title>
        <g class="grid x-grid" id="xGrid">
          <line x1="90" x2="90" y1="0" y2="501"></line>
        </g>
        <g class="grid y-grid" id="yGrid">
          <line x1="90" x2="1100" y1="500" y2="500"></line>
        </g>
          <g class="labels x-labels">
          ${timeConversion(response)}
          <text x="550" y="580" class="label-title">time</text>
        </g>
        <g class="labels y-labels">
          <text x="80" y="10">45</text>
          <text x="80" y="100">35</text>
          <text x="80" y="190">25</text>
          <text x="80" y="290">15</text>
          <text x="80" y="390">10</text>
          <text x="80" y="480">0</text>
          <text x="40" y="250" class="label-title">MB</text>
        </g>
        <g class="data" data-setname="Our first data set">
          <circle cx="200" cy="192"  data-value="7.2" r="4"></circle>
          <circle cx="380" cy="141" data-value="8.1" r="4"></circle>
          <circle cx="580" cy="179" data-value="7.7" r="4"></circle>
          <circle cx="800" cy="200" data-value="6.8" r="4"></circle>
          <circle cx="1000" cy="104" data-value="6.7" r="4"></circle>
        </g>
      </svg>
    </div>
  `

  const graph = document.getElementById('graph');
  graph.insertAdjacentHTML('beforeend', markup);

  const select = document.getElementById("select");
      optionValue = select.options[select.selectedIndex].value;

      console.log(optionValue)

      select.addEventListener("change", function(event){
          if(event.target.value === "188.138.1.135") {
          } else {
            console.log("not found")
          }
      })
}

function init() {
  request()
}

init()
