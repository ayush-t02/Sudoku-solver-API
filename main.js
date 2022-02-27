const board = document.querySelector("#puzzle");
const solvebtn = document.querySelector("#solve_btn");
const squares = 81;
const submission = [];

for (let i = 0; i < squares; i++) {
    const inputEle = document.createElement("input");
    inputEle.setAttribute("type", "number");
    inputEle.setAttribute("min", "1");
    inputEle.setAttribute("max", "9");
    board.appendChild(inputEle);
}

const joinValues = () => {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
        if (input.value) {
            submission.push(input.value);
        } else {
            submission.push(".");
        }
    });
    console.log(submission);
};

const populateValues = (isSolvable, solution) => {
    const inputs = document.querySelectorAll("input");
    if (isSolvable && solution) {
        inputs.forEach((input, i) => {
            input.value = solution[i];
        });
    }
};

const solve = () => {
    joinValues();
    const data = submission.join("");
    var options = {
        method: "POST",
        url: "https://solve-sudoku.p.rapidapi.com/",
        headers: {
            "content-type": "application/json",
            "x-rapidapi-host": "solve-sudoku.p.rapidapi.com",
            "x-rapidapi-key": "399d6b4102mshdf80cbbeb673fd8p1a18ebjsnaf151b6ca948",
        },
        data: {
            puzzle: data,
        },
    };

    axios
        .request(options)
        .then(function(response) {
            console.log(response.data);
            populateValues(response.data.solvable, response.data.solution);
        })
        .catch(function(error) {
            console.error(error);
        });
};

solvebtn.addEventListener("click", solve);