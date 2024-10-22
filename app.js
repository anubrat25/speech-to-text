// Initialize Speech Recognition API
let recognition;
if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
  recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
} else {
  alert("Your browser does not support Speech Recognition.");
}

recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const speakButton = document.getElementById("speakButton");
const form = document.getElementById("voiceForm");
const resultsDiv = document.getElementById("results");

// Handle Speak Button Click
speakButton.addEventListener("click", () => {
  console.log("Speak button clicked, starting recognition...");
  recognition.start();
});

// Speech recognition result
recognition.onresult = function (event) {
  const transcript = event.results[0][0].transcript.toLowerCase();
  console.log("Speech recognized: ", transcript);
  fillFormFields(transcript);
};

recognition.onspeechend = function () {
  recognition.stop();
};

recognition.onerror = function (event) {
  alert("Error occurred in speech recognition: " + event.error);
};

// Dynamically fill the form based on spoken content
function fillFormFields(transcript) {
  const words = transcript.split(" ");

  if (transcript.includes("name")) {
    document.getElementById("name").value = extractField(words, "name");
  }
  if (transcript.includes("email")) {
    document.getElementById("email").value = extractField(words, "email");
  }
  if (transcript.includes("phone")) {
    document.getElementById("phone").value = extractField(words, "phone");
  }
  if (transcript.includes("address")) {
    document.getElementById("address").value = extractField(words, "address");
  }
}

// Helper function to get value after a keyword
function extractField(words, keyword) {
  const index = words.indexOf(keyword);
  if (index !== -1 && index + 1 < words.length) {
    return words[index + 1];
  }
  return "";
}

// Handle Form Submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(form);
  let output = "<h3>Form Data:</h3><ul>";
  formData.forEach((value, key) => {
    output += `<li><strong>${key}:</strong> ${value}</li>`;
  });
  output += "</ul>";

  resultsDiv.innerHTML = output;
});
