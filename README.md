# Game-of-Life
The famous game of life produced in JavaScript
Work in progress. Purely for educational purposes.
Much of the JS functionality and CSS styling is yet to be finished, plans include optional colour schemes and an about dropdown which explains the history and rules of the automaton.
Currently there this lacks support for all browsers and devices, the simulation width is determined by sceensize but is not dynamic, and much of the styling is non-responsive at this stage. 
Best used on chrome.
There is an options dropdown on the left which allows resizing of the grid for larger or smaller cells, as well as to draw the gridlines. Drawing the gridlines takes considerably more CPU power as p5 loops and draws every line in the graphic each frame. This means that the higher resolution with gridlines on is likely to cause performance issues. By default grid lines toggle off when you select medium or small cells.
