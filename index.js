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

const card_img = [
     {value:1 , img:'../deckOfCards/ace_of_clubs.png'},
     {value:1  , img:'../deckOfCards/ace_of_diamonds.png'},
     {value:1  , img:'../deckOfCards/ace_of_hearts.png'},
     {value:1  , img:'../deckOfCards/ace_of_spades.png'},
     {value:2  , img:'../deckOfCards/2_of_clubs.png'},
     {value:2  , img:'../deckOfCards/2_of_diamonds.png'},
     {value:2  , img:'../deckOfCards/2_of_hearts.png'},
     {value:2  , img:'../deckOfCards/2_of_spades.png'},
     {value:3  , img:'../deckOfCards/3_of_clubs.png'},
     {value:3  , img:'../deckOfCards/3_of_diamonds.png'},
     {value:3  , img:'../deckOfCards/3_of_hearts.png'},
     {value:3  , img:'../deckOfCards/3_of_spades.png'},
     {value:4  , img:'../deckOfCards/4_of_clubs.png'},
     {value:4  , img:'../deckOfCards/4_of_diamonds.png'},
     {value:4  , img:'../deckOfCards/4_of_hearts.png'},
     {value:4  , img:'../deckOfCards/4_of_spades.png'},
     {value:5  , img:'../deckOfCards/5_of_clubs.png'},
     {value:5  , img:'../deckOfCards/5_of_diamonds.png'},
     {value:5  , img:'../deckOfCards/5_of_hearts.png'},
     {value:5  , img:'../deckOfCards/5_of_spades.png'},
     {value:6  , img:'../deckOfCards/6_of_clubs.png'},
     {value:6  , img:'../deckOfCards/6_of_diamonds.png'},
     {value:6  , img:'../deckOfCards/6_of_hearts.png'},
     {value:6  , img:'../deckOfCards/6_of_spades.png'},
     {value:7  , img:'../deckOfCards/7_of_clubs.png'},
     {value:7  , img:'../deckOfCards/7_of_diamonds.png'},
     {value:7  , img:'../deckOfCards/7_of_hearts.png'},
     {value:7  , img:'../deckOfCards/7_of_spades.png'},
     {value:8  , img:'../deckOfCards/8_of_clubs.png'},
     {value:8  , img:'../deckOfCards/8_of_diamonds.png'},
     {value:8  , img:'../deckOfCards/8_of_hearts.png'},
     {value:8  , img:'../deckOfCards/8_of_spades.png'},
     {value:9  , img:'../deckOfCards/9_of_clubs.png'},
     {value:9  , img:'../deckOfCards/9_of_diamonds.png'},
     {value:9  , img:'../deckOfCards/9_of_hearts.png'},
     {value:9  , img:'../deckOfCards/9_of_spades.png'},
     {value:10 , img:'../deckOfCards/10_of_clubs.png' },
     {value:10 , img:'../deckOfCards/10_of_diamonds.png' },
     {value:10 , img:'../deckOfCards/10_of_hearts.png' },
     {value:10 , img:'../deckOfCards/10_of_spades.png' },
     {value:10 , img:'../deckOfCards/jack_of_clubs.png' },
     {value:10 , img:'../deckOfCards/jack_of_diamonds.png' },
     {value:10 , img:'../deckOfCards/jack_of_hearts.png' },
     {value:10 , img:'../deckOfCards/jack_of_spades.png' },
     {value:10 , img:'../deckOfCards/queen_of_clubs.png' },
     {value:10 , img:'../deckOfCards/queen_of_diamonds.png' },
     {value:10 , img:'../deckOfCards/queen_of_hearts.png' },
     {value:10 , img:'../deckOfCards/queen_of_spades.png' },
     {value:10 , img:'../deckOfCards/king_of_clubs.png' },
     {value:10 , img:'../deckOfCards/king_of_diamonds.png' },
     {value:10 , img:'../deckOfCards/king_of_hearts.png' },
     {value:10 , img:'../deckOfCards/king_of_spades.png' },
     {value:11 , img:'../deckOfCards/aces_of_clubs.png' },
     {value:11 , img:'../deckOfCards/aces_of_diamonds.png' },
     {value:11 , img:'../deckOfCards/aces_of_hearts.png' },
     {value:11 , img:'../deckOfCards/aces_of_spades.png' }
]

console.log(card_img[Math.floor(Math.random()*52)])

function randomcard_img(){
     let selectCard = card_img[Math.floor(Math.random()*52)]
     let firstDealerCard = document.getElementById("")
}

function startGame(){
document.getElementById("start-btn").style.display = 'none'
document.getElementById("gameOptions").style.display = 'block'
document.getElementById("dealerCard").style.display = 'block'
cardEl.textContent = "Cards: " + cards 
sumEl.textContent = "Sum: " + sum 

if(sum <= 20){
 message = "Do you want to draw a new card?"
 document.getElementById("extra-btn").style.display = 'block' 
}else if(sum === 21){
 message = "You've got Blackjack"
 document.getElementById("extra-btn").style.display = 'none'
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

// how do loops work ?
//          START         FINISH   STEP SIZE
// for (let coutn = 0; count < 11; count += 1){
     // what to do....
     // example: console.log(count)
     //          age -= 1
//}