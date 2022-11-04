/*
 * This is my recreation of the game bubble blaster in javascript
 * originally (I think) made by @Feli10 (https://github.com/feli10).
 * 
 * I tried to get it as accurate as possible, while making a load
 * of improvements, such as adding a class for the bubbles etc.
 * 
 * Hope you enjoy!
 * - Kenzou Twitchett 9P
 * 
 */

const WIDTH = 800
    , HEIGHT = 500

    , canvas = document.querySelector("canvas")
    , ctx = canvas.getContext("2d")

    , SHIPR = 15
    , SHIPSPD = 10

    , TIMELIMIT = 30

    , BUBCHANCE = .1

    , GAP = 100 // margin outside the screen

    , center = {
        x: WIDTH / 2,
        y: HEIGHT / 2
    }


var bubList = []
  , remainingTime = 30
  , popped = 0
  , canRetry = false
  , player = new Player(center.x, center.y)


ctx.font = "32px monospace"
ctx.textAlign = "center"

function drawFilledPoly(col, startx, starty, points)
{
    // offset
    startx = startx - SHIPR
    starty = starty - SHIPR

    ctx.fillStyle = col
    ctx.moveTo(startx, starty)
    ctx.beginPath()
    for (pid in points)
    {
        pid % 2 != 0 && pid != 0

        ? ctx.lineTo(startx + points[pid - 1], starty + points[pid])
        : ""
        
    }
    ctx.fill()
    ctx.stroke()
}

function newBubble()
{
    const speed = Math.floor(Math.random() * 40) - 10   
    bubList.push(new Bubble(
        WIDTH + GAP,
        Math.floor(Math.random() * HEIGHT),
        speed / 2,
        35 - speed
    ))
}

function retry()
{
    bubList = []
    remainingTime = 30
    popped = 0
    canRetry = false
    player = new Player(center.x, center.y)


    requestAnimationFrame(mainLoop)
}

// https://stackoverflow.com/a/7301852
function isCollide(bubble) {
    return !(
        ((player.position.y + SHIPR*2) < (bubble.position.y)) ||
        (player.position.y > (bubble.position.y + bubble.radius*2)) ||
        ((player.position.x + SHIPR*2) < bubble.position.x) ||
        (player.position.x > (bubble.position.x + bubble.radius*2))
    );
}


function mainLoop()
{
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    player.draw()

    bubList.forEach(bubble => {
        bubble.frame()

        if (isCollide(bubble) && (!bubble.popped)) {popped++; bubble.popped = true}
    })

    Math.random() < BUBCHANCE && newBubble()

    ctx.fillStyle = "#fff"

    ctx.fillText(remainingTime, WIDTH / 2, 32)
    ctx.fillText("Bubbles: " + bubList.length, WIDTH / 2, 32 * 2)
    ctx.fillText("Bubbles popped: " + popped, WIDTH / 2, 32 * 3)


    if (remainingTime <= -1)
    {
        ctx.clearRect(0, 0, WIDTH, HEIGHT)

        // worst code i've ever seen but it works i guess
        setTimeout(() => {
            ctx.fillText("GAME OVER!", WIDTH / 2, (HEIGHT / 2 - 32))
            setTimeout(() => {
                ctx.fillText("Total bubbles: " + bubList.length, WIDTH / 2, (HEIGHT / 2))
                setTimeout(() => {
                    ctx.fillText("Bubbles popped: " + popped, WIDTH / 2, (HEIGHT / 2 + 32))
                    setTimeout(() => {
                        ctx.fillText("Press ENTER or SPACE to retry.", WIDTH / 2, (HEIGHT / 2 + 128))

                        canRetry = true
                    }, 2000)
                }, 1000)
            }, 1000)
        }, 1000)
    }
    else requestAnimationFrame(mainLoop)
}

// decrement timer
setInterval(() => remainingTime-- , 1000)

// add movement event listener
document.addEventListener("keydown", event => {

    // woah guess what python doesnt have! SWITCH STATEMENTS
    switch (event.code)
    {
        case "ArrowUp":    player.move(0,       -SHIPSPD); break
        case "ArrowDown":  player.move(0,        SHIPSPD); break
        case "ArrowLeft":  player.move(-SHIPSPD, 0      ); break
        case "ArrowRight": player.move( SHIPSPD, 0      ); break

        case "Space": canRetry && retry(); break
        case "Enter": canRetry && retry(); break
    }
})

// start main loop
requestAnimationFrame(mainLoop)
