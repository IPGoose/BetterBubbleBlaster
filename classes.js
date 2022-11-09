// Classes for the game BetterBubbleBlaster.

class Player
{
    constructor(px, py)
    {
        this.position = {
            x: px,
            y: py
        }
    }

    move(rx, ry)
    {
        // woah so complicated
        this.position.x += rx
        this.position.y += ry

        if (this.position.x < 0)      this.position.x = 0
        if (this.position.x > WIDTH)  this.position.x = WIDTH
        if (this.position.y < 0)      this.position.y = 0
        if (this.position.y > HEIGHT) this.position.y = HEIGHT

    }

    draw()
    {
        ctx.strokeStyle = "#f00"

        // shipId
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, SHIPR, 0, 2 * Math.PI);
        ctx.stroke();

        // shipId2 (just a triangle lol)
        drawFilledPoly("#f00", this.position.x, this.position.y, [5, 5, 5, 25, 30, 15])
    }
}

class Bubble
{
    constructor(bx, by, spd, rad, seed)
    {
        this.position = {
            x: bx,
            y: by
        }

        this.speed = spd
        this.radius = rad

        this.seed = seed

        this.popped = false
    }

    frame()
    {
        this.position.x -= this.speed
        this.position.y += Math.sin(Date.now()/500 + this.seed)*1
        !this.popped && this.draw()
    }

    draw()
    {
        ctx.strokeStyle = "#00f"

        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
}
