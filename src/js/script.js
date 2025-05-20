import { Labyrinthe } from "./generation.js"

const bouton = document.getElementById('bouton');
const tailleSelect = document.getElementById('taille-select');
let taille = ""

const labyrinthe = document.getElementById('labyrinthe-canva');
const ctx = labyrinthe.getContext('2d');

bouton.addEventListener('click', () => {
    if (tailleSelect.value !== "") {
        taille = tailleSelect.value
        console.log("bouton cliqué")
        document.getElementById('paragraphe').innerText = taille
        const newLabyrinthe = new Labyrinthe(taille)
        console.log("Taille du labyrinthe: " + newLabyrinthe.width + "x" + newLabyrinthe.height)
        console.log("Depart du labyrinthe: " + newLabyrinthe.start)
        console.log("Arrivee du labyrinthe" + newLabyrinthe.finish)
        draw(newLabyrinthe)
    }
})

function draw(labyrintheClass) {
    let cellWidth = labyrinthe.width / labyrintheClass.width
    let cellHeight = labyrinthe.height / labyrintheClass.height

    for (let i=0; i< labyrintheClass.width; i++) {
        for (let j=0; j< labyrintheClass.height; j++) {
            if (!labyrintheClass.grid[i][j]) {
                ctx.fillStyle = 'black'
            } else if (i === labyrintheClass.start[0] && j === labyrintheClass.start[1]) {
                ctx.fillStyle = 'green'
            } else if (i === labyrintheClass.finish[0] && j === labyrintheClass.finish[1]) {
                ctx.fillStyle = 'red'
            } else {
                ctx.fillStyle = 'white'
            }
            ctx.fillRect(i * cellWidth, j * cellHeight, cellWidth, cellHeight)
        }
    }
}