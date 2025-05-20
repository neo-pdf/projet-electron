const directions = [[2, 0], [-2, 0], [0, 2], [0, -2]]

function shuffle(array) {
  var m = array.length, temp, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    temp = array[m];
    array[m] = array[i];
    array[i] = temp;
  }

  return array;
}

export class Labyrinthe {
    constructor(size) {
        this._width = size;
        this._height = size;
        
        this._start = this.randomPosition()
        this._finish = []
        this._grid = this.baseGrid()// this.generateLabyrinth(this.baseGrid(), this._start);

    }

    get grid(){
        return this._grid
    }

    get width() {
        return this._width
    }

    get height() {
        return this._height
    }

    get start() {
        return this._start
    }

    get finish() {
        return this._finish
    }


    baseGrid() {
        let grid = []
        for (let i=0; i < this._width; i++) {    
            grid[i] = []
            for (let j=0; j < this._height; j++) {
                if (this.checkWall(i, j)) {
                    grid[i][j] = true
                } else {
                    grid[i][j] = false
                }
            }
        }
        return grid
    }

    randomPosition() {
        return [Math.floor(Math.random() * this._width/2) * 2, Math.floor(Math.random() * this._height/2) * 2]
    }

    checkWall(i, j) {
        return i%2 === 0 && j%2 === 0;
    }

    generateLabyrinth(grid, start) {
    const stack = [];
    const visited = [];
    const currentCell = start;
    const possibleFinish = [];
    let ctr = 0;
    
    stack.push(currentCell);
    visited.push(currentCell);

    while (stack.length > 0) {
        const cell = stack[stack.length - 1];

        // Trouver les voisins non visités
        const neighbors = this.possibleDirections(cell)
            .filter(neighbor => !visited.some(v => this.samePosition(v, neighbor)));

        if (neighbors.length > 0) {
            // Choisir un voisin aléatoire
            const nextCell = shuffle(neighbors)[0];

            // Casser le mur entre les deux cases
            const wallX = (cell[0] + nextCell[0]) / 2;
            const wallY = (cell[1] + nextCell[1]) / 2;
            grid[nextCell[0]][nextCell[1]] = true;
            grid[wallX][wallY] = true;

            // Marquer comme visité et empiler
            visited.push(nextCell);
            stack.push(nextCell);
            ctr++
        } else {
            // Aucun voisin : on revient en arrière
            if(ctr === 0) {
                stack.pop();
                ctr = 0;
            } else {
                possibleFinish.push(stack.pop());
                ctr = 0;
            }
            
        }
    }
    this._finish = shuffle(possibleFinish)[0]
    
    return grid;
}


        possibleDirections(position) {
            let possible = []
            for (const direction of directions) {
                const neighborCellX = position[0] + direction[0] 
                const neighborCellY = position[1] + direction[1]
                if (neighborCellX >= 0 && neighborCellX <= this._width - 1 && neighborCellY >= 0 && neighborCellY <= this._height - 1) {
                    possible.push([neighborCellX, neighborCellY])
                }
            }
            return possible
    }

    samePosition(a, b) {
        return a[0] === b[0] && a[1] === b[1];
    }

}