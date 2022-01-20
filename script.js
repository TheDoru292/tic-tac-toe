var gameBoard = (function () {
    const board = [["topLeft", "notInUse"], ["topMiddle", "notInUse"], ["topRight", "notInUse"],
                   ["middleLeft", "notInUse"], ["middle", "notInUse"], ["middleRight", "notInUse"],
                   ["bottomLeft", "notInUse"], ["bottomMiddle", "notInUse"], ["bottomRight", "notInUse"]];
    
    const checkIfInUse = function(cell) {
        let string = cell;   
    }
    
    return {
        board,
        checkIfInUse
    }
})();

var displayController = (function (doc) {

    // Reminder: Make all the fuctions work for NPC/Player.
    var player;
    var npc;
    const gameBoardArray = gameBoard.board;

    function _putItem(cell, user) {
        const item = doc.createElement("p");
        item.textContent = user.checkSign();
        cell.append(item);
    }

    function _addEventListenerToGameboard(cell, clicked) {
        cell.addEventListener("click", (e) => {
            if(clicked === false && player.checkTurn() === true) {
                _putItem(cell, player);
                clicked = true;
                player.setTurn(false);
                npc.setTurn(true);
            } else if(clicked === false && npc.checkTurn() === true) {
                _putItem(cell, npc);
                clicked = true;
                npc.setTurn(false);
                player.setTurn(true);
            } else {
                // Add a box where it tells the user/player the errors, like this one. 
                // Error message: "You already put something. It's {player}'s turn."
                console.log("STOP THIS RIGHT THERE");
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

    const _createPlayers = function(name, sign) {
        player = players(name, sign);
        player.setTurn(true);
        console.log(player.getName());
        if(player.checkSign() === "X") {
            npc = players("NPC", "O");
        } else if(player.checkSign === "O") {
            npc = players("NPC", "X");
        } else {
            console.log(sign);
            return console.log("Something went wrong.");
        }
    }

    const _createGameBoard = function() {
        const content = doc.querySelector(".game");
        const board = doc.createElement("div");
        board.className = "gameboard";
        content.append(board);

        _createGameBoardDivs(board);
    }

    const _addEventListenerToButton = function() {
        const firstLoad = doc.querySelector(".firstLoad");

        firstLoad.addEventListener("submit", (e) => {
            const username = doc.getElementById("username").value;
            const letter = doc.getElementById("selectLetter").value;

            _createPlayers(username, letter);

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