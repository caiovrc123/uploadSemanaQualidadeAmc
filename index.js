const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if(answerClicked.dataset.correct){
    totalCorrect++
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Parabéns, vocês são verdadeiros guardiões dos alimentos! :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  {
    question: "Quais são os valores da Amcor?",
    answers: [
      { text: "Segurança, Integridade, Persuasão, Responsabilidade e Inovação", correct: false },
      { text: "Colaboração, Integridade, Persuasão, Responsabilidade e Resultados Outperformance", correct: false },
      { text: "Colaboração, Integridade, Liderança Operacional, Responsabilidade e Resultados Outperformance", correct: false },
      { text: "Segurança, Integridade, Colaboração, Responsabilidade e Resultados Outperformance", correct: true }
    ]
  },
  {
    question: "Para atendermos determinados clientes, precisamos e seguimos quais diretrizes?",
    answers: [  
      { text: "5S, Princípios de GMP/BPF, ISO 9001, ISO 22000, FSSC 22000", correct: true },
      { text: "5S, Princípios de GMP/BPF, ISO 25001, ISO 22000, FSSC 22000", correct: false },
      { text: "5S, Princípios de GMP/BPF, ISO 9000, ISO 23000, FSSC 22000", correct: false },
      { text: "5S, Princípios de Organização, ISO 9001, NR 32, FSSC 22000", correct: false }
    ]
  },
  {
    question: 'Quais os impactos, internamente e externamente, de não termos um sistema de rastreabilidade implementado e robusto?"',
    answers: [
      { text: 'Falta de credibilidade com nossos clientes', correct: false },
      { text: 'Processo se torna frágil', correct: false },
      { text: 'Diminuição no nível de Qualidade', correct: false },
      { text: "Nenhuma das alternativas", correct: true }
    ]
  },
  {
    question: 'É importante seguirmos as Boas Práticas de Fabricação para termos um produto acabado seguro e garantirmos a inocuidade do mesmo',
    answers: [
      { text: "Verdadeiro", correct: true },
      { text: "Falso", correct: false }
    ]
  },
  {
    question: 'Quais são as Boas Práticas, no ambiente fabril, que seguimos para garantir um produto de Qualidade?',
    answers: [
      { text: 'Lavar as mãos uma vez ao dia; Utilizar EPI´s como touca, protetor de barba, mangote/camisa de manga comprida', correct: false },
      { text: 'Lavar as mãos sempre que as mesmas puderem contaminar o produto; Utilizar touca, protetor de barba, mangote/camisa de manga comprida', correct: true },
      { text: 'Utilizar apenas touca', correct: false },
      { text: 'Utilizar touca, protetor de barba e mangote/camisa de manga comprida', correct: false }
    ]
  },
  {
    question: 'Se eu vejo uma pré-forma no chão, e coloco ela de volta na caixa, que tipo(s) de contaminação(ões) eu posso estar levando para nossos clientes?',
    answers: [
      { text: 'Física, biológica, química, cruzada e alergênico', correct: true },
      { text: 'Biológica, química e física', correct: false },
      { text: 'Física', correct: false },
      { text: 'Nenhum tipo de contaminação', correct: false }
    ]
  },
  {
    question: 'Imagine que você precise descartar os seguintes tipos de resíduos: Plástico, Papel, Metal, Vidro e Não recicláveis. Qual seria a ordem correta das cores correspondentes?',
    answers: [
      { text: 'Preto, Vermelho, Azul, Verde e Cinza', correct: false },
      { text: 'Azul, Amarelo, Branco, Verde e Laranja', correct: false },
      { text: 'Nenhum desses códigos chamaria essa função', correct: false },
      { text: 'Vermelho, Azul, Amarelo, Verde e Cinza', correct: true },
    ]
  },
]
