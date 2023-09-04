const body = document.querySelector('body');
const title = document.getElementById('title');
const colorPalete = document.querySelector('#color-palette');
const colorPaletteUnit = document.getElementsByTagName('li');

colorPaletteUnit[0].style.backgroundColor = '#9400d3';
colorPaletteUnit[1].style.backgroundColor = '#006400';
colorPaletteUnit[2].style.backgroundColor = '#0000cd';
colorPaletteUnit[3].style.backgroundColor = '#ff1493';
let currentlySelected;

const pixel = () => {
    const quadroPixels = document.querySelector('.quadroPixels');

    for (let index = 0; index < 25; index += 1) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        // pixels.innerText = pixels();
        quadroPixels.appendChild(pixel);
    }
}
pixel();

function changeClass(selectedColor){

    if (currentlySelected !== undefined) {
        currentlySelected.classList.remove('selected');    
    }
    selectedColor.classList.add('selected');
    currentlySelected = selectedColor;

}
