var search_news = sessionStorage.getItem('search_news')
document.getElementById("search_news").value = search_news
searchq = search_news.replace(' ', '+');
searchResults(searchq)

function truncateString(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    } else {
        return text.substring(0, maxLength) + "...";
    }
}



document.getElementById("search_icon").addEventListener('click', () => {
    sessionStorage.setItem('search_news', document.getElementById('search_news').value)
    search_news = sessionStorage.getItem('search_news')
    searchq = search_news.replace(' ', '+');
    searchResults(searchq)
})

function searchResults(searchq) {

    var url = `https://newsapi.org/v2/everything?q=${searchq}&apiKey=ca149d94ec5f47d48a80f0844ca39eba`

    var req = new Request(url);

    fetch(req)
        .then(response => response.json())
        .then(data => {
            for (i = 0; i < (data.articles.length - 10); i++) {
                description = truncateString(data.articles[i].description, 150)
                title = truncateString(data.articles[i].title, 25)
                img = data.articles[i].urlToImage
                linkname = data.articles[i].source.name
                fullLink = data.articles[i].url
                console.log(fullLink)

            }
        })
}




