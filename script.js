// Obter o canvas e o contexto
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Ajustar o tamanho do canvas para a tela
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Criar uma partícula
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width; // Posição inicial aleatória no eixo X
        this.y = -10; // Começa um pouco acima da tela
        this.size = Math.random() * 5 + 2; // Tamanho aleatório da partícula
        this.speedY = Math.random() * 2 + 1; // Velocidade da partícula no eixo Y
        this.speedX = Math.random() * 1 - 0.5; // Movimento horizontal leve
        this.opacity = Math.random() * 0.5 + 0.3; // Opacidade aleatória para dar um efeito mais suave
    }

    // Atualizar a posição da partícula
    update() {
        this.y += this.speedY; // Movimenta a partícula para baixo
        this.x += this.speedX; // Movimento horizontal

        // Quando a partícula sair da tela, ela reaparece no topo
        if (this.y > canvas.height) {
            this.y = -this.size;
            this.x = Math.random() * canvas.width;
        }

        // Quando a partícula sair das bordas laterais, ela retorna
        if (this.x > canvas.width) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = canvas.width;
        }
    }

    // Desenhar a partícula no canvas
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); // Desenha uma partícula circular
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`; // Cor branca com opacidade
        ctx.fill();
    }
}

// Lista de partículas
let particles = [];

// Criar partículas
function createParticles() {
    for (let i = 0; i < 100; i++) {  // Número de partículas
        particles.push(new Particle());
    }
}

// Animar as partículas
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas a cada quadro

    // Atualiza e desenha cada partícula
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animateParticles); // Chama a função novamente para continuar a animação
}

// Inicia o processo
createParticles();
animateParticles();

function animateOnScroll() {
    const elements = document.querySelectorAll('.animate, .sobre-container');
    
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            element.classList.add('visible');
        } else {
            element.classList.remove('visible');
        }
    });
}

window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);
