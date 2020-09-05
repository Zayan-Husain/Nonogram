// /*
var $ = q => document.querySelector(q), $$ = q => document.querySelectorAll(q)
var c;
var sqrGrid = 5;
var scCols = sqrGrid;
var scRows = sqrGrid;
var specialGrid = true;
document.documentElement.style.setProperty("--grid-columns", "" + sqrGrid)
var gridSqs = scCols * scRows;
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
function sc(newC) {
    c = newC;
    updateC();
}
$(".play-container").addEventListener("click", function(){sc(1)})
$(".create-container").addEventListener("click", function(){sc(2)})
var sqs = $$(".square");
for (const i of sqs) {
    i.addEventListener("mousedown", function(e) {
        window.addEventListener("mousemove", squareDrag)
        window.addEventListener("mouseup", squareUp)
        function squareDrag(e) {
            e.preventDefault()
            var sqr = e.target;
            if (sqr.dataset.unchangeable === "true") return;
            if (sqr.classList.contains("square")) {
                if (e.which === 1) {
                    squareClick(sqr, false)
                }
                if (e.which === 3) {
                    e.preventDefault()
                    squareRightClick(sqr, e)
                }
            }
            for(var j of $$(".square")) {
                j.dataset.unchangeable = "false";
            }
            sqr.dataset.unchangeable = "true";
        }
        function squareUp(e) {
            for(var j of $$(".square")) {
                j.dataset.unchangeable = "false";
            }
            window.removeEventListener("mousemove", squareDrag)
            window.removeEventListener("mouseup", squareUp)
        }
    })
    i.addEventListener("click", function(){squareClick(i)})
    i.addEventListener("contextmenu", function(e) {squareRightClick(i, e)})
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
        updateNumbers()
        return;
    }
    i.dataset.active = "true"
    i.style.backgroundColor = "rgb(17, 50, 199)"
    updateWin()
    updateNumbers()
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
    updateNumbers()
}
var grid = []
if (!specialGrid) {
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
} else {
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
        var row = grid[i]
            .toString()
            .replace(/,/gi, "")
            .replace(/0/gi, "_")
            .split("_")
        for (var j in row) {
            if (row[j] !== "") {
                var number = row[j].length;
                num.innerHTML += number + " "
            }
        }
    }
}
createGridNumbers()
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
updateNumbers()
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
        win()
    }
}
function win() {
    $(".title").innerHTML = "You Win!"
}
function arrInArr(a, b){
    for(var i = 0; i < a.length; i++){
      if(b.indexOf(a[i]) === -1 || a[i] !== b[i]) {
         return false;
      }
    }
    return true;
}
// */