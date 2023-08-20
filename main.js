autosize = setInterval(() => {
    if (innerWidth < 500) {
        document.getElementById("container").style.width = `${innerWidth - 0.2}px`
    }
}, 10);
