var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var canvas;
var ctx;
var background = [];
var objects = [];
var backgroundImage = new Image();
var objectsImage = new Image();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    canvas = document.getElementById("canvas");
                    ctx = canvas.getContext("2d");
                    return [4, loadTiles("background.csv")];
                case 1:
                    background = _a.sent();
                    return [4, loadTiles("objects.csv")];
                case 2:
                    objects = _a.sent();
                    return [4, loadImage("background.png")];
                case 3:
                    backgroundImage = _a.sent();
                    return [4, loadImage("background.png")];
                case 4:
                    objectsImage = _a.sent();
                    window.addEventListener('resize', resizeCanvas, false);
                    resizeCanvas();
                    update();
                    return [2];
            }
        });
    });
}
main();
function update() {
    var dx = 0;
    var dy = 0;
    for (var i = 0; i < 2500; i++) {
        if (i % 50 === 0 && i !== 0) {
            dx = 0;
            dy += 32;
        }
        ctx.drawImage(backgroundImage, 96, 176, 16, 16, dx, dy, 32, 32);
        dx += 32;
    }
    window.requestAnimationFrame(update);
}
function loadTiles(filename) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, tiles;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, fetch("http://localhost:5500/tilemaps/".concat(filename))];
                case 1:
                    response = _a.sent();
                    return [4, response.text()];
                case 2:
                    data = _a.sent();
                    tiles = [];
                    data.split(",").forEach(function (tile) {
                        tiles.push(Number.parseInt(tile));
                    });
                    return [2, tiles];
            }
        });
    });
}
function loadImage(filename) {
    return __awaiter(this, void 0, void 0, function () {
        var img;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    img = new Image();
                    img.src = "http://localhost:5500/assets/".concat(filename);
                    return [4, new Promise(function (resolve) {
                            img.onload = function () { return resolve(); };
                        })];
                case 1:
                    _a.sent();
                    return [2, img];
            }
        });
    });
}
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
//# sourceMappingURL=main.js.map