var one = document.getElementById('p1');var two = document.getElementById('p2');var three = document.getElementById('p3');var four = document.getElementById('p4');var five = document.getElementById('p5');var six = document.getElementById('p6');var seven = document.getElementById('p7');var eight = document.getElementById('p8');var nine = document.getElementById('p9');var ten = document.getElementById('p10');
// ^ variables for each tiles Letter
var tiles = document.querySelectorAll("p");
var button = document.getElementById("submit");
var incGuess = document.getElementById("wrongo");
var remainder = document.getElementById("livesLeft");
var counter = 15;
var words = ["lumberjack", "kickboxing", "mozzarella", "chimpanzee", "immobilize", "jaywalkers", "california", "perfection", "volleyball", "technology", "watermelon", "university", "retirement", "friendship", "cinderella", "helicopter", "skateboard", "renovation", "apocalypse", "revolution", "antarctica", "motivation", "rainforest", "girlfriend", "illuminati", "innovation", "tambourine", "adrenaline", "ubiquitous"];
var currentWord = words[Math.floor(Math.random()*words.length)].split("");
//reveal function
function reveal (){
	var pGuess = document.getElementById("pGuess").value;
 
	tiles.forEach(function(element){
		if (pGuess === element.innerText){
			console.log("match");
			element.style.display ="block";
		}
		 else {  
				if(!incGuess.innerText.includes(pGuess)){
					incGuess.innerText = incGuess.innerText + pGuess;
				}
		}
	});
};
function checkAnswer (){
	var result = true;
	tiles.forEach(function(element){
		var Ldisplay = window.getComputedStyle(element,null).getPropertyValue("display");
		if (Ldisplay === "none"){
			result = false;
		}
	});
	if (result) {
		alert("You Win!! Your Prize? Take a spin on the wheel and find out!");
		submit.style.display = "none";
		pGuess.style.display = "none";
		victory.style.display = "block";
		victory.innerText = "VICTORY SCREEEECH!";
	}
};
//populates the tiles with currentWord
function populate () {
	currentWord.forEach(function(letter){
		console.log(letter);
	});
	tiles.forEach(function(element, index){
		console.log("tile", element, "at index", index);
		console.log("should have letter ", currentWord[index]);
		element.innerText = currentWord[index];
	});
}
populate();
//resets input value to blank
pGuess.onclick = function () {
    this.value = '';
};
//gets a new word
function refreshWord(){
return words[Math.floor(Math.random()*words.length)];
}
//gets a new puzzle using button
function rePop(){
	tiles.forEach(function(element, index){
		element.innerText = currentWord[index];
	});
}
function reHide(){
	tiles.forEach(function(element){
		element.style.display = "none";
	});
}
// function newPuzzle2() {
// 	element.
// }
function newPuzzle(){
	currentWord = refreshWord();
	console.log(currentWord);
	rePop();
	reHide();
	incGuess.innerText = "";
	submit.style.display = "inline-block";
	pGuess.style.display = "inline-block";
	victory.style.display = "none";
	attempts();
}
function attempts(){
	var remaining = 15 - incGuess.innerText.length;
	remainder.innerText = "Chances Remaining: " + remaining;

	if (incGuess.innerText.length > 15){
		alert("YOU LOSE");
		submit.style.display = "none";
		pGuess.style.display = "none";
		victory.style.display = "block";
		victory.innerText = "YOU LOSE SUCKA";
	}
}
attempts();
