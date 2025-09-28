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
    animate: true
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

function rect(width = 10, height = 5) {
  const scaleX = random.range(0.2, 0.6),
      scaleY = random.range(0.2, 2);
  
  let x = -width * random.range(0.2, 2),
      y = -height * 0.5,
      w = width * random.range(1, 2),
      h = height,
      clr = colors[random.rangeFloor(0, colors.length)];

  // @TODO
  return (ctx) => {
    w = w - 0.5;
    if(w <= 0) {
      w = width * random.range(1, 2);
      // /*
      x = -width * random.range(0.2, 2);
      y = -height * random.range(0.2, 0.5);
      // */
    };
    ctx.fillStyle = clr;
    ctx.scale(scaleX, scaleY);
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fill();
  }
}

function arc(radius, sliceAngle) {
  const lw = random.range(2, 20),
      color = colors[random.rangeFloor(0, colors.length)];

  let r = radius * random.range(0.2, 1.3),
      sa = sliceAngle * random.range(0.3, -8),
      ea = sliceAngle * random.range(0.3, 8);

  return (ctx) => {
    sa = sa + 0.009;
    ea = ea - 0.005;
    if(sa >= ea) {
      sa = sliceAngle * random.range(0.3, -8),
      ea = sliceAngle * random.range(0.3, 8);
      r = radius * random.range(0.2, 1.3);
    }

    ctx.lineWidth = lw;
    ctx.beginPath();
    ctx.arc(0, 0, r, sa, ea);
    ctx.strokeStyle = color;
    ctx.stroke();
  };
}

function sketch(sc) {
  const {width, height} = sc,
      slices = 48,
      slice = math.degToRad(360 / slices),
      radius = width * 0.3,
      rects = [],
      arcs = [];

  for(let i = 0; i < slices; i += 1) {
    rects.push(rect(width * 0.1, height * 0.01));
    arcs.push(arc(radius, slice))
  }

  /**
   * @param {SketchContext} sc
   */
  return function(sc) {
    setup(sc);
    const {context: ctx,  width, height} = sc;
    ctx.fillStyle = "rgba(217, 223, 221, 1)";
    ctx.strokeStyle = "rgba(212, 228, 228, 1)";

    const cx = width * 0.5,
        cy = height * 0.5;

    let x, y;
    for(let i = 0; i < slices; i += 1) {
      const angle = slice * i;

      // Get the position and rotation co-ordinates for the strip
      x = Math.cos(angle) * radius + cx;
      y = Math.sin(angle) * radius + cy;

      // Block 1
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      rects[i](ctx);
      ctx.restore();

      // Block 2
      // /*
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      arcs[i](ctx);
      ctx.restore();
      // */
    }
  };
}

canvasSketch(sketch, settings);