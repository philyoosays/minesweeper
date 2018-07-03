window.onload = () => {
  createBoard()
  addMines()
  placeClues()
}

let numOfMines = 50;
let bWidth = 30;
let bHeight = 30;
let memory = [];
let firstClick = false;

function createBoard() {
  let body = document.querySelector('body')
  let mainContainer = document.createElement('div')
  let menu = document.createElement('div')
  let resetButton = document.createElement('div')
  let timer = document.createElement('h1')
  let counter = document.createElement('h1')
  resetButton.classList.add('reset', 'flex')
  resetButton.addEventListener('click', resetGame)
  timer.classList.add('timer', 'flex')
  timer.innerText = 0
  counter.classList.add('flex')
  counter.innerText = 0
  mainContainer.classList.add('maincontainer')
  menu.classList.add('menu', 'flexbox')
  menu.appendChild(timer)
  menu.appendChild(resetButton)
  menu.appendChild(counter)
  mainContainer.appendChild(menu)

  let boardContainer = document.createElement('div')
  boardContainer.classList.add('board')
  for(let i = 0; i < (bWidth * bHeight); i++) {
    let cell = document.createElement('div');
    cell.classList.add('cell', 'unselected');
    cell.setAttribute('id', i)
    cell.addEventListener('click', handleClick)
    boardContainer.appendChild(cell)
  }
  mainContainer.appendChild(boardContainer)
  body.appendChild(mainContainer)
}

function addMines() {
  let allCells = document.querySelectorAll('.cell')
  for(let i = 0; i < numOfMines; i++) {
    let random = Math.floor(Math.random() * allCells.length)
    while(allCells[random].innerText !== '') {
      random = Math.floor(Math.random() * allCells.length)
    }
    memory[random] = 'm';
  }
}

function placeCluesOld() {
  let allCells = document.querySelectorAll('.cell')
  for(let cell = 0; cell < (bWidth * bHeight); cell++) {
    if(allCells[cell].innerText === 'm') {
      // adds to the top of each mine
      if(cell >= bWidth) {
        if(allCells[cell - bWidth].innerText === '') {
          allCells[cell - bWidth].innerText = 1
        } else if(allCells[cell - bWidth].innerText !== 'm') {
          allCells[cell - bWidth].innerText = parseInt(allCells[cell - bWidth].innerText) + 1
        }
      }
      // labeling right side
      if(cell%bWidth !== (bWidth -1)) {
        if(allCells[cell + 1].innerText === '') {
          allCells[cell + 1].innerText = 1
        } else if(allCells[cell + 1].innerText !== 'm') {
          allCells[cell + 1].innerText = parseInt(allCells[cell + 1].innerText) + 1
        }
      }
      // labeling bottom
      if(cell < ((bWidth*bHeight) - bWidth)) {
        if(allCells[cell + bWidth].innerText === '') {
          allCells[cell + bWidth].innerText = 1
        } else if(allCells[cell + bWidth].innerText !== 'm') {
          allCells[cell + bWidth].innerText = parseInt(allCells[cell + bWidth].innerText) + 1
        }
      }
      // labeling left
      if(cell%bWidth !== 0) {
        if(allCells[cell - 1].innerText === '') {
          allCells[cell - 1].innerText = 1
        } else if(allCells[cell - 1].innerText !== 'm') {
          allCells[cell - 1].innerText = parseInt(allCells[cell - 1].innerText) + 1
        }
      }
    }
  }
}

function placeClues() {
  for(let cell = 0; cell < (bWidth * bHeight); cell++) {
    let counter = 0
    if(memory[cell] !== 'm') {
      // not one of the corners
      if(cell !== 0 && cell !== (bWidth - 1) && cell !== ((bHeight-1) * bHeight) && cell !== ((bWidth * bHeight) - 1)) {
        // not one of the edges
        if(cell > bWidth && cell%30 !== 0 && cell%30 !== 29 && cell < ((bWidth * bHeight) - bWidth)) {
          if(memory[cell - bWidth - 1] === 'm') {
            counter++
          }
          if(memory[cell - bWidth] === 'm') {
            counter++
          }
          if(memory[cell - bWidth + 1] === 'm') {
            counter++
          }
          if(memory[cell + 1] === 'm') {
            counter++
          }
          if(memory[cell + bWidth + 1] === 'm') {
            counter++
          }
          if(memory[cell + bWidth] === 'm') {
            counter++
          }
          if(memory[cell + bWidth - 1] === 'm') {
            counter++
          }
          if(memory[cell - 1] === 'm') {
            counter++
          }
          // top row
        } else if(cell < bWidth) {
          if(memory[cell + 1] === 'm') {
            counter++
          }
          if(memory[cell + bWidth + 1] === 'm') {
            counter++
          }
          if(memory[cell + bWidth] === 'm') {
            counter++
          }
          if(memory[cell + bWidth - 1] === 'm') {
            counter++
          }
          if(memory[cell - 1] === 'm') {
            counter++
          }
          // right side
        } else if(cell%30 === 29) {
          if(memory[cell - bWidth - 1] === 'm') {
            counter++
          }
          if(memory[cell - bWidth] === 'm') {
            counter++
          }
          if(memory[cell + bWidth] === 'm') {
            counter++
          }
          if(memory[cell + bWidth - 1] === 'm') {
            counter++
          }
          if(memory[cell - 1] === 'm') {
            counter++
          }
          // bottom row
        } else if(cell >= ((bWidth * bHeight) - bWidth)) {
          if(memory[cell - bWidth - 1] === 'm') {
            counter++
          }
          if(memory[cell - bWidth] === 'm') {
            counter++
          }
          if(memory[cell - bWidth + 1] === 'm') {
            counter++
          }
          if(memory[cell + 1] === 'm') {
            counter++
          }
          if(memory[cell - 1] === 'm') {
            counter++
          }
          // left side
        } else if(cell%30 === 0) {
          if(memory[cell - bWidth] === 'm') {
            counter++
          }
          if(memory[cell - bWidth + 1] === 'm') {
            counter++
          }
          if(memory[cell + 1] === 'm') {
            counter++
          }
          if(memory[cell + bWidth + 1] === 'm') {
            counter++
          }
          if(memory[cell + bWidth] === 'm') {
            counter++
          }
        }
        // top left corner
      } else if(cell === 0) {
        if(memory[cell + 1] === 'm') {
          counter++
        }
        if(memory[cell + bWidth + 1] === 'm') {
          counter++
        }
        if(memory[cell + bWidth] === 'm') {
          counter++
        }
        // top right corner
      } else if(cell === (bWidth - 1)) {
        if(memory[cell + bWidth] === 'm') {
          counter++
        }
        if(memory[cell + bWidth - 1] === 'm') {
          counter++
        }
        if(memory[cell - 1] === 'm') {
          counter++
        }
        // bottom right corner
      } else if(cell === ((bWidth * bHeight) - 1)) {
        if(memory[cell - bWidth - 1] === 'm') {
          counter++
        }
        if(memory[cell - bWidth] === 'm') {
          counter++
        }
        if(memory[cell - 1] === 'm') {
          counter++
        }
        // bottom left corner
      } else if(cell === ((bHeight - 1) * bWidth)) {
        if(memory[cell - bWidth] === 'm') {
          counter++
        }
        if(memory[cell - bWidth + 1] === 'm') {
          counter++
        }
        if(memory[cell + 1] === 'm') {
          counter++
        }
      }
    }
    if(counter > 0) {
      memory[cell] = counter
    }
  }
}

