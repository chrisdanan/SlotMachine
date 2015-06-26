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

	var $leftSlot = $("#leftSlot"),
		$middleSlot = $("#middleSlot"),
		$rightSlot = $("#rightSlot");

	chooseSlotItem($leftSlot, 200);
	chooseSlotItem($middleSlot, 100);
	chooseSlotItem($rightSlot, 300);

};


$(document).ready(main);