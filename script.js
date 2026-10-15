/* ==========================================================================
   1. EFEITO MATRIX DIGITAL RAIN (CANVAS)
   ========================================================================== */
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Caracteres estilo Matrix
const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const alphabet = katakana + latin;

const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);
let rainDrops = [];

function initRain() {
    columns = Math.floor(canvas.width / fontSize);
    rainDrops = [];
    for (let i = 0; i < columns; i++) {
        rainDrops[i] = Math.random() * -100;
    }
}
initRain();
window.addEventListener('resize', initRain);

function drawMatrix() {
    ctx.fillStyle = 'rgba(3, 10, 5, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff66';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
}

setInterval(drawMatrix, 35);

/* ==========================================================================
   2. ANIMAÇÃO DE ENTRADA DO SISTEMA (INTRO)
   ========================================================================== */
const introScreen = document.getElementById('introScreen');
const formContainer = document.getElementById('formContainer');
const typewriterText = document.getElementById('typewriterText');
const progressBar = document.getElementById('progressBar');

const introMessages = [
    "INICIALIZANDO SISTEMA...",
    "CARREGANDO MÓDULOS DE AVALIAÇÃO...",
    "CONECTANDO AO BANCO DE DADOS...",
    "SISTEMA PRONTO."
];

let progress = 0;

function runIntro() {
    const progressInterval = setInterval(() => {
        progress += 2;
        progressBar.style.width = progress + '%';

        if (progress === 30) typewriterText.textContent = introMessages[1];
        if (progress === 70) typewriterText.textContent = introMessages[2];
        if (progress === 95) typewriterText.textContent = introMessages[3];

        if (progress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                introScreen.style.display = 'none';
                formContainer.classList.add('show');
            }, 400);
        }
    }, 50);
}

window.addEventListener('load', runIntro);

/* ==========================================================================
   3. LÓGICA DE VALIDAÇÃO E MODAL ANIMADO
   ========================================================================== */
const vagaForm = document.getElementById('vagaForm');
const modalOverlay = document.getElementById('modalOverlay');
const modalCard = document.getElementById('modalCard');
const modalIcon = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const closeModalBtn = document.getElementById('closeModalBtn');

vagaForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const idade = parseInt(document.getElementById('idade').value);
    const altura = parseFloat(document.getElementById('altura').value);

    // Critério: Altura >= 1.70 e Idade >= 18
    if (altura >= 1.70 && idade >= 18) {
        modalCard.className = 'modal-card success';
        modalIcon.textContent = '⚡';
        modalTitle.textContent = 'ACESSO CONCEDIDO';
        modalMessage.innerHTML = `Olá, <strong>${nome}</strong>!<br>Parabéns! Você pode prosseguir no processo para a vaga!`;
    } else {
        modalCard.className = 'modal-card error';
        modalIcon.textContent = '⚠️';
        modalTitle.textContent = 'ACESSO NEGADO';
        modalMessage.innerHTML = `Olá, <strong>${nome}</strong>.<br>Infelizmente você não é apto à vaga.`;
    }

    modalOverlay.classList.add('active');
});

closeModalBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
    }
});