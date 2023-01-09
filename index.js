// first if...else-statements for Blackjack game 

// conditions
// if less than or equal to 20   -> "Do you want to draw a new card?"
// else if exactly 21 -> "Wohoo! You've goy Blackjack"
// else     -> "You're out of the game"

let firstCard = 10 
let secondCard = 7
let sum = firstCard + secondCard
let hasBlackjack = false
let isAlive = true
let message = ""

if(sum <= 20){
 message = "Do you want to draw a new card?"
}else if(sum === 21){
 message = "Wohoo! You've goy Blackjack"
 hasBlackjack = true
} else {
 message = "You're out of the game"
 isAlive = false
}

console.log(message)

// add a has Blackjack variable
console.log(hasBlackjack)
// add a isAlive variable 
console.log(isAlive)

// boolean conditions (True/ False)
// add a message variable
