addEventListener("resize" , function(){

    resizeCanvas()
    let rect = canvas.getBoundingClientRect()
    ball.x = rect.width/2
    ball.y = rect.height/2
})
