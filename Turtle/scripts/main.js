var day0 = new Date("2/16/2022");
var today = new Date();

var Difference_In_Time = today.getTime() - day0.getTime();
var dayNum = Math.floor(Difference_In_Time / (1000 * 3600 * 24));

var rand = randFunct(dayNum);

turtleLocation =Math.floor(rand()*5);
turdLocation = Math.floor(rand()*5);
while(turdLocation == turtleLocation) {
    turdLocation = Math.floor(rand()*5);
}

// Random function which utilises the seed a, and returns a float
function randFunct(a) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

// Returns the html object of the row in the target index
function getRow(index) {
    var board = document.getElementById("board");
    var row = 0;
    for (var i = 0; i < board.childNodes.length; i++) {
        var curr= board.childNodes[i];
        if (curr.className == "row") {
            if(row == index) {
                return curr;
            }
            row++;
        }
    }      
    return curr;  
}

// Find the column which the supplied tile is present in
function getColumn(tile) {
    var column = 0;
    for (var i = 0; i < currRow.childNodes.length; i++) {
        var curr= currRow.childNodes[i];
        if (curr.className == "tile") {
            if(curr == tile) {
                return column;
            }
            column++;
        }
    }      
    return curr;  
}

var gameComplete = false;

// Evaluates the status of the game, whether it terminates or continues
// Called from the submit button
function evaluate() {
    if(selected == null) {
        return;
    }
    if (gameComplete) {
        modal.style.display = "block";
        return;
    }
    if (getColumn(selected) == turtleLocation) {
        // win
        selected.style.backgroundColor="green";   
        var img = document.createElement("img");
        img.src = "images/turtle.png";
        img.className= "turtle";
        img.width =selected.width;
        img.height = selected.height;
        selected.appendChild(img);
        setTimeout(() => {modal.style.display = "block"; }, 700);
        gameComplete = true;
        document.getElementById("submit").textContent = "View Results";
        document.getElementById("foundIn").textContent = "Nice! Turtle found in " + (rowIndex + 1) + " guesses.";
        shareText = "Turtle " + dayNum + " found in " + (rowIndex + 1) + " guesses.\n"+ "🟥\n".repeat(rowIndex) + "🐢";
    }
    else if (getColumn(selected) == turdLocation) {
        // lose
        selected.style.backgroundColor="#472e1c";
        var img = document.createElement("img");
        img.src = "images/turd.png";
        img.className= "turd";
        img.width =selected.width;
        img.height = selected.height;
        selected.appendChild(img);
        gameComplete = true;
        setTimeout(() => {modal.style.display = "block"; }, 700);
        document.title = "Turdle";
        document.getElementById("BannerText").textContent = "Turdle";
        document.getElementById("popupImg").src = "images/turd.png";
        document.getElementById("resTitle").textContent = "Turdle Results";
        document.getElementById("submit").textContent = "View Results";
        document.getElementById("foundIn").textContent = "Uh-oh stinky! You found the turd in  " + (rowIndex + 1) + " guesses.";
        shareText = "Gross! Turdle " + dayNum + " found in " + (rowIndex + 1) + " guesses."+ "🟥\n".repeat(rowIndex) + "\n💩";
    } 
    else {
        // Red
        selected.style.backgroundColor= "#bf261f";
        selected = null;
        rowIndex++;
        currRow=getRow(rowIndex);
    }
}

var shareText = "";


var button = document.getElementById("submit");
button.onclick = evaluate;
var selected;
var currRow = getRow(0); 
var rowIndex = 0;

// Selects the clicked on tile if it is a valid selection
function select() {
    if (!(currRow.contains(this)) || gameComplete) {
        return;
    }
    this.style.backgroundColor = "rgba(58,58,60,255)";

    if (selected != null) {
        selected.style.backgroundColor = "#252527";    
    }
    selected = this;
}

document.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener("click", select)
})

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function copyResToClipboard() {
    navigator.clipboard.writeText(shareText);
    var fadeOut = document.getElementById("copiedToClipboard");
    fadeOut.style.display = "block";
    setTimeout(() => {fadeOut.style.display = "none"; }, 1000);

}

var button = document.getElementById("share");
button.onclick = copyResToClipboard;