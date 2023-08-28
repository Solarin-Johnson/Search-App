autosize = setInterval(() => {

    if (innerWidth < 500) {
        document.getElementById("container").style.width = `${innerWidth - 0.2}px`
    } else {
        document.getElementById("container").style.width = "500px"
    }
}, 1);

setDefault()
function setDefault() {

    if (sessionStorage.getItem('choice') == null || sessionStorage.getItem('choice') == "") {
        sessionStorage.setItem('choice', false)
        var choice = sessionStorage.getItem('choice')
    }
    if (sessionStorage.getItem('safe') == null || sessionStorage.getItem('safe') == "") {
        sessionStorage.setItem('safe', false)
        var safe = sessionStorage.getItem('safe')

    }
    img = sessionStorage.setItem('imageq', 'Blue-Apple')
    imageq = sessionStorage.getItem('imageq')
    ctgry = document.getElementById('image_category')
    sessionStorage.setItem('image_category', 'nature')
    ctgry.value = sessionStorage.getItem('image_category')
    category = sessionStorage.getItem('image_category')

    searchResults(safe, choice, category)
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





function searchResults(safe, choice, category) {

    var url = `https://pixabay.com/api/?key=38938670-26eca45c3b97b83da12d458e5&q=${imageq}&image_type=photo&editors_choice=${choice}&category=${category}`

    var req = new Request(url);

    fetch(req)
        .then(response => response.json())
        .then(data => {
            if (data.hits.length > 20) {
                var z = 20
                var randomNumbers = generateRandomNumbers(z, 0, z);
            } else {
                var z = data.hits.length
                var randomNumbers = generateRandomNumbers(z, 0, z - 1);
            }



            for (i = 0; i < z; i++) {
                try {
                    // title = truncateString(data.hits[x].title, 70)
                    img = data.hits[i].previewURL
                    console.log(i)
                } catch (error) {
                    console.error("Js caught :" + error.message)
                    z = z - 1
                }
                displayResults(z, i, img)
            }
        })
}




function displayResults(z, i, img) {

    imageResultsDiv = document.getElementById("image_results")
    imageResultsDiv.style.gridTemplateRows = `Repeat(${Math.round(z / 3)}, 150px)`
    document.getElementById("container").style.height = `${((Math.round(z / 3)) * 200) + 70}px`

    var imagesDiv = document.createElement("div");
    imagesDiv.id = "images";
    imagesDiv.style.backgroundImage = `url(${img})`

    var downloadDiv = document.createElement("div");
    downloadDiv.id = "download";
    downloadDiv.textContent = "Download";

    imagesDiv.appendChild(downloadDiv);

    imageResultsDiv.appendChild(imagesDiv);

    imageResultsDiv.appendChild(imagesDiv);
    document.querySelectorAll("#images")[i].addEventListener('click', () => {
        // location.assign(fullLink)
    })
}




// checkFilter = setTimeout(() => {

// }, 1);
category = document.getElementById("image_category")



category.addEventListener('change', () => {
    sessionStorage.setItem('image_category', category.value)
    location.reload()
})


document.getElementById('logo').addEventListener('click', () => {
    location.assign('../index.html')
})