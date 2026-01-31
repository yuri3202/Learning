import { StudyItem, Flashcard, QuizQuestion, CodeChallenge } from './types';

export const TRANSLATIONS = {
    pt: {
        dashboard: "Painel",
        library: "Biblioteca",
        tools: "Ferramentas",
        rankings: "Rankings",
        welcome: "Bem-vindo de volta,",
        searchPlaceholder: "Buscar aulas, vídeos ou arquivos...",
        continueWatching: "Continuar Estudando",
        myList: "Minha Biblioteca (Uploads)",
        generalStudies: "Estudos Gerais (Ensino Médio & Vestibular)",
        importTitle: "Importar Conteúdo",
        importDesc: "Adicione seus próprios vídeos e PDFs",
        notifications: "Notificações",
        srsDue: "revisões pendentes hoje!",
        settings: "Configurações",
        profile: "Perfil",
        upload: "Carregar Arquivo",
        link: "Salvar Link",
        math: "Matemática",
        physics: "Física",
        chem: "Química",
        english: "Inglês",
        tech: "Tecnologia",
        challenges: "Dojô de Código",
        srs: "Memória (Anki)",
        flashcards: "Flashcards",
        pomodoro: "Foco Timer",
        sql: "Banco de Dados",
        quiz: "Quiz",
        calc: "Calculadora",
        mindmap: "Mapa Mental",
        level: "Nível",
        xp: "XP"
    },
    en: {
        dashboard: "Dashboard",
        library: "Library",
        tools: "Tools",
        rankings: "Rankings",
        welcome: "Welcome back,",
        searchPlaceholder: "Search classes, videos or files...",
        continueWatching: "Continue Watching",
        myList: "My Library (Uploads)",
        generalStudies: "General Studies (High School & Prep)",
        importTitle: "Import Content",
        importDesc: "Add your own videos and PDFs",
        notifications: "Notifications",
        srsDue: "reviews due today!",
        settings: "Settings",
        profile: "Profile",
        upload: "Upload File",
        link: "Save Link",
        math: "Math",
        physics: "Physics",
        chem: "Chemistry",
        english: "English",
        tech: "Technology",
        challenges: "Code Dojo",
        srs: "Memory (Anki)",
        flashcards: "Flashcards",
        pomodoro: "Focus Timer",
        sql: "Database",
        quiz: "Quiz",
        calc: "Calculator",
        mindmap: "Mind Map",
        level: "Level",
        xp: "XP"
    }
};

// Using real educational channels IDs
export const DATABASE_VIDEOS: StudyItem[] = [
    {
        id: 101,
        title: 'Curso SQL Completo',
        description: 'Fundamentos de Banco de Dados.',
        thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=600',
        category: 'Tech',
        duration: '45 min',
        progress: 100,
        type: 'video',
        subject: 'tech',
        videoUrl: 'HXV3zeQKqGY' // SQL Tutorial
    },
    {
        id: 102,
        title: 'Modelagem de Dados',
        description: 'MER e DER na prática.',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600',
        category: 'Tech',
        duration: '1h 20m',
        progress: 45,
        type: 'video',
        subject: 'tech',
        videoUrl: 'QYdP7X6X_6I'
    }
];

export const PYTHON_VIDEOS: StudyItem[] = [
    {
        id: 201,
        title: 'Python para Iniciantes',
        description: 'Conceitos básicos de Python.',
        thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=600',
        category: 'Tech',
        duration: '55 min',
        progress: 0,
        type: 'video',
        subject: 'tech',
        videoUrl: 'SqcY0GlETPk'
    },
    {
        id: 202,
        title: 'Automação com Python',
        description: 'Scripts para facilitar o dia a dia.',
        thumbnail: 'https://images.unsplash.com/photo-1629904853716-6c29f46b4321?q=80&w=600',
        category: 'Tech',
        duration: '1h 10m',
        progress: 0,
        type: 'video',
        subject: 'tech',
        videoUrl: 'bsur5yP97kQ'
    }
];

export const IFRS_RESOURCES: StudyItem[] = [
    {
        id: 301,
        title: 'Calendário Acadêmico 2024',
        description: 'Datas importantes e feriados.',
        thumbnail: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600',
        category: 'Institucional',
        duration: 'PDF',
        progress: 0,
        type: 'pdf',
        subject: 'general',
        videoUrl: 'https://ifrs.edu.br/'
    },
    {
        id: 302,
        title: 'Manual do Aluno',
        description: 'Regras e direitos.',
        thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600',
        category: 'Institucional',
        duration: 'PDF',
        progress: 0,
        type: 'pdf',
        subject: 'general',
        videoUrl: 'https://ifrs.edu.br/'
    }
];

