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
    if (sessionStorage.getItem('imageq') == null) {
        sessionStorage.setItem('imageq', '')
    }

    searchq = document.getElementById('search_image')
    searchq.value = sessionStorage.getItem('imageq')
    imageq = sessionStorage.getItem('imageq').replace(/\s+/g, '-')
    ctgry = document.getElementById('image_category')
    ctgry.value = sessionStorage.getItem('image_category')
    category = sessionStorage.getItem('image_category')

    searchResults(imageq, safe, choice, category)
    // sessionStorage.setItem
}
document.getElementById('search_icon').addEventListener('click', () => {
    searchq = document.getElementById('search_image')
    sessionStorage.setItem('imageq', searchq.value)
    location.reload()
})



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





function searchResults(imageq, safe, choice, category) {
    var url = `https://pixabay.com/api/?key=38938670-26eca45c3b97b83da12d458e5&q=${imageq}&image_type=photo&editors_choice=${choice}&category=${category}`
    console.log(url)

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
                    img = data.hits[i].webformatURL
                    full = data.hits[i].largeImageURL
                    console.log(i)
                } catch (error) {
                    console.error("Js caught :" + error.message)
                    z = z - 1
                }
                displayResults(z, i, full, img)
            }
        })
}




function displayResults(z, i, full, img) {

    imageResultsDiv = document.getElementById("image_results")
    imageResultsDiv.style.gridTemplateRows = `Repeat(${Math.ceil(z / 3)}, 150px)`
    document.getElementById("container").style.height = `${((Math.ceil(z / 3)) * 200) + 100}px`

    var imagesDiv = document.createElement("div");
    imagesDiv.id = "images";
    imagesDiv.style.backgroundImage = `url(${img})`

    var downloadDiv = document.createElement("div");
    downloadDiv.id = "download";

    const downloadSpan = document.createElement("span");
    downloadSpan.className = "fas fa-expand";
    downloadDiv.addEventListener('click', () => {
        location.assign(full)
        // console.log(img)
        // // Set the image URL and suggested filename  // Replace with your image URL
        // const suggestedFilename = 'bitch.jpg';  // Replace with your suggested filename
        // // downloadDiv.href = `https://pixabay.com/get/g82e5a55d20e1fdaab9f3bbce70ef6c0f0da6afdd1bab7a87fd006bfe498332b1fc93925050fb81733f9b46c56a7751c47ae8dae02f027bd989ff45c4ccd4d3d7_1280.jpg`;
        // downloadDiv.download = suggestedFilename;
    })

    downloadDiv.appendChild(downloadSpan);
    imagesDiv.appendChild(downloadDiv);


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

if (sessionStorage.getItem("imageq") == null || sessionStorage.getItem("imageq") == "") {
    window.location.assign("../index.html")
}

sessionStorage.setItem("sort", sort)
const suggest = document.querySelectorAll(".sort")
suggest.forEach(function (element) {
    element.addEventListener('click', () => {

        // for (let i = 0; i < 3; i++) {
        //     sorts = ["Popularity", "Most Relevant", "Latest"]
        //     suggest[i].style.backgroundColor = "#FBFFC0"
        //     suggest[i].style.color = "#000"
        //     location.reload()
        // }
        // if (element.textContent == sorts[0]) {
        //     sort = "popularity"
        // }
        // if (element.textContent == sorts[1]) {
        //     sort = "relevancy"
        // }
        // if (element.textContent == sorts[2]) {
        //     sort = "publishedAt"
        // }


        element.style.backgroundColor = "#6B3F26"
        element.style.color = "#FBFFC0"
        sessionStorage.setItem("sort", sort)
    })


})