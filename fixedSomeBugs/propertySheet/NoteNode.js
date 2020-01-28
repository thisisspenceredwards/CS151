/**
 *
 * @returns {{contains: contains, setColor: setColor, toolDraw: toolDraw, getText: (function(): string), getConnectionPoint: getConnectionPoint, clone: (function(): {contains: contains, setColor: setColor, toolDraw: toolDraw, getText: (function(): string), getConnectionPoint: getConnectionPoint, clone, getColor: (function(): *), draw: draw, getBounds: (function(): {x: *, width: undefined, y: *, height: undefined}), translate: translate, setText: setText}), getColor: (function(): *), draw: draw, getBounds: (function(): {x: *, width: undefined, y: *, height: undefined}), translate: translate, setText: setText}}
 */
function createNoteNode() {
  let x = 0
  let y = 0
  let color = 'bisque'
  let table = undefined
  let width = undefined
  let height = undefined
  /**
   * updates the bounds of the table
   */
  function updateWidthHeight()
  {
    let rect = getClientRect(table.id)
    width = rect.width
    height = rect.height
  }
  const container = document.getElementById('nodeContainer')
  table = document.createElement('table')
  table.id = 'noteNodeTable'
  table.className = 'noteNodeTable'
  table.style.backgroundColor = color
  const row1 = table.insertRow()//create row
  row1.id = "row"
  row1.classname = "row"
  const cell1 = row1.insertCell()
  cell1.innerHTML = "Note"
  updateWidthHeight()
  return {
    /**
     * return the bounds of the table
     * @returns {{x: *, width: undefined, y: *, height: undefined}}
     */
    getBounds: () => {
      updateWidthHeight()
      return {
        x: x,
        y: y,
        width: width,
        height: height
      }
    },
    /**
     *
     * @param p if point p is within the object
     * @returns {boolean}
     */
    contains: p => {

      if(p.x >= x && p.x <= (x+width) && p.y >= y && p.y <= y+height)
          return true
      else
          return false
    },
    /**
     *
     * @param dx distance to shift the x
     * @param dy distance to shift the y
     */
    translate: (dx, dy) => {
      x += dx
      y += dy
    },
    /**
     * Draws and adds the table to the graph div
     */
    draw: () => {
            table.style.left = x   + 'px'
            table.style.top = y   + 'px'
            table.style.width = width + 'px'
            table.style.height = height + 'px'
            container.appendChild(table)
            updateWidthHeight()
    },
    /**
     * draws the table on the icon
     * @param anypanel the div for the toolbar
     */
    toolDraw: (anypanel) => {
	        const table = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
          table.setAttribute('x', x - 5)
	        table.setAttribute('y', y - 5)
          table.setAttribute('width', 30)
          table.setAttribute('height', 25)
	        table.setAttribute('rx', 5)
          table.setAttribute('stroke', 'black')
	        table.setAttribute('stroke-width', 1 + 'px')
	        table.setAttribute('fill', 'bisque')
          updateWidthHeight()
          anypanel.appendChild(table)	  
      },
    /**
     *
     * @returns {{contains: contains, setColor: setColor, toolDraw: toolDraw, getText: (function(): string), getConnectionPoint: getConnectionPoint, clone: (function(): {contains: contains, setColor: setColor, toolDraw: toolDraw, getText: (function(): string), getConnectionPoint: getConnectionPoint, clone, getColor: (function(): *), draw: draw, getBounds: (function(): {x: *, width: undefined, y: *, height: undefined}), translate: translate, setText: setText}), getColor: (function(): *), draw: draw, getBounds: (function(): {x: *, width: undefined, y: *, height: undefined}), translate: translate, setText: setText}}
     */
    /**
     *
     * @returns {{contains: contains, setColor: setColor, toolDraw: toolDraw, getText: (function(): string), getConnectionPoint: getConnectionPoint, clone: (function(): {contains: contains, setColor: setColor, toolDraw: toolDraw, getText: (function(): string), getConnectionPoint: getConnectionPoint, clone, getColor: (function(): *), draw: draw, getBounds: (function(): {x: *, width: undefined, y: *, height: undefined}), translate: translate, setText: setText}), getColor: (function(): *), draw: draw, getBounds: (function(): {x: *, width: undefined, y: *, height: undefined}), translate: translate, setText: setText}}
     */
    clone: ()=>{
	return createNoteNode()
    },
    /**
     *
     * @param p point to compare to
     * @returns {{x: number, y: *}|{x: *, y: number}|{x: *, y: *}}
     */
    getConnectionPoint: p=>{
      let centerX = x + width /2
      let centerY = y + height / 2
      let dx = p.x - centerX
      let dy = p.y - centerY
      if(dx < -dy && dx < dy)
	     return {x: centerX - (width / 2), y: centerY}
	 else if(dx >= dy && dx  >= -dy)
	     return {x: centerX + (width / 2), y: centerY}
	 else if(dx >= -dy && dx < dy)
	     return {x: centerX, y: centerY + (height / 2)}
	 else 
	     return {x: centerX, y: centerY - (height / 2)}
    }, 
    /**
     *
     * @param c is the color to set the object to
     */
    setColor: c => { table.style.backgroundColor = c },
    /**
     *
     * @returns {*} the color of the object
     */
    getColor: () => { return color },
    /**
     *
     * @param text sets row within the object to the text
     */
    setText: text => { cell1.innerHTML = ''
      cell1.innerHTML = text },
    /**
     *
     * @returns {string} get the text within the object
     */
    getText: () => { return cell1.innerHTML },
  }
}
