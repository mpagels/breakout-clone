console.clear()
const canvas = document.querySelector('#canvas')
canvas.width = 500
canvas.height = 600
const ctx = canvas.getContext('2d')

let movePlattform = 0

const plattform = [{
  x: 180,
  y: 5,
  sizeY : 100,
  sizeX : 10
}]

const block = {
  x : 10,
  y : 5,
  sizeX = 100,
  sizeY = 20
}

ctx.fillStyle = 'red'
ctx.fillRect(250, 580, 100, 10)

main()

function main() {
  ctx.clearRect(0, 0, 500, 600)
  
  
  plattform[0].x += movePlattform
  ctx.fillStyle = 'red'
ctx.fillRect(plattform[0].x, 580, 100, 10)
  
  movePlattform = 0
  requestAnimationFrame(main)
}


window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    movePlattform = 10
  }else if (event.key === 'ArrowLeft') {
      movePlattform = -10
    }
  }
)