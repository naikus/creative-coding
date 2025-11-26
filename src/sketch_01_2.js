import canvasSketch from "canvas-sketch";

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
    file: "sketch_01.js"
  },

  options = {
    fillStyle: "rgba(21, 31, 41, 1)",
    strokeStyle: "rgb(245, 245, 245)"
  };

function rad(deg) {
  return deg * Math.PI / 180;
}

function degrees(rad) {
  return rad * 180 / Math.PI;
}

function rand(...args) {
  const len = args.length;
  if(!len) {
    return Math.random();
  }
  let start, end;
  if(len === 1) {
    start = 0;
    end = args[0];
  }else if(len >= 2) {
    [start, end] = args;
  }
  return Math.floor(Math.random() * (end - start)) + start;
  // Uncomment this if you want fractional random numbers between start and end
  // return Math.random() * (end - start) + start;
}

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

function sketch() {
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

    const slices = 12,
      slice = rad(360 / slices),
      radius = width * 0.2;

    let x, y;
    for(let i = 0; i < slices; i += 1) {
      const angle = slice * i;

      // Get the position and rotation co-ordinates for the strip
      x = Math.cos(angle) * radius + cx;
      y = Math.sin(angle) * radius + cy;

      ctx.save();
      // A red tick at 12 O'Clock
      if(angle == 3 * Math.PI/2) {
        ctx.fillStyle = "rgba(233, 41, 41, 1)";
      }
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(1, rand(1, 3));
      ctx.beginPath();
      ctx.rect(-w * 0.5, -h * 0.5, w, h);
      ctx.fill();
      ctx.restore();
    }
  };
}

canvasSketch(sketch, settings);
