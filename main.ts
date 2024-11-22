let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

let map: WorldMap;

interface WorldTile {
    sourceX: number;
    sourceY: number;
    x: number;
    y: number;
    hasToDraw: boolean;
}

interface WorldMapLayer {
    tileset: HTMLImageElement;
    tiles: Array<WorldTile>;
}

interface WorldMap {
    layers: Array<WorldMapLayer>
}

async function main() {
    canvas = document.getElementById("canvas") as HTMLCanvasElement;
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D;


    map = await loadMap("map.json");

    window.addEventListener('resize', resizeCanvas, false);
    // Draw canvas border for the first time.
    resizeCanvas();
    update();
}
main();

function update() {
    /* desenha o mapa */
    for (let layer of map.layers) {
        for (let tile of layer.tiles) {
            if(tile.hasToDraw) {
            ctx.drawImage(layer.tileset, tile.sourceX, tile.sourceY, 16, 16, tile.x, tile.y, 16, 16);
            }
        }
    }
    /* ----------------- */

    window.requestAnimationFrame(update);
}

async function loadMap(filename: string) {
    const response = await fetch(`http://localhost:5500/tilemaps/${filename}`);
    const data = await response.json();

    let map: WorldMap = {
        layers: []
    }

    for (let layer of data.layers) {
        let mapLayer: WorldMapLayer = {
            tileset: new Image(),
            tiles: []
        };

        let layerData = await loadLayer(layer.data);
        let tiles = await loadTiles(layerData.tiles);

        let x = 0;
        let y = 0;
        for (let i = 0; i < 2450; i++) {
            const mapping = layerData.mapping[tiles[i].toString()];
            let hasToDraw;
            let mappingX = 0;
            let mappingY = 0;
            if (mapping) {
                hasToDraw = true;
                mappingX = mapping.x;
                mappingY = mapping.y;
            } else {
                hasToDraw = false;
            }

            mapLayer.tiles.push({
                sourceX: mappingX,
                sourceY: mappingY,
                x,
                y,
                hasToDraw: true,
            })

            x += 16;

            if (i % 49 === 0 && i !== 0) { // NAO ME PERGUNTE PQ TEM Q SER 49 e nao 50
                y += 16;
                x = 0;
            }
        }

        mapLayer.tileset = await loadImage(layerData.tileset)
        map.layers.push(mapLayer);
    }
    return map
}

async function loadLayer(filename: string) {
    const response = await fetch(`http://localhost:5500/tilemaps/${filename}`);
    const data = await response.json();

    return data;
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