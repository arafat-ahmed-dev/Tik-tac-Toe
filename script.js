const box = document.querySelectorAll(".box");
const resetbtn = document.querySelector(".reset");
const newbtn = document.querySelector(".newgame");
const msg = document.querySelector("#msg");
const msgcontainer = document.querySelector(".msg-container");
const turn = document.querySelector("span");
const turnmsg = document.querySelector(".turn")

let currentPlayer = true;
let winningPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [3, 4, 5],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const disablebox = () =>{
    box.forEach((box) => {
        box.disabled = true;
    });
}

const toggleColor = (box) => {
    if (box.textContent === "X") {
        box.style.color = "red"; // Change color for 'X'
    } else if (box.textContent === "O") {
        box.style.color = "white"; // Change color for 'O'
    }
};

const showWinner = (winner) =>{
    msg.innerText = `Congratulation! The winner is ${winner}`
    msgcontainer.style.display = "block";
    resetbtn.classList.add("hidden");
    turn.classList.add("hidden");
    disablebox();
}


// Event listener for the human player's move
box.forEach((box) => {
    box.addEventListener("click", () => {
        if (currentPlayer) {
            box.textContent = "X";
            toggleColor(box);
            currentPlayer = false;
            turn.textContent = `O`
        } else {
            box.textContent = "O";
            toggleColor(box);
            currentPlayer = true;
            turn.textContent = `X`
        }
        box.disabled = true;
        checkWinner();
    });
});


const checkWinner = () =>{
    for (const pattern of winningPattern) {
        let pos1Val = box[pattern[0]].innerText;
        let pos2Val = box[pattern[1]].innerText;
        let pos3Val = box[pattern[2]].innerText;
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                turnmsg.classList.add("hidden");
                return true;
            }
        }
    }
    draw();
};

const reset = () =>{
    box.forEach((box) =>{
        box.textContent = "";
        box.disabled = false;
        currentPlayer = true;
    })
    turn.textContent = `X`
}
resetbtn.addEventListener("click", reset);
newbtn.addEventListener("click", ()=>{
    reset();
    msgcontainer.style.display = "none";
    resetbtn.classList.remove("hidden");
    turn.classList.remove("hidden");
    turnmsg.classList.remove("hidden");
});

const draw = () => {
    const totalMoves = Array.from(box).filter((box) => box.innerText !== "").length;
    if (totalMoves === 9) {
        msg.innerText = "It's a draw";
        msgcontainer.style.display = "block";
    }
};
