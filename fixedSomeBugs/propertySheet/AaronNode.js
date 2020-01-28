/**
 *
 * @returns {{contains: (function(*): boolean), setColor: setColor, toolDraw: toolDraw, getConnectionPoint: getConnectionPoint, clone: (function(): {contains: (function(*): boolean), setColor: setColor, toolDraw: toolDraw, getConnectionPoint: getConnectionPoint, clone, getColor: (function(): *), draw: draw, getBounds: (function(): {x: *, width: *, y: *, height: *}), translate: translate}), getColor: (function(): *), draw: draw, getBounds: (function(): {x: *, width: *, y: *, height: *}), translate: translate}}
 */
function createAaronNode () {
  let x = 0
  let y = 0
  let size = 180



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
      if (p.x >= x && p.x <= (x + size) && p.y >= y && p.y <= y+ size)
        return true
      else
        return false
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
      const photo = document.createElementNS('http://www.w3.org/2000/svg', 'image')
      photo.setAttribute("href", "propertySheet/funny.PNG")
      photo.setAttribute('x', x)
      photo.setAttribute('y', y)
      //circle.setAttribute('r', size / 2)
      photo.setAttribute('width', size)
      photo.setAttribute('height', size)
      const t = document.createElementNS('http://www.w3.org/2000/svg', 'text' )
      t.setAttribute('x', x - 55)
      t.setAttribute('y', y + 190)
      t.textContent = '\"I bet you won\'t put that in your presentation\" --Aaron'
      t.setAttribute('font-size', 12)
      panel.appendChild(t)
      panel.appendChild(photo)
    },
    /**
     * This method is used to draw the image in the toolbar
     * @param anyPanel the div for the toolbar
     */
    toolDraw: (anyPanel) => {

      const photo = document.createElementNS('http://www.w3.org/2000/svg', 'image')
      photo.setAttribute("href", "propertySheet/funny.PNG")
      photo.setAttribute('x', x-15)
      photo.setAttribute('y', y - 18)
      photo.setAttribute('width', 50)
      photo.setAttribute('height', 50)



      anyPanel.appendChild(photo)
    },
    /**
     *
     * @param p point to compare to
     * @returns {{x: *, y: *}|*}
     */
    getConnectionPoint: p=>{
      let centerX = x + size /2
      let centerY = y + size / 2
      let dx = p.x - centerX
      let dy = p.y - centerY
      if(dx < -dy && dx < dy)
        return {x: centerX - (size/ 2), y: centerY}
      else if(dx >= dy && dx  >= -dy)
        return {x: centerX + (size / 2), y: centerY}
      else if(dx >= -dy && dx < dy)
        return {x: centerX, y: centerY + (size / 2)}
      else
        return {x: centerX, y: centerY - (size / 2)}
    },
    /**
     * get duplicate of this object
     * @returns {{contains: (function(*): boolean), setColor: setColor, toolDraw: toolDraw, getConnectionPoint: getConnectionPoint, clone: (function(): {contains: (function(*): boolean), setColor: setColor, toolDraw: toolDraw, getConnectionPoint: getConnectionPoint, clone, getColor: (function(): *), draw: draw, getBounds: (function(): {x: *, width: *, y: *, height: *}), translate: translate}), getColor: (function(): *), draw: draw, getBounds: (function(): {x: *, width: *, y: *, height: *}), translate: translate}}
     */
    clone: ()=>{
      console.log("this is aaronclone")
      return createAaronNode()
    },
  }
}
