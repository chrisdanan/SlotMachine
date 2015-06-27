var $azumangaDaioh = $("<img>").attr("id", "azumangaDaioh").addClass("slotImage").attr("src", "assets/images/AzumangaDaioh.jpg").attr("alt", "Azumanga Daioh slot image"),
	$toraDora = $("<img>").attr("id", "toraDora").addClass("slotImage").attr("src", "assets/images/ToraDora.jpg").attr("alt", "Toradora slot image"),
	$swordArtOnline = $("<img>").attr("id", "swordArtOnline").addClass("slotImage").attr("src", "assets/images/SwordArtOnline.jpg").attr("alt", "Sword Art Online slot image"),
	$spiritedAway = $("<img>").attr("id", "spiritedAway").addClass("slotImage").attr("src", "assets/images/SpiritedAway.jpg").attr("alt", "Spirited Away slot image"),
	$paranoiaAgent = $("<img>").attr("id", "paranoiaAgent").addClass("slotImage").attr("src", "assets/images/ParanoiaAgent.jpg").attr("alt", "Paranoia Agent slot image");

var slotElements = [$azumangaDaioh, $toraDora, $swordArtOnline, $spiritedAway, $paranoiaAgent],
	leftTimer, middleTimer, rightTimer;

var randomElement = function(){
	//Reference: http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
	var randElement =  slotElements[Math.floor(Math.random() * slotElements.length)];

	return randElement;
};

var chooseSlotItem = function(slot, interval){
	slotTimer = setInterval(function(){
		slot.empty();
		slot.append(randomElement());
	}, interval);

	return slotTimer;
};

var stopSlot = function(slot, slotTimer){
	console.log("Stop button was clicked.");
	if(slot.hasClass("spinning")){
		slot.toggleClass("spinning");
		clearInterval(slotTimer);
	}
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
		stopSlot($leftSlot, leftTimer);
	});

	$middleButton.on("click", function(){
		stopSlot($middleSlot, middleTimer);
	});

	$rightButton.on("click", function(){
		stopSlot($rightSlot, rightTimer);
	});
};


$(document).ready(main);

//t
//fflvd