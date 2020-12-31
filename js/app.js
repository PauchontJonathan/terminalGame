const app = {

  data: [
    '/clear: clear the terminal. /start: start the game. /dice: throw the dice, and give you a random number between 1 and 6.'
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
      question: 'In the geek mythology, where is Charon in hells ?',
      solution: 'Styx',
    },
    {
      question: 'Who is the first woman made by Hephaistos ?',
      solution: 'Pandore',
    },
  ],

  isGameStarted: false,
  inputValue: '',
  outputValue: '',
  dice: null,
  isDiceThrown: false,

  init: () => {
    console.log(app.questions)
    userInput = document.querySelector('.terminal-input')
    userInput.value = app.inputValue
    submit = document.querySelector('.terminal-form')
    outputTerminal = document.querySelector('.terminal-output')

    userInput.addEventListener('change', app.loadValue)
    submit.addEventListener('submit', app.sendValue)
  },

  loadValue: (e) => {
    const { value } = e.target;
    app.inputValue = value;
  },

  sendValue: (e) => {
    e.preventDefault()
    app.verifyValue()
    app.createElement()
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
      default: return app.outputValue = 'Wrong command: Type /help to get more informations'
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

    app.moveCharacter()
  },

  moveCharacter: () => {
    const player = document.querySelector('.player')
    const currentPosition = player.getAttribute('data-number')
    const currentPositionToNumb = parseInt(currentPosition)
    console.log(typeof currentPositionToNumb)
    const nextPosition = currentPositionToNumb + app.dice
    player.classList.remove('player')

    const allPosition = document.querySelectorAll('.game-cell')

    for(let i = 0; i < allPosition.length; i++) {
      const position = allPosition[i].getAttribute('data-number')
      const positionToNumb = parseInt(position)
      if (positionToNumb === nextPosition) {
        allPosition[i].classList.add('player')
      }
    }

  },

  startQuestion: () => {
    const player = document.querySelector('.player')
    const currentPosition = player.getAttribute('data-number')

    // for(let i = 0; i < app.questions; i++) {
    //   if()
    // }

  },

  startTheGame: () => {
    if(app.isGameStarted && app.isDiceThrown) {
      return app.outputValue = 'The game is already started, and you already rolled the dice. Please answer to the question'
    } else if (app.isGameStarted) {
      return app.outputValue = 'The game is already started'
    }
    app.isGameStarted = true
    app.outputValue = 'Game started, you can now throw the dice'
    const startSound = new Audio('js/soundEffect/start.mp3')
    console.log(startSound)
    startSound.play()
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