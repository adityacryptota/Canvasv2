let dpi = window.devicePixelRatio;

function fix_dpi(){
    canvas.setAttribute('height', window.innerHeight * dpi);
    canvas.setAttribute('width', window.innerWidth * dpi);
}

const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');

fix_dpi();


let colorsArray = [
    '#25FFFF',
    '#F7F9FE',
    '#D30004',
    '#FF4F56',
    '#FFFA79'
];

let mouse = {
    x: null,
    y: null
}

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.maxRadius = 75;
    this.colorOfCircle = colorsArray[Math.floor(Math.random() * 5)];
    this.colorOfShadow = colorsArray[Math.floor(Math.random() * 5)];

    this.draw = () => {
        c.beginPath();
        c.shadowBlur = 30;
        c.shadowColor = this.colorOfShadow; 
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.colorOfCircle;
        c.fill();
    }

    this.update = () => {
        this.x += this.dx;
        this.y += this.dy;

        if(this.x + this.radius > window.innerWidth * dpi || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
        if(this.y + this.radius > window.innerHeight * dpi || this.y - this.radius < 0){
            this.dy = -this.dy;
        }

        this.draw();
    }
}

let numberOfCircle = 0;
let arrayOfCircles = [];
while(numberOfCircle < 50){

    let radius = Math.ceil(Math.random() * 10);

    let x = Math.random() * ((innerWidth * dpi) - radius * 2) + radius; 
    let y = Math.random() * ((innerHeight * dpi) - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 2; 
    let dy = (Math.random() - 0.5) * 2; 
    let circle = new Circle(x, y, dx, dy, radius);

    arrayOfCircles.push(circle);
    numberOfCircle++;
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth * dpi, window.innerHeight * dpi);

    for(let i = 0; i < arrayOfCircles.length; i++){
        arrayOfCircles[i].update();
    }
}

animate();

window.addEventListener('resize', (e) => {
    fix_dpi();
})

