const Player = (name, mark, turn, npc, div) => {

    const checkIfWin = (gameboard) => {

        if(gameboard[0].mark === mark && gameboard[4].mark === mark && gameboard[8].mark === mark ||
           gameboard[2].mark === mark && gameboard[4].mark === mark && gameboard[6].mark === mark) {
            return true;
        } // Diagonal Check

        if(gameboard[0].mark === mark && gameboard[3].mark === mark && gameboard[6].mark === mark ||
           gameboard[1].mark === mark && gameboard[4].mark === mark && gameboard[7].mark === mark ||
           gameboard[2].mark === mark && gameboard[5].mark === mark && gameboard[8].mark === mark) {
            return true;
        } // Vertical check

        if(gameboard[0].mark === mark && gameboard[1].mark === mark && gameboard[2].mark === mark ||
           gameboard[3].mark === mark && gameboard[4].mark === mark && gameboard[5].mark === mark ||
           gameboard[6].mark === mark && gameboard[7].mark === mark && gameboard[8].mark === mark) {
            return true;
        } // Horizontal check


    }

    return {
        name,
        mark,
        turn,
        npc,
        checkIfWin,
        div
    }
}

const game = (() => {

    const form = document.querySelector("form");

    const firstPlayer = document.querySelector("#first-player");
    const secondPlayer = document.querySelector("#second-player");
    const aiSelection = document.querySelector("#choose-ai");
    const gameBoardElement = document.querySelector(".gameboard");
    const gameElement = document.querySelector(".game");
    const buttonElements = document.querySelector(".buttons");
    const resetButton = document.querySelector(".reset");

    const gameEndContainer = document.querySelector(".game-end");
    const displayResultContainer = document.createElement("div");
    const displayResult = document.createElement("h1");
    displayResult.style.color = 'black';

    const players = document.querySelector(".players");

    const firstPlayerElement = document.createElement("h2");
    const secondPlayerElement = document.createElement("h2");

    let playerFirst;
    let playerSecond;
    let aiPlayer;
    let winner = false;
    let movesCounter = 0;

    let gameBoard = [];

    function onRun() {
        _aiSelectionEvent();
        _getPlayerData();
        _addEventToGameButtons();
    }

    function _getPlayerData() {
        form.addEventListener("submit", e => {
            if(aiSelection.checked === true) {
                _createPlayers(firstPlayer, "npcTrueFuckYouPlayer69");
                console.log("Hehe")
            } else {
                _createPlayers(firstPlayer.value, secondPlayer.value);
            }

            _updateDisplay();
            _createGameBoard();
            _addEventToGameBoard();

            e.preventDefault();
        });
    }

    function _updateDisplay() {
        form.style.display = "none";
        buttonElements.style.display = "block";
        gameElement.style.display = "grid";
    }

    function _createGameBoard() {
        for(let i = 0; 9 > i; i++) {
            const cell = document.createElement("div");
            cell.className = "grid-cell"
            cell.dataset.id = `${i}`;

            gameBoard.push({mark: undefined, dataid: i});

            gameBoardElement.append(cell);
        }
    }

    function _addEventToGameButtons() {
        resetButton.addEventListener("click", e => {
            for(let i = 0; gameBoard.length > i; i++) {
                if(gameBoard[i].mark !== undefined) {
                    gameBoard[i].mark = undefined;
                }
            }

            const gameCells = document.querySelectorAll(".grid-cell");

            for(const cell of gameCells) {
                cell.textContent = '';
            }
        })
    }

    function _addEventToGameBoard() {
        const gameCells = document.querySelectorAll(".grid-cell");

        firstPlayerElement.classList.toggle("current-turn");

        gameCells.forEach(gameCell => {
            gameCell.addEventListener("click", e => _addEventToGameCells(e));
        })
    }

    function _addEventToGameCells(element) {
        let number = element.target.getAttribute("data-id");

        if(gameBoard[number].mark === undefined) {
            if(playerFirst.turn === true) {
                element.target.textContent = `${playerFirst.mark}`;
                gameBoard[number].mark = `${playerFirst.mark}`;

                movesCounter += 1;

                playerFirst.turn = false;
                playerSecond.turn = true;
                
                _checkWinner(playerFirst, playerSecond);

            } else if(playerSecond.turn === true) {
                element.target.textContent = `${playerSecond.mark}`;
                gameBoard[number].mark = `${playerSecond.mark}`;

                movesCounter += 1;

                playerSecond.turn = false;
                playerFirst.turn = true;

                _checkWinner(playerSecond, playerFirst);
            }
        }
    }

    function _addPlayerNamesToGameboard() {
        firstPlayerElement.textContent = playerFirst.name;
        secondPlayerElement.textContent = playerSecond.name;

        players.append(firstPlayerElement, secondPlayerElement);
    }

    function _checkWinner(player, player2) {
        let result = player.checkIfWin(gameBoard);

        if(result === true) {
            displayResultContainer.append(displayResult);
            gameEndContainer.append(displayResult);
                
            playerFirst.turn = false;
            playerSecond.turn = false;
    
            player.div.classList.toggle("current-turn");

            displayResult.textContent = `${player.name} won!`;

            _afterMatchEnd();
        } else {
            player.div.classList.toggle("current-turn");
            player2.div.classList.toggle("current-turn");
        }
        if(movesCounter === 9) {
            displayResult.textContent = `It's a draw!`;
        }
        
    }

    function _afterMatchEnd() {
        const gameEndButtons = document.createElement("div");
        const playAgain = document.createElement("p");
        const yesButton = document.createElement("button");
        const noButton = document.createElement("button");
        const gameCellsOnceAgain = document.querySelectorAll('.grid-cell');

        gameElement.style.display = "none";

        playAgain.textContent = "Would you like to play again?";
        yesButton.textContent = "Yes";
        noButton.textContent = "No";

        playAgain.classList.add("play-again");
        gameEndButtons.classList.add("game-end-buttons");
        displayResult.classList.add("game-result");
        yesButton.classList.add("yes-button");
        noButton.classList.add("no-button");

        gameCellsOnceAgain.textContent = '';

        yesButton.addEventListener("click", e => _yesClicked());
        
        noButton.addEventListener("click", e => {
            document.body.textContent = '';
        });

        gameEndButtons.append(yesButton, noButton);
        gameEndContainer.append(playAgain, gameEndButtons);
    }

    function _yesClicked() {
        form.style.display = "block";
        gameEndContainer.textContent = ''; 
        gameBoardElement.textContent = '';
        players.textContent = '';
        gameElement.style.display = 'block';
        buttonElements.style.display = 'none';
        gameBoard.length = 0;
        playerFirst = undefined;
        playerSecond = undefined;
        aiPlayer = undefined;
        winner = false;
        movesCounter = 0;
    }

    function _aiSelectionEvent() {
        aiSelection.addEventListener("change", e => {
            if(aiSelection.checked === true) {
                secondPlayer.disabled = true;
                secondPlayer.value = "AI";
            } else {
                secondPlayer.disabled = false;
            }
        });
    }

    function _createPlayers(first, second) {
        if(second === "npcTrueFuckYouPlayer69") {
            const firstPlayer = Player(first, "X", true, false, firstPlayerElement);
            const aiPlayer = Player("AI", "O", false, true, secondPlayerElement);
            _setValue(firstPlayer, aiPlayer);
            _addPlayerNamesToGameboard();
        } else {
            const firstPlayer = Player(first, "X", true, false, firstPlayerElement);
            const secondPlayer = Player(second, "O", false, false, secondPlayerElement);
            _setValue(firstPlayer, secondPlayer);
            _addPlayerNamesToGameboard();
        }
    }

    function _setValue(first, second) {
        if(second.npc === true) {
            aiPlayer = second;
            playerFirst = first;
        } else {
            playerFirst = first;
            playerSecond = second;
        }
    }

    function getPlayers() {
        console.log(playerFirst.name);
        console.log(playerSecond);
        console.log(aiPlayer);
    }

    return {
        onRun,
        getPlayers,
        gameBoard
    }
})(document);

game.onRun();