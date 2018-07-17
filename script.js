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
let counter = 0;
let score = 0;

function createBoard() {
  let body = document.querySelector('body');
  let mainContainer = document.createElement('div');
  let menu = document.createElement('div');
  let resetButton = document.createElement('div');
  let timer = document.createElement('h1');
  let counter = document.createElement('h1');
  // let smiley = document.createElement('img');
  // smiley.setAttribute('src', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptMy41IDhjLjgyOCAwIDEuNS42NzEgMS41IDEuNXMtLjY3MiAxLjUtMS41IDEuNS0xLjUtLjY3MS0xLjUtMS41LjY3Mi0xLjUgMS41LTEuNXptLTcgMGMuODI4IDAgMS41LjY3MSAxLjUgMS41cy0uNjcyIDEuNS0xLjUgMS41LTEuNS0uNjcxLTEuNS0xLjUuNjcyLTEuNSAxLjUtMS41em0zLjUwMSAxMGMtMi44MDEgMC00Ljg3NC0xLjg0Ni02LjAwMS0zLjU2NmwuNDkzLS40OTNjMS41MTIgMS4xOTUgMy4xNzQgMS45MzEgNS41MDggMS45MzEgMi4zMzMgMCAzLjk5NC0uNzM2IDUuNTA2LTEuOTMxbC40OTMuNDkzYy0xLjEyNyAxLjcyLTMuMTk5IDMuNTY2LTUuOTk5IDMuNTY2eiIvPjwvc3ZnPg==');
  // smiley.classList.add('flex', 'smiley');

  // let path = document.createElement('path');
  // let svg = document.createElement('svg');
  // path.setAttribute('d', 'M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3.5 8c.828 0 1.5.671 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.671-1.5-1.5.672-1.5 1.5-1.5zm-7 0c.828 0 1.5.671 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.671-1.5-1.5.672-1.5 1.5-1.5zm3.501 10c-2.801 0-4.874-1.846-6.001-3.566l.493-.493c1.512 1.195 3.174 1.931 5.508 1.931 2.333 0 3.994-.736 5.506-1.931l.493.493c-1.127 1.72-3.199 3.566-5.999 3.566z');
  // svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  // svg.setAttribute('width', '24');
  // svg.setAttribute('height', '24');
  // svg.setAttribute('viewBox', '0 0 24 24');
  // svg.appendChild(path);

  let smileyFace = document.getElementById('smiles')
  smileyFace.setAttribute('style', 'flex: 1')

  resetButton.appendChild(smileyFace);
  // resetButton.appendChild(smiley);
  resetButton.classList.add('reset', 'flex', 'flexbox');
  resetButton.addEventListener('click', resetGame);
  timer.classList.add('timer', 'flex');
  timer.innerText = '00:00';
  counter.classList.add('flex', 'counter');
  counter.innerText = '000';
  mainContainer.classList.add('maincontainer');
  menu.classList.add('menu', 'flexbox');
  menu.appendChild(timer);
  menu.appendChild(resetButton);
  menu.appendChild(counter);
  mainContainer.appendChild(menu);

  let boardContainer = document.createElement('div');
  boardContainer.classList.add('board');
  for(let i = 0; i < (bWidth * bHeight); i++) {
    let cell = document.createElement('div');
    cell.classList.add('cell', 'unselected');
    cell.setAttribute('id', i);
    cell.addEventListener('click', handleClick);
    boardContainer.appendChild(cell);
  }
  mainContainer.appendChild(boardContainer);
  body.appendChild(mainContainer);
}

function addMines() {
  let allCells = document.querySelectorAll('.cell');
  for(let i = 0; i < numOfMines; i++) {
    let random = Math.floor(Math.random() * allCells.length);
    while(allCells[random].innerText !== '') {
      random = Math.floor(Math.random() * allCells.length);
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
    let timerText = document.querySelector('h1')
    setInterval(() => {
      timerText.innerText = makeTimerFromCounter(counter);
      counter++;
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
  // checkMines();
}

function checkMines() {
  let allCells = document.querySelectorAll('.cell')
  memory.forEach((data, index) => {
    if(data === 'm') {
      if(!allCells[index-bWidth-1].classList.contains('unselected')) {
        if(!allCells[index-bWidth].classList.contains('unselected')) {
          if(!allCells[index-bWidth+1].classList.contains('unselected')) {
            if(!allCells[index+1].classList.contains('unselected')) {
              if(!allCells[index+bWidth+1].classList.contains('unselected')) {
                if(!allCells[index+bWidth].classList.contains('unselected')) {
                  if(!allCells[index+bWidth-1].classList.contains('unselected')) {
                    if(!allCells[index-1].classList.contains('unselected')) {
                      allCells[index].setAttribute('style', 'background: red');
                      score++;
                      let theCounter = document.querySelector('.counter');
                      theCounter.innerText = score.toString().padStart(2, '0');
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  })
}

function resetGame() {
  document.location.reload();
  // memory = [];
  // clearInterval(ticker)
  // let allCells = document.querySelectorAll('.cell');
  // let timerText = document.querySelector('h1')
  // timerText.innerText = 0;
  // allCells.forEach(cell => {
  //   if(!cell.classList.contains('unselected')) {
  //     cell.classList.add('unselected')
  //   }
  //   cell.innerText = ''

  // })
  // addMines()
  // placeClues()
}

function startTimer() {
  let timer = document.querySelector('h1')
  setInterval(() => {
    timer.innerText = parseInt(timer.innerText) + 1
  }, 1000)
}

function makeTimerFromCounter(counter) {
  let left = parseInt(counter / 60);
  let right = counter % 60;
  return left.toString().padStart(2, '0') + ':' + right.toString().padStart(2, '0');
}















