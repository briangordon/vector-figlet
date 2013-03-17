// fontSize: the scaling factor for making the text larger or smaller. Must be a natural number.
// fontName: the font we want to use to render the text. Font js files must be included before Figlet.js
function Figlet (fontSize, fontName) {
	"use strict";

	var _this = this;
	var _font, _scale;

	// Constructor
	void function () {
		// Default font is "standard"
		fontName = fontName || "standard";

		if(!figlet_fonts || !(_font = figlet_fonts[fontName])) {
			throw "Missing font";
		}

		// Default size is 1
		_scale = fontSize || 1;

		if(_scale < 1 || _scale !== Math.floor(_scale)) {
			throw "The scaling factor must be a natural number";
		}
	}();

	// text: the text to turn into ascii art
	_this.render = function (text) {
		// Make sure that every letter has the same height
		var height = 0;
		for(var letter in _font) {
			if(height === 0) {
				height = _font[letter].length;
				continue;
			}

			if(_font[letter].length !== height) {
				throw ("Every letter must have the same height (" + letter + " has a height of " + _font[letter].length + ")");
			}
		}

		var buffer = [];
		for(var i=0; i<_scale*height+(2*(_scale-1)); i++) {
			buffer[i] = [];
		}

		var currentWidth = _scale-1;

		var letters = text.split("");
		for(var idx = 0; idx < letters.length; idx++) {
			renderLetter(letters[idx]);
		}

		return buffer;

		function renderLetter(letter) {

			var character = _font[letter] || _font["?"];
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
						offset = _scale;
						handleModifier();

					// Superscript modifier
					} else if(curCell === "^") {
						offset = -_scale;
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
							if(_scale > targetScale) {
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
							if(_scale <= targetScale) {
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
						buffer[(_scale*row)+(_scale-1)+offset][(_scale*realCol)+currentWidth] = true;
					}

					// Mark the cells to the left and right
					else if(curCell === "-") {
						for(var k=-_scale+1; k<=_scale-1; k++) {
							buffer[(_scale*row)+(_scale-1)+offset][(_scale*realCol)+currentWidth+k] = true;
						}
					}

					// Mark the cells to the left and right (minus one)
					else if(curCell === "~") {
						var shrunkScale = (_scale > 2) ? _scale-1 : _scale;
						for(var k=-shrunkScale+1; k<=shrunkScale-1; k++) {
							buffer[(_scale*row)+(_scale-1)+offset][(_scale*realCol)+currentWidth+k] = true;
						}
					}

					// Mark the cells above and below
					else if(curCell === "|") {
						for(var k=-_scale+1; k<=_scale-1; k++) {
							buffer[(_scale*row)+(_scale-1)+k+offset][(_scale*realCol)+currentWidth] = true;
						}
					}

					// Mark the cells above and below (minus one)
					else if(curCell === "!") {
						var shrunkScale = (_scale > 2) ? _scale-1 : _scale;
						for(var k=-shrunkScale+1; k<=shrunkScale-1; k++) {
							buffer[(_scale*row)+(_scale-1)+k+offset][(_scale*realCol)+currentWidth] = true;
						}
					}

					// Only mark below
					else if(curCell === ",") {
						for(var k=0; k<=_scale-1; k++) {
							buffer[(_scale*row)+(_scale-1)+k+offset][(_scale*realCol)+currentWidth] = true;
						}
					}

					// Only mark above
					else if(curCell === "'") {
						for(var k=-_scale+1; k<=0; k++) {
							buffer[(_scale*row)+(_scale-1)+k+offset][(_scale*realCol)+currentWidth] = true;
						}
					}

					// Only mark to the left
					else if(curCell === "<") {
						for(var k=-_scale+1; k<=0; k++) {
							buffer[(_scale*row)+(_scale-1)+offset][(_scale*realCol)+currentWidth+k] = true;
						}
					}

					// Only mark to the right
					else if(curCell === ">") {
						for(var k=0; k<=_scale-1; k++) {
							buffer[(_scale*row)+(_scale-1)+offset][(_scale*realCol)+currentWidth+k] = true;
						}
					}

					// Mark the cells all around
					else if(curCell === "@") {
						for(var k=-_scale+1; k<=_scale-1; k++) {
							for(var l=-_scale+1; l<=_scale-1; l++) {
								buffer[(_scale*row)+(_scale-1)+k+offset][(_scale*realCol)+currentWidth+l] = true;
							}
						}
					}

					// Mark the cells all around (minus one)
					else if(curCell === "O") {
						var shrunkScale = (_scale > 2) ? _scale-1 : _scale;
						for(var k=-shrunkScale+1; k<=shrunkScale-1; k++) {
							for(var l=-scale+1; l<=scale-1; l++) {
								buffer[(scale*row)+(scale-1)+k+offset][(scale*realCol)+currentWidth+l] = true;
							}
						}
					}

					// Mark the cells along a y=x diagonal
					else if(curCell === "/") {
						for(var k=-_scale+1; k<=_scale-1; k++) {
							buffer[(_scale*row)+(_scale-1)-k+offset][(_scale*realCol)+currentWidth+k] = true;
						}
					}

					// Mark the cells along a y=-x diagonal
					else if(curCell === "\\") {
						for(var k=-_scale+1; k<=_scale-1; k++) {
							buffer[(_scale*row)+(_scale-1)+k+offset][(_scale*realCol)+currentWidth+k] = true;
						}
					}

					// Mark the lower-left cells along a y=x diagonal
					else if(curCell === "1") {
						for(var k=-_scale+1; k<=0; k++) {
							buffer[(_scale*row)+(_scale-1)-k+offset][(_scale*realCol)+currentWidth+k] = true;
						}
					}

					// Mark the upper-left cells along a y=-x diagonal
					else if(curCell === "7") {
						for(var k=-_scale+1; k<=0; k++) {
							buffer[(_scale*row)+(_scale-1)+k+offset][(_scale*realCol)+currentWidth+k] = true;
						}
					}

					// Mark the lower-right cells along a y=x diagonal
					else if(curCell === "3") {
						for(var k=0; k<=_scale-1; k++) {
							buffer[(_scale*row)+(_scale-1)+k+offset][(_scale*realCol)+currentWidth+k] = true;
						}
					}

					// Mark the upper-right cells along a y=-x diagonal
					else if(curCell === "9") {
						for(var k=0; k<=_scale-1; k++) {
							buffer[(_scale*row)+(_scale-1)-k+offset][(_scale*realCol)+currentWidth+k] = true;
						}
					}
				}
			}

			currentWidth += longestRow*_scale + 1;
		}
	}

	_this.renderToHtml = function (text) {
		return _this.renderToText(text, "<br />");
	}

	_this.renderToText = function (text, newline) {
		var grid = _this.render(text);
		newline = newline || "\n";

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