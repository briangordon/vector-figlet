function Figlet () {
	"use strict";

	var _this = this;

	// text: the text to turn into ascii art
	// scale: the scaling factor for making the text larger or smaller. Must be a natural number.
	// font: the font we want to use to render the text. Font js files must be included before Figlet.js
	_this.render = function (text, scale, font) {
		// Default font is "standard"
		font = font || "standard";

		// Default size is 1
		scale = scale || 1;

		if(scale < 1 || scale !== Math.floor(scale)) {
			throw "The scaling factor must be a natural number";
		}

		var font;
		if(!figlet_fonts || !(font = figlet_fonts[font])) {
			throw "Missing font";
		}

		// Make sure that every letter has the same height
		var height = 0;
		for(var letter in font) {
			if(height === 0) {
				height = font[letter].length;
				continue;
			}

			if(font[letter].length !== height) {
				throw ("Every letter must have the same height (" + letter + " has a height of " + font[letter].length + ")");
			}
		}

		var buffer = [];
		for(var i=0; i<scale*height+(2*(scale-1)); i++) {
			buffer[i] = [];
		}

		var currentWidth = scale-1;

		var letters = text.split("");
		for(var idx = 0; idx < letters.length; idx++) {
			renderLetter(letters[idx]);
		}

		return buffer;

		function renderLetter(letter) {

			var character = font[letter];
			var longestRow = 0;

			for(var row=0; row<height; row++) {
				// When calculating the width of a character, don't count modifiers. This regex needs to match any modifier string.
				var rowLength = character[row].replace(/[v\^WM]|\%\(\d+\)|\$\(\d+\)/g, "").length;
				if(rowLength > longestRow) longestRow = rowLength;

				var realCol = 0; // The actual column (col counts the column of text in the font definition BEFORE modifiers are removed)
				for(var col=0; col<character[row].length; col++, realCol++) {
					var curCell = character[row].substr(col,1);
					var offset = 0;

					// Advance the current column past a modifier
					var handleModifier = function () {
						col++;
						curCell = character[row].substr(col,1);
					};

					// Assuming that the current column is the open parenthesis after a modifier, advance the current column past the end 
					// parenthesis and return the substring inside of them.
					var handleArgumentativeModifier = function () {
						handleModifier();
						var substringStart = col;
						while(curCell !== ")") {
							handleModifier();
						}
						var targetScale = character[row].slice(substringStart, col);
						handleModifier();

						return targetScale;
					};

					// Subscript modifier
					if(curCell === "v") {
						offset = scale;
						handleModifier();

					// Superscript modifier
					} else if(curCell === "^") {
						offset = -scale;
						handleModifier();

					// One pixel subscript modifier
					} else if(curCell === "W") {
						offset = 1;
						handleModifier();

					// One pixel superscript modifier
					} else if(curCell === "M") {
						offset = -1;
						handleModifier();

					// $(17)/ means only draw / if the scale is less than or equal to 17
					} else if(curCell === "$") {
						handleModifier();
						if(curCell === "(") {
							var targetScale = handleArgumentativeModifier();
							if(scale > targetScale) {
								// If the target symbol is a space, then we shouldn't just move over like normal. We should collapse the space.
								if(curCell === " ") {
									realCol--;
								}
								continue;
							}
						}

					// %(10)/ means only draw / if the scale is greater than 10
					} else if(curCell === "%") {
						handleModifier();
						if(curCell === "(") {
							var targetScale = handleArgumentativeModifier();
							if(scale <= targetScale) {
								// If the target symbol is a space, then we shouldn't just move over like normal. We should collapse the space.
								if(curCell === " ") {
									realCol--;
								}
								continue;
							}
						}
					}

					// Only mark the cell itself
					if(curCell === "+") {
						buffer[(scale*row)+(scale-1)+offset][(scale*realCol)+currentWidth] = true;
					}

					// Mark the cells to the left and right
					else if(curCell === "-") {
						for(var k=-scale+1; k<=scale-1; k++) {
							buffer[(scale*row)+(scale-1)+offset][(scale*realCol)+currentWidth+k] = true;
						}
					}

					// Mark the cells to the left and right (minus one)
					else if(curCell === "~") {
						var shrunkScale = (scale > 2) ? scale-1 : scale;
						for(var k=-shrunkScale+1; k<=shrunkScale-1; k++) {
							buffer[(scale*row)+(scale-1)+offset][(scale*realCol)+currentWidth+k] = true;
						}
					}

					// Mark the cells above and below
					else if(curCell === "|") {
						for(var k=-scale+1; k<=scale-1; k++) {
							buffer[(scale*row)+(scale-1)+k+offset][(scale*realCol)+currentWidth] = true;
						}
					}

					// Mark the cells above and below (minus one)
					else if(curCell === "!") {
						var shrunkScale = (scale > 2) ? scale-1 : scale;
						for(var k=-shrunkScale+1; k<=shrunkScale-1; k++) {
							buffer[(scale*row)+(scale-1)+k+offset][(scale*realCol)+currentWidth] = true;
						}
					}

					// Only mark below
					else if(curCell === ",") {
						for(var k=0; k<=scale-1; k++) {
							buffer[(scale*row)+(scale-1)+k+offset][(scale*realCol)+currentWidth] = true;
						}
					}

					// Only mark above
					else if(curCell === "'") {
						for(var k=-scale+1; k<=0; k++) {
							buffer[(scale*row)+(scale-1)+k+offset][(scale*realCol)+currentWidth] = true;
						}
					}

					// Only mark to the left
					else if(curCell === "<") {
						for(var k=-scale+1; k<=0; k++) {
							buffer[(scale*row)+(scale-1)+offset][(scale*realCol)+currentWidth+k] = true;
						}
					}

					// Only mark to the right
					else if(curCell === ">") {
						for(var k=0; k<=scale-1; k++) {
							buffer[(scale*row)+(scale-1)+offset][(scale*realCol)+currentWidth+k] = true;
						}
					}

					// Mark the cells all around
					else if(curCell === "@") {
						for(var k=-scale+1; k<=scale-1; k++) {
							for(var l=-scale+1; l<=scale-1; l++) {
								buffer[(scale*row)+(scale-1)+k+offset][(scale*realCol)+currentWidth+l] = true;
							}
						}
					}

					// Mark the cells all around (minus one)
					else if(curCell === "O") {
						var shrunkScale = (scale > 2) ? scale-1 : scale;
						for(var k=-scale+1; k<=scale-1; k++) {
							for(var l=-scale+1; l<=scale-1; l++) {
								buffer[(scale*row)+(scale-1)+k+offset][(scale*realCol)+currentWidth+l] = true;
							}
						}
					}

					// Mark the cells along a y=x diagonal
					else if(curCell === "/") {
						for(var k=-scale+1; k<=scale-1; k++) {
							buffer[(scale*row)+(scale-1)-k+offset][(scale*realCol)+currentWidth+k] = true;
						}
					}

					// Mark the cells along a y=-x diagonal
					else if(curCell === "\\") {
						for(var k=-scale+1; k<=scale-1; k++) {
							buffer[(scale*row)+(scale-1)+k+offset][(scale*realCol)+currentWidth+k] = true;
						}
					}

					// Mark the lower-left cells along a y=x diagonal
					else if(curCell === "1") {
						for(var k=-scale+1; k<=0; k++) {
							buffer[(scale*row)+(scale-1)-k+offset][(scale*realCol)+currentWidth+k] = true;
						}
					}

					// Mark the upper-left cells along a y=-x diagonal
					else if(curCell === "7") {
						for(var k=-scale+1; k<=0; k++) {
							buffer[(scale*row)+(scale-1)+k+offset][(scale*realCol)+currentWidth+k] = true;
						}
					}

					// Mark the lower-right cells along a y=x diagonal
					else if(curCell === "3") {
						for(var k=0; k<=scale-1; k++) {
							buffer[(scale*row)+(scale-1)+k+offset][(scale*realCol)+currentWidth+k] = true;
						}
					}

					// Mark the upper-right cells along a y=-x diagonal
					else if(curCell === "9") {
						for(var k=0; k<=scale-1; k++) {
							buffer[(scale*row)+(scale-1)-k+offset][(scale*realCol)+currentWidth+k] = true;
						}
					}
				}
			}

			currentWidth += longestRow*scale + 1;
		}
	}

	_this.renderToHtml = function (text, scale, font) {
		return _this.renderToText(text, scale, font, "<br />");
	}

	_this.renderToText = function (text, scale, font, newline) {
		newline = newline || "\n";

		var grid = _this.render(text, scale, font);

		var ret = "";
		for(var row=0; row<grid.length; row++) {
			for(var col=0; col<grid[row].length; col++) {
				if(grid[row][col]) {
					ret += "X";
				} else {
					ret += " ";
				}
			}
			// Don't append another newline after the end
			if(row < grid.length - 1)
				ret += newline;
		}

		return ret;
	}
}