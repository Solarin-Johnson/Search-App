autosize = setInterval(() => {

    if (innerWidth < 500) {
        document.getElementById("container").style.width = `${innerWidth - 0.2}px`
    } else {
        document.getElementById("container").style.width = "500px"
    }
}, 1);

setDefault()
function setDefault() {
    cntry = document.getElementById('countrySelect').value
    ctgry = document.getElementById('category').value

    if (sessionStorage.getItem('country') == null || sessionStorage.getItem('category') == null || sessionStorage.getItem('lang') == '' || sessionStorage.getItem('category') == '') {
        sessionStorage.setItem('country', cntry)
        cntry = sessionStorage.getItem('country')
        sessionStorage.setItem('category', ctgry)
        ctgr = sessionStorage.getItem('ctgry')
    } else {
        document.getElementById('countrySelect').value = sessionStorage.getItem('country')
        document.getElementById('category').value = sessionStorage.getItem('category')
    }

    country = sessionStorage.getItem('country')
    category = sessionStorage.getItem('category')

    searchResults(country, category)
    // sessionStorage.setItem
}



function truncateString(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    } else {
        return text.substring(0, maxLength) + "...";
    }
}

function truncateStringAlt(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    } else {
        return text.substring(0, maxLength) + "";
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





function searchResults(country, category) {

    var url = `https://pixabay.com/api/?key=38938670-26eca45c3b97b83da12d458e5&q=${imageq}&image_type=photo&editors_choice=${choice}&category=${category}`

    var req = new Request(url);

    fetch(req)
        .then(response => response.json())
        .then(data => {
            if (data.articles.length > 20) {
                z = 20
                var randomNumbers = generateRandomNumbers(z, 0, z);
            } else {
                z = data.articles.length
                var randomNumbers = generateRandomNumbers(z, 0, z - 1);
            }



            for (i = 0; i < z; i++) {
                var x = randomNumbers[i]

                try {
                    title = truncateString(data.articles[x].title, 70)
                    linkname = truncateString(data.articles[x].source.name, 20)
                    fullLink = truncateString(data.articles[x].url, 30)
                    date = truncateStringAlt(data.articles[x].publishedAt, 10)
                } catch (error) {
                    console.error("Js caught :" + error.message)
                    z = z - 1
                }
                displayResults(z, i, title, linkname, fullLink, date)
            }
        })
}




function displayResults(z, i, title, linkname, fullLink, date) {

    searchResultsDiv = document.getElementById("search_results")
    searchResultsDiv.style.gridTemplateRows = `Repeat(${z}, 120px)`
    document.getElementById("container").style.height = `${((z + 1) * 155) + 70}px`
    const resultsDiv = document.createElement("div");
    resultsDiv.id = "results";

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("title");
    titleDiv.textContent = title

    const footDiv = document.createElement("div");
    footDiv.classList.add("foot");

    const nameDiv = document.createElement("div");
    nameDiv.classList.add("name");
    nameDiv.textContent = linkname

    const dateDiv = document.createElement("div");
    dateDiv.classList.add("date");
    dateDiv.textContent = date

    footDiv.appendChild(nameDiv);
    footDiv.appendChild(dateDiv);

    resultsDiv.appendChild(titleDiv);
    resultsDiv.appendChild(footDiv);

    searchResultsDiv.appendChild(resultsDiv);

    document.querySelectorAll("#results")[i].addEventListener('click', () => {
        location.assign(fullLink)
    })
}




// checkFilter = setTimeout(() => {

// }, 1);
country = document.getElementById("countrySelect")
category = document.getElementById("category")

country.addEventListener('change', () => {
    sessionStorage.setItem('country', country.value)
    location.reload()
})

category.addEventListener('change', () => {
    sessionStorage.setItem('category', category.value)
    location.reload()
})


document.getElementById('logo').addEventListener('click', () => {
    location.assign('../index.html')
})