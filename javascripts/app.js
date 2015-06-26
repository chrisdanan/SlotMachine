var slotElements = [5, 6, 7, 8, 9];

var randomElement = function(){
	//Reference: http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
	var randElement =  slotElements[Math.floor(Math.random() * 5)];

	return randElement;
};

var chooseSlotItem = function(slot, interval){
	window.setInterval(function(){
		slot.empty();
		slot.append($("<p>").text(randomElement()));
	}, interval);
};

var main = function(){
	console.log("Hello Vane!");

	var $leftSlot = $("#leftSlotItem"),
		$middleSlot = $("#middleSlotItem"),
		$rightSlot = $("#rightSlotItem"),
		$leftButton = $("#leftButton"),
		$middleButton = $("#middleButton"),
		$rightButton = $("#rightButton");

	chooseSlotItem($leftSlot, 200);
	chooseSlotItem($middleSlot, 100);
	chooseSlotItem($rightSlot, 300);

	$leftButton.on("click", function(){
		console.log("Left Stop button clicked");
	});

	$middleButton.on("click", function(){
		console.log("Middle Stop button clicked");
	});

	$rightButton.on("click", function(){
		console.log("Right Stop button clicked");
	});
};


$(document).ready(main);