export const GENERAL_STUDIES: StudyItem[] = [
    {
        id: 501,
        title: 'Cálculo I - Limites',
        description: 'Introdução aos limites e derivadas.',
        thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600',
        category: 'Matemática',
        duration: '30 min',
        progress: 0,
        type: 'video',
        subject: 'math',
        videoUrl: 'RiXc875O20U' // Calculus
    },
    {
        id: 502,
        title: 'Física - Cinemática',
        description: 'Movimento retilíneo uniforme.',
        thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=600',
        category: 'Física',
        duration: '40 min',
        progress: 0,
        type: 'video',
        subject: 'physics',
        videoUrl: 'bHiOSc59o9k' // Physics
    },
    {
        id: 503,
        title: 'Química Orgânica',
        description: 'Cadeias carbônicas.',
        thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600',
        category: 'Química',
        duration: '50 min',
        progress: 0,
        type: 'video',
        subject: 'chemistry',
        videoUrl: 'RkQ7tS8A68w' // Chem
    },
    {
        id: 504,
        title: 'Inglês para Devs',
        description: 'Vocabulário técnico essencial.',
        thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=600',
        category: 'Inglês',
        duration: '20 min',
        progress: 10,
        type: 'video',
        subject: 'english',
        videoUrl: 'F9p9wY3wK2c' // English
    }
];

export const FLASHCARDS_DATA: Flashcard[] = [
    { id: 1, question: "O que é POO?", answer: "Programação Orientada a Objetos: paradigma baseado em classes e objetos.", category: "Java", difficulty: "easy" },
    { id: 2, question: "O que é DOM?", answer: "Document Object Model: representação em árvore da página HTML.", category: "JS", difficulty: "medium" },
    { id: 3, question: "Diferença: Stack vs Heap", answer: "Stack: memória estática (rápida). Heap: memória dinâmica (objetos).", category: "CS", difficulty: "hard" },
];

export const CHALLENGES_DATA: CodeChallenge[] = [
    {
        id: 1,
        title: "Soma de Lista",
        description: "Crie uma função que receba uma lista de números e retorne a soma.",
        starterCode: "def soma_lista(numeros):\n    # Seu código aqui\n    pass",
        language: "python",
        difficulty: "Easy"
    },
    {
        id: 2,
        title: "Classe Pessoa",
        description: "Crie uma classe Pessoa com atributos nome e idade.",
        starterCode: "public class Pessoa {\n    // Implemente a classe\n}",
        language: "java",
        difficulty: "Medium"
    },
    {
        id: 3,
        title: "Hello World C++",
        description: "Imprima 'Ola IFRS' no console.",
        starterCode: "#include <iostream>\n\nint main() {\n    // Code here\n    return 0;\n}",
        language: "cpp",
        difficulty: "Easy"
    },
    {
        id: 4,
        title: "Snake Game (Retro)",
        description: "Edite o código abaixo para mudar a cor da cobra ou a velocidade!",
        starterCode: `<!DOCTYPE html>
<html>
<head>
<title>Snake Game</title>
<style>
  html, body { height: 100%; margin: 0; display: flex; align-items: center; justify-content: center; background: #000; font-family: 'Courier New', Courier, monospace; }
  canvas { border: 4px solid #33ff00; box-shadow: 0 0 20px rgba(51, 255, 0, 0.5); background: #000; }
  .score { position: absolute; top: 20px; left: 20px; color: #33ff00; font-size: 24px; }
</style>
</head>
<body>
<div class="score">SCORE: <span id="scoreVal">0</span></div>
<canvas width="400" height="400" id="game"></canvas>
<script>
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var grid = 16;
var count = 0;
var score = 0;

var snake = {
  x: 160,
  y: 160,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 4
};
var apple = {
  x: 320,
  y: 320
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
  requestAnimationFrame(loop);

  if (++count < 6) { // Velocidade do jogo (quanto menor, mais rápido)
    return;
  }

  count = 0;
  context.clearRect(0,0,canvas.width,canvas.height);

  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.x < 0) snake.x = canvas.width - grid;
  else if (snake.x >= canvas.width) snake.x = 0;
  
  if (snake.y < 0) snake.y = canvas.height - grid;
  else if (snake.y >= canvas.height) snake.y = 0;

  snake.cells.unshift({x: snake.x, y: snake.y});

  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  context.fillStyle = 'red';
  context.fillRect(apple.x, apple.y, grid-1, grid-1);

  context.fillStyle = '#33ff00';
  snake.cells.forEach(function(cell, index) {
    context.fillRect(cell.x, cell.y, grid-1, grid-1);

    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      score += 10;
      document.getElementById('scoreVal').innerText = score;
      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
    }

    for (var i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;
        score = 0;
        document.getElementById('scoreVal').innerText = score;
        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
      }
    }
  });
}

document.addEventListener('keydown', function(e) {
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

requestAnimationFrame(loop);
</script>
</body>
</html>`,
        language: "web",
        difficulty: "Hard"
    }
];

export const QUIZ_DATA: QuizQuestion[] = [
    {
        id: 1,
        question: "Qual tag HTML é usada para links?",
        options: ["<link>", "<a>", "<href>", "<src>"],
        correctAnswer: 1,
        explanation: "A tag <a> (anchor) define um hiperlink."
    },
    {
        id: 2,
        question: "Qual destes não é um tipo primitivo em Java?",
        options: ["int", "boolean", "String", "double"],
        correctAnswer: 2,
        explanation: "String é uma Classe em Java, não um tipo primitivo."
    }
];