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
    strokeStyle: "rgb(245, 245, 245)",
    margin: 5
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
  context.fillRect(margin, margin, width - (margin * 2), height - (margin * 2));
}

function sketch() {
  /**
   * @param {SketchContext} drawContext
   */
  return function(sc) {
    const {context, width, height} = sc;
    setup(sc);

  };
}

canvasSketch(sketch, settings);