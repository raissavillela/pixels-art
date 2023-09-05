const body = document.querySelector('body');
const title = document.getElementById('title');
const colorPalete = document.querySelector('#color-palette');
const colorPaletteUnit = document.getElementsByTagName('li');

colorPaletteUnit[0].style.backgroundColor = '#9400d3';
colorPaletteUnit[1].style.backgroundColor = '#006400';
colorPaletteUnit[2].style.backgroundColor = '#0000cd';
colorPaletteUnit[3].style.backgroundColor = '#ff1493';
let currentlySelected;

let arrayPixels = [];

function pixel(size) {
    const quadroPixels = document.querySelector('.quadroPixels');
    quadroPixels.innerHTML = '';
    quadroPixels.style.gridTemplateColumns = 'repeat(' + size + ', 1fr)';
    quadroPixels.style.gridTemplateRows = 'repeat(' + size + ', 1fr)';
    arrayPixels = []
    for (let index = 0; index < size * size; index++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.onclick = function () { selectPixel(pixel); };
        quadroPixels.appendChild(pixel);
        arrayPixels.push(pixel);
    }

    localStorage.setItem('boardSize', size)
}


function onLoad() {
    let boardSize = localStorage.getItem('boardSize')
    if (boardSize !== undefined && boardSize !== null) {
        pixel(boardSize);
    }
    else {
        pixel(5);
    }
    populateFromStorage()
}

function selectColor(selectedColor) {

    if (currentlySelected !== undefined) {
        currentlySelected.classList.remove('selected');
    }
    selectedColor.classList.add('selected');
    currentlySelected = selectedColor;

}

function selectPixel(selectedPixel) {

    selectedPixel.style.backgroundColor = currentlySelected.style.backgroundColor;
    saveColors();
}

function saveColors() {
    let colors = [];
    for (let index = 0; index < arrayPixels.length; index++) {
        colors[index] = arrayPixels[index].style.backgroundColor;
    }
    localStorage.setItem('pixelBoard', JSON.stringify(colors));
}

function cleanBoard() {
    for (let index = 0; index < arrayPixels.length; index++) {
        arrayPixels[index].style.backgroundColor = 'white';
    }
    saveColors();
}

function randomColors() {
    for (let index = 0; index < colorPaletteUnit.length; index++) {
        let randomColor = Math.floor(Math.random() * 16777215).toString(16);
        colorPaletteUnit[index].style.backgroundColor = "#" + randomColor;
    }
}

function populateFromStorage() {
    let storage = localStorage.getItem('pixelBoard')
    if (storage !== undefined) {
        let colors = JSON.parse(storage)

        if (colors == null) {
            return;
        }
        for (let index = 0; index < arrayPixels.length; index++) {
            arrayPixels[index].style.backgroundColor = colors[index];
        }
    }
}

function generateBoard() {
    let boardSize = document.getElementById('board-size').value
    if (boardSize == null || boardSize == '') {
        alert('Board inválido!')
        return;
    }
    else if (boardSize < 5) {
        boardSize = 5
    }
    else if (boardSize > 50) {
        boardSize = 50
    }
    pixel(boardSize)
    saveColors();
}