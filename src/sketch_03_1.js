import canvasSketch from "canvas-sketch";
import {math, random} from "canvas-sketch-util";


/**
 * @typedef SketchContext
 * @property {CanvasRenderingContext2D} context
 * @property {Number} width
 * @property {Number} height
 */

const settings = {
    dimensions: [1024, 1024],
    animate: true,
    bleed: 10
    // export settings
    // file: "sketch"
  },

  options = {
    fillStyle: "rgba(24, 24, 43, 1)",
    strokeStyle: "rgba(103, 112, 153, 1)"
  };

function vec(vx = 10, vy = 10) {
  return {
    x: vx,
    y: vy,
    distanceTo(otherVec) {
      const dx = this.x - otherVec.x, dy = this.y - otherVec.y;
      return Math.sqrt((dx * dx) + (dy * dy));
    }
  }
}

function agent(x, y) {
  const lineWidth = 6,
      position = vec(x, y),
      radius = random.range(2, 10),
      velocity = vec(random.range(-2, 2), random.range(-2, 2));

  return {
    position,
    radius,
    velocity,

    update(width, height) {
      const {x, y} = position, threshold = radius + lineWidth

      if(x <= threshold || x + threshold >= width) {
        velocity.x = -velocity.x;
      }
      if(y <= threshold || y + threshold >= height) {
        velocity.y = -velocity.y;
      }

      position.x += velocity.x;
      position.y += velocity.y;
    },

    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
      const {x, y} = position;

      ctx.save();
      ctx.translate(x, y);
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);

      ctx.lineWidth = lineWidth;
      // ctx.strokeStyle = `rgba(103, 112, 153, 1)"`;
      ctx.stroke();
      ctx.fill();
      ctx.restore();
    }
  };
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

function sketch(skCtx) {
  const {width, height} = skCtx,
    numAgents = 60,
    agents = [];
  
  for(let i = 0; i < numAgents; i += 1) {
    agents.push(agent(
      random.rangeFloor(10, width),
      random.rangeFloor(10, height),
      10
    ));
  }

  /**
   * @param {SketchContext} sc
   */
  return function render(sc) {
    setup(sc);
    const {context: ctx, width, height} = sc;
    ctx.fillStyle = options.fillStyle;
    ctx.strokeStyle = options.strokeStyle;
    ctx.lineWidth = 3;

    for(let i = 0; i < agents.length; i += 1) {
      const agentA = agents[i];

      for(let j = i; j < agents.length; j += 1) {
        const agentB = agents[j],
            dist = agentA.position.distanceTo(agentB.position);

        if(dist > 200) continue;

        const alpha = math.mapRange(dist, 0, 200, 1, 0);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(agentA.position.x, agentA.position.y);
        ctx.lineTo(agentB.position.x, agentB.position.y);
        ctx.strokeStyle = `rgba(103, 112, 153, ${alpha})`;
        ctx.stroke();
        ctx.restore();
      }

      agentA.update(width, height);
      agentA.draw(ctx);
    }

  };
}

canvasSketch(sketch, settings);