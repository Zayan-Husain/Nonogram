grid_5_1 = [
    [1,1,1,1,1],
    [1,0,0,0,1],
    [1,0,1,0,1],
    [1,0,0,0,1],
    [1,1,1,1,1],
]
grid_5_2 = [
    [1,0,0,0,1],
    [0,1,0,1,0],
    [0,0,1,0,0],
    [0,1,0,1,0],
    [1,0,0,0,1],
]
grid_5_3 = [
    [1,1,1,1,1],
    [1,0,1,0,1],
    [1,1,1,1,1],
    [1,0,1,0,1],
    [1,1,1,1,1],
]
grid_5_4 = [
    [1,0,1,0,1],
    [1,0,0,0,1],
    [1,1,0,1,1],
    [0,1,0,1,0],
    [0,1,0,1,0],
]
grid_5_5 = [
    [0,0,1,0,0],
    [0,1,1,1,0],
    [1,1,1,1,1],
    [0,1,1,1,0],
    [1,1,1,1,1],
]
grid_5_6 = [
    [1,0,0,0,1],
    [1,0,1,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0],
    [1,0,1,0,1],
]
grid_5_7 = [
    [1,0,1,0,1],
    [1,0,1,0,1],
    [0,0,0,0,0],
    [1,1,0,1,1],
    [0,0,1,0,0],
]
grid_5_8 = [
    [0,0,1,0,0],
    [1,1,1,1,1],
    [1,1,1,1,1],
    [0,0,1,0,0],
    [1,1,0,1,1],
]
grid_5_9 = [
    [0,1,1,1,0],
    [1,1,0,1,1],
    [1,0,0,0,1],
    [1,1,0,1,1],
    [0,1,0,1,0],
]
grid_5_10 = [
    [1,1,0,1,1],
    [0,1,0,1,0],
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,1,1,1,1],
]
grid_5_11 = [
    [1,0,1,0,1],
    [0,1,0,1,0],
    [0,1,0,1,0],
    [0,1,1,1,0],
    [1,1,1,1,1],
]
grid_5_12 = [
    [0,1,1,0,0],
    [1,1,0,0,1],
    [1,1,1,1,0],
    [0,1,1,0,0],
    [1,0,0,1,0],
]
grid_5_13 = [
    [0,0,1,1,0],
    [0,1,0,0,1],
    [1,1,1,0,0],
    [1,1,1,0,0],
    [1,1,1,0,0],
]
grid_10_1 = [
    [1,1,0,1,1,1,1,0,1,1],
    [1,0,1,1,0,0,1,1,0,1],
    [0,1,1,0,1,1,0,1,1,0],
    [1,1,0,1,0,0,1,0,1,1],
    [1,0,1,0,1,1,0,1,0,1],
    [1,0,1,0,1,1,0,1,0,1],
    [1,1,0,1,0,0,1,0,1,1],
    [0,1,1,0,1,1,0,1,1,0],
    [1,0,1,1,0,0,1,1,0,1],
    [1,1,0,1,1,1,1,0,1,1],
]
grid_10_2 = [
    [1,1,0,1,1,1,1,0,1,1],
    [0,0,1,1,1,1,1,1,0,0],
    [1,1,1,0,1,1,0,1,1,1],
    [1,0,1,0,1,1,0,1,0,1],
    [0,1,0,1,0,0,1,0,1,0],
    [1,0,1,0,1,1,0,1,0,1],
    [0,1,0,1,0,0,1,0,1,0],
    [1,1,1,1,1,1,1,1,1,1],
    [0,1,0,0,1,1,0,0,1,0],
    [1,0,1,1,0,0,1,1,0,1],
]
grids = {
    5: [grid_5_1, grid_5_2, grid_5_3, grid_5_4, grid_5_5, grid_5_6, grid_5_7, grid_5_8, grid_5_9, grid_5_10, grid_5_11, grid_5_12, grid_5_13],
    10: [grid_10_1, grid_10_2]
}
if (localStorage.getItem("save-grids")) grids = JSON.parse(localStorage.getItem("save-grids"))