import canvasSketch from "canvas-sketch";
import {math, random} from "canvas-sketch-util";

/**
 * @typedef DrawContext
 * @property {CanvasRenderingContext2D} context
 * @property {Number} width
 * @property {Number} height
 */

const settings = {
    dimensions: [1024, 1024]
  },

  rad = deg => {
    return deg * Math.PI / 180;
  },

  deg = rad => {
    return rad * 180 / Math.PI;
  },

  rand = (...args) => {
    const len = args.length;
    if(!len) {
      return Math.random();
    }
    if(len == 1) {
      const [end] = args;
      return Math.floor(Math.random() * end);
    }else {
      const [start, end] = args;
      return Math.floor(Math.random() * (end - start)) + start;
    }
  },

  colors = [
    "#ffd16fcc",
    "#ade359bb",
    "#72ebf988",
    "#e668a777",
    "#00b6d599",
    "#f8557199",
    "#f8ede8b6"
  ],

  /**
   * @param {DrawContext} drawContext
   * @param {Object} settings
   */
  setup = (drawContext, settings) => {
    const {context, width, height} = drawContext,
        margin = 0,
        bg = "rgba(21, 31, 41, 1)",
        fg = "rgb(245, 245, 245)",
        lineWidth = width * 0.004;

    context.fillStyle = bg;
    context.lineWidth = lineWidth;
    context.fillRect(margin, margin, width - (margin * 2), height - (margin * 2));
    context.stroke();

    context.fillStyle = fg;
    context.strokeStyle = fg;
  },

  sketch = () => {
    // document.body.style.background = "#112233";
    /**
     * @param {DrawContext} drawContext
     */
    return function(drawContext) {
      setup(drawContext, settings);

      const {context, width, height} = drawContext;

      const cx = width * 0.5,
          cy = height * 0.5,
          w = width * 0.01,
          h = height * 0.1,
          num = 48,
          radius = width * 0.3,
          slice = math.degToRad(360 / num), // in radians
          r = random.rangeFloor(num);


      for(let i = 0; i < num; i += 1) {
        const angle = slice * i,
            tx = radius * Math.sin(angle),
            ty = radius * Math.cos(angle);

        // We are doing transformations, save original state
        // 1. Draw the ticks of random thickness
        context.save();
        context.translate(cx+tx, cy+ty);
        context.rotate(-angle);
        context.scale(random.range(0.5, 5), random.range(0.2, 2.5));
        context.fillStyle = colors[random.rangeFloor(0, colors.length)];
        context.beginPath();
        context.rect(
          -w*0.5,
          -h*0.5,
          w, // random(1, 5) * w,
          h // random(0.5, 3) * h
        );
        context.fill();
        context.restore();


        // 2. Arcs!
        context.save();
        context.translate(cx, cy);
        context.rotate(angle);
        context.lineWidth = random.range(5, 30);
        context.strokeStyle = colors[random.rangeFloor(0, colors.length)];
        context.beginPath();
        // /*
        context.arc(
          0,
          0,
          radius * random.range(0.35, 1.5),
          slice * random.range(1, -5),
          slice * random.range(1, 4)
        );
        // */
        context.stroke();
        context.restore();
      }
    };
  };

canvasSketch(sketch, settings);