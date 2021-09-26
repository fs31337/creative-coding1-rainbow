const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d"); //context
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0;

window.addEventListener("resize", function () {
    //quitamos estiramiento de canva para que no distorcione
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: undefined,
    y: undefined,
};
canvas.addEventListener("click", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 10; i++) {
        particlesArray.push(new Particle());
    }
    //   drawCircle();
});

canvas.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 2; i++) {
        particlesArray.push(new Particle());
    }
    //   drawCircle();
});

class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height;
        this.size = Math.random() * 15 + 1;
        //vector of movement
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = "hsl(+" + hue + ", 100%, 50%)"; //si creo el color acá, cada nueva particula va a comenzar con un color nuevo y no cambiando todas.
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }
    draw() {
        ctx.fillStyle = this.color;
        // ctx.strokeStyle = "red";
        // ctx.lineWidth = 5;
        ctx.beginPath();
        //pintar linea curva, semi-circulo o circulo
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        //Math.pi * 2 converts to 360 deg, entire circle
        ctx.fill();
        // ctx.stroke();
    }
}

// function init() {
//     for (let i = 0; i < 100; i++) {
//         particlesArray.push(new Particle());
//     }
// }
// init();

function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        if (particlesArray[i].size <= 0.3) {
            particlesArray.splice(i, 1); //remove one element in this case, have many uses
            i--; //para no saltearnos particulas al eliminar una
        }
    }
}
//se llama a si misma y crea un loop
function animate() {
    //Limpia todo
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,0,0,0.02)";
    //spines error
    // ctx.fillRect(0, 0, canvas.with, canvas.height);
    //video
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    //change the speed of color changing
    hue += 0.5;
    requestAnimationFrame(animate);
}
animate();
