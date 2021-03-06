/*************
* Name: Christopher Dancarlo Danan
* Created: June 25, 2015
* Modified: June 29, 2015
* Project: SlotMachine
* File: app.js
* Purpose: Script will handle all game logic.
*************/

//Stats for the player.
var stats = {
	money: 100,
	wins: 0,
	losses: 0
};

//Amount of money the player has bet.
var bet = 0;

//Images used in the slot machine.
var $azumangaDaioh = $("<img>").addClass("slotImage azumangaDaioh").attr("src", "assets/images/AzumangaDaioh.jpg").attr("alt", "Azumanga Daioh slot image"),
	$toraDora = $("<img>").addClass("slotImage toraDora").attr("src", "assets/images/ToraDora.jpg").attr("alt", "Toradora slot image"),
	$swordArtOnline = $("<img>").addClass("slotImage swordArtOnline").attr("src", "assets/images/SwordArtOnline.jpg").attr("alt", "Sword Art Online slot image"),
	$spiritedAway = $("<img>").addClass("slotImage spiritedAway").attr("src", "assets/images/SpiritedAway.jpg").attr("alt", "Spirited Away slot image"),
	$paranoiaAgent = $("<img>").addClass("slotImage paranoiaAgent").attr("src", "assets/images/ParanoiaAgent.jpg").attr("alt", "Paranoia Agent slot image");

//Sounds used for the game.
var softClick = new Audio("assets/sounds/softClick.mp3"),
	loudClick = new Audio("assets/sounds/loudClick.mp3"),
	lowBeep = new Audio("assets/sounds/lowBeep.mp3");

lowBeep.loop = true;

var slotElements = [$azumangaDaioh, $toraDora, $swordArtOnline, $spiritedAway, $paranoiaAgent],  //Put images into an array for randomized picking.
	slotElementsLength = slotElements.length,
	leftTimer, middleTimer, rightTimer;  //Holds value of each slot's timer in milliseconds.

/*************
* Purpose: Choose a random image from an array and return it.
* Input: None.
* Output: Returns a random image.
*************/
var randomElement = function(){
	//Reference: http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
	var randElement =  slotElements[Math.floor(Math.random() * slotElementsLength)];
	//console.log(randElement);

	//Reference: http://stackoverflow.com/questions/4623265/how-to-add-duplicate-image-on-same-page-with-java-script-after-page-loaded
	randElement = randElement.clone();

	//console.log(randElement);

	return randElement;
};

/*************
* Purpose: Place a random or ordered image into one of the slots of the slot machine.
* Input:
		-slot: One of the slots of the slot machine (left, middle, or right).
		-interval: The amount of time for each slot before it changes images.
		-ordered: If true, then the slots will spin in the order of images in the array.
					If false, then the slots will be given images in a random order.
* Output: Returns the id of the setInterval function to be used later for stopping the slot.
*************/
var chooseSlotItem = function(slot, interval, ordered){
	var counter = Math.floor(Math.random() * slotElementsLength);

	//lowBeep.play();

	if(ordered){
		slotTimer = setInterval(function(){
			slot.empty();
			var element = slotElements[counter % slotElementsLength];
			element = element.clone();
			slot.append(element);
			counter++;
		}, interval);
	} else{
		slotTimer = setInterval(function(){
			slot.empty();
			slot.append(randomElement());
		}, interval);
	}

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
	//Reference for checking if an element exists: https://learn.jquery.com/using-jquery-core/faq/how-do-i-test-whether-an-element-exists/
	//First check if an outcome has already been received. If not, then calculate outcome of the round.
	if(!$("#outcome p").length){
		var $leftImg = $("#leftSlotItem img"),
			$midImg = $("#middleSlotItem img"),
			$rightImg = $("#rightSlotItem img"),
			leftClass, midClass, rightClass;

		lowBeep.pause();

		leftClass = getImgClass($leftImg);
		midClass = getImgClass($midImg);
		rightClass = getImgClass($rightImg);

		if(leftClass === midClass && leftClass === rightClass){
			console.log("WINNER");
			moneyFunction(bet * 2); //Prize is double the bet amount.

			stats.wins++;

			$("#outcome").append($("<p>").text("Winner!"));
		} else{
			console.log("LOSER");
			stats.losses++;
			$("#outcome").append($("<p>").text("No Win"));
		}

		//Re-enable the Spin button.
		$("#spinButton").prop("disabled", false);
	}
};

