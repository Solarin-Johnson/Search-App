var url = 'https://newsapi.org/v2/everything?q=who+is-elon-musk&apiKey=ca149d94ec5f47d48a80f0844ca39eba'

var req = new Request(url);

fetch(req)
    .then(response => response.json())
    .then(data => {
        console.log(data.articles[0].title)
    })
