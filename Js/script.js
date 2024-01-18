let snake = [{x: 200, y: 200}]; // Coordenadas iniciales de la serpiente
let direction = {x: 0, y: -20}; // Dirección inicial de la serpiente
const gameArea = document.getElementById('gameArea');
const scoreValue = document.getElementById('scoreValue');
let score = 0;

function initGame() {
    // Aquí irá la lógica para iniciar el juego
}

// Inicializar el juego cuando se carga la página
document.addEventListener("DOMContentLoaded", initGame);

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const snakeSize = 20;

function drawSnakePart(snakePart) {
    ctx.fillStyle = 'green';
    ctx.fillRect(snakePart.x, snakePart.y, snakeSize, snakeSize);
}

function drawSnake() {
    snake.forEach(drawSnakePart);
}

/*Función mover la serpiente*/
function moveSnake() {
    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
    snake.unshift(head);
    snake.pop();
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveSnake();
    drawSnake();
}

setInterval(updateGame, 100); // Actualiza el juego cada 100 milisegundos
/*Controlar la serpiente*/
function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    const goingUp = direction.y === -20;
    const goingDown = direction.y === 20;
    const goingRight = direction.x === 20;
    const goingLeft = direction.x === -20;

    if (keyPressed === LEFT_KEY && !goingRight) {
        direction = {x: -20, y: 0};
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        direction = {x: 20, y: 0};
    }
    if (keyPressed === UP_KEY && !goingDown) {
        direction = {x: 0, y: -20};
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        direction = {x: 0, y: 20};
    }
}

document.addEventListener("keydown", changeDirection);

/*Añadir comida y puntuación*/
let food = {x: 140, y: 300};

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
}

function randomFood(min, max) {
    return Math.round((Math.random() * (max-min) + min) / snakeSize) * snakeSize;
}

function generateFood() {
    food = {
        x: randomFood(0, canvas.width - snakeSize),
        y: randomFood(0, canvas.height - snakeSize)
    };
}

function checkFoodCollision() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        score += 10;
        scoreValue.innerHTML = score;
        generateFood();
        snake.push({x: snake[snake.length - 1].x, y: snake[snake.length - 1].y});
    }
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveSnake();
    checkFoodCollision();
    drawSnake();
    drawFood();
}

generateFood(); // Llamar esta función al iniciar el juego


/*Finalizar juego */
function checkCollision() {
    // Colisión con los bordes
    if (snake[0].x < 0 || snake[0].x >= canvas.width || 
        snake[0].y < 0 || snake[0].y >= canvas.height) {
        return true;
    }

    // Colisión consigo misma
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    return false;
}

/*Reiniciar juego */

let gameInProgress = false;
let gameInterval;

function toggleGame() {
    // Detiene el juego si ya está en marcha
    clearInterval(gameInterval);
    gameInProgress = false;

    // Reinicia la serpiente, la puntuación, etc.
    snake = [{x: 200, y: 200}];
    score = 0;
    // y cualquier otra lógica de reinicio

    // Inicia el juego
    gameInProgress = true;
    document.getElementById('gameButton').innerText = 'Iniciar Juego';
    gameInterval = setInterval(gameLoop, 100); // Asumiendo que 'gameLoop' es tu función de bucle del juego
}

document.getElementById('gameButton').addEventListener('click', toggleGame);


/*Estilos para el gusano*/
function drawSnake() {
    // Asumiendo que tienes un contexto de canvas 'ctx'
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? '#ff6347' : '#8b4513'; // Cabeza de color diferente
        ctx.strokeStyle = 'black';

        // Dibuja cada segmento del gusano
        ctx.fillRect(segment.x, segment.y, 20, 20);
        ctx.strokeRect(segment.x, segment.y, 20, 20);

        // Opcional: añadir detalles para un aspecto más de "gusano"
        if (index !== 0) {
            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.arc(segment.x + 10, segment.y + 10, 2, 0, 2 * Math.PI);
            ctx.fill();
        }
    });
}
