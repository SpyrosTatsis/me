document.getElementById("removeBtn").addEventListener("click", function() {
    document.getElementById("container").style.display = "none";
    document.body.classList.add("showBackground");
    document.getElementById("musicPlayer").classList.add("visible");
    document.getElementById("audioPlayer").play();

    document.getElementById("quizBtn").style.display = "block";
});


document.getElementById("quizBtn").addEventListener("click", function() {
    window.location.href = "/quiz";
});
