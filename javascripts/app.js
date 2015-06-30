/*************
* Name: Christopher Dancarlo Danan
* Created: June 25, 2015
* Modified: June 29, 2015
* Project: SlotMachine
* File: app.js
* Purpose: Script will handle all game logic.
*************/

//Images used in the slot machine.
var $azumangaDaioh = $("<img>").addClass("slotImage azumangaDaioh").attr("src", "assets/images/AzumangaDaioh.jpg").attr("alt", "Azumanga Daioh slot image"),
	$toraDora = $("<img>").addClass("slotImage toraDora").attr("src", "assets/images/ToraDora.jpg").attr("alt", "Toradora slot image"),
	$swordArtOnline = $("<img>").addClass("slotImage swordArtOnline").attr("src", "assets/images/SwordArtOnline.jpg").attr("alt", "Sword Art Online slot image"),
	$spiritedAway = $("<img>").addClass("slotImage spiritedAway").attr("src", "assets/images/SpiritedAway.jpg").attr("alt", "Spirited Away slot image"),
	$paranoiaAgent = $("<img>").addClass("slotImage paranoiaAgent").attr("src", "assets/images/ParanoiaAgent.jpg").attr("alt", "Paranoia Agent slot image");


var slotElements = [$azumangaDaioh, $toraDora, $swordArtOnline, $spiritedAway, $paranoiaAgent],  //Put images into an array for randomized picking.
	leftTimer, middleTimer, rightTimer;  //Holds value of each slot's timer in milliseconds.

/*************
* Purpose: Choose a random image from an array and return it.
* Input: None.
* Output: Returns a random image.
*************/
var randomElement = function(){
	//Reference: http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
	var randElement =  slotElements[Math.floor(Math.random() * slotElements.length)];
	//console.log(randElement);

	//Reference: http://stackoverflow.com/questions/4623265/how-to-add-duplicate-image-on-same-page-with-java-script-after-page-loaded
	randElement = randElement.clone();

	//console.log(randElement);

	return randElement;
};

/*************
* Purpose: Place an image into one of the slots of the slot machine.
* Input:
		-slot: One of the slots of the slot machine (left, middle, or right).
		-interval: The amount of time for each slot before it changes images.
* Output: Returns the id of the setInterval function to be used later for stopping the slot.
*************/
var chooseSlotItem = function(slot, interval){
	slotTimer = setInterval(function(){
		slot.empty();
		slot.append(randomElement());
	}, interval);

	return slotTimer;
};

/*************
* Purpose: Stops a slot from spinning. The slot that is stopped is passed in as a parameter.
* Input:
		-slot: One of the slots of the slot machine (left, middle, or right).
		-slotTimer: The id of the setInterval function that will be used to stop the timer of the slot.
* Output: The slot passed in as a parameter will stop spinning.
*************/
var stopSlot = function(slot, slotTimer){
	if(slot.hasClass("spinning")){
		slot.toggleClass("spinning");
		slot.toggleClass("stopped");
		clearInterval(slotTimer);
	}
};

/*************
* Purpose: Get the name of the image that is passed in. Each image has multiple classes. The second class is the name of the image.
* Input:
*		-img: The image element that the name is extracted from.
* Output: The name of the image (i.e. the second class name) is returned.
*************/
var getImgClass = function(img){
	var imgClass = img.attr("class").split(" ");

	imgClass = imgClass[1];

	return imgClass;
};

/*************
* Purpose: Check if the player has won.
			We can check if the player has won by checking if all 3 images have the same name (i.e. the second class name for each image is equivalent).
* Input: None.
* Output: Log if the player won or lost. THIS WILL BE UPDATED LATER 
*************/
var checkWin = function(){
	var $leftImg = $("#leftSlotItem img"),
		$midImg = $("#middleSlotItem img"),
		$rightImg = $("#rightSlotItem img"),
		leftClass, midClass, rightClass;

		leftClass = getImgClass($leftImg);
		midClass = getImgClass($midImg);
		rightClass = getImgClass($rightImg);

		console.log("Left image is " + leftClass);
		console.log("Middle image is " + midClass);
		console.log("Right image is " + rightClass);

		if(leftClass === midClass && leftClass === rightClass){
			console.log("WINNER");
		} else{
			console.log("LOSER");
		}
};

/*************
* Purpose: Check if all of the slots have stopped winning.
* Input: None.
* Output: Call the checkWin function if all slots are stopped.
*************/
var checkAllStopped = function(){
	var $leftSlot = $("#leftSlotItem"),
		$middleSlot = $("#middleSlotItem"),
		$rightSlot = $("#rightSlotItem");

	if($leftSlot.hasClass("stopped") && $middleSlot.hasClass("stopped") && $rightSlot.hasClass("stopped")){
		checkWin();
	}
};

var main = function(){
	console.log("Hello Vane!");

	//Create variables for the jQuery elements.
	var $leftSlot = $("#leftSlotItem"),
		$middleSlot = $("#middleSlotItem"),
		$rightSlot = $("#rightSlotItem"),
		$leftButton = $("#leftButton"),
		$middleButton = $("#middleButton"),
		$rightButton = $("#rightButton"),
		$stopAllButton = $("#stopAll"),
		$spinButton = $("#spinButton");

	//Handle Spin Button logic.
	$spinButton.on("click", function(){
		console.log("Spin button clicked");

		//Hold the number of milliseconds for each slot's timer.
		var leftTimerVal = $("#setLeftTimer").val(),
			middleTimerVal = $("#setMiddleTimer").val(),
			rightTimerVal = $("#setRightTimer").val();

		//Empty any images currently shown in the slots.
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
		$leftSlot.toggleClass("stopped");
		$middleSlot.toggleClass("stopped");
		$rightSlot.toggleClass("stopped");

		leftTimer = chooseSlotItem($leftSlot, leftTimerVal);
		middleTimer = chooseSlotItem($middleSlot, middleTimerVal);
		rightTimer = chooseSlotItem($rightSlot, rightTimerVal);
	});

	//Handle if the left Stop button was clicked.
	$leftButton.on("click", function(){
		console.log("Left Stop button clicked");
		stopSlot($leftSlot, leftTimer);
		checkAllStopped();
	});

	//Handle if the middle Stop button was clicked.
	$middleButton.on("click", function(){
		console.log("Middle slot button clicked");
		stopSlot($middleSlot, middleTimer);
		checkAllStopped();
	});

	//Handle if the right Stop button was clicked.
	$rightButton.on("click", function(){
		console.log("Right slot button clicked");
		stopSlot($rightSlot, rightTimer);
		checkAllStopped();
	});

	//Handle if the Stop All Slots button was clicked.
	$stopAllButton.on("click", function(){
		console.log("Stop All Slots button clicked");
		stopSlot($leftSlot, leftTimer);
		stopSlot($middleSlot, middleTimer);
		stopSlot($rightSlot, rightTimer);

		checkWin($leftSlot, $middleSlot, $rightSlot);
	});
};


$(document).ready(main);

//t
//fflvd