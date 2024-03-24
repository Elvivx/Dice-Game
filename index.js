let dies = ['','dice/1.png', 'dice/2.png', 'dice/3.png', 'dice/4.png', 'dice/5.png', 'dice/6.png'];


const playersTurn = document.querySelector('.players')
const player1 = document.querySelector('.player-1 .player-score')
const player2 = document.querySelector('.player-2 .player-score')
const currentPlayer1Roll = document.querySelector('.current-score-1 .score')
const currentPlayer2Roll = document.querySelector('.current-score-2 .score')
const dice = document.querySelector('.dice .die')
const reset = document.querySelectorAll('.reset')
const newGame = document.querySelector('.new-game')
const rollDice = document.querySelector('.roll-dice')
const holdDice = document.querySelector('.hold-dice')
const win = document.querySelector('.winner')
const body = document.querySelector('body')


// logic
let playing = false
let score1 = 0
let score2 = 0
let currentScore1 = 0
let currentScore2 = 0 
player1.textContent = score1
player2.textContent = score2
currentPlayer1Roll.textContent = currentScore1
currentPlayer2Roll.textContent = currentScore2

rollDice.onclick = () =>{
    newDie()
    playing = true
   
}
holdDice.onclick  = () =>{
    if(playing ){
        if(currentScore1 == 0 && currentScore2 == 0){
            dice.innerHTML = `<span class="switch">Roll Dice!</span>`
            setTimeout(()=>{dice.innerHTML = `` } ,1000)
        }else{
            if(playersTurn.childNodes[3].classList.contains('active')){
                // player 1
                score1 =  currentScore1 + score1
                currentScore1 = 0
                player1.textContent = score1
                currentPlayer1Roll.textContent = currentScore1
                playersTurn.childNodes[3].classList.remove('active')
                playersTurn.childNodes[7].classList.add('active')
                dice.innerHTML = `<span class="switch">Switch</span>`
                setTimeout(()=>{dice.innerHTML = `` } ,1000)
        
            }else if(playersTurn.childNodes[7].classList.contains('active')){
                // player 2
                score2 =  currentScore2 + score2
                currentScore2 = 0
                player2.textContent = score2
                currentPlayer2Roll.textContent = currentScore2
                playersTurn.childNodes[7].classList.remove('active')
                playersTurn.childNodes[3].classList.add('active')
                dice.innerHTML = `<span class="switch">Switch</span>`
                setTimeout(()=>{dice.innerHTML = `` } ,1000)
            }
        }
        winSound('beep-6-96243.mp3')
    }else{
        dice.innerHTML = `<span class="switch">Roll Dice!</span>`
        setTimeout(()=>{dice.innerHTML = `` } ,1500)
    }
    winner()
}
reset.forEach((btn) =>{
    btn.onclick = () =>{
        playing = false
        score1 = 0
        score2 = 0
        currentScore1 = 0
        currentScore2 = 0
        player1.textContent = score1
        player2.textContent = score2
        currentPlayer1Roll.textContent = currentScore1
        currentPlayer2Roll.textContent = currentScore2
        dice.innerHTML = ''
        win.classList.remove('won')
        playersTurn.childNodes[3].classList.remove('active')
        playersTurn.childNodes[7].classList.remove('active')
        playersTurn.childNodes[3].classList.add('active')
        active()
    }

})
 function newDie(){
    let newDie = Math.floor(Math.random() * 6) + 1 
    dice.innerHTML = `
    <img src="${dies[newDie]}" alt="Die ${newDie}">`

    turns(newDie)
    active()
}
function turns(rolled){
     // check players turn
    if(playersTurn.childNodes[3].classList.contains('active')){
        // player 1
        if(rolled > 1){
            currentScore1 = rolled + currentScore1
            currentPlayer1Roll.textContent = currentScore1
            winSound('dice-142528.mp3')
        }else {
            currentScore1 = 0
            currentPlayer1Roll.textContent = currentScore1
            playersTurn.childNodes[3].classList.remove('active')
            playersTurn.childNodes[7].classList.add('active')
            dice.innerHTML = `<span class="switch">Switch</span>`
            setTimeout(()=>{dice.innerHTML = `` } ,1000)
            
        }
    }
    else if(playersTurn.childNodes[7].classList.contains('active')){
        // player 2
       if(rolled > 1){
           currentScore2 = rolled + currentScore2
           currentPlayer2Roll.textContent = currentScore2
           winSound('dice-142528.mp3')
       }else {
           currentScore2 = 0
           currentPlayer2Roll.textContent = currentScore2
           playersTurn.childNodes[7].classList.remove('active')
           playersTurn.childNodes[3].classList.add('active')
           dice.innerHTML = `<span class="switch">Switch</span>`
           setTimeout(()=>{dice.innerHTML = `` } ,1000)
            
       }
   }
}
function winner(){
    function winSound (sound){
        let wSound = new Audio(`${sound}`)
        wSound.play()
        return
    }

    const playerWon = document.querySelector('.win h1')
    if(score1 >= 100 && score1 > score2 ){
        win.classList.add('won')
        playerWon.textContent = `🎊🔥${player1Name.textContent} won!!!`
        winSound('success-fanfare-trumpets-6185.mp3')
        
    }else if(score2 >= 100 && score2 > score1){
        win.classList.add('won')
        playerWon.textContent = `🎊🔥${player2Name.textContent} won!!!`
        winSound('tadaa-47995.mp3')
    }
    
    active()
}
function winSound (sound){
    let wSound = new Audio(`${sound}`)
    wSound.play()
}

// extras.....
const start = document.querySelector('.start')
const player1Name = document.querySelector('.player-1 h1')
const player2Name = document.querySelector('.player-2 h1')
const getPlayer1Name = document.querySelector('#player-1')
const getPlayer2Name = document.querySelector('#player-2')
const getPlayerNameModal = document.querySelector('.get-players-name')
const rules = document.querySelector('.rules')
const rulesBtn = document.querySelector('.rules button')
function getName(){
    player1Name.textContent = getPlayer1Name.value
    player2Name.textContent = getPlayer2Name.value 
}
start.onclick =(e)=>{
    const input1 = document.querySelector('#player-1')
    const input2 = document.querySelector('#player-2')

    if((input1.value == '') && (input2.value == '')){
        input1.nextElementSibling.classList.remove('required')
        input2.nextElementSibling.classList.remove('required')

        input1.nextElementSibling.classList.add('required')
        input2.nextElementSibling.classList.add('required')
    }
    else if((input1.value !== '') && (input2.value == '')){
        input1.nextElementSibling.classList.remove('required')
        input2.nextElementSibling.classList.remove('required')

        input2.nextElementSibling.classList.add('required')
        console.log('21')
    }
    else if((input1.value == '') && (input2.value !== '')){
        input1.nextElementSibling.classList.remove('required')
        input2.nextElementSibling.classList.remove('required')

        input1.nextElementSibling.classList.add('required')
        console.log('23')
    }
    else {
        e.preventDefault()
        getName()
        getPlayerNameModal.classList.add('got-name')
        playersTurn.childNodes[3].classList.remove('active')
        playersTurn.childNodes[7].classList.remove('active')
        playersTurn.childNodes[3].classList.add('active')
        input1.nextElementSibling.classList.remove('required')
        input2.nextElementSibling.classList.remove('required')
        active()
    }
}
newGame.onclick = ()=>{
    playing = false
    score1 = 0
    score2 = 0
    currentScore1 = 0
    currentScore2 = 0
    player1.textContent = score1
    player2.textContent = score2
    currentPlayer1Roll.textContent = currentScore1
    currentPlayer2Roll.textContent = currentScore2
    dice.innerHTML = ''
    win.classList.remove('won')
    getPlayerNameModal.classList.remove('got-name')
    active()
}
rulesBtn.onclick = () =>{
    rules.style.display = 'none'
}
function active(){
    if(playersTurn.childNodes[3].classList.contains('active')){

        // remove classes from previous active
        playersTurn.childNodes[7].childNodes[3].classList.remove('current-score-active')
        player2.classList.remove('player-score-active')

        // add classes to current active
        playersTurn.childNodes[3].childNodes[3].classList.add('current-score-active')
        player1.classList.add('player-score-active')

    }else if(playersTurn.childNodes[7].classList.contains('active')){

        // remove classes from previous active
        playersTurn.childNodes[3].childNodes[3].classList.remove('current-score-active')
        player1.classList.remove('player-score-active')

        // add classes to current active
        playersTurn.childNodes[7].childNodes[3].classList.add('current-score-active')
        player2.classList.add('player-score-active')
    }
}

