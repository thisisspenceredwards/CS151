/**
 *
 * @returns {{contains: (function(*): boolean), setColor: setColor, toolDraw: toolDraw, getConnectionPoint: getConnectionPoint, clone: (function(): {contains: (function(*): boolean), setColor: setColor, toolDraw: toolDraw, getConnectionPoint: getConnectionPoint, clone, getColor: (function(): *), draw: draw, getBounds: (function(): {x: *, width: *, y: *, height: *}), translate: translate}), getColor: (function(): *), draw: draw, getBounds: (function(): {x: *, width: *, y: *, height: *}), translate: translate}}
 */
function createCircleNode () {
    let x = 0
    let y = 0
    let size = 20
    let color = 'blue'
  return {
    /**
     * get the bounds of this object
     * @returns {{x: *, width: *, y: *, height: *}}
     */
    getBounds: () => {
      return {
        x: x,
        y: y,
        width: size,
        height: size
      }
    },
    /**
     *
     * @param p check if point p is within the object's bounds
     * @returns {boolean} if the object is in the bounds or not
     */
    contains: p => {
      return (x + size / 2 - p.x) ** 2 + (y + size / 2 - p.y) ** 2 <= size ** 2 / 4
    },
    /**
     *
     * @param dx move the x coordinate dx distance
     * @param dy move the y coordinate dy distance
     */
    translate: (dx, dy) => {
      x += dx
      y += dy
    },
    /**
     * draw and add the object to the graph
     */
    draw: () => {
      const panel = document.getElementById('graphpanel')
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.setAttribute('cx', x + size / 2)
      circle.setAttribute('cy', y + size / 2)
      circle.setAttribute('r',size/2)
      circle.setAttribute('fill', color)
      panel.appendChild(circle)
    },
    /**
     * This method is used to draw the image in the toolbar
     * @param anyPanel the div for the toolbar
     */
      toolDraw: (anyPanel) => {
	    
          const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
	  console.log(color)
            circle.setAttribute('cx', x + size / 2)
            circle.setAttribute('cy', y + size / 2)
            circle.setAttribute('r', size / 2)
            circle.setAttribute('fill', color)
            anyPanel.appendChild(circle)
      },
    /**
     *
     * @param p point to compare to
     * @returns {{x: *, y: *}|*}
     */
      getConnectionPoint: p=>{
	  let centerX = x + size / 2
	  let centerY = y + size / 2
	  let dx = p.x - centerX
	  let dy = p.y - centerY
	  let distance = (dx * dx + dy * dy) ** 0.5
	  if(distance === 0) return p
	  else{
	      return {x: centerX + dx * (size / 2) / distance, y: centerY + dy * (size / 2) / distance}
	  }
      },
    /**
     * get duplicate of this object
     * @returns {{contains: (function(*): boolean), setColor: setColor, toolDraw: toolDraw, getConnectionPoint: getConnectionPoint, clone: (function(): {contains: (function(*): boolean), setColor: setColor, toolDraw: toolDraw, getConnectionPoint: getConnectionPoint, clone, getColor: (function(): *), draw: draw, getBounds: (function(): {x: *, width: *, y: *, height: *}), translate: translate}), getColor: (function(): *), draw: draw, getBounds: (function(): {x: *, width: *, y: *, height: *}), translate: translate}}
     */
    clone: ()=>{
      return createCircleNode()
    },
    /**
     *
     * @param c the color to set the object
     */
    setColor: c => { color = c },
    /**
     *
     * @returns {*} the color the object is
     */
      getColor: () => { return color },
  }
}
