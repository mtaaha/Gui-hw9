/*
Name: Mohammad Taaha
91.61 Assignment:  Implementing a Bit of Scrabble with Drag and Drop
Mohammad Taaha, UMass Lowell Computer Science Student,mohammad_taaha@student.uml.edu
Copyright (c) 2018 by Mohammad Taaha.  All rights reserved.  May be
freely copied or excerpted for educational purposes with credit to the
author.
Created on 12/15/2018
Description:In this webpage, I have implemented a single line scrabble board. The user can drag tiles from the rack to
single link board. When the user inserts it in the double tiles, it doubles the score. The score is updated as the user
drags the tiles from the rack onto the board. There is also a reset button that resets all the rack tiles in case the user
is stuck. The user can press the reset button multiplie times and it will reset the rack and board. If the user tries to
drag the tile of the board, the tile will just back to the rack.
*/

//Provided by Dr. Jessie Hienes
// Scrabble_Pieces_AssociativeArray_Jesse.js
var ScrabbleTiles = [{
		"tile": "A",
		"value": 1,
		"original-distribution": 9,
		"numbers": 9
	},
	{
		"tile": "B",
		"value": 3,
		"original-distribution": 2,
		"numbers": 2
	},
	{
		"tile": "C",
		"value": 3,
		"original-distribution": 2,
		"numbers": 2
	},
	{
		"tile": "D",
		"value": 2,
		"original-distribution": 4,
		"numbers": 4
	},
	{
		"tile": "E",
		"value": 1,
		"original-distribution": 12,
		"numbers": 12
	},
	{
		"tile": "F",
		"value": 4,
		"original-distribution": 2,
		"numbers": 2
	},
	{
		"tile": "G",
		"value": 2,
		"original-distribution": 3,
		"numbers": 3
	},
	{
		"tile": "H",
		"value": 4,
		"original-distribution": 2,
		"numbers": 2
	},
	{
		"tile": "I",
		"value": 1,
		"original-distribution": 9,
		"numbers": 9
	},
	{
		"tile": "J",
		"value": 8,
		"original-distribution": 1,
		"numbers": 1
	},
	{
		"tile": "K",
		"value": 5,
		"original-distribution": 1,
		"numbers": 1
	},
	{
		"tile": "L",
		"value": 1,
		"original-distribution": 4,
		"numbers": 4
	},
	{
		"tile": "M",
		"value": 3,
		"original-distribution": 2,
		"numbers": 2
	},
	{
		"tile": "N",
		"value": 1,
		"original-distribution": 6,
		"numbers": 6
	},
	{
		"tile": "O",
		"value": 1,
		"original-distribution": 8,
		"numbers": 8
	},
	{
		"tile": "P",
		"value": 3,
		"original-distribution": 2,
		"numbers": 2
	},
	{
		"tile": "Q",
		"value": 10,
		"original-distribution": 1,
		"numbers": 1
	},
	{
		"tile": "R",
		"value": 1,
		"original-distribution": 6,
		"numbers": 6
	},
	{
		"tile": "S",
		"value": 1,
		"original-distribution": 4,
		"numbers": 4
	},
	{
		"tile": "T",
		"value": 1,
		"original-distribution": 6,
		"numbers": 6
	},
	{
		"tile": "U",
		"value": 1,
		"original-distribution": 4,
		"numbers": 4
	},
	{
		"tile": "V",
		"value": 4,
		"original-distribution": 2,
		"numbers": 2
	},
	{
		"tile": "W",
		"value": 4,
		"original-distribution": 2,
		"numbers": 2
	},
	{
		"tile": "X",
		"value": 8,
		"original-distribution": 1,
		"numbers": 1
	},
	{
		"tile": "Y",
		"value": 4,
		"original-distribution": 2,
		"numbers": 2
	},
	{
		"tile": "Z",
		"value": 10,
		"original-distribution": 1,
		"numbers": 1
	},
	{
		"tile": "_",
		"value": 0,
		"original-distribution": 2,
		"numbers": 2
	}
];
var letters = [];


//generates random tiles
function tile_generator_ran() {
	var img_url = "img/";
	var total_letters = 0;

	for (var i = 0; i <= 26; i++) {
		var current_letter = ScrabbleTiles[i];
		var remaining = ScrabbleTiles[i].numbers;
		total_letters += remaining;

		for (var j = 0; j < remaining; j++) {
			letters.push(current_letter)
		}
	}

	reset_array(letters);

}

var bonus_w = 0;
var bonus_double = 0;

function scoreboard(tile, square) {
	var score = 0;


	for (var i = 0; i <= 26; i++) {
		if (tile === ScrabbleTiles[i]["tile"])
			score = ScrabbleTiles[i]["value"];
	}

	for (var i = 0; i < bonus_double; i++) {
		bonus_w /= 2;
	}


	if (square === "doublel ui-droppable") {
		score *= 2;
	}
	if (square === "doublew ui-droppable") {
		bonus_double++;
	}

	bonus_w += score;
	for (var i = 0; i < bonus_double; i++) {
		bonus_w *= 2;
	}
	document.getElementById("score").innerHTML = "<p><strong> Score:</strong> " + bonus_w + "</p>";
}

function reset_array(array) {
	var currentIndex = array.length,
		tempValue, randIndex;
	while (0 !== currentIndex) {
		randIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		tempValue = array[currentIndex];
		array[currentIndex] = array[randIndex];
		array[randIndex] = tempValue;
	}

	return array;
}
//creates tiles along with the image that belongs to that tile
function create_tiles() {
	for (var i = 0; i < 7; i++) {
		var new_tile = letters.pop();
		var url = "<img class=\"draggable\" alt=\"" + new_tile["tile"] + "\" src=\"img/" + new_tile["tile"] + ".png\">";
		$("#rack").append(url);


		$(".draggable").draggable({
			//indicated if element is moved back to original position after move
			snap: ".droppable",
		});

		$("td").droppable({
			accept: ".draggable",
			tolerance: "fit",
			drop: function (event, ui) {
				var $this = $(this);
				ui.draggable.position({
					my: "center",
					at: "center",
					of: $this,
					using: function (pos) {
						$this.animate(pos, 200, "linear");
					}
				});
				scoreboard($(ui.draggable).attr("alt"), $this.attr("class"));
			}
		});

		$("#rack").droppable({
			accept: ".droppable",
		});
	}
}
//clear queue and adds new element to the rack
function reset() {
	for (var m = 0; m < letters.length; m++) {
		letters.pop();
	}

	bonus_w = 0;
	bonus_double = 0;
	document.getElementById("score").innerHTML = "<p><strong> Score:</strong> 0</p>";
	document.getElementById("rack").innerHTML = "";

	tile_generator_ran();
	create_tiles();
}

$(document).ready(function () {
	tile_generator_ran();
	create_tiles();
});
