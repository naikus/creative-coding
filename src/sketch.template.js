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
    // file: "sketch"
  },

  options = {
    fillStyle: "rgba(15, 15, 20, 1)",
    strokeStyle: "rgb(245, 245, 245)"
  };


/**
 * Sets up the canvas with defaults
 * @param {SketchContext} sc 
 * @param {Object} opts
 */
function setup(sc) {
  const {context, width, height} = sc, margin = options.margin;
  context.fillStyle = options.fillStyle;
  context.strokeStyle = options.strokeStyle;
  context.fillRect(0, 0, width, height);
}

function sketch() {
  /**
   * @param {SketchContext} drawContext
   */
  return function(sc) {
    setup(sc);
    const {context: ctx, width, height} = sc;
    ctx.fillStyle = "rgba(217, 222, 223, 1)";
    ctx.strokeStyle = "rgba(212, 221, 228, 1)";
  };
}

canvasSketch(sketch, settings);