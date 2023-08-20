autosize = setInterval(() => {
    if (innerWidth < 500) {
        document.getElementById("container").style.width = `${innerWidth - 0.2}px`
    } else {
        document.getElementById("container").style.width = "500px"
    }
}, 1);
var service = "news"

document.getElementById("news").addEventListener("click", () => {
    alert("hhdh")
})