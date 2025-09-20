import canvasSketch from "canvas-sketch";

/**
 * @typedef sketchContext
 * @property {CanvasRenderingContext2D} context
 * @property {Number} width
 * @property {Number} height
 */

const settings = {
    dimensions: [800, 800],
    bleed: 10,
    // export settings
    file: "sketch_01.png"
    // , animate: true
  },

  options = {
    fillStyle: "rgba(30, 35, 39, 1)",
    strokeStyle: "rgb(245, 245, 245)"
  };


/**
 * Sets up the canvas with defaults
 * @param {SketchContext} sketchContext 
 * @param {Object} opts
 */
function setup(sketchContext) {
  const {context, width, height} = sketchContext;

  // context.save();
  context.fillStyle = options.fillStyle;
  context.strokeStyle = options.strokeStyle;
  context.fillRect(0, 0, width, height);

  // set to defaults
  // context.restore();
}

function sketch() {
  // document.body.style.background = "#112233";
  /**
   * @param {sketchContext} sketchContext
   */
  return function(sketchContext) {
    const {context: ctx, width, height, frame} = sketchContext;
    setup(sketchContext);

    const x = width * 0.4,
        y = height * 0.4,
        w = width * 0.3,
        h = height * 0.3;

    ctx.fillStyle = "rgba(217, 223, 221, 1)";
    ctx.strokeStyle = "rgba(212, 228, 228, 1)";

    ctx.save();
    ctx.beginPath();
    // Align in the center
    // ctx.translate((width - x) / 2 , (height - h) / 2);
    ctx.translate(x, y);
    ctx.rotate(45 * Math.PI / 180); // rotate 45 deg
    // ctx.rect(0, 0, w, h);
    ctx.rect(-w * 0.5, -h * 0.5, w, h);
    ctx.fill();
    ctx.restore();

    ctx.strokeStyle = "rgba(103, 184, 184, 1)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(150, 150, 50, 0, Math.PI * 2);
    ctx.stroke();
  };
}

canvasSketch(sketch, settings);