<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/styles.css" />
   
<script src="https://use.fontawesome.com/ed6bfdf408.js"></script>

    <script src="assets/game.js" defer></script>
  </head>

  <body>
    <div class="darkground hide"></div>
    <div class="controls">
      <h2><span class="title">memory</span></h2>
      <button
        style="float: right; position: absolute; right: 35px"
        class="reset butt"
        onclick="menuclick()"
      >
        Menu
      </button>
      <div class="clicker">
        <button class="reset" onclick="reset()">Restart</button>
        <button class="new" onclick="refresh()">New Game</button>
      </div>
    </div>

    <!-- mobile screen modal -->
    <div class="center mobile">
    <div class="form-body menumodal" style="display: none">
      <div class="two mt">
        <button class="reset" onclick="pageloader()" style="width: 100%">
          Restart
        </button>
       
        <a href="index.php"> <button class="dark">New Game</button></a>
        <button class="dark" onclick="resumegame()">Resume Game</button>
      </div>
    </div>
  </div>
    
     <!-- mobile screen modal -->

    <div class="game">
      <div class="board-container">
        <div class="board" data-dimension="2"></div>

        <div class="win">You won!</div>
      </div>
    </div>

    <div class="stats track">
      <div class="statbox">
        <div class="small muted">Time</div>
        <div class="timer bold"></div>
        <div class="tdisp bold">0:00</div>
      </div>
      <div class="statbox">
        <div class="small muted">Moves</div>
        <div class="moves bold"></div>
        <div class="mdisp bold">0</div>
      </div>
    </div>

    <div class="scoreb">
      <div class="bb">
        <div class="scc"></div>
      </div>
    </div>
  </body>
</html>
