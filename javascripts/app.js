var slotElements = [5, 6, 7, 8, 9],
	leftTimer, middleTimer, rightTimer;

var randomElement = function(){
	//Reference: http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
	var randElement =  slotElements[Math.floor(Math.random() * 5)];

	return randElement;
};

var chooseSlotItem = function(slot, interval){
	slotTimer = setInterval(function(){
		slot.empty();
		slot.append($("<p>").text(randomElement()));
	}, interval);

	return slotTimer;
};

var main = function(){
	console.log("Hello Vane!");

	var $leftSlot = $("#leftSlotItem"),
		$middleSlot = $("#middleSlotItem"),
		$rightSlot = $("#rightSlotItem"),
		$leftButton = $("#leftButton"),
		$middleButton = $("#middleButton"),
		$rightButton = $("#rightButton"),
		$spinButton = $("#spinButton");

	$spinButton.on("click", function(){
		$leftSlot.toggleClass("spinning");
		$middleSlot.toggleClass("spinning");
		$rightSlot.toggleClass("spinning");

		leftTimer = chooseSlotItem($leftSlot, 200);
		middleTimer = chooseSlotItem($middleSlot, 100);
		rightTimer = chooseSlotItem($rightSlot, 300);
	});

	$leftButton.on("click", function(){
		console.log("Left Stop button clicked");
		if($leftSlot.hasClass("spinning")){
			$leftSlot.toggleClass("spinning");
			clearInterval(leftTimer);
		}
	});

	$middleButton.on("click", function(){
		console.log("Middle Stop button clicked");
		if($middleSlot.hasClass("spinning")){
			$middleSlot.toggleClass("spinning");
			clearInterval(middleTimer);
		}
	});

	$rightButton.on("click", function(){
		console.log("Right Stop button clicked");
		if($rightSlot.hasClass("spinning")){
			$rightSlot.toggleClass("spinning");
			clearInterval(rightTimer);
		}
	});
};


$(document).ready(main);

//t
//fflvd