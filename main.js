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

document.getElementById("search_icon").addEventListener('click', () => {
    sessionStorage.setItem('search_news', document.getElementById('search_news').value)
})

sessionStorage.setItem("search_news", "Hello World")