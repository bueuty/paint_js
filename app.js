const canvas  = document.getElementById('jsCanvas');
const ctx  = canvas.getContext('2d');
const color = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');


const CANVAS_SIZE = 500;
canvas.height = CANVAS_SIZE;
canvas.width = CANVAS_SIZE;

const INITIAL_COLOR = '#2c2c2c';

ctx.fillStyle = 'white';
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.lineWidth = 2.5;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;



//ctx.fillRect(100,100, 300, 450);

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
 
}

function onMouseMove(event){
    x = event.offsetX;
    y = event.offsetY;
  if(!painting){
    ctx.beginPath();
    ctx.moveTo(x, y);
    
  }else{
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
function onMouseDown(event){
    painting = true;
}

function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const rangeValue = event.target.value;
    ctx.lineWidth = rangeValue;
}

function handlemodClick(){
    if(filling == true){
        filling = false;
        mode.innerText = 'Заливка';
    }else{
        filling = true;
        mode.innerText = 'Малювання';
        //ctx.fillRect = ctx.strokeStyle;
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }

}

function handlesaveClick(){
    const image = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.download = image;

}


if(canvas){
    canvas.addEventListener('mousemove',onMouseMove)
    canvas.addEventListener('mousedown',onMouseDown)
    canvas.addEventListener('mouseup',stopPainting)
    canvas.addEventListener('mouseleave', stopPainting)
    canvas.addEventListener('click', handleCanvasClick)
}


Array.from(color).forEach(color => color.addEventListener('click', changeColor));

if(range){
    range.addEventListener('input', handleRangeChange);
}

if(mode){
    mode.addEventListener('click', handlemodClick);
}

if(saveBtn){
    saveBtn.addEventListener('click', handlesaveClick);
}