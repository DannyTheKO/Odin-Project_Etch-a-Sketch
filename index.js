const etchASketch = document.querySelector("#etchASketch");

const btnReset = document.querySelector("#btnReset");
const btnToggleBorder = document.querySelector("#btnToggleBorder");
const sketchBackground = document.querySelector("#sketchBackground");

const totalSquaresInput = document.querySelector("#totalSquareInput");
const totalSquareOutput = document.querySelector("#totalSquareOutput");

let totalSquares = 32;
let sizeContainer = 600; // How big is the display is
renderSketch(totalSquares);

function renderSketch(totalSquare) {
    if (totalSquare > 64) {
        let c = confirm("Careful this will freeze the website!, do you wish to continue ?")
        if (c === false) {
            return;
        }
    }

    // Reset
    etchASketch.innerHTML = '';
    mouseOverOption();

    totalSquareOutput.textContent = `${totalSquare} x ${totalSquare}`;
    totalSquareOutput.style.textAlign = "center";

    // Calculate grid dimensions
    // let cols = Math.floor(Math.sqrt(totalSquare));
    // let rows = Math.ceil(totalSquare / cols);

    // Adjust square size to fit the container exactly
    let sizeSquare = sizeContainer / totalSquare;

    etchASketch.style.display = "flex";
    etchASketch.style.flexWrap = "wrap";
    etchASketch.style.width = `${sizeContainer}px`;
    etchASketch.style.height = `${sizeContainer}px`;
    etchASketch.style.backgroundColor = `${sketchBackground.value}`;
    etchASketch.style.userSelect = "none";

    for (let i = 1; i <= totalSquare; i++) {
        for (let j = 1; j <= totalSquare; j++) {
            const square = document.createElement("div");
            square.id = "square";

            square.style.width = `${sizeSquare}px`;
            square.style.height = `${sizeSquare}px`;
            square.style.boxSizing = "border-box";
            square.style.opacity = "1";

            square.style.backgroundColor = "transparent";

            // Border
            if (btnToggleBorder.checked) {
                square.classList.toggle("showBorder");
            }

            etchASketch.appendChild(square);
        }
    }
}

// Mouse Over Option (this is a fucking mess)
function mouseOverOption() {
    let option = document.querySelector('.btn-option > div > .color > input[name="color"]:checked')

    if (option.value.toString().toLocaleLowerCase() === "gradient") {
        etchASketch.removeEventListener("mouseover", mouseOverRainbow);
        etchASketch.removeEventListener("mouseover", mouseOverErase);
        etchASketch.removeEventListener("mouseover", mouseOverSelectedColour);

        etchASketch.addEventListener("mouseover", mouseOverGradient);
    } else if (option.value.toString().toLocaleLowerCase() === "rainbow") {
        etchASketch.removeEventListener("mouseover", mouseOverGradient);
        etchASketch.removeEventListener("mouseover", mouseOverErase);
        etchASketch.removeEventListener("mouseover", mouseOverSelectedColour);

        etchASketch.addEventListener("mouseover", mouseOverRainbow);
    } else if (option.value.toString().toLocaleLowerCase() === "eraser") {
        etchASketch.removeEventListener("mouseover", mouseOverGradient);
        etchASketch.removeEventListener("mouseover", mouseOverRainbow);
        etchASketch.removeEventListener("mouseover", mouseOverSelectedColour);

        etchASketch.addEventListener("mouseover", mouseOverErase)
    } else {
        etchASketch.removeEventListener("mouseover", mouseOverGradient);
        etchASketch.removeEventListener("mouseover", mouseOverRainbow);
        etchASketch.removeEventListener("mouseover", mouseOverErase);

        etchASketch.addEventListener("mouseover", mouseOverSelectedColour)

    }
}

function mouseOverGradient(e) {
    if (e.target.id !== "etchASketch" && e.buttons === 1) {
            e.target.style.backgroundColor = "gray"
    }
}

function mouseOverRainbow(e) {
    if (e.target.id !== "etchASketch" && e.buttons === 1) {
        e.target.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }
}

function mouseOverErase(e) {
    if (e.target.id !== "etchASketch" && e.buttons === 1) {
        e.target.style.backgroundColor = "transparent"
    }
}

function mouseOverSelectedColour(e) {
    let select = document.querySelector(`.color > #select`)
    if (e.target.id !== "etchASketch" && e.buttons === 1) {
        e.target.style.backgroundColor = `${select.value}`;
    }
}

// Reset Button
btnReset.addEventListener('click', (e) => {
    renderSketch(totalSquares);
})

// Input Square
totalSquaresInput.oninput = () => {
    renderSketch(totalSquaresInput.value);
    totalSquares = totalSquaresInput.value;
}

// Output Square
totalSquareOutput.addEventListener('click', (e) => {
    let square;
    do {
        square = prompt("Square number: ");
        if (square === null) {
            return; // Cancel
        }
    } while (isNaN(parseInt(square))) // Integer Validation
    totalSquares = Math.round(square);
    renderSketch(totalSquares);
})

btnToggleBorder.addEventListener('click', () => {
    let allSquares = document.querySelectorAll(".wrapper > .wrapper-canvas > #etchASketch > #square");
    allSquares.forEach(square => {
        square.classList.toggle("showBorder");
    })
})

sketchBackground.oninput = () => {
    etchASketch.style.backgroundColor = `${sketchBackground.value}`;
}
