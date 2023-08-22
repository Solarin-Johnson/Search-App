
function sorts() {
    for (i = 0; i < 3; i++) {
        sorts = ["Popularity", "Most Relevant", "Latest"]
        sortss = ["popularity", "relevancy", "publishedAt"]
        sort = sessionStorage.getItem("sort")
        const suggest = document.querySelectorAll(".sort")
        if (sort == sortss[i]) {
            suggest[i].style.backgroundColor = "#6B3F26"
            suggest[i].style.color = "#FBFFC0"
        }
    }
}

sorts()


var search_news = sessionStorage.getItem('search_news')
if (sessionStorage.getItem("search_news") == null || sessionStorage.getItem("search_news") == "") {
    window.location.assign("../index.html")
}

document.getElementById("search_icon").addEventListener('click', () => {
    sessionStorage.setItem('search_news', document.getElementById('search_news').value)
    searchq = search_news.replace(' ', '+');
    sort = sessionStorage.getItem("sort")
    lang = sessionStorage.getItem("lang")
    searchResults(searchq, lang, sort)
    location.reload()
})
sort = sessionStorage.getItem("sort")
lang = sessionStorage.getItem("lang")
var search_news = sessionStorage.getItem('search_news')
document.getElementById("search_news").value = search_news
searchq = search_news.replace(' ', '+');
searchResults(searchq, lang, sort)

function truncateString(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    } else {
        return text.substring(0, maxLength) + "...";
    }
}




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






function searchResults(searchq, lang, sort) {
    sort = sessionStorage.getItem("sort")
    var url = `https://newsapi.org/v2/everything?q=${searchq}&language=en&sortBy=${sort}&apiKey=722cb657219e42c1a710a24d19d48188`
    var req = new Request(url);

    fetch(req)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.articles.length > 20) {
                z = 20
                var randomNumbers = generateRandomNumbers(z, 0, z);
            } else {
                z = data.articles.length
                var randomNumbers = generateRandomNumbers(z, 0, z);
            }
            sessionStorage.setItem("z", randomNumbers)
        }

    }
for (i = 0; i < z; i++) {
    console.log("kk")
    if (sessionStorage.getItem("z") == null) {
        if (data.articles.length > 20) {
            z = 20
            var randomNumbers = generateRandomNumbers(z, 0, z);
        } else {
            z = data.articles.length
            var randomNumbers = generateRandomNumbers(z, 0, z);
        }
        sessionStorage.setItem("z", randomNumbers)
    } else {
        var z = sessionStorage.getItem("z")
        var randomNumbers = generateRandomNumbers(z, 0, z);
    }
    var x = randomNumbers
    // if (data.articles.length > 20) {
    //     z = 20
    //     x = randomNumbers[i]
    // } else {
    //     z = data.articles.length
    //     x = i
    // }
    try {
        description = truncateString(data.articles[x].description, 300)
        title = truncateString(data.articles[x].title, 25)
        img = data.articles[x].urlToImage
        linkname = truncateString(data.articles[x].source.name, 20)
        fullLink = truncateString(data.articles[x].url, 30)
        length = data.articles.length - 5
        console.log(linkname)
    } catch (error) {
        console.error("Js caught :" + error.message)
        z = z - 1
    }
    displayResults(z, i, title, description, img, linkname, fullLink)
}
})
}




function displayResults(z, i, title, description, img, linkname, fullLink) {

    searchResultsDiv = document.getElementById("search_results")
    searchResultsDiv.style.gridTemplateRows = `Repeat(20, 130px)`
    document.getElementById("container").style.height = `${(z + 1) * 165}px`
    var resultDiv = document.createElement("div");
    resultDiv.className = "result";
    searchResultsDiv.appendChild(resultDiv);

    var linkDiv = document.createElement("div");
    linkDiv.className = "link";
    resultDiv.appendChild(linkDiv);

    var headDiv = document.createElement("div");
    headDiv.className = "head";
    linkDiv.appendChild(headDiv);

    var imgDiv = document.createElement("div");
    imgDiv.className = "img";
    headDiv.appendChild(imgDiv);
    imgDiv.style.backgroundImage = `url(${img})`

    var nameDiv = document.createElement("div");
    nameDiv.className = "name";
    nameDiv.textContent = linkname;
    headDiv.appendChild(nameDiv);

    var fullLinkDiv = document.createElement("div");
    fullLinkDiv.className = "full_link";
    fullLinkDiv.textContent = fullLink;
    headDiv.appendChild(fullLinkDiv);

    var titleDiv = document.createElement("div");
    titleDiv.className = "title";
    titleDiv.textContent = title;
    linkDiv.appendChild(titleDiv);

    var descriptionDiv = document.createElement("div");
    descriptionDiv.className = "description";
    descriptionDiv.textContent = description;
    resultDiv.appendChild(descriptionDiv);

    searchResultsDiv.appendChild(resultDiv);
    document.querySelectorAll(".link")[i].addEventListener('click', () => {
        location.assign(fullLink)
    })
}



sessionStorage.setItem("sort", sort)
const suggest = document.querySelectorAll(".sort")
suggest.forEach(function (element) {
    element.addEventListener('click', () => {

        for (let i = 0; i < 3; i++) {
            sorts = ["Popularity", "Most Relevant", "Latest"]
            suggest[i].style.backgroundColor = "#FBFFC0"
            suggest[i].style.color = "#000"
            location.reload()
        }
        if (element.textContent == sorts[0]) {
            sort = "popularity"
        }
        if (element.textContent == sorts[1]) {
            sort = "relevancy"
        }
        if (element.textContent == sorts[2]) {
            sort = "publishedAt"
        }


        element.style.backgroundColor = "#6B3F26"
        element.style.color = "#FBFFC0"
        sessionStorage.setItem("sort", sort)
    })


})

