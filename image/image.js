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

    if (sessionStorage.getItem('imageq') == null || sessionStorage.getItem('imageq') == null) {
        sessionStorage.setItem('country', cntry)
    }
    if (sessionStorage.getItem('choice') == null || sessionStorage.getItem('choice') == null) {

    }
    if (sessionStorage.getItem('safe') == null || sessionStorage.getItem('safe') == null) {
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

    imageResultsDiv = document.getElementById("image_results")
    imageResultsDiv.style.gridTemplateRows = `Repeat(${z}, 120px)`
    document.getElementById("container").style.height = `${((z + 1) * 155) + 70}px`

    var imagesDiv = document.createElement("div");
    imagesDiv.id = "images";

    var downloadDiv = document.createElement("div");
    downloadDiv.id = "download";
    downloadDiv.textContent = "Download";

    imagesDiv.appendChild(downloadDiv);

    imageResultsDiv.appendChild(imagesDiv);

    document.body.appendChild(imageResultsDiv);
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