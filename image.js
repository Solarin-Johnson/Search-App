url = `https://pixabay.com/api/?key=38938670-26eca45c3b97b83da12d458e5&q=yellow+flowers&image_type=photo&pretty=true`

var req = new Request(url);

fetch(req)
    .then(response => response.json())
    .then(data => {
        console.log(data.hits[0])
    })