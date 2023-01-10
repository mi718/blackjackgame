let firstCard = Math.floor(Math.random()*11)+1
let secondCard = Math.floor(Math.random()*11)+1
let cards = [firstCard, secondCard]
let sum = cards.reduce((prev,curr)=>prev + curr, 0)
let message = ""
let messageEl = document.getElementById("message-El")
let cardEl = document.getElementById("card-El")
let sumEl = document.getElementById("sum-El")

function newCard(){
 let card =  Math.floor(Math.random()*11)+1
 cards.push(card)
 sum = cards.reduce((prev,curr)=>prev + curr, 0)
 startGame()
 document.getElementById("newCard").style.display = 'none'  
}

function startGame(){
document.getElementById("start-btn").style.display = 'none'
document.getElementById("gameOptions").style.display = 'block'
cardEl.textContent = "Cards: " + cards 
sumEl.textContent = "Sum: " + sum

if(sum <= 20){
 message = "Do you want to draw a new card?"
 document.getElementById("extra-btn").style.display = 'block'
}else if(sum === 21){
 message = "You've got Blackjack"
 document.getElementById("newGame-btn").style.display = 'block'
} else {
 message = "You're out of the game"
 document.getElementById("start-btn").style.display = 'none'
 document.getElementById("new-El").style.display = 'none'
 document.getElementById("exit-btn").style.display = 'block'
}
messageEl.textContent = message
}

function exitGame(){
 // reload page code (!!) 
 location.reload();
}

function start(url) {
 let windows = open(url);
}