document.getElementById("removeBtn").addEventListener("click", function() {

    document.getElementById("container").remove();

    document.body.classList.add("showBackground");

    document.getElementById("musicPlayer").classList.add("visible");

    document.getElementById("audioPlayer").play();

});