function renderAllAnswers() {
  let allCells = document.querySelectorAll('.cell');
  allCells.forEach((cell, index) => {
    if(typeof memory[index] !== 'undefined') {
      cell.innerText = memory[index];
    }
  })
}

function handleClick() {
  if(firstClick === false) {
    firstClick = true;
    let timer = document.querySelector('h1')
    var ticker = setInterval(() => {
      timer.innerText = parseInt(timer.innerText) + 1
    }, 1000)
  }
  if(this.classList.contains('unselected')) {
    this.classList.remove('unselected')
    let allCells = document.querySelectorAll('.cell');
    let cellID = parseInt(this.getAttribute('id'))
    if(typeof memory[cellID] !== 'undefined') {
      this.innerText = memory[cellID]
    } else {
      if(typeof memory[cellID - bWidth] === 'undefined' && cellID >= bWidth && allCells[cellID - bWidth].classList.contains('unselected')) {
        // allCells[cellID - bWidth].setAttribute('style', 'background: darkgrey')
        setTimeout(() => {
          allCells[cellID - bWidth].click()
          // allCells[cellID - bWidth].removeAttribute('style')
        },80)
      }
      if(typeof memory[cellID + 1] === 'undefined' && cellID%30 !== 29 && allCells[cellID + 1].classList.contains('unselected')) {
        // allCells[cellID - bWidth].setAttribute('style', 'background: darkgrey')
        setTimeout(() => {
          allCells[cellID + 1].click()
          // allCells[cellID + 1].removeAttribute('style')
        },80)
      }
      if(typeof memory[cellID + bWidth] === 'undefined' && cellID < ((bWidth * bHeight) - bWidth) && allCells[cellID + bWidth].classList.contains('unselected')) {
        // allCells[cellID - bWidth].setAttribute('style', 'background: darkgrey')
        setTimeout(() => {
          allCells[cellID + bWidth].click()
          // allCells[cellID + bWidth].removeAttribute('style')
        },80)
      }
      if(typeof memory[cellID - 1] === 'undefined' && cellID%30 !== 0 && allCells[cellID - 1].classList.contains('unselected')) {
        // allCells[cellID - bWidth].setAttribute('style', 'background: darkgrey')
        setTimeout(() => {
          allCells[cellID - 1].click()
          // allCells[cellID - 1].removeAttribute('style')
        },80)
      }
    }
    if(this.innerText === '1') {
      this.setAttribute('style', 'color: blue')
    } else if(this.innerText === '2') {
      this.setAttribute('style', 'color: purple')
    } else if(this.innerText === '3') {
      this.setAttribute('style', 'color: red')
    } else if(this.innerText === '4') {
      this.setAttribute('style', 'color: teal')
    } else if(this.innerText === '5') {
      this.setAttribute('style', 'color: orange')
    }
  }
  if(this.innerText === 'm') {
    alert('GameOver')
    clearInterval(ticker)
  }
}

function resetGame() {
  memory = []
  let allCells = document.querySelectorAll('.cell');
  let timer = document.querySelector('h1')
  timer.innerText = 0;
  allCells.forEach(cell => {
    if(!cell.classList.contains('unselected')) {
      cell.classList.add('unselected')
    }
    cell.innerText = ''

  })
  addMines()
  placeClues()
}

function startTimer() {
  let timer = document.querySelector('h1')
  setInterval(() => {
    timer.innerText = parseInt(timer.innerText) + 1
  }, 1000)
}

















