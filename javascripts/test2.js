function request() {
  const request = new Request('https://jsonblob.com/577e57e3-2596-11e8-8863-edf5361e63bf');

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
  console.log(response)
}

request()
