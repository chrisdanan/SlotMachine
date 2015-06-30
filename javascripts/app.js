var $azumangaDaioh = $("<img>").addClass("slotImage azumangaDaioh").attr("src", "assets/images/AzumangaDaioh.jpg").attr("alt", "Azumanga Daioh slot image"),
	$toraDora = $("<img>").addClass("slotImage toraDora").attr("src", "assets/images/ToraDora.jpg").attr("alt", "Toradora slot image"),
	$swordArtOnline = $("<img>").addClass("slotImage swordArtOnline").attr("src", "assets/images/SwordArtOnline.jpg").attr("alt", "Sword Art Online slot image"),
	$spiritedAway = $("<img>").addClass("slotImage spiritedAway").attr("src", "assets/images/SpiritedAway.jpg").attr("alt", "Spirited Away slot image"),
	$paranoiaAgent = $("<img>").addClass("slotImage paranoiaAgent").attr("src", "assets/images/ParanoiaAgent.jpg").attr("alt", "Paranoia Agent slot image");

var slotElements = [$azumangaDaioh, $toraDora, $swordArtOnline, $spiritedAway, $paranoiaAgent],
	leftTimer, middleTimer, rightTimer;

var randomElement = function(){
	//Reference: http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
	var randElement =  slotElements[Math.floor(Math.random() * slotElements.length)];
	console.log(randElement);

	//Reference: http://stackoverflow.com/questions/4623265/how-to-add-duplicate-image-on-same-page-with-java-script-after-page-loaded
	randElement = randElement.clone();

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
		$stopAllButton = $("#stopAll"),
		$spinButton = $("#spinButton");

	$spinButton.on("click", function(){
		console.log("Spin button clicked");

		var leftTimerVal = $("#setLeftTimer").val(),
			middleTimerVal = $("#setMiddleTimer").val(),
			rightTimerVal = $("#setRightTimer").val();

		$leftSlot.empty();
		$middleSlot.empty();
		$rightSlot.empty();

		//Initialize slots. The timer will only initialize the slots at the set time interval.
		// Instead, we want the items to appear immediately once the button is clicked.
		$leftSlot.append(randomElement());
		$middleSlot.append(randomElement());
		$rightSlot.append(randomElement());

		$leftSlot.toggleClass("spinning");
		$middleSlot.toggleClass("spinning");
		$rightSlot.toggleClass("spinning");

		leftTimer = chooseSlotItem($leftSlot, leftTimerVal);
		middleTimer = chooseSlotItem($middleSlot, middleTimerVal);
		rightTimer = chooseSlotItem($rightSlot, rightTimerVal);
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

	$stopAllButton.on("click", function(){
		console.log("Stop All Slots button clicked");
		stopSlot($leftSlot, leftTimer);
		stopSlot($middleSlot, middleTimer);
		stopSlot($rightSlot, rightTimer);
	});
};


$(document).ready(main);

//t
//fflvd