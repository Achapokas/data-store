function request() {
  const request = new Request('https://achapokas.github.io/data-store/javascripts/traffic_bytes.json');

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

function parseObject(response) {
  var array = [];

  for(var i = 0; i < response.length; i++) {
    array.push(response[i].result.sum_bytes)
  }

  var result = array.map(function (x) {
      return parseInt(x, 10);
  });

  result.sort()

  console.log(result)
}

request()
