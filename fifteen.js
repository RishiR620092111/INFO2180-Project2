$(document).ready(function(){
	$("div div div").addClass("puzzlepiece");
	
	//Positioning the divisions properly in the puzzle grid.
	var pos1 = parseInt($("#puzzlearea").css("top"));
	var pos2 = parseInt($("#puzzlearea").css("left"));
	
	//Positions for blank squares.
	var blank1 = 300;
	var blank2 = 300;
	
	//Positions for pictures.
	var pic1 = 0;
	var pic2 = 0;
	
	var tiles = document.getElementsByClassName("puzzlepiece");
	
	for(var i=0; i < tiles.length; i++){
		//Positioning the image on each division.
		$(tiles[i]).css("background-position", pic1 + "px " + pic2 + "px");
	
		pic1 -= 100;
		if(pic1%400 == 0){
			pic2 -= 100;
		}
	
		//Positioning each div
		$(tiles[i]).css("top", pos2);
		$(tiles[i]).css("left", pos1);
	
		pos1 += 100;
	
		if(i !=0 && (i+1)%4 == 0){ 
			pos2 += 100; 
			pos1 = parseInt($("#puzzlearea").css("top")); 
		}
	
		//Tile glows if hovered.
		$(tiles[i]).on("mouseover", function(){
			if(valid(this)){ 
				$(this).addClass("movablepiece"); 
			}
		});
		
		$(tiles[i]).on("mouseleave", function(){
			$(this).removeClass("movablepiece");
		});
		
		//If tile is clicked, it is switched with blank tile.
		$(tiles[i]).on("click", function(){
			if(valid(this)){ 
				switchTile(this);
			}
		});
	}
	
	//Check if current tile is next to a blank tile.
	var valid = function(tile){
	
		if(((parseInt($(tile).css("top")) - blank2 == 100 || parseInt($(tile).css("top")) - blank2 == -100) && parseInt($(tile).css("left")) - blank1 == 0)
			||((parseInt($(tile).css("left")) - blank1 == 100 || parseInt($(tile).css("left")) - blank1 == -100) && parseInt($(tile).css("top")) - blank2 == 0)){
				return true;
			}
	
		else{ 
			return false; 
		}
	};
	
	//Function to switch tiles.
	var switchTile = function(move){
	
		var temp1 = blank1;
		var temp2 = blank2;
		
		blank2 = parseInt($(move).css("top"));
		blank1 = parseInt($(move).css("left"));
		
		$(move).css("top", temp2);
		$(move).css("left", temp1);
	};
	
	//Function checks if tile is next to blank tile then moves tile.
	var moveTile = function(){
	
		var arrTiles = []; //Array to hold tiles to move.
	
		for(var i=0; i < tiles.length; i++){
			if (valid(tiles[i]) == true){
				arrTiles.push(tiles[i]);
			}
		}
		
		//Gets random tile that is next to blank tile.
		var move = arrTiles[Math.floor(Math.random() * arrTiles.length)];
	
		//Switches the blank tile with the random tile.
		switchTile(move);
	
	};
	
	$("#shufflebutton").on("click", function(){
	
		//Amount of times to move tiles while shuffling(between 100 and 200)
		amount = Math.floor(Math.random() * 100) + 100;
	
		for(var i=0; i < amount; i++){
			moveTile();
		}
	});
	
});