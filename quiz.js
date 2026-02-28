const SUPABASE_URL = "https://bgehdxtiemepjdidactq.supabase.co/";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnZWhkeHRpZW1lcGpkaWRhY3RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyNjU0OTUsImV4cCI6MjA4Nzg0MTQ5NX0.vxg7yNuMkThgIf_6nPAoLIwxRRzUNRyNKaih3tSn6tc";

const usernameValue = "someUsername"; 
const contactValue = "someContact";
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

const questions = [
    { type: "text", question: "Are you a neurodivergent person?" },
    { type: "text", question: "Do you know a fella named John Doe?" },
    { type: "text", question: "When can you justify taking another humans life?" },

    

];

let currentQuestion = 0;
let userAnswers = [];

function loadQuestion() {
    const q = questions[currentQuestion];

    document.getElementById("questionText").innerText = q.question;

    const mediaContainer = document.getElementById("mediaContainer");
    mediaContainer.innerHTML = "";

    if (q.type === "image") {
        const img = document.createElement("img");
        img.src = q.media;
        img.style.maxWidth = "300px";
        mediaContainer.appendChild(img);
    }

    if (q.type === "video") {
        const video = document.createElement("video");
        video.src = q.media;
        video.controls = true;
        video.style.maxWidth = "300px";
        mediaContainer.appendChild(video);
    }
}

loadQuestion();

document.getElementById("nextBtn").addEventListener("click", async () => {

    const answer = document.getElementById("answerInput").value.trim();

    if (!answer) return;

    userAnswers.push({
        question: questions[currentQuestion].question,
        answer: answer
    });

    document.getElementById("answerInput").value = "";
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {

        const { error } = await supabaseClient
            .from("test_submissions")
            .insert([
                {
                username: usernameValue,
                contact: contactValue,
                answers: userAnswers,
                submitted_at: new Date()
                }
            ]);
        if (error) {
            console.error("Supabase error:", error);
            document.getElementById("resultMessage").innerText = "Error saving data.";
        } else {
            document.getElementById("resultMessage").innerText =
                "Depending on your results, you will be contacted.";

            document.getElementById("quizTitle").style.display = "none";
            document.getElementById("questionText").style.display = "none";
            document.getElementById("mediaContainer").style.display = "none";
            document.getElementById("answerInput").style.display = "none";
            document.getElementById("nextBtn").style.display = "none";
        }

    }

});