/*************
* Purpose: Check if all of the slots have stopped winning.
* Input: None.
* Output: Return true if all slots are not moving.
*************/
var checkAllStopped = function(){
	var $leftSlot = $("#leftSlotItem"),
		$middleSlot = $("#middleSlotItem"),
		$rightSlot = $("#rightSlotItem");

	if($leftSlot.hasClass("stopped") && $middleSlot.hasClass("stopped") && $rightSlot.hasClass("stopped")){
		return true;
	}
};

/*************
* Purpose: Alter the value of the player's money.
* Input: 
		-value: the amount to add or subtract to the money counter.
* Output: Alter the value of the money counter.
*************/
var moneyFunction = function(value){
	stats.money += value;

	//Ensure the counter always reads 0 when money runs out - you can't have negative money!
	if(stats.money < 0){
		stats.money = 0;
	}

	$("#moneyCounter").text("$" + stats.money);
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
		$spinButton = $("#spinButton"),
		$moneyCounter = $("<p>").attr("id", "moneyCounter");

	$("#money").append($moneyCounter.text("$" + stats.money));

	//Handle Spin Button logic.
	$spinButton.on("click", function(){
		console.log("Spin button clicked");

		//Reference for getting value of radio button: http://www.tutorialrepublic.com/faq/how-to-get-the-value-of-selected-radio-button-using-jquery.php
		//Get the amount of the bet.
		bet = parseInt($("input[name='betValue']:checked").val());

		loudClick.play();

		if(stats.money >= bet){
			moneyFunction(-bet);

			//Reference for disabling button: http://stackoverflow.com/questions/15122526/disable-button-in-jquery
			//Disable the spin button to prevent multiple timers being set.
			$spinButton.prop("disabled", true);

			//Hold the number of milliseconds for each slot's timer.
			var leftTimerVal = $("#setLeftTimer").val(),
				middleTimerVal = $("#setMiddleTimer").val(),
				rightTimerVal = $("#setRightTimer").val();

			//Reset the slot machine by removing previous slot images and text.
			$leftSlot.empty();
			$middleSlot.empty();
			$rightSlot.empty();
			$("#outcome").empty();

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

			leftTimer = chooseSlotItem($leftSlot, leftTimerVal, true);
			middleTimer = chooseSlotItem($middleSlot, middleTimerVal, true);
			rightTimer = chooseSlotItem($rightSlot, rightTimerVal, true);
		} else{
			$("#outcome").empty().append($("<p>").text("Not enough cash!"));
		}
	});

	//Handle if the left Stop button was clicked.
	$leftButton.on("click", function(){
		console.log("Left Stop button clicked");
		//Reference on how to play sound: http://stackoverflow.com/questions/9419263/playing-audio-with-javascript
		softClick.play();
		stopSlot($leftSlot, leftTimer);
		if(checkAllStopped()){
			checkWin();
		}
	});

	//Handle if the middle Stop button was clicked.
	$middleButton.on("click", function(){
		console.log("Middle slot button clicked");
		softClick.play();
		stopSlot($middleSlot, middleTimer);
		if(checkAllStopped()){
			checkWin();
		}
	});

	//Handle if the right Stop button was clicked.
	$rightButton.on("click", function(){
		console.log("Right slot button clicked");
		softClick.play();
		stopSlot($rightSlot, rightTimer);
		if(checkAllStopped()){
			checkWin();
		}
	});

	//Handle if the Stop All Slots button was clicked.
	$stopAllButton.on("click", function(){
		console.log("Stop All Slots button clicked");
		softClick.play();

		stopSlot($leftSlot, leftTimer);
		stopSlot($middleSlot, middleTimer);
		stopSlot($rightSlot, rightTimer);

		checkWin();
	});
};


$(document).ready(main);

//t
//fflvd