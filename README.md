## Game-of-Life
The famous game of life produced in JavaScript.
Currently this may not support all device sizes, the canvas width is determined by sceensize but is not dynamic.
Best used on chrome.
There is an options dropdown on the left which allows resizing of the grid for larger or smaller cells, as well as to draw the gridlines. Drawing the gridlines takes considerably more CPU power as the library used to visualise the grid (P5) loops and draws every line in the graphic each frame. This means that the higher resolution with gridlines on is likely to cause performance issues. By default grid lines toggle off when you select medium or small cells.
The grid loops around, meaning when live cells aproach a border they will continue to interact with the opposite side of the screen creating an 'infinite' space.
## What I learnt
Used the p5 library for the first time, learning about how the draw function constantly loops which allows live animated updates of the game board. Initially I used bootstrap.js and jQuery to implement the menu buttons, after realising that was a lot of libraries to import for one solution I managed to recreate the solution manually using vanilla JS and CSS, altering the height of the menus and adding an ease to the CSS style. using p5 to draw the grid created a lot of performance issues, particularly when resizing the grid to a larger resolution. Although the grid was relatively easy to draw and p5 allows the grid resolution to be changed on the fly, the performance issues mean this may not be the best solution for drawing the game grid. A lot about styling, bootstrap and positioning. E.g. I had an issue where the dropdown menus would shift up on smaller screens as I used absolute position with percentage from the top to place them over the canvas. I solved this by wrapping them in a div with position:relative with the dropdowns having 10px from the top to keep the menus relative to this div.
## Future potential
Add functionality of clicking on the grid to toggle a cell alive or dead.
Consider other libraries or ways of visualising the grid that may have better performance (D3, oCanvas etc)
