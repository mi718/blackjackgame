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

let firstCard = card_img[Math.floor(Math.random()*52)]
let secondCard = card_img[Math.floor(Math.random()*52)]
let cardsIMG = [firstCard.img, secondCard.img]
let cards = [firstCard.value, secondCard.value]
let sum = cards.reduce((prev,curr)=>prev + curr, 0)
let message = ""
let messageEl = document.getElementById("message-El")
let cardEl1 = document.getElementById("firstCardAsImg")
let cardEl2 = document.getElementById("secondCardAsImg")
let sumEl = document.getElementById("sum-El")
let startCredits = 400

document.getElementById("start-btn").disabled = true;


function startGame(){
     document.getElementById("start-btn").style.display = 'none'
     document.getElementById("gameOptions").style.display = 'block'
     document.getElementById("dealerCard").style.display = 'block'

     cardDealer()
     document.getElementById("firstCardAsImg").src = firstCard.img
     document.getElementById("secondCardAsImg").src = secondCard.img
     sumEl.textContent = "Sum: " + sum 

     if(sum <= 20){
          message = "Do you want to draw a new card?"
          document.getElementById("extra-btn").style.display = 'block'}
     else if(sum === 21){
          message = "You've got Blackjack" 
          document.getElementById("extra-btn").style.display = 'none'
          document.getElementById("mainInfo").style.display = 'none'
          document.getElementById("winText").style.display = 'block'
     } else {
          message = "You're out of the game"
          document.getElementById("mainInfo").style.display = 'none'
          document.getElementById("stand-EL").style.display = 'none'
          document.getElementById("new-El").style.display = 'none'
          document.getElementById("loseText").style.display = 'block'
          lostC.textContent = myBetTotal
          remainC.textContent = 400 - myBetTotal
}
     messageEl.textContent = message
}

function newCard(){
     let card = card_img[Math.floor(Math.random()*52)]
     cards.push(card.value)
     cardsIMG.push(card.img)
     let cardPath = card.img
     sum = cards.reduce((prev,curr)=>prev + curr, 0)
     startGame()
     //document.getElementById("cardsImg").innerHTML = '<img src= cardPath alt="image">';
     var img = document.createElement("img");
          img.setAttribute("src", cardPath);
          img.setAttribute("alt","image");
     document.getElementById("cardsImg").appendChild(img);

     //let image = document.createElement("img");
          //img.src = card.img;
          //img.alt = "image";
     //document.getElementById("cardsImg").appendChild(image);
}

function start() {
     let windows = open("../html/gameBJ.html");
}

let firstCardDealer = card_img[Math.floor(Math.random()*52)]
let totalDealerCardsIMG = [firstCardDealer.img]
let totalDealerCards = [firstCardDealer.value]
let numberDealer = document.getElementById('dealerCard')
let sumDealerID = document.getElementById('sumDealer')

function cardDealer(){
     numberDealer.textContent = firstCardDealer.value + " , ?"
}

function stand(){
     messageEl.textContent = "This is your final sum"
     document.getElementById("new-El").style.display = 'none'
     document.getElementById("stand-EL").style.display = 'none'
     document.getElementById("secondCardDealerM").style.display = 'block'
     document.getElementById("sum-El").style.backgroundColor = 'goldenrod'
}

let secondCardDealer = card_img[Math.floor(Math.random()*52)]
let totalSumDealer = firstCardDealer.value + secondCardDealer.value
let sumDealer = totalDealerCards.reduce((prev,curr)=>prev + curr, 0)
let userCredit = document.getElementById('credits')
let lostC =  document.getElementById("lostC")
let remainC =  document.getElementById("remainC")


function dealerTurn(){
     document.getElementById("leave-btn").style.display = 'block'
     document.getElementById("eye-btn").style.display = 'none'
     setTimeout(() => {
          totalDealerCards.push(secondCardDealer.value)
          numberDealer.textContent = firstCardDealer.value + ' , ' + secondCardDealer.value
          sumDealerID.textContent = totalSumDealer
          function nextStep(){
               setTimeout(() => {
                    if(totalSumDealer <  17){
                         let newDeaelerCard = card_img[Math.floor(Math.random()*52)]
                         totalDealerCards.push(newDeaelerCard.value)
                         numberDealer.textContent = totalDealerCards.value
                         sumDealer = totalDealerCards.reduce((prev,curr)=>prev + curr, 0)
                         sumDealerID.textContent = sumDealer} 
                    else{results()}
               }, 500);
          }    
     nextStep()

     function results(){
          setTimeout(() => {
               document.getElementById("actionInital").style.display = 'none'
               document.getElementById("calcText").style.display = 'block'
          }, 1000);
     }
     
     results()
     function result_Text(){
          setTimeout(() => {
               sumDealer = totalDealerCards.reduce((prev,curr)=>prev + curr, 0)
               sum = cards.reduce((prev,curr)=>prev + curr, 0)
               document.getElementById("calcText").style.display = 'none'
               if(sumDealer > 21){
                    document.getElementById("winText").style.display = 'block'
               }
               else if (sumDealer < sum){
                    document.getElementById("winText").style.display = 'block'
               }
               else if (sum < sumDealer){
                    document.getElementById("loseText").style.display = 'block'
                    lostC.textContent = myBetTotal
                    remainC.textContent = 400 - myBetTotal

               } 
               else {
                    document.getElementById("tieText").style.display = 'block'
               }
          }, 2000);
     }
     result_Text()    

}, 500);}

let betTotal = 400
let myBetTotal = 0

function alert(){
     swal.fire({
     content: "input",
     icon: 'question',
     allowOutsideClick: false,
     allowEscapeKey: false,
     allowEnterKey: true,
     stopKeydownPropagation: false,
     width: '20%',
     title: "How much you wish to bet?",
     text: 'to continue please enter an amount',
     input: 'number',
     inputPlaceholder: 'amount...',
     confirmButtonText: 'Bet',
     footer: 'made by: Micael Staeubli',
     })
.then((value) => {
     let myTotalcount = betTotal - Number(value.value)
     userCredit.textContent = myTotalcount
     myBetTotal = parseInt(value.value)
     // with 'JSON.stringify(value);' i was able to see the elemenets inside the object value
     disableButtonBet()
     document.getElementById('yourBetInfo').style.display = 'block'
     betSum()
     document.getElementById("start-btn").disabled = false;
     document.getElementById("start-btn").style.backgroundColor = "goldenrod"


});
}

let storedBetTotal = localStorage.getItem("myTotalcount");

function disableButtonBet() {
  document.getElementById("bet-btn").disabled = true;
}

let myBet = document.getElementById('betAmount')

function betSum(){
     myBet.textContent = myBetTotal
}

function takeMoney(){
     myBetTotal *2
     price = betTotal + myBetTotal
     userCredit.textContent = price
     myBet.textContent = 0
     document.getElementById('takeMoney-btn').style.display = 'none'
}

function exitGame(){
     location.reload()
     return false
}

function leave(){
     document.getElementById('leaveGame').style.backgroundColor = '#daa52044'
     setTimeout(() => {
          exitGame()
     }, 500);
}
