const app = {

  data: [
    '\'/clear\': clear all lines but not the last one. \'/start\': start the game. \'/dice\': throw a 6-sided dice and move your character. \'/restart\': restart the game, when you arrive at the flag'
  ],

  questions: [
    {
      question: 'In the greek mythology, who is the father of all gods ?',
      solution: 'Chronos',
    },
    {
      question: 'In the Odyssey by Homere, which name Ulysse uses to prevent the cyclope to call the others ?',
      solution: 'Nobody',
    },
    {
      question: 'In the greek mythology, which part of the body of medusa can freeze someone ?',
      solution: 'Eyes',
    },
    {
      question: 'In the greek mythology, who is hades\'wife ?',
      solution: 'Persephone',
    },
    {
      question: 'In the greek mythology, where is Charon in hells ?',
      solution: 'Styx',
    },
    {
      question: 'In the greek mythology, Who is the first woman made by Hephaistos ?',
      solution: 'Pandora',
    },
    {
      question: 'In the greek mythology, what is the weapon of Poseidon ?',
      solution: 'Trident',
    },
    {
      question: 'In which video game can we play Kratos ?',
      solution: 'God of war',
    },
    {
      question: 'In the greek mythology, who is the gardian of hells ?',
      solution: 'Cerberus',
    },
    {
      question: 'In Star Wars, what is the color of Obi-Wan kenobi\'s lightsaber ?',
      solution: 'Blue',
    },
    {
      question: 'In Star Wars, On which planet does Luke Skywalker meet Yoda for the first time ?',
      solution: 'Dagobah',
    },
    {
      question: 'In Harry Potter, What animal represents the Slytherin house ?',
      solution: 'Snake',
    },
    {
      question: 'In Harry Potter, What candy is given to a person who saw a dementor ?',
      solution: 'Chocolate',
    },
    {
      question: 'Who is the writer of Sherlock Holmes\' stories ?',
      solution: 'Arthur Conan Doyle',
    },
    {
      question: 'Which character in Harry Potter says the line "The ones who love us never really leave us" ?',
      solution: 'Sirius Black',
    },
    {
      question: 'On which year did the first Star Wars movie (A New Hope, Episode IV) came out in theaters ?',
      solution: '1977',
    },
    {
      question: 'In Star Wars, On which planet did Anakin live when he was little ?',
      solution: 'Tatooine',
    },
    {
      question: 'On which year did the first Harry Potter book was released ?',
      solution: '1997',
    },
  ],

  music: new Audio('js/soundEffect/joystock-neon-lights.mp3'),
  isMusicPlay: false,
  isGameStarted: false,
  inputValue: '',
  outputValue: '',
  dice: null,
  isDiceThrown: false,
  isQuestion: false,
  attempt: 3,
  question: '',
  solution: '',
  isLose : false,
  isWin: false,

  init: () => {
    play = document.querySelector('.music')
    userInput = document.querySelector('.terminal-input')
    userInput.value = app.inputValue
    submit = document.querySelector('.terminal-form')
    outputTerminal = document.querySelector('.terminal-output')
    if(outputTerminal.lastChild) {
      outputTerminal.scrollTo(0, outputTerminal.offsetHeight)
    }

    userInput.addEventListener('change', app.loadValue)
    submit.addEventListener('submit', app.sendValue)
    play.addEventListener('click', app.handleMusic)
  },

  handleMusic: () => {
    app.isMusicPlay = !app.isMusicPlay
    if(app.isMusicPlay) {
      app.music.play()
      play.classList.add('fa-stop-circle')
      play.classList.remove('fa-play-circle')
    } else if (!app.isMusicPlay) {
      app.music.pause()
      app.music.currentTime = 0
      play.classList.remove('fa-stop-circle')
      play.classList.add('fa-play-circle')
    }
  },

  loadValue: (e) => {
    const { value } = e.target;
    app.inputValue = value;
  },

  sendValue: (e) => {
    e.preventDefault()
    app.verifyValue()
    app.createElement()
    if(app.isDiceThrown && !app.isLose && app.inputValue !== '/clear'){
      setTimeout(() => {
        app.startQuestion()
        app.createElement()
        app.updateDisplay()
      }, 1000)
    }
    app.updateDisplay()
  },

  createElement: () => {
    if (app.outputValue === '') return 
    const outPutElement = document.createElement('p')
    outPutElement.classList.add('terminal-output-text')
    outPutElement.textContent = app.outputValue
    outputTerminal.appendChild(outPutElement)
  },

  verifyValue: () => {
    switch(app.inputValue) {
      case '/help':
        return app.outputValue = app.data[0]
      case '/clear':
        return app.clearAll()
      case '/start':
        return app.startTheGame()
      case '/dice':
        return app.throwDice()
      case '/restart':
        return app.restart()
      default: if (app.isQuestion) {
        return app.verifyAnswer(app.inputValue)
      } else {
        return app.outputValue = 'Wrong command: Type /help to get more informations'
      }
    }
  },

  verifyAnswer: (userValue) => {
    const userValuetoLower = userValue.toLowerCase()
    const userInputToLower = app.solution.toLowerCase()
    if (userValuetoLower.includes(userInputToLower)) {
      app.outputValue = "You have the good answer ! You can stay at this cell and throw the dice"
      app.attempt = 3
      app.isQuestion = false
      app.isDiceThrown = false
    } else {
      app.attempt--
      if(app.attempt < 1) {
        app.isLose = true
        app.lose()
      } else if (app.attempt > 0) {
        const attempt = app.attempt < 2 ? 'attempt' : 'attempts'
        app.outputValue = `Wrong answer, you have ${app.attempt} ${attempt} left`
      }
    }
  },

  lose: () => {
    const player = document.querySelector('.player')
    player.classList.remove('player')
    const allPosition = document.querySelectorAll('.game-cell')
    for(let i = 0; i < allPosition.length; i++) {
      if(allPosition[0]) {
        allPosition[0].classList.add('player')
        app.outputValue = 'You lose, you can try again by throwing the dice'
        app.isLose = false
        app.attempt = 3
        app.isQuestion = false
        app.isDiceThrown = false
      }
    }
  },

  throwDice: () => {
    if (!app.isGameStarted) {
      return app.outputValue = 'Please start the game first'
    } else if (app.isDiceThrown){
      return app.outputValue = 'You have already rolled the dice, please answer to the question'
    }
    min = Math.ceil(1);
    max = Math.floor(6);
    app.isDiceThrown = true
    const random = Math.floor(Math.random() * (max - min +1)) + min
    const roll = random > 1 ? ' cells' :  ' cell'
    app.dice = random
    
    app.outputValue = 'Your character is moving by ' + app.dice + roll

    if(!app.isLose) return app.moveCharacter()
  },

  moveCharacter: () => {
    const player = document.querySelector('.player')
    const currentPosition = player.getAttribute('data-number')
    const currentPositionToNumb = parseInt(currentPosition)
    const nextPosition = currentPositionToNumb + app.dice
    player.classList.remove('player')

    const allPosition = document.querySelectorAll('.game-cell')

    for(let i = 0; i < allPosition.length; i++) {
      const position = allPosition[i].getAttribute('data-number')
      const positionToNumb = parseInt(position)
      if (positionToNumb === nextPosition) {
        allPosition[i].classList.add('player')
      } else if (nextPosition > 19 || nextPosition === 19) {
        allPosition[19].classList.remove('win')
        allPosition[19].classList.add('player')
        app.win()
      }
    }

  },

  win: () => {
    app.outputValue = 'Congratulation you win ! GAME OVER ! You can restart the game by tapping \'/restart\''
    app.isGameStarted = false
    app.inputValue = ''
    app.dice = null
    app.isDiceThrown = false
    app.isQuestion = false
    app.attempt = 3
    app.question = ''
    app.solution = ''
    app.isLose  = false
    app.isWin = true
  },

  startQuestion: () => {
    const player = document.querySelector('.player')
    const currentPosition = player.getAttribute('data-number')
    const currentPositionToNum = parseInt(currentPosition)
    if (currentPositionToNum > 0) {
      app.isQuestion = true
      app.question = app.questions[currentPositionToNum - 1].question
      app.solution = app.questions[currentPositionToNum - 1].solution
      app.outputValue = app.question
    } else {
      return app.outputValue = 'Please throw the dice'
    }
  },

  startTheGame: () => {
    if (app.isWin && !app.isLose) return app.outputValue = 'You need to type \'/restart\' to restart the game because you won at least one time'
    if(app.isGameStarted && app.isDiceThrown) {
      return app.outputValue = 'The game is already started, and you already rolled the dice. Please answer to the question'
    } else if (app.isGameStarted) {
      return app.outputValue = 'The game is already started'
    }
    app.isGameStarted = true
    app.outputValue = 'Game started, you can now throw the dice'
  },

  restart: () => {
    if(!app.isWin) return app.outputValue = 'You already restarted the game, finish it first'
    const player = document.querySelector('.player')
    player.classList.remove('player')
    const allPosition = document.querySelectorAll('.game-cell')
    for(let i = 0; i < allPosition.length; i++) {
      if(allPosition[0]) {
        allPosition[0].classList.add('player')
      } else if (allPosition[19]) {
        allPosition[19].add('win')
      }
    }
    app.outputValue = 'Game started, you can now throw the dice'
    app.isWin = false
    app.isGameStarted = true
  },

  clearAll: () => {
    while (outputTerminal.firstElementChild) {
      outputTerminal.removeChild(outputTerminal.firstElementChild)
    }
  },

  updateDisplay: () => {
    app.inputValue = ''
    app.init();
  },
}

document.addEventListener('DOMContentLoaded', app.init)