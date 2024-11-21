let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

let background: number[] = [];
let objects: number[] = [];

let backgroundImage = new Image();
let objectsImage = new Image();

async function main() {
    canvas = document.getElementById("canvas") as HTMLCanvasElement;
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    /* LOADS MAP */
    background = await loadTiles("background.csv");
    objects = await loadTiles("objects.csv");

    backgroundImage = await loadImage("background.png");
    objectsImage = await loadImage("background.png");
    /* --------- */

    window.addEventListener('resize', resizeCanvas, false);
    // Draw canvas border for the first time.
    resizeCanvas();
    update();
}
main();

function update() {
    /* desenha o mapa */
    let dx = 0;
    let dy = 0;
    for (let i = 0; i < 2500; i++) {
        if (i % 50 === 0 && i !== 0) {
            dx = 0;
            dy += 32;
        }
        ctx.drawImage(backgroundImage, 96, 176, 16, 16, dx, dy, 32, 32);
        dx += 32;
    }
    /* ----------------- */

    window.requestAnimationFrame(update);
}

async function loadTiles(filename: string): Promise<number[]> {
    const response = await fetch(`http://localhost:5500/tilemaps/${filename}`);
    const data = await response.text();

    let tiles: number[] = [];
    data.split(",").forEach(tile => {
        tiles.push(Number.parseInt(tile));
    })

    return tiles;
}

async function loadImage(filename: string): Promise<HTMLImageElement> {
    const img = new Image();
    img.src = `http://localhost:5500/assets/${filename}`;

    await new Promise<void>((resolve) => {
        img.onload = () => resolve();
    });

    return img;
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}