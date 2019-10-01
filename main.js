
/*const grid = document.querySelector('#grid');
const GRID_WIDTH = 600;
let cellsPerSide = 4;
let gridCells = cellsPerSide ** 2;
let cells;
let mode = {rgb: false, black: true, shade: false};

const resetButton = document.querySelector('#resetButton');
resetButton.addEventListener('click', (e)=>{
  cellsPerSide = 's'; 
  while(isNaN(cellsPerSide) || cellsPerSide <= 0 || cellsPerSide > 100)
  if(cellsPerSide <= 0){
    cellsPerSide = prompt("Value must be greater than 0. How many squares for each row and column? (Max of 100)");
  } else if(cellsPerSide > 100){
    cellsPerSide = prompt("Value must be less than 101. How many squares for each row and column? (Max of 100)");
  }
  else{
   cellsPerSide = prompt("How many squares for each row and column? (Max of 100)");
  }
   
  removeGrid();
  createGrid();
});

const blackFill = document.querySelector('#blackFill');
const randomFill = document.querySelector('#randomFill');
const shadeFill = document.querySelector('#shadeFill');

createGrid();

randomFill.addEventListener('click', (e)=>{
  mode.rgb = true;
  mode.black = false;
  mode.shade = false;
});
blackFill.addEventListener('click', (e)=>{
  mode.rgb = false;
  mode.black = true;
  mode.shade = false;
});
shadeFill.addEventListener('click', (e)=>{
  mode.rgb = false;
  mode.black = false;
  mode.shade = true;
});

function createGrid(){
  gridCells = cellsPerSide ** 2;
  grid.setAttribute('style', `grid-template: 
      repeat(${cellsPerSide}, ${GRID_WIDTH / cellsPerSide}px) / repeat(${cellsPerSide}, ${GRID_WIDTH / cellsPerSide}px); 
      width = ${GRID_WIDTH}`);
  //grid.setAttribute('style', 'margin-left: 100px');
  for(let i = 0; i < gridCells; i++){
    const cell = document.createElement('div');
    cell.classList.add('cell');
    grid.appendChild(cell);
  }

  cells = [...document.querySelectorAll('.cell')];
  colorGrid();
}

function removeGrid(){
  if(grid.hasChildNodes()){
    while(grid.hasChildNodes())
    grid.removeChild(grid.childNodes[0]);
  }
}

function colorGrid(){
  
  cells.forEach((cell)=>{
    cell.addEventListener('mouseover', (e)=>{

      if(!cell.opacity)
        cell.opacity = 0;

      if(mode.rgb === true){
        let red = Math.ceil(Math.random() * 255);
        let green = Math.ceil(Math.random() * 255);
        let blue = Math.ceil(Math.random() * 255);

        cell.setAttribute('style', `background-color: rgb(${red}, ${green}, ${blue})`);
      }else if(mode.black === true){
        cell.setAttribute('style', `background-color: black`);
      } else{
          cell.setAttribute('style',`background-color: rgba(0, 0, 0, ${cell.opacity += .1})`); 
          
      }
      
    });
  });
}*/



