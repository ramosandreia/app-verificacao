/* ==========================================================================
   1. EFEITO CANVA DE FAGULHAS DE FOGO (FIRE SPARKS)
   ========================================================================== */
const canvas = document.getElementById('fireCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Spark {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 2 + 1.2;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.opacity = Math.random() * 0.8 + 0.2;
        
        // Cores em tons de amarelo, laranja e vermelho incandescente
        const colors = [
            '#ffcc00', // Amarelo
            '#ff8800', // Laranja claro
            '#ff4400', // Laranja escuro
            '#ff1100'  // Vermelho
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.y -= this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.5;
        this.opacity -= 0.003;

        if (this.y < -10 || this.opacity <= 0) {
            this.reset();
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

const sparkCount = 120;
const sparks = [];
for (let i = 0; i < sparkCount; i++) {
    sparks.push(new Spark());
}

function animateSparks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let spark of sparks) {
        spark.update();
        spark.draw();
    }

    requestAnimationFrame(animateSparks);
}
animateSparks();

/* ==========================================================================
   2. ANIMAÇÃO DE ENTRADA DO SISTEMA (INTRO)
   ========================================================================== */
const introScreen = document.getElementById('introScreen');
const formContainer = document.getElementById('formContainer');
const typewriterText = document.getElementById('typewriterText');
const progressBar = document.getElementById('progressBar');

const introMessages = [
    "INICIALIZANDO SISTEMA DE CHAMAS...",
    "CARREGANDO CRITÉRIOS DE SELEÇÃO...",
    "ESTABILIZANDO NÚCLEO DE DADOS...",
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
    }, 40);
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
        modalIcon.textContent = '🔥';
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