let firstCard = 11
let secondCard = 10
let sum = firstCard + secondCard
console.log(sum)

let hasBlackjack = false
let isAlive = true
let message = ""

let messageEl = document.getElementById("message-El")
let cardEl = document.getElementById("card-El")
let sumEl = document.getElementById("sum-El")

function startGame(){

// first if...else-statements for Blackjack game 

// conditions
// if less than or equal to 20   -> "Do you want to draw a new card?"
// else if exactly 21 -> "Blackjack"
// else     -> "You're out of the game"

cardEl.textContent = "Cards: " + firstCard + " " + secondCard 
sumEl.textContent = "Sum: " + sum

if(sum <= 20){
 message = "Do you want to draw a new card?"
}else if(sum === 21){
 message = "You've got Blackjack"
 hasBlackjack = true
} else {
 message = "You're out of the game"
 isAlive = false
}

messageEl.textContent = message

// add a has Blackjack variable
console.log(hasBlackjack)
// add a isAlive variable 
console.log(isAlive)

// boolean conditions (True/ False)
// add a message variable
}
