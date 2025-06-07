class Ball {

    constructor(x, y, radius, color) {

        this.x = x
        this.y = y
        this.radius = radius
        this.color = color

    }

     //Bereken een donkere versie van de hoofdkleur
    darkenColor(hex, factor){
        const r = Math.floor(parseInt(hex.substr(1, 2), 16) * factor);
        const g = Math.floor(parseInt(hex.substr(3, 2), 16) * factor);
        const b = Math.floor(parseInt(hex.substr(5, 2), 16) * factor);
        return `rgb(${r}, ${g}, ${b})`;
    };

    //Bereken een lichtere versie van de hoofdkleur
    lightenColor(hex, factor){
        const r = Math.min(255, Math.floor(parseInt(hex.substr(1, 2), 16) * factor));
        const g = Math.min(255, Math.floor(parseInt(hex.substr(3, 2), 16) * factor));
        const b = Math.min(255, Math.floor(parseInt(hex.substr(5, 2), 16) * factor));
        return `rgb(${r}, ${g}, ${b})`;
    };

    //Bereken een glans versie van de hoofdkleur
    mixWithWhite(hex, ratio) {
        const r = Math.floor((255 * ratio) + (parseInt(hex.substr(1, 2), 16) * (1 - ratio)));
        const g = Math.floor((255 * ratio) + (parseInt(hex.substr(3, 2), 16) * (1 - ratio)));
        const b = Math.floor((255 * ratio) + (parseInt(hex.substr(5, 2), 16) * (1 - ratio)));
        return `rgb(${r}, ${g}, ${b})`;
    };

    draw(ctx) {

        //Bereken kleurvariaties
        let darkerColor = this.darkenColor(this.color, .9);
        let lighterColor = this.lightenColor(this.color, 1.3)
        let highlightColor = this.mixWithWhite(this.color, .4)

        //Maak een kleurverloop
        let gradient = ctx.createRadialGradient(

            this.x - this.radius * .3, this.y - this.radius * .5, this.radius * 0.1, // lichtbron-positie (iets linksboven)
            this.x, this.y, this.radius
        )

        gradient.addColorStop(0, highlightColor);
        gradient.addColorStop(.3, lighterColor);
        gradient.addColorStop(.7 , this.color)
        gradient.addColorStop(1, darkerColor);

        //Teken de bal
        ctx.save() //Sla de huidige context op
        ctx.beginPath()
        ctx.fillStyle = gradient 

        //0ptionele schaduw
        ctx.shadowColor = 'rgba(0, 0, 0, .8)';
        ctx.shadowBlur = this.radius * .2
        ctx.shadowOffsetX = this.radius / 7
        ctx.shadowOffsetY = this.radius / 10

        ctx.beginPath()
        ctx.fillStyle = gradient
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        ctx.fill()
        ctx.closePath()

        ctx.restore()

    }
}