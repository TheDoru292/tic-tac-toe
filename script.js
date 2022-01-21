var gameBoard = (function () {
    const board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    
    return {
        board,
    }
})();

var displayController = (function (doc) {

    // Reminder: Make all the fuctions work for playerTwo/Player.
    var player;
    var playerTwo;
    let functionUsed = 0;
    const gameBoardArray = gameBoard.board;
    const board = doc.createElement("div");

    function determineWinner() {
        if(gameBoardArray[0] == player.checkSign() && gameBoardArray[1] == player.checkSign() && gameBoardArray[2] == player.checkSign() ||
            gameBoardArray[3] == player.checkSign() && gameBoardArray[4] == player.checkSign() && gameBoardArray[5] == player.checkSign() ||
            gameBoardArray[6] == player.checkSign() && gameBoardArray[7] == player.checkSign() && gameBoardArray[8] == player.checkSign() ||
            gameBoardArray[0] == player.checkSign() && gameBoardArray[3] == player.checkSign() && gameBoardArray[6] == player.checkSign() ||
            gameBoardArray[1] == player.checkSign() && gameBoardArray[4] == player.checkSign() && gameBoardArray[7] == player.checkSign() ||
            gameBoardArray[2] == player.checkSign() && gameBoardArray[5] == player.checkSign() && gameBoardArray[8] == player.checkSign() ||
            gameBoardArray[0] == player.checkSign() && gameBoardArray[4] == player.checkSign() && gameBoardArray[8] == player.checkSign() ||
            gameBoardArray[2] == player.checkSign() && gameBoardArray[4] == player.checkSign() && gameBoardArray[6] == player.checkSign()) {
                console.log(`${player.getName()} won!`);
                player.setTurn(false);
                playerTwo.setTurn(false);
        } else if(gameBoardArray[0] == playerTwo.checkSign() && gameBoardArray[1] == playerTwo.checkSign() && gameBoardArray[2] == playerTwo.checkSign() ||
            gameBoardArray[3] == playerTwo.checkSign() && gameBoardArray[4] == playerTwo.checkSign() && gameBoardArray[5] == playerTwo.checkSign() ||
            gameBoardArray[6] == playerTwo.checkSign() && gameBoardArray[7] == playerTwo.checkSign() && gameBoardArray[8] == playerTwo.checkSign() ||
            gameBoardArray[0] == playerTwo.checkSign() && gameBoardArray[3] == playerTwo.checkSign() && gameBoardArray[6] == playerTwo.checkSign() ||
            gameBoardArray[1] == playerTwo.checkSign() && gameBoardArray[4] == playerTwo.checkSign() && gameBoardArray[7] == playerTwo.checkSign() ||
            gameBoardArray[2] == playerTwo.checkSign() && gameBoardArray[5] == playerTwo.checkSign() && gameBoardArray[8] == playerTwo.checkSign() ||
            gameBoardArray[0] == playerTwo.checkSign() && gameBoardArray[4] == playerTwo.checkSign() && gameBoardArray[8] == playerTwo.checkSign() ||
            gameBoardArray[2] == playerTwo.checkSign() && gameBoardArray[4] == playerTwo.checkSign() && gameBoardArray[6] == playerTwo.checkSign()) {
                console.log(`${playerTwo.getName()} won!`);
                player.setTurn(false);
                playerTwo.setTurn(false);
        } else {
            if(functionUsed == 9) {
                console.log("Draw!");
            }
        }
    }

    board.addEventListener("click", (e) => {

        determineWinner();

    })

    function _putInArray(cell, user) {
        functionUsed += 1;
        for(let i = 0; gameBoardArray.length > i; i++) {
            if(gameBoardArray[i] == cell.className) {
                gameBoardArray.splice(gameBoardArray[i], 1, user.checkSign());
            }
        }
    }

    function _putItem(cell, user) {
        const item = doc.createElement("p");
        item.textContent = user.checkSign();
        cell.append(item);
        _putInArray(cell, user);
    }

    function _addEventListenerToGameboard(cell, clicked, ) {
        cell.addEventListener("click", (e) => {
            if(clicked === false && player.checkTurn() === true) {
                _putItem(cell, player);
                clicked = true;
                player.setTurn(false);
                playerTwo.setTurn(true);
            } else if(clicked === false && playerTwo.checkTurn() === true) {
                _putItem(cell, playerTwo);
                clicked = true;
                playerTwo.setTurn(false);
                player.setTurn(true);
            } else {
                // Add a box where it tells the user/player the errors, like this one. 
                // Error message: "You already put something. It's {player}'s turn."
            }
        });
    }

    function _createGameBoardDivs(board) {
        for(let i = 0; gameBoardArray.length > i; i++) {
            const div = doc.createElement("div");
            let clicked = false;
            let array = (gameBoardArray[i] + '').split(",");
            div.className = `${array[0]}`;
            board.append(div);
            _addEventListenerToGameboard(div, clicked);
        }
    }

    const _createPlayers = function(name, name2, sign) {
        player = players(name, sign);
        player.setTurn(true);
        if(player.checkSign() === "X") {
            playerTwo = players(name2, "O");
        } else if(player.checkSign() === "O") {
            playerTwo = players(name2, "X");
        } else {
            return console.log("Something went wrong.");
        }
    }

    const _createGameBoard = function() {
        const content = doc.querySelector(".game");
        board.className = "gameboard";
        content.append(board);

        _createGameBoardDivs(board);
    }

    const _addEventListenerToButton = function() {
        const firstLoad = doc.querySelector(".firstLoad");

        firstLoad.addEventListener("submit", (e) => {
            const firstPlayerUsername = doc.getElementById("firstPlayerUsername").value;
            const secondPlayerUsername = doc.getElementById("secondPlayerUsername").value;
            const letter = doc.getElementById("selectLetter").value;

            _createPlayers(firstPlayerUsername, secondPlayerUsername, letter);

            _createGameBoard();

            e.preventDefault();
            firstLoad.style.display = "none";
        });
    }

    const publicMethod = function() {
        _addEventListenerToButton();
    }

    return {
        publicMethod
    }

})(document);

const players = (name, sign) => {
    let playersTurn = false;

    const getName = () => {
        return name;
    }

    const checkTurn = () => {
        return playersTurn;
    }

    const checkSign = () => {
        return sign;
    }

    const setTurn = (choice) => {
        if(typeof choice === "boolean") {
            playersTurn = choice;
        } else {
            return console.log("What are you doing? Unamused");
        }
    }

    return {
        getName,
        checkTurn,
        checkSign,
        setTurn,
    }
}

displayController.publicMethod();