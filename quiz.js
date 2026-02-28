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
    { type: "image", question: "Do you feel any familiarity with is image?", media: "https://i.pinimg.com/736x/45/8a/6a/458a6a1a8fd0ae691faa5b173bc5a48c.jpg" },
    { type: "text", question: "At what age were you exposed to the internet?" },
    { type: "text", question: "Should a small intelligent group of people manage a huge group of less intelligent people?" },
    { type: "image", question: "What is depicted in this image?", media: "https://i.pinimg.com/736x/1b/53/2d/1b532d0581f27a18f7edd7a796cd60b5.jpg" },
    { type: "text", question: "When you are walking outside, what do you feel about the people around you?" },
    { type: "text", question: "Do you think these people are on the same intelligence level as you?" },
    { type: "text", question: "Do you think these people are in control of their lives?" },
    { type: "text", question: "Do you think these people are real?" },
    { type: "text", question: "Do you think these people have souls?" },
    { type: "text", question: "Do you consider these people as fellow humans?" },
    { type: "text", question: "What name do you go by?" },
    { type: "text", question: "Any way to contact you?" },
    { type: "text", question: "Do you believe in a free market?" },
    { type: "video", question: "Look how good of a dancer this cat is", media: "cat.mp4" },
    { type: "text", question: "Is it worth trying to fight unbeatable system?" },
    { type: "text", question: "Should a person just exploit the opportunities given to him by this system?" },
    { type: "text", question: "Should a person try to fit in?" },
    { type: "text", question: "Is it weird to fit in or to not fit in?" }
    

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