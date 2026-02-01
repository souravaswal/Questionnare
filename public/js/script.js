const answers_no = {
    english: [
        "No", "Are you sure?", "Are you really sure??", "Are you really really sure???",
        "Think again?", "Don't believe in second chances?", "Why are you being so cold?",
        "Maybe we can talk about it?", "I am not going to ask again!",
        "Ok now this is hurting my feelings!", "You are now just being mean!",
        "Why are you doing this to me?", "Please give me a chance!",
        "I am begging you to stop!", "Ok, Let's just start over.."
    ],
    french: [
        "Non", "Tu es sûr ?", "Tu es vraiment sûr ??", "Tu es vraiment vraiment sûr ???",
        "Réfléchis encore?", "Tu ne crois pas aux deuxièmes chances ?", "Pourquoi tu es si froid?",
        "Peut-être, on peut en parler ?", "Je ne vais pas demander encore une fois!",
        "D'accord, maintenant ca me fait mal!", "Tu es juste méchant!", "Pourquoi tu me fais ça?",
        "Donnez-moi une chance plz!", "Je te supplie d'arrêter!", "D'accord, recommençons.."
    ],
    thai: [
        "ไม่อ่ะ", "แน่ใจจริงๆหรอคะ?", "แน่ใจจริงๆ จริงๆนะคะ?", "อย่าบอกนะว่านี่แน่ใจสุดๆแล้วจริงๆ ?",
        "ลองคิดดูอีกทีหน่อยสิคะ..", "ขอโอกาศที่สองทีค่ะ..", "อย่าเย็นชาสิคะ กระซิกๆ",
        "ขอร้องนะคะ", "น้าาาๆๆๆๆๆ", "เราจะร้องไห้เอานะ กระซิกๆ", "จะเอางี้ๆจริงหรอคะ",
        "ฮือออออ", "ขอโอกาศครั้งที่สองที่ค่ะ!", "ขอร้องละค่าาา", "โอเคค่ะ.. งั้นเริ่มใหม่ !"
    ]
};

// Preload audio
const yesAudio = new Audio('./public/assets/Music.mp3');

const answers_yes = {
    english: "Yes",
    french: "Oui",
    thai: "เย่ คืนดีกันแล้วน้า"
};

// Google Form config
const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSdY5njOBQ8ZpMUYpgxCIzIMzp1ko4lih6XJU0GYxCGHNm-J7A/formResponse";
const nameEntryID = "entry.1740488615";   // Replace with your form Name field entry ID
const answerEntryID = "entry.1557527371"; // Replace with your form Answer field entry ID

let language = "english";
const no_button = document.getElementById('no-button');
const yes_button = document.getElementById('yes-button');
let i = 1;
let size = 50;
let clicks = 0;

// Helper: set button text
function setButtonText(button, text) {
    button.innerHTML = `<p>${text}</p>`;
}

// Helper: send to Google Form
function submitToGoogleForm(answer) {
    const data = new URLSearchParams();
    data.append(nameEntryID, "Deepika"); // Or dynamically ask for name
    data.append(answerEntryID, answer);

    fetch(googleFormURL, {
        method: "POST",
        mode: "no-cors",
        body: data
    });
}

// Helper: hide dare text
function hideDareText() {
    const dareText = document.getElementById("dare-text");
    if (dareText) dareText.style.display = "none";
}

// NO button
no_button.addEventListener('click', () => {
    hideDareText(); // Hide dare text immediately
    submitToGoogleForm("NO");

    let banner = document.getElementById('banner');
    if (clicks === 0) {
        banner.src = "public/images/no.gif";
        refreshBanner();
    }
    clicks++;

    const sizes = [40, 50, 30, 35, 45];
    size += sizes[Math.floor(Math.random() * sizes.length)];
    yes_button.style.height = `${size}px`;
    yes_button.style.width = `${size}px`;

    const total = answers_no[language].length;
    if (i < total - 1) {
        setButtonText(no_button, answers_no[language][i]);
        i++;
    } else if (i === total - 1) {
        alert(answers_no[language][i]);
        i = 1;
        setButtonText(no_button, answers_no[language][0]);
        setButtonText(yes_button, answers_yes[language]);
        yes_button.style.height = "50px";
        yes_button.style.width = "50px";
        size = 50;
    }
});

// YES button
yes_button.addEventListener('click', () => {
    hideDareText(); // Hide dare text immediately
    yesAudio.play();

    let banner = document.getElementById('banner');
    banner.src = "public/images/yes.gif";
    refreshBanner();

    document.getElementsByClassName('buttons')[0].style.display = "none";
    document.getElementById('question-heading').style.display = "none";
    document.getElementsByClassName('message')[0].style.display = "block";

    submitToGoogleForm("YES");
});

// Reload GIF
function refreshBanner() {
    let banner = document.getElementById('banner');
    let src = banner.src;
    banner.src = '';
    banner.src = src;
}

// Language change (if you have the selector)
function changeLanguage() {
    const selectElement = document.getElementById("language-select");
    language = selectElement.value;

    const questionHeading = document.getElementById("question-heading");
    if (language === "french") questionHeading.textContent = "Tu veux être mon valentin?";
    else if (language === "thai") questionHeading.textContent = "คืนดีกับเราได้อ่ะป่าว?";
    else questionHeading.textContent = "Will you be my valentine?";

    setButtonText(yes_button, answers_yes[language]);
    if (clicks === 0) setButtonText(no_button, answers_no[language][0]);
    else setButtonText(no_button, answers_no[language][clicks]);

    const successMessage = document.getElementById("success-message");
    if (language === "french") successMessage.textContent = "Yepppie, à bientôt :3";
    else if (language === "thai") successMessage.textContent = "ฮูเร่ คืนดีกันแล้วน้า :3";
    else successMessage.textContent = "Yepppie, see you sooonnn :3";
}