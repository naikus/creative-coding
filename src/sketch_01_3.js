import canvasSketch from "canvas-sketch";
import {math, random} from "canvas-sketch-util";

/**
 * @typedef SketchContext
 * @property {CanvasRenderingContext2D} context
 * @property {Number} width
 * @property {Number} height
 */

const settings = {
    // dimensions: [1024, 1024]
    bleed: 10,
    // export settings
    file: "sketch_01_3.png"
    // ,animate: true
  },

  colors = [
    "#ffd16fcc",
    "#ade359bb",
    "#72ebf988",
    "#e668a777",
    "#00b6d599",
    "#00b6d599",
    "#f8557199",
    "#f8ede8b6",
    "rgba(255, 112, 56, 0.66)"
  ],

  options = {
    fillStyle: "rgb(26, 27, 38)",
    strokeStyle: "rgb(245, 245, 245)"
  };

/**
 * Sets up the canvas with defaults
 * @param {SketchContext} sc
 * @param {Object} opts
 */
function setup(sc) {
  const {context, width, height} = sc;
  context.fillStyle = options.fillStyle;
  context.strokeStyle = options.strokeStyle;
  context.fillRect(0, 0, width, height);
}

function sketch(sc) {
  /**
   * @param {SketchContext} sc
   */
  return function(sc) {
    setup(sc);
    const {context: ctx,  width, height} = sc;
    ctx.fillStyle = "rgba(217, 223, 221, 1)";
    ctx.strokeStyle = "rgba(212, 228, 228, 1)";

    const cx = width * 0.5,
        cy = height * 0.5,
        // create a horizontal strip-like rectangle
        w = width * 0.1,
        h = height * 0.01;

    const slices = 48,
      slice = math.degToRad(360 / slices),
      radius = width * 0.2;

    let x, y;
    for(let i = 0; i < slices; i += 1) {
      const angle = slice * i

      // Get the position and rotation co-ordinates for the strip
      x = Math.cos(angle) * radius + cx;
      y = Math.sin(angle) * radius + cy;


      // Block 1
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(random.range(0.2, 0.5), random.range(0.2, 2));
      ctx.beginPath();
      ctx.rect(-w * random.range(0.2, 2), -h * 0.5, w * random.range(1, 2), h);
      ctx.fillStyle = colors[random.rangeFloor(0, colors.length)];
      ctx.fill();
      ctx.restore();


      // Block 2
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.lineWidth = random.range(3, 20);
      ctx.strokeStyle = "rgb(16, 150, 212)";
      ctx.beginPath();
      ctx.arc(0, 0, radius * random.range(0.2, 1.3), slice * random.range(0.3, -8), slice * random.range(0.3, 8));
      ctx.strokeStyle = colors[random.rangeFloor(0, colors.length)];
      ctx.stroke();
      // ctx.fill();
      ctx.restore();
    }
  };
}

canvasSketch(sketch, settings);
