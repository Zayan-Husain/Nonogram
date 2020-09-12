// /*
var $ = q => document.querySelector(q), $$ = q => document.querySelectorAll(q)
var c;
var sqrGrid = 5;
var scCols = sqrGrid;
var scRows = sqrGrid;
var specialGrid = true;
document.documentElement.style.setProperty("--grid-columns", "" + sqrGrid)
var gridSqs = scCols * scRows;
var gr = $(".grid")
var sandboxMode = false;
//C means container
var ct = $(".container")
function updateC() {
    var cn = ct.dataset.container
    switch (c) {
        case 1:
            cn = "play"
            break;
    
        case 2:
            cn = "create"
            break;
    }
    ct.dataset.container = cn
}
function emptyGrid() {
    $(".grid").innerHTML = ""
    $(".colNums").innerHTML = ""
    $(".rowNums").innerHTML = ""
    for (let i = 0; i < gridSqs; i++) {
        var gr = $(".grid");
        var newSqr = document.createElement("div");
        newSqr.classList = ["square square" + (i + 1)];
        newSqr.dataset.active = "false"
        newSqr.dataset.x = "false"
        gr.appendChild(newSqr);
    }
    for (let i = 0; i < scCols; i++) {
        var colNums = $(".colNums");
        var newCol = document.createElement("div");
        newCol.classList = ["colNum colNum" + (i + 1)];
        var span = document.createElement("span");
        newCol.appendChild(span);
        colNums.appendChild(newCol);
    }
    for (let i = 0; i < scRows; i++) {
        var rowNums = $(".rowNums");
        var newRow = document.createElement("div");
        newRow.classList = ["rowNum rowNum" + (i + 1)];
        var span = document.createElement("span");
        newRow.appendChild(span);
        rowNums.appendChild(newRow);
    }
    createGridNumbers()
    for (const i in grid) {
        for (const j in grid[i]) {
            if (grid[i][j] === 0) {
                var square = $(".grid").children[(Number(i) * scCols) + (Number(j) + 1) - 1]
                var random = Math.round(Math.random())
                if (random === 1) {
                    square.dataset.x = "true"
                    var imgx = document.createElement("img");
                    imgx.src = "gfx/gray x.png"
                    square.appendChild(imgx)
                }
            }
        }
    }
}
emptyGrid()           //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////EMPTY THE GRID
if (document.body.clientWidth > document.body.clientHeight) {
    document.documentElement.style.setProperty("--grid-size", "1vh")
} else {
    document.documentElement.style.setProperty("--grid-size", "1vw")
}
window.addEventListener("resize", function() {
    if (document.body.clientWidth > document.body.clientHeight) {
        document.documentElement.style.setProperty("--grid-size", "1vh")
    } else {
        document.documentElement.style.setProperty("--grid-size", "1vw")
    }
})
function sc(newC) {
    c = newC;
    updateC();
}
$(".play-container").addEventListener("click", function(){sc(1)})
$(".create-container").addEventListener("click", function(){sc(2)})
var grid = []
if (!specialGrid) {
    generateRandomSquares()
} else {
    generatePictureGrid()
}
function generateRandomSquares() {
    for (var i = 0; i < scRows; i++) {
        grid[i] = []
        for(var j = 0; j < scCols; j++) {
            grid[i][j] = 0;
        }
    }
    for (var i in grid) {
        for (var j in grid[i]) {
            grid[i][j] = Math.round(Math.random());
        }
    }
}
function generatePictureGrid() {
    var sgArray = grids[sqrGrid + ""]
    var randomGrid = Math.round(Math.random() * (sgArray.length - 1) + 1) - 1
    grid = sgArray[randomGrid]
}
var columns = [];
var cArr = [];
for(var i in grid) {
    cArr = [] //column array; if its first column, and theres three rows, it would be [grid[0][0], grid[1][0], grid[2][0]]
    for (var j = 0; j < grid.length; j++) {
        cArr.push(grid[j][i])
    }
    columns.push(cArr)
}
function createGridNumbers() {
    for (var i in columns) {
        var colNumber = Number(i) + 1
        var num = $(".colNum" + colNumber).children[0]
        var col = columns[i]
            .toString()
            .replace(/,/gi, "")
            .replace(/0/gi, "_")
            .split("_")
        for (var j in col) {
            if (col[j] !== "") {
                var number = col[j].length;
                num.innerHTML += number + " "
            }
        }
    }
    for (var i in grid) {
        var rowNumber = Number(i) + 1
        var num = $(".rowNum" + rowNumber).children[0]
        console.log(rowNumber)
        var row = grid[i]
            .toString()
            .replace(/,/gi, "")
            .replace(/0/gi, "_")
            .split("_")
        for (var k in row) {
            console.log(row[k])
            if (row[k] !== "") {
                var number = row[k].length;
                num.innerHTML += number + " "
            }
        }
    }
    sqsAddEventListener()
}
if (!sandboxMode) {
    emptyGrid()
}
sqsAddEventListener();
function sqsAddEventListener() {
    var sqs = $$(".square");
    for (const i of sqs) {
        i.onmousedown = function () {
            window.addEventListener("mousemove", squareDrag);
            window.addEventListener("mouseup", squareUp);
            function squareDrag(e) {
                e.preventDefault();
                var sqr = e.target;
                if (sqr.dataset.unchangeable === "true")
                    return;
                if (sqr.classList.contains("square")) {
                    if (e.which === 1) {
                        squareClick(sqr, false);
                    }
                    if (e.which === 3) {
                        e.preventDefault();
                        squareRightClick(sqr, e);
                    }
                }
                for (var j of $$(".square")) {
                    j.dataset.unchangeable = "false";
                }
                sqr.dataset.unchangeable = "true";
            }
            function squareUp() {
                for (var j of $$(".square")) {
                    j.dataset.unchangeable = "false";
                }
                window.removeEventListener("mousemove", squareDrag);
                window.removeEventListener("mouseup", squareUp);
            }
        };
        i.onclick = function () { squareClick(i); };
        i.oncontextmenu = function (e) { squareRightClick(i, e); };
    }
}

function squareClick(i, unclick = true) {
    if (i.dataset.x === "true") {
        i.dataset.x = "false"
        i.removeChild(i.children[0])
    }
    if (i.dataset.active === "true" && unclick) {
        i.style.backgroundColor = "white";
        i.dataset.active = "false";
        updateWin()
        if (!sandboxMode) updateNumbers()
        return;
    }
    i.dataset.active = "true"
    i.style.backgroundColor = "rgb(17, 50, 199)"
    updateWin()
    if (!sandboxMode) updateNumbers()
}
function squareRightClick(i, e) {
    e.preventDefault();
    if (i.dataset.active === "true") {
        i.dataset.active = "false"
        i.style.background = "white"
    }
    if (i.dataset.x === "false") {
        i.dataset.x = "true";
        var imgx = document.createElement("img")
        imgx.src = "gfx/gray x.png";
        i.appendChild(imgx);
    } else if (i.dataset.x === "true") {
        i.removeChild(i.children[0])
        i.dataset.x = "false";
    }
    if (!sandboxMode) updateNumbers()
}
var screenGrid = [];
var scColumns = [];
var scArr = [];
function updateScreenGrid() {
    var sgrid = $(".grid")
    screenGrid = []
    scgPushArr = []
    for(var i in sgrid.children) {
        if(i !== Number(i) + "") break;
        i = Number(i)
        number = (sgrid.children[i].dataset.active === "true" && sgrid.children[i].dataset.active !== "false") ? 1 : 0
        scgPushArr.push(number)
        if (i % scRows === scRows - 1) {
            screenGrid.push(scgPushArr)
            scgPushArr = []
        }
    }
    scColumns = []
    for(var i in screenGrid) {
        scArr = [] //screen column array; if its first column, and theres three rows, it would be [screenGrid[0][0], screenGrid[1][0], screenGrid[2][0]]
        for (var j = 0; j < screenGrid.length; j++) {
            scArr.push(screenGrid[j][i])
        }
        scColumns.push(scArr)
    }
    return screenGrid;
}
updateScreenGrid()
//if any column is finished, show it visually.
function updateNumbers() {
    for (var i in scColumns) {
        var number = Number(i) + 1 + ""
        var column = $(".colNum" + number)
        var iArray = scColumns[i]
        .toString()
        .replace(/,/gi, "")
        var cArray = columns[i]
        .toString()
        .replace(/,/gi, "")
        if (iArray === cArray) {
            column.style.backgroundColor = "#eeeeee"
            column.children[0].style.color = "#444"
        } else {
            column.style.backgroundColor = "rgb(49, 49, 49)"
            column.children[0].style.color = "white"
        }
    }
    for (var i in screenGrid) {
        var number = Number(i) + 1 + ""
        var row = $(".rowNum" + number)
        var iArray = screenGrid[i]
        .toString()
        .replace(/,/gi, "")
        var rArray = grid[i]
        .toString()
        .replace(/,/gi, "")
        if (iArray === rArray) {
            row.style.backgroundColor = "#eeeeee"
            row.children[0].style.color = "#444"
        } else {
            row.style.backgroundColor = "rgb(49, 49, 49)"
            row.children[0].style.color = "white"
        }
    }
}
if (!sandboxMode) {
    updateNumbers()
}
function updateWin() {
    updateScreenGrid()
    var newGrid = [];
    for (var i in grid) {
        for(var j in grid[i]) {
            newGrid.push(grid[i][j])
        }
    }
    var tempGrid = grid;
    grid1 = screenGrid;
    var newSCGrid = []
    for (var i in grid1) {
        for(var j in grid1[i]) {
            newSCGrid.push(grid1[i][j])
        }
    }
    var sameContent = arrInArr(newGrid, newSCGrid)
    if (sameContent && newGrid.length === newSCGrid.length) {
        setTimeout(() => {
            win()
        }, 300)
    }
}
function win() {
    $(".winCircle").style.top = "50%";
    $(".winCircle").style.transform = "translate(-50%, -50%)";
    $(".winCircle").style.transition = "600ms"
    setTimeout(() => {
        console.log($(".winCircle"))
        $(".winCircle").classList.add("active")
    }, 600)
    setTimeout(() => {
        $(".winCircle").classList.add("activeUp")
        $(".winCircle").style.transition = "0s" 
    }, 1100)
    setTimeout(() => {
        $(".winCircle").children[1].style.opacity = "1"
    }, 2000)
    setTimeout(() => {
        $(".winCircle").style.fontSize = "5.6em"
        $(".winCircle").children[0].style.whiteSpace = "pre"
        $(".winCircle").children[0].style.marginBottom = "7.5em"
    }, 900)
}
function closeWin() {
    $(".winCircle").children[1].style.opacity = "0"
    $(".winCircle").style.top = "50%";
    $(".winCircle").style.transition = "600ms"
    setTimeout(() => {
        $(".winCircle").classList.remove("activeUp")
    }, 1100)
    setTimeout(() => {
        $(".winCircle").classList.remove("active")
    }, 1900)
    setTimeout(() => {
        $(".winCircle").style.top = "100vh"
        $(".winCircle").style.transform = "";
    }, 2700)
    $(".winCircle").style.fontSize = "1.75em"
    $(".winCircle").children[0].style.marginBottom = "0em"
}
$(".restartLvl").addEventListener("click", function(){closeWin();emptyGrid()})
$(".newLvl").addEventListener("click", function(){closeWin();newLevel()})
function newLevel() {                                                        //////////////////////////////////NEW LEVEL
    // make sqrGrid (size of both scCols and scRows) the grid size dropdown box's value
    sqrGrid = Number($(".grid_size_select").value.split("x")[0])  // for example, "8x8"
    createLevel()
}
function createLevel() {
    scCols = sqrGrid;
    scRows = sqrGrid;
    gridSqs = scCols * scRows
    gridType = $(".grid_select").value.split("x")[0]
    if (gridType === "r") {
        generatePictureGrid()
    } else if (gridType === "rs") {
        generateRandomSquares()
    }
    document.documentElement.style.setProperty("--grid-columns", "" + sqrGrid)
    columns = [];
    cArr = [];
    for(var i in grid) {
        cArr = [] //column array; if its first column, and theres three rows, it would be [grid[0][0], grid[1][0], grid[2][0]]
        for (var j = 0; j < grid.length; j++) {
            cArr.push(grid[j][i])
        }
        columns.push(cArr)
    }
    emptyGrid()
}
document.body.onscroll = function(e){e.preventDefault();document.body.scrollIntoView(true);return;}
//$(".grid_size_select").onchange = function(e) {$(".grid_size_select").value = e.srcElement.value;console.log(this.value, e.srcElement.value, this)}
function arrInArr(a, b){
    for(var i = 0; i < a.length; i++){
      if(b.indexOf(a[i]) === -1 || a[i] !== b[i]) {
         return false;
      }
    }
    return true;
}
// win()
// */