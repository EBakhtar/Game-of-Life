var grid;
var cols;
var rows;
var res = 50;
var started;
var gridded = true;
var fpsmeter = new FPSMeter(document.getElementById("fpsmet"), {theme:"transparent", graph:1, history: 20, left: "3%", top: "2%"});
var sqColour = "rgb(255, 163, 26)"
var bkgColour = "rgb(0, 120 ,120)"
var sqBordColour = 'rgb(255,255,255)'

// Make the game board array
function gameBoard(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length;i++) {
    arr[i]=new Array(rows);
  }
  return arr;
}

//Initiate game board with random live/dead tiles
function setup() {
  var canv = createCanvas((Math.floor((displayWidth-100)/100))*100, (Math.floor((displayHeight*0.6/100))*100));
  canv.parent("game_window");
  cols = Math.floor(width/res);
  rows = Math.floor(height/res);
  gameReset();
  fpsmeter.hide();
}

function draw() { 
  cols = Math.floor(width/res);
  rows = Math.floor(height/res);
  background(bkgColour);
//Colour the grid filling each live square. 1 = live, 0 = dead
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      var x = i * res;
      var y = j * res;
      if (grid[i][j] == 1) {
        fill(sqColour);
        strokeWeight(0.6);
        stroke(sqBordColour);
        rect(x, y, res, res);
      } // Adds a grid if toggle grid is active
      else if (gridded) {
        stroke(sqBordColour)
        strokeWeight(0.3);
        fill(bkgColour);
        rect(x, y, res, res);
      }
    }
  }
// If n key is down or the start button is pressed run simulations
//Check the current state against number of neighbours to determine squares' next state
  if (keyIsDown(78) || (started)){
    var nextGen = gameBoard(cols, rows);
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows;j++) {
        var state = grid[i][j];
         var neighbours = countNeighbours(grid, i, j);
         // Alive with 2 or 3 neighbours stays alive
         if (state == 1 && (neighbours == 2 || neighbours == 3)) {
          nextGen[i][j] = 1;
          // Dead with 3 neighbours becomes alive
        } else if ((state == 0) && neighbours == 3) {
          nextGen[i][j] = 1
          // Alive with less than 2 or greater than 3 neighbours dies
        } else {
          nextGen[i][j] = 0;
        }
      } 
    }
    grid = nextGen;
  }   
  fpsmeter.tick(); 
}

//Count how many neighbours adjacent, at edges check opposite side of board
function countNeighbours(grid, x, y) {
  var count = 0;
  for (var i = -1;i<2;i++) {
    for (var j = -1;j<2;j++) {
      var col = (x+i+cols)%cols;
      var row = (y+j+rows)%rows;
      count += grid[col][row]
    }
  }
  if (grid[x][y] == 1) {
  count -= 1;
  }
  return count;
}

function gameReset() {
  cols = Math.floor(width/res);
  rows = Math.floor(height/res);
  grid = gameBoard(cols, rows);
  for (var i = 0; i < cols; i++){
    for (var j = 0; j < rows; j++){
      grid[i][j]= Math.floor(Math.random()*2);
    }
  }
}

var startbtn = document.getElementById("start_stop");
startbtn.addEventListener("click", function(){
  startbtn.classList.toggle("go")
  startbtn.classList.toggle("stop")
  if (startbtn.innerHTML=="Start") {
    startbtn.innerHTML = "Stop"
  } else startbtn.innerHTML = "Start";
})
// Reset button
document.querySelector("#resetButton").addEventListener("click", function(){
  gameReset()
});
// Resolution buttons - low
document.querySelector("#lowRes").addEventListener("click", function(){
  gridded = true;
  res = 50;
  gameReset()
  this.classList.add("active");
  document.querySelector("#medRes").classList.remove("active");
  document.querySelector("#highRes").classList.remove("active");
});
// medium
document.querySelector("#medRes").addEventListener("click", function(){
  gridded = false;
  res = 15;
  gameReset()
  this.classList.add("active");
  document.querySelector("#lowRes").classList.remove("active");
  document.querySelector("#highRes").classList.remove("active");
});
// high
document.querySelector("#highRes").addEventListener("click", function(){
  gridded = false;
  res = 10;
  gameReset()
  this.classList.add("active");
  document.querySelector("#medRes").classList.remove("active");
  document.querySelector("#lowRes").classList.remove("active");
});
// Start and stop the animation
document.querySelector("#start_stop").addEventListener("click", function () {
  started = !started;
})
// Toggle grid
document.querySelector("#gridButton").addEventListener("click", function(){
  gridded = !gridded;
});
// Toggle FPS Counter
document.querySelector("#fpsMetButton").addEventListener("click", function(){
  if (fpsmeter.isPaused){
      fpsmeter.show();
    } else {
      fpsmeter.hide()
    }
});
// Theme Buttons
document.querySelector("#themeDark").addEventListener("click", function(){
  sqColour = "rgb(26, 42, 68)"
  bkgColour = "rgb(0, 0 ,0)"
  sqBordColour = 'rgb(0,255,0)'
});
document.querySelector("#themeLight").addEventListener("click", function(){
  sqColour = "rgb(0, 204, 68)"
  bkgColour = "rgb(255, 255, 230)"
  sqBordColour = 'rgb(0, 204, 68)'
});
document.querySelector("#themeBW").addEventListener("click", function(){
  sqColour = "rgb(0, 0, 0)"
  bkgColour = "rgb(255, 255 ,255)"
  sqBordColour = "rgb(0, 0, 0)"
});
document.querySelector("#themeBlue").addEventListener("click", function(){
  sqColour = "rgb(255, 163, 26)"
  bkgColour = "rgb(0, 120, 120)"
  sqBordColour = "rgb(255, 255, 255)"
});

// Menu buttons. growDiv closes all the menus and opens the one which has been clicked
function growDiv(navId, wrapper) {
    document.getElementById("navbarToggleSettings").style.height = 0;
    document.getElementById("navbarToggleThemes").style.height = 0;
    document.getElementById("navbarToggleInfo").style.height = 0;
    var growDiv = document.getElementById(navId);
    if (growDiv.clientHeight) {
      growDiv.style.height = 0;
    } else {
      var wrapper = document.querySelector(wrapper);
      growDiv.style.height = wrapper.clientHeight + "px";
    }
}
document.getElementById("settingsBtn").addEventListener("click", function(){
  growDiv("navbarToggleSettings", ".settingsWrapper");
});
document.getElementById("themesBtn").addEventListener("click", function(){
  growDiv("navbarToggleThemes", ".themesWrapper");
});
document.getElementById("infoBtn").addEventListener("click", function(){
  growDiv("navbarToggleInfo", ".infoWrapper");
});

// Original menu method using bootstrap js and jQuery (fewer lines but requires more libraries)
// var navbarBtns = document.getElementsByClassName("navbar-toggler")
//   for (var i =0;i<navbarBtns.length;i++){
//     navbarBtns.item(i).addEventListener("click", function(){
//       jQuery('.collapse').collapse("hide")
//     })
//   }