const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particleArray;

// create constructor function
function Particle(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
}
// add draw method  to particle prototype
Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
}
// add update method to particle prototype

Particle.prototype.update = function() {
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
        this.directionX = -this.directionX
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0){
        this.directionY = -this.directionY;
    }

    this.x += this.directionX;
    this.y += this.directionY;

    this.draw();
}
// create particle array
function init() {
    particleArray = [];
    for (let i = 0; i < 100; i++)  {
        let size = Math.random() * 25;
        let x = Math.random() * (innerWidth - size * 2);
        let y = Math.random() * (innerHeight - size * 2);
        let directionX = (Math.random() * .5) - .2;
        let directionY = (Math.random() * .5) - .2;
        let color = 'rgba(101, 119, 228, 0.125)';

        particleArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}
// animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0, innerWidth, innerHeight);

    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update()
    }
}
init();
animate();

// resize
window.addEventListener('resize', 
    function() {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        init();
    }
)








const quizData = [

    {
        question: '1. Jembatan yang menghubungkan Surabaya dan Madura ?  ',
        a: "Surabimadu",
        b: "Susumadu",
        c: "Suramadu",
        d: "Suramaju",
        correct: "c",
    },
    {
        question: '2. Berapa umur Saprudin 20 Tahun yang lalu Jika Anaknya sekarang berumur 20 Tahun',
        a: "20 Tahun",
        b: "40 Tahun",
        c: "45 Tahun ",
        d: "gak mau tau",
        correct: "d",
    },
    {
        question: '3. Apa lambang Sila ke-3 ? ',
        a: "Pohon Beringin",
        b: "Pohon Cabe",
        c: "Pohon Toge",
        d: "Pohon Mangga",
        correct: "a",
    },
    {
        question: '4. Dimanakah jendral Sudirman dilahirkan ?',
        a: "Rumah Sakit",
        b: "Dukun Beranak",
        c: "Purbolinggo",
        d: "Purwokerto",
        correct: "c",
    },
    {
        question: '5. Siapakah Presiden RI ke-3 ?',
        a: "Ricky Zatnika",
        b: "Ir. Soeharto",
        c: "B.J Habibie",
        d: "K. H. Abdurrahman Wahid",
        correct: "c",
    },
    {
        question: '6. Kenapa motor bisa berhenti di depan Lampu merah ?',
        a: "Lampu sedang berwarna merah",
        b: "Lagi pengen berhenti aja",
        c: "Motornya mogok",
        d: "Karena motornya di rem",
        correct: "d",
    },
    {
        question: '7. Apa yang paling ditakuti di Ruangan Rumah Sakit ?',
        a: "Kamar Mayat",
        b: "Ruang Gawat Darurat",
        c: "Ruang Operasi",
        d: "Ruang Administrasi",
        correct: "d",
    },
    {
        question: '8. Saya punya 3 apel, Jika kamu ngambil 2buah dari saya Berapa apel yang kamu punya ?',
        a: "1 apel",
        b: "2 apel",
        c: "3 apel",
        d: "4 apel",
        correct: "2",
    },
    {
        question: '9. Ada 12 Ikan di kolam, Jika setengahnya tenggelam berapa banyak  yang tersisa ?',
        a: "4 ikan",
        b: "6 ikan",
        c: "8 ikan",
        d: "Tetap 12 ikan",
        correct: "d",
    },
    {
        question: '10. Sebuah Kereta Api Listrik bergerak ke Selatan dengan kecepatan penuh, Ke arah mana asapnya berhembus ?',
        a: "Utara",
        b: "Barat",
        c: "Timur",
        d: "Ketiga nya Salah",
        correct: "d",
    },
]

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function getSelected() {
    let answer = undefined;

    answerEls.forEach((answerEl) => {
        if (answerEl.checked){
            answer = answerEl.id;
        }
    });

    return answer;
}

function deselectAnswers(){
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
}

submitBtn.addEventListener("click", () => {
    const answer = getSelected();


    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }

        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = `
            
                <h2> Selamat Kamu Menjawab ${score} dari ${quizData.length} pertanyaan</h2>
                <button onclick="location.reload()"> Mulai Lagi ??</button>
            `;
        }
    }

});