//getting game setup values from URL
const querystring = window.location.search;
const urlParams = new URLSearchParams(querystring);

let no_players = urlParams.get('players')
let type = urlParams.get('type')
let grid = urlParams.get('grid')

//setting game variables
let control = 1
var playScore = [0,0,0,0]

var playScores = [
    { name : "Player 1" , score : 0 }, 
    { name : "Player 2" , score : 0 }, 
    { name : "Player 3" , score : 0 }, 
    { name : "Player 4" , score : 0 }

]

//seeting css selectors values
const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    timdisp: document.querySelector('.tdisp'),
    movdisp: document.querySelector('.mdisp'),
    scoreboard: document.querySelector('.scoreb'),
    statboard: document.querySelector('.track'),
    win: document.querySelector('.win')
}
 
const player = {
    currentPlayer: 1,
    
}

const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null
}

//reload page on reset
function pageloader(){
    return location.href = "index1.php?players="+no_players+"&type="+type+"&grid="+grid ;
  }

//navigate back to start page
function refresh(){
    return location.href = "index.php"
}

//hide score board for solo
if(no_players == 1){
    selectors.scoreboard.classList.add('hide')
    selectors.statboard.classList.add('show1')
   
}else{
    selectors.statboard.classList.add('hide')
}

//shuffling selected type in array
const typeshuffle = array => {
    const arrayclone = [...array]

    for (let index = arrayclone.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1))
        const original = arrayclone[index]

        arrayclone[index] = arrayclone[randomIndex]
        arrayclone[randomIndex] = original
    }

    return arrayclone
}

const pickRandom = (array, items) => {
    const arrayclone = [...array]
    const randomselected = []

    for (let index = 0; index < items; index++) {
        const randomIndex = Math.floor(Math.random() * arrayclone.length)
        
        randomselected.push(arrayclone[randomIndex])
        arrayclone.splice(randomIndex, 1)
    }

    return randomselected
   
}

 //starting off game
const generateGame = () => {  
    const dimensions = grid
   
    let icons = ['&#xf2b9;','&#xf042;','&#xf2a3;','&#xf101;','&#xf039;','&#xf0f9;','&#xf2bb;','&#xf069;','&#xf24e;','&#xf240;','&#xf05e;','&#xf2cd;','&#xf0f3;','&#xf1e2;','&#xf1ec;','&#xf133;','&#xf137;','&#xf138;','&#xf139;','&#xf13a;']
    let number = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10','11', '12', '13', '14', '15' ,'16','17', '18', '19', '20', '21']
    let picks = ""

    if(type === "number"){
        picks = pickRandom(number, (dimensions * dimensions) / 2) 
 
    }
    if(type === "icons"){
         picks = pickRandom(icons, (dimensions * dimensions) / 2) 
      
    }
    
    
    const items = typeshuffle([...picks, ...picks])
    const cards = `
        <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
            ${items.map(item => `
                <div class="card">
                    <div class="card-front"></div> 
                    <div class=" card-back fa ">${item}</div>
                </div>
            `).join('')}
       </div>
    `
    
    const parser = new DOMParser().parseFromString(cards, 'text/html')

    selectors.board.replaceWith(parser.querySelector('.board'))

{/* <div class="card-back ">${item}</div> */}

}

// static scorebord generator
const initialScoreboard = () => {  
    const dimensions = grid
    let one = playScores[0].score
    let two = playScores[1].score
    let three = playScores[2].score
    let four = playScores[3].score

    let pop = [one,two,three,four]
    var html = "";
    
     for(  var xx = 1 ; xx <= no_players ; xx++)
   
    
     html = html + `    <div class="cover" > 
     <div  class="triangle "> </div>
     <div class="scorebox">

    <div  class="sname">P ${[xx]} </div>
     <div  class="fname">Player ${[xx]} </div>
     <div class=" bold"> ${pop[xx - 1 ]}</div>
     
     </div>

     <div class="scoretext" >
     <div  class="highlght ">CURRENT TURN</div>
     </div>
     </div>
    
    
     
     ` ;
    

     const sccard = document.querySelector(".scc");
     sccard.innerHTML = html ;
  
     //active player highlighter
     const active = document.querySelectorAll('.scorebox')
  
     active[(control-1)].classList.add('activeplayer')
    
     //active player scoretext
     const current = document.querySelectorAll('.scoretext')
  
     current[(control-1)].classList.add('show')

      //active player triangle
      const triangle = document.querySelectorAll('.triangle')
  
      triangle[0].classList.add('showcolor')

}


const generatescoreboard = () => {  
    const dimensions = grid
    let one = playScores[0].score
    let two = playScores[1].score
    let three = playScores[2].score
    let four = playScores[3].score

    let pop = [one,two,three,four]
    var html = "";

    
     for(  var xx = 1 ; xx <= no_players ; xx++)
   
     html = html +`<div class="cover" > 
     <div  class="triangle"> </div>
     <div class="scorebox">
      
     <div  class="sname">P ${[xx]} </div>
     <div  class="fname">Player ${[xx]} </div>
     <div class=" bold"> ${pop[xx - 1 ]}</div>
     
     </div>

     <div class="scoretext" >
     <div  class="highlght">CURRENT TURN</div>
     </div>
     </div>   
     ` ;
    

   const sccard = document.querySelector(".scc");
   sccard.innerHTML = html ;

   //active player highlighter
   const active = document.querySelectorAll('.scorebox')

   active[(control-1)].classList.add('activeplayer')
  
   //active player highlighter
   const current = document.querySelectorAll('.scoretext')

   current[(control-1)].classList.add('show')

    //active player triangle
    const triangle = document.querySelectorAll('.triangle')
  
    triangle[(control-1)].classList.add('showcolor')


}

                             
const startGame = () => {
    state.gameStarted = true
    selectors.timdisp.classList.add('hide')
    selectors.movdisp.classList.add('hide')

    state.loop = setInterval(() => {
        state.totalTime++

        selectors.moves.innerText = `${state.totalFlips} `
        selectors.timer.innerText = `${Math.floor(state.totalTime / 60) + ':' +Math.floor(state.totalTime % 60) }`
    }, 1000)
}

function menuclick(){
    const darkbacground = document.querySelector(".darkground").classList.add('show');
    const modal = document.querySelector(".menumodal").classList.add('show');             
}
function resumegame(){
    const darkbacground = document.querySelector(".darkground").classList.remove('show');
    const modal = document.querySelector(".menumodal").classList.remove('show'); 
    // let ppp = state.totalTime
    // state.totalTime = ppp
    

}
//flipping card backwards
const flipBackCards = () => {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped')
    })

    state.flippedCards = 0
}
let click = false

const flipCard = card => {
    state.flippedCards++
    state.totalFlips++

    if (!state.gameStarted) {
        startGame()
    }

    if (state.flippedCards <= 2) {
        card.classList.add('flipped')
    }

    if (state.flippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)')

        if (flippedCards[0].innerText === flippedCards[1].innerText) {
            flippedCards[0].classList.add('matched')   
            flippedCards[1].classList.add('matched')

            let val = control-1
            if(val === -1){
                val = 0
            }
            let jj = playScores[val].score
            playScores[val].score = jj + 1
        }

        setTimeout(() => {
            flipBackCards()
        }, 400)
      
    }

      // twice click calculator
      if(control < no_players){
        if(click === true){
            control++
        }
        click = !click
    }
    else{
        if(click === true){
            control = 1
        }
        click = !click
      
    }


    // If there are no more cards that we can flip, we won the game
    if (!document.querySelectorAll('.card:not(.flipped)').length) {
        setTimeout(() => {
            
            var playSc = playScores.sort((a ,b) =>b.score - a.score)

            selectors.boardContainer.classList.add('flipped')
          
            //deciding which modal to show wether solo or multiple players
            if(no_players == 1){
                const darkbacground = document.querySelector(".darkground").classList.add('show');
                
                const show = selectors.win.innerHTML = `
              
                <div class="">
    
                    <div class="form-body">
                   
                      <div class="">
                      <div class="hide"><h4><span class="bold center info  fist fist1 hide"> </span></h4> </div>
                        <h1><span class="bolder center info "> </span>You did it!</h1>
                      </div>
                      <div class="">
                        <h3>
                          <span class="center muted ">Game over! Here's how you got on...</span>
                        </h3>
                      </div>
                   
              
                    <div class="">
                      <div class="list ">
                      <div class="muted" >Time Elapsed</div>
                        <div class="bolder">${Math.floor(state.totalTime / 60) + ':' +Math.floor(state.totalTime % 60) }</div>
                      </div>
                    </div>

                    <div class="">
                    <div class="list ">
                    <div class="muted" >Moves Taken</div>
                      <div class="bolder">${state.totalFlips} Moves</div>
                    </div>
                  </div>
                   
                    <div class="two mt">
                      <button class="reset" onclick="pageloader()" >Restart</button>
                      <a href="index.php"> <button class="dark" >Set Up New Game</button></a>
                    </div>
                  </div>
                  </div>
    
                `
            }else{
            const darkbacground = document.querySelector(".darkground").classList.add('show');    
            const show = selectors.win.innerHTML = `
              
            <div class="">

                <div class="form-body">
                
                    <h5><span class="bold center info"> </span></h5>
                 
                    <h3>
                      <span class="center muted">Game over! Here are the results...</span>
                    </h3>
          
                <div class="">
                  <div class="list fist">
                  <div class="flexy" ><div>${playScores[0].name}</div><div class="fist1 mm">(Winner!)</div></div>
                    <div class="bolder">${playScores[0].score} Pairs</div>
                  </div>
                </div>
                <div class="">
                <div class="list sec">
                  <div class="flexy" ><div>${playScores[1].name}</div><div class="sec1 mm">(Winner!)</div></div>
                  <div class="bolder">${playScores[1].score} Pairs</div>
                </div>
              </div>
              <div class="">
              <div class="list thrd">
              <div class="flexy" ><div>${playScores[2].name}</div><div class="thrd1 mm">(Winner!)</div></div>
                <div class="bolder">${playScores[2].score} Pairs</div>
              </div>
            </div>
            <div class="">
            <div class="list frt">
            <div class="flexy" ><div>${playScores[3].name}</div><div class="frt1 mm">(Winner!)</div></div>
              <div class="bolder">${playScores[3].score} Pairs</div>
            </div>
          </div>
                <div class="two mt">
                  <button class="reset" onclick="pageloader()" >Restart</button>
                  <a href="index.php"> <button class="dark" >Set Up New Game</button></a>
                </div>
              </div>
              </div>

            `
            }

            //displaying limited number of players accordind to no of players
            if(no_players==2){
            
                const changecolors7 =  document.querySelector('.thrd').classList.add('hide')
                const changecolor84 =  document.querySelector('.frt').classList.add('hide')
            }
            if(no_players==3){
            
                const changecolor84 =  document.querySelector('.frt').classList.add('hide')
            }
            
           
           // deciding the winner being announced
            var won = playScores[0].name +" "+ "Wins!";
            if(playScores[0].score === playScores[1].score === playScores[2].score === playScores[3].score){
               console.log("frist")
                document.querySelector('.info').innerText = "It a tie!";
                const changecolors1 =  document.querySelector('.fist').classList.add('wincolor')
                const changecolors2 =  document.querySelector('.sec').classList.add('wincolor')
                const changecolors3 =  document.querySelector('.thrd').classList.add('wincolor')
                const changecolors4 =  document.querySelector('.frt').classList.add('wincolor')
                const changecolors5 =  document.querySelector('.fist1').classList.add('winr')
                const changecolors6 =  document.querySelector('.sec1').classList.add('winr')
                const changecolors7 =  document.querySelector('.thrd1').classList.add('winr')
                const changecolor84 =  document.querySelector('.frt1').classList.add('winr')
            }      
               
                
            if(playScores[0].score === playScores[1].score === playScores[2].score ){
            console.log("sec")
                document.querySelector('.info').innerText = "It a tie!";
                const changecolors1 =  document.querySelector('.fist').classList.add('wincolor')
                const changecolors2 =  document.querySelector('.sec').classList.add('wincolor')
                const changecolors3 =  document.querySelector('.thrd').classList.add('wincolor')
                const changecolors4 =  document.querySelector('.fist1').classList.add('winr')
                const changecolors5 =  document.querySelector('.sec1').classList.add('winr')
                const changecolors6 =  document.querySelector('.thrd1').classList.add('winr')
    
                    
            }  

            if(playScores[0].score === playScores[1].score){
                 document.querySelector('.info').innerText = "It a tie!"  
                 console.log("third")
                 const changecolors1 =  document.querySelector('.fist').classList.add('wincolor')
                 const changecolors2 =  document.querySelector('.sec').classList.add('wincolor')
                 const changecolors4 =  document.querySelector('.fist1').classList.add('winr')
                 const changecolors5 =  document.querySelector('.sec1').classList.add('winr')
                }
            else{ document.querySelector('.info').innerText = won;  console.log("fourth");
            const changecolors1 =  document.querySelector('.fist').classList.add('wincolor')
            const changecolors4 =  document.querySelector('.fist1').classList.add('winr')
            }
                
            //stopping the time 

            clearInterval(state.loop)
           
        }, 1000)
    }
}

//restarting the game
function reset(){ 
    generateGame()   
     playScores = [
        { name : "Player 1" , score : 0 }, 
        { name : "Player 2" , score : 0 }, 
        { name : "Player 3" , score : 0 }, 
        { name : "Player 4" , score : 0 }
    
    ];
        clearInterval(state.loop) 
        clearInterval(state.totalTime)
        state.gameStarted= false
        state.flippedCards= 0
        state.totalFlips= 0
        state.totalTime = 0
        state.loop = 0
        control = 1
    
        //  selectors.start.classList.remove('disabled') 
         const flippedCards =  document.querySelectorAll(".card").forEach((card) => {
            card.classList.remove("matched");
          });
          
        const flippedCard =  document.querySelectorAll(".card").forEach((card) => {
            card.classList.remove("flipped");
          });

           //hidin afer modal shows up
           const board3 =  document.querySelector('.win').classList.add('hide')
        
        initialScoreboard()

        pageloader()        
}

//listening for onclick events from page
const attachEventListeners = () => {

    document.addEventListener('click', event => {
        const eventTarget = event.target
        const eventParent = eventTarget.parentElement
        
    console.log(control)
    console.log(playScores )
    console.log(playScores[(control-1)].name )


        if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {
            flipCard(eventParent)
            generatescoreboard()
        } 
        // else if (eventTarget.nodeName === 'BUTTON' && !eventTarget.className.includes('disabled')) {
        //     startGame()
        // } 
       
    })
}

generateGame()
attachEventListeners()
initialScoreboard()
