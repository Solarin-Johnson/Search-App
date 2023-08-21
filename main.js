autosize = setInterval(() => {
    if (innerWidth < 500) {
        document.getElementById("container").style.width = `${innerWidth - 0.2}px`
    } else {
        document.getElementById("container").style.width = "500px"
    }
}, 1);
var service = "news"

// document.getElementById("news").addEventListener("click", () => {
//     alert("hhdh")
// })
function containsOnlySpaces(input) {
    // Use a regular expression to check if the input contains only spaces
    return /^\s*$/.test(input);
}
function removeWhitespace(input) {
    return input.replace(/\s+/g, ' ');
}



document.getElementById("search_icon").addEventListener('click', () => {
    if (containsOnlySpaces(document.getElementById('search_news').value)) {
        alert("Enter the Keyword for your Search")
    } else {
        searchq = removeWhitespace(document.getElementById('search_news').value)
        sessionStorage.setItem('search_news', searchq)
        // console.log(searchq)
        window.location.assign("news/news.html")
    }
})

sessionStorage.setItem('lang', "NG")
document.getElementById("countriesDropdown").addEventListener('focus', () => {
    lang = document.getElementById("countriesDropdown").value
    sessionStorage.setItem('lang', lang)
})


