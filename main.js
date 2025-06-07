const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

resizeCanvas()

let rect = canvas.getBoundingClientRect();
let ball = new Ball(rect.width / 2, rect.height / 2, 25, "#0000AA");

animate()

function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ball.draw(ctx)
    requestAnimationFrame(animate)

}

// Canvas automatisch schalen naar window-grootte
function resizeCanvas() {

    let dpr = window.devicePixelRatio || 1;
    let rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    console.log(canvas.width,canvas.height)

}

