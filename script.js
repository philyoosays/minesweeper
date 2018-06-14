window.onload = () => {
  createBoard()
  addMines()
  placeClues()
}

let numOfMines = 50;
let bWidth = 30;
let bHeight = 30;
let memory = []

function createBoard() {
  let body = document.querySelector('body')
  let mainContainer = document.createElement('div')
  let menu = document.createElement('div')
  let resetButton = document.createElement('div')
  resetButton.classList.add('reset')
  mainContainer.classList.add('maincontainer')
  menu.classList.add('menu')
  menu.appendChild(resetButton)
  mainContainer.appendChild(menu)

  let boardContainer = document.createElement('div')
  boardContainer.classList.add('board')
  for(let i = 0; i < (bWidth * bHeight); i++) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('id', i)
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
    allCells[random].innerText = 'm'
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
  let allCells = document.querySelectorAll('.cell')
  for(let cell = 0; cell < (bWidth * bHeight); cell++) {
    console.log('!!!!!!!!!!!!!!!!!!new cell')
    let counter = 0
    if(allCells[cell].innerText !== 'm') {
      // not one of the corners
      if(cell !== 0 && cell !== (bWidth - 1) && cell !== ((bHeight-1) * bHeight) && cell !== ((bWidth * bHeight) - 1)) {
        // not one of the edges
        if(cell > bWidth && cell%30 !== 0 && cell%30 !== 29 && cell < ((bWidth * bHeight) - bWidth)) {
          if(allCells[cell - bWidth - 1].innerText === 'm') {
            counter++
          }
          if(allCells[cell - bWidth].innerText === 'm') {
            counter++
          }
          if(allCells[cell - bWidth + 1].innerText === 'm') {
            counter++
          }
          if(allCells[cell + 1].innerText === 'm') {
            counter++
          }
          if(allCells[cell + bWidth + 1].innerText === 'm') {
            counter++
          }
          if(allCells[cell + bWidth].innerText === 'm') {
            counter++
          }
          if(allCells[cell + bWidth - 1].innerText === 'm') {
            counter++
          }
          if(allCells[cell - 1].innerText === 'm') {
            counter++
          }
          console.log(`notcorner notedge cell${cell} - counter${counter}`)
          // top row
        } else if(cell < bWidth) {
          if(allCells[cell + 1].innerText === 'm') {
            counter++
          }
          if(allCells[cell + bWidth + 1].innerText === 'm') {
            counter++
          }
          if(allCells[cell + bWidth].innerText === 'm') {
            counter++
          }
          if(allCells[cell + bWidth - 1].innerText === 'm') {
            counter++
          }
          if(allCells[cell - 1].innerText === 'm') {
            counter++
          }
          console.log(`toprow cell${cell} - counter${counter}`)
          // right side
        } else if(cell%30 === 29) {
          if(allCells[cell - bWidth - 1].innerText === 'm') {
            counter++
          }
          if(allCells[cell - bWidth].innerText === 'm') {
            counter++
          }
          if(allCells[cell + bWidth].innerText === 'm') {
            counter++
          }
          if(allCells[cell + bWidth - 1].innerText === 'm') {
            counter++
          }
          if(allCells[cell - 1].innerText === 'm') {
            counter++
          }
          console.log(`rightside cell${cell} - counter${counter}`)
          // bottom row
        } else if(cell >= ((bWidth * bHeight) - bWidth)) {
          if(allCells[cell - bWidth - 1].innerText === 'm') {
            counter++
          }
          if(allCells[cell - bWidth].innerText === 'm') {
            counter++
          }
          if(allCells[cell - bWidth + 1].innerText === 'm') {
            counter++
          }
          if(allCells[cell + 1].innerText === 'm') {
            counter++
          }
          if(allCells[cell - 1].innerText === 'm') {
            counter++
          }
          console.log(`bottomrow cell${cell} - counter${counter}`)
          // left side
        } else if(cell%30 === 0) {
          if(allCells[cell - bWidth].innerText === 'm') {
            counter++
          }
          if(allCells[cell - bWidth + 1].innerText === 'm') {
            counter++
          }
          if(allCells[cell + 1].innerText === 'm') {
            counter++
          }
          if(allCells[cell + bWidth + 1].innerText === 'm') {
            counter++
          }
          if(allCells[cell + bWidth].innerText === 'm') {
            counter++
          }
        console.log(`leftside cell${cell} - counter${counter}`)
        }
        // top left corner
      } else if(cell === 0) {
        if(allCells[cell + 1].innerText === 'm') {
          counter++
        }
        if(allCells[cell + bWidth + 1].innerText === 'm') {
          counter++
        }
        if(allCells[cell + bWidth].innerText === 'm') {
          counter++
        }
        console.log(`topleft cell${cell} - counter${counter}`)
        // top right corner
      } else if(cell === (bWidth - 1)) {
        if(allCells[cell + bWidth].innerText === 'm') {
          counter++
        }
        if(allCells[cell + bWidth - 1].innerText === 'm') {
          counter++
        }
        if(allCells[cell - 1].innerText === 'm') {
          counter++
        }
        console.log(`topright cell${cell} - counter${counter}`)
        // bottom right corner
      } else if(cell === ((bWidth * bHeight) - 1)) {
        if(allCells[cell - bWidth - 1].innerText === 'm') {
          counter++
        }
        if(allCells[cell - bWidth].innerText === 'm') {
          counter++
        }
        if(allCells[cell - 1].innerText === 'm') {
          counter++
        }
        console.log(`bottomright cell${cell} - counter${counter}`)
        // bottom left corner
      } else if(cell === ((bHeight - 1) * bWidth)) {
        if(allCells[cell - bWidth].innerText === 'm') {
          counter++
        }
        if(allCells[cell - bWidth + 1].innerText === 'm') {
          counter++
        }
        if(allCells[cell + 1].innerText === 'm') {
          counter++
        }
        console.log(`bottomleft cell${cell} - counter${counter}`)
      }
    }
    if(counter > 0) {
      allCells[cell].innerText = counter
    }
  }
}























