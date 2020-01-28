/**
 *
 * @returns {{contains: (function(*): boolean), setColor: setColor, toolDraw: toolDraw, getConnectionPoint: getConnectionPoint, clone: (function(): {contains: (function(*): boolean), setColor: setColor, toolDraw: toolDraw, getConnectionPoint: getConnectionPoint, clone, getColor: (function(): *), draw: draw, getBounds: (function(): {x: *, width: *, y: number, height: *}), translate: translate}), getColor: (function(): *), draw: draw, getBounds: (function(): {x: *, width: *, y: number, height: *}), translate: translate}}
 */
function createDiamondNode () {
    let x = 0
    let y = 0
    let size = 20
    let color = 'goldenrod'
  return {
    /**
     * get the boundary of the diamond
     * @returns {{x: *, width: *, y: number, height: *}}
     */
    getBounds: () => {
      return {
        x: x,
        y: y - size/2,
        width: size,
        height: size
      }
    },
    /**
     *
     * @param p a point from the mouse
     * @returns {boolean}
     */
    contains: p => {
      return (p.x >= x && p.x <= (x+size) && p.y >= y-size/2 && p.y <= y+size/2)
    },
    /**
     *
     * @param dx the amount to shift x
     * @param dy the amount to shift y
     */
    translate: (dx, dy) => {
      x += dx
      y += dy
    },
    /**
     * Draws diamond and adds it to the graph
     */
    draw: () => {
      const panel = document.getElementById('graphpanel')
      const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
	// console.log("30 + " + x)
	
      poly.setAttribute("points", (x) +" ," + (y) + " " + (x+size/2) + "," +
        (y-size/2) + " " + (x+size) + "," + (y) + " " + (x+size/2) + ", " + (y+size/2))
      poly.setAttribute("fill",(color))
      panel.appendChild(poly)
    },
      //this method is required for toobar.js in order for the node to be shown in the toolbar. FYI: the node is not centered in the tool bar at the moment
    /**
     *
     * @param anyPanel the div that contains the toolbar
     */
      toolDraw: (anyPanel) => {
      const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
        y = y + 8
      poly.setAttribute("points", (x) +" ," + (y) + " " + (x+size/2) + "," +
        (y-size/2) + " " + (x+size) + "," + (y) + " " + (x+size/2) + ", " + (y+size/2))
      poly.setAttribute("fill",(color))
      anyPanel.appendChild(poly)
    },

    /**
     *
     * @param p point to decide on proper return value
     * @returns {{x: number, y: *}|{x: *, y: number}|{x: *, y: *}}
     */
     getConnectionPoint: p =>{
       let centerX = x + size / 2
       let centerY = y 
       let dx = p.x - centerX
       let dy = p.y - centerY

	 console.log(centerX)
	 console.log(centerY)
	 if(dx < -dy && dx < dy)
	     return {x: centerX - (size / 2), y: centerY}
	 else if(dx >= dy && dx  >= -dy)
	     return {x: centerX + (size / 2), y: centerY}
	 else if(dx >= -dy && dx < dy)
	     return {x: centerX, y: centerY + (size / 2)}
	 else 
	     return {x: centerX, y: centerY - (size / 2)}
	 
    },
    /**
     *
     * @param c color to set the diamond
     */
    setColor: c => { color = c },
    /**
     *
     * @returns {*} returns the color of the diamond
     */
    getColor: () => { return color },
    /**
     * returns a clone of the diamond
     * @returns {{contains: (function(*): boolean), setColor: setColor, toolDraw: toolDraw, getConnectionPoint: getConnectionPoint, clone: (function(): {contains: (function(*): boolean), setColor: setColor, toolDraw: toolDraw, getConnectionPoint: getConnectionPoint, clone, getColor: (function(): *), draw: draw, getBounds: (function(): {x: *, width: *, y: number, height: *}), translate: translate}), getColor: (function(): *), draw: draw, getBounds: (function(): {x: *, width: *, y: number, height: *}), translate: translate}}
     */
    clone: () => { return createDiamondNode(0, 0 ,size , color)}
  }
}
