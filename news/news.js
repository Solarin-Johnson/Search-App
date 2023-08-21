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
    location.reload()
})


function generateRandomNumbers(count, min, max) {
    if (count > max - min + 1 || max < min) {
        return null;
    }

    var randomNumbers = [];
    while (randomNumbers.length < count) {
        var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!randomNumbers.includes(randomNumber)) {
            randomNumbers.push(randomNumber);
        }
    }

    return randomNumbers;
}
var randomNumbers = generateRandomNumbers(20, 1, 99);






function searchResults(searchq) {

    var url = `https://newsapi.org/v2/everything?q=${searchq}&apiKey=2d7c6244f680461b8f59d3c4641bc200`

    var req = new Request(url);

    fetch(req)
        .then(response => response.json())
        .then(data => {
            if (data.articles.length > 20) {
                z = 20
            } else {
                z = data.articles.length
            }
            for (i = 0; i < z; i++) {
                if (data.articles.length > 20) {
                    z = 20
                    x = randomNumbers[i]
                } else {
                    z = data.articles.length
                    x = i
                }
                try {

                    description = truncateString(data.articles[x].description, 150)
                    title = truncateString(data.articles[x].title, 25)
                    img = data.articles[x].urlToImage
                    linkname = data.articles[x].source.name
                    fullLink = truncateString(data.articles[x].url, 30)
                    length = data.articles.length - 50
                    console.log(linkname)
                } catch (error) {
                    console.error("Js caught :" + error.message)
                    z = z - 1
                }
                displayResults(z, length, title, description, img, linkname, fullLink)
            }
        })
}




function displayResults(z, i, title, description, img, linkname, fullLink) {

    searchResultsDiv = document.getElementById("search_results")
    searchResultsDiv.style.gridTemplateRows = `Repeat(20, 100px)`
    document.getElementById("container").style.height = `${z * 210}px`
    // Create a result container
    var resultDiv = document.createElement("div");
    resultDiv.className = "result";
    searchResultsDiv.appendChild(resultDiv);

    // Create the link container
    var linkDiv = document.createElement("div");
    linkDiv.className = "link";
    resultDiv.appendChild(linkDiv);

    // Create the head container
    var headDiv = document.createElement("div");
    headDiv.className = "head";
    linkDiv.appendChild(headDiv);

    // Create the image container
    var imgDiv = document.createElement("div");
    imgDiv.className = "img";
    headDiv.appendChild(imgDiv);
    imgDiv.style.backgroundImage = `url(${img})`

    // Create the name container
    var nameDiv = document.createElement("div");
    nameDiv.className = "name";
    nameDiv.textContent = linkname;
    headDiv.appendChild(nameDiv);

    // Create the full link container
    var fullLinkDiv = document.createElement("div");
    fullLinkDiv.className = "full_link";
    fullLinkDiv.textContent = fullLink;
    headDiv.appendChild(fullLinkDiv);

    // Create the title container
    var titleDiv = document.createElement("div");
    titleDiv.className = "title";
    titleDiv.textContent = title;
    linkDiv.appendChild(titleDiv);

    // Create the description container
    var descriptionDiv = document.createElement("div");
    descriptionDiv.className = "description";
    descriptionDiv.textContent = description;
    resultDiv.appendChild(descriptionDiv);

    // Append the result container to the search results container
    searchResultsDiv.appendChild(resultDiv);

}





