const uploadInput = document.getElementById("uploadInput");
const memeImage = document.getElementById("memeImage");
const memeVideo = document.getElementById("memeVideo");
const memeContainer = document.getElementById("memeContainer");
const topText = document.getElementById("topText");
const bottomText = document.getElementById("bottomText");
const topTextInput = document.getElementById("topTextInput");
const bottomTextInput = document.getElementById("bottomTextInput");
const fontSelector = document.getElementById("fontSelector");
const topColorInput = document.getElementById("topColorInput");
const bottomColorInput = document.getElementById("bottomColorInput");
const downloadBtn = document.getElementById("downloadBtn");

let mediaType = "";

// Handle file uploads
uploadInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const fileURL = URL.createObjectURL(file);
    const fileType = file.type.startsWith("video") ? "video" : "image";

    if (fileType === "video") {
        mediaType = "video";
        memeVideo.src = fileURL;
        memeVideo.style.display = "block";
        memeImage.style.display = "none";
    } else {
        mediaType = "image";
        memeImage.src = fileURL;
        memeImage.style.display = "block";
        memeVideo.style.display = "none";
    }

    downloadBtn.style.display = "block";
    updateTextOverlay();
});

// Update text overlay in real-time
[topTextInput, bottomTextInput, fontSelector, topColorInput, bottomColorInput].forEach(input => {
    input.addEventListener("input", updateTextOverlay);
});

function updateTextOverlay() {
    topText.textContent = topTextInput.value;
    bottomText.textContent = bottomTextInput.value;

    topText.style.color = topColorInput.value;
    bottomText.style.color = bottomColorInput.value;

    let selectedFont = fontSelector.value;
    topText.style.fontFamily = selectedFont;
    bottomText.style.fontFamily = selectedFont;
}

// Download Image Meme
downloadBtn.addEventListener("click", function () {
    html2canvas(memeContainer).then(canvas => {
        let image = canvas.toDataURL("image/png");
        let link = document.createElement("a");
        link.href = image;
        link.download = "meme.png";
        link.click();
    });
});
