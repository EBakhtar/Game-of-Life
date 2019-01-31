# Game-of-Life
The famous game of life produced in JavaScript.
Currently this does not support all browsers and devices, the simulation width is determined by sceensize but is not dynamic, and much of the styling is non-responsive at this stage. 
Best used on chrome.
There is an options dropdown on the left which allows resizing of the grid for larger or smaller cells, as well as to draw the gridlines. Drawing the gridlines takes considerably more CPU power as the library used to visualise the grid (P5) loops and draws every line in the graphic each frame. This means that the higher resolution with gridlines on is likely to cause performance issues. By default grid lines toggle off when you select medium or small cells.
Currently the grid can only be reset to a random seed each time, next version will allow the user to reset to a blank grid and draw patterns out manually.
