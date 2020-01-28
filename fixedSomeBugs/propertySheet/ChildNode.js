
/**
 *
 * @returns {{setName: setName, getValue: (function(): string), contains: contains, getName: (function(): string), toolDraw: toolDraw, getConnectionPoint: getConnectionPoint, setValue: setValue, clone: (function(): {setName: setName, getValue: (function(): string), contains: contains, getName: (function(): string), toolDraw: toolDraw, getConnectionPoint: getConnectionPoint, setValue: setValue, clone, isChildNode: (function(): string), draw: draw, getBounds: (function(): {x: *, width: undefined, y: *, height: undefined}), translate: translate}), isChildNode: (function(): string), draw: draw, getBounds: (function(): {x: *, width: undefined, y: *, height: undefined}), translate: translate}}
 */

function createChildNode() {
  let x = 0
  let y = 0
  let width = undefined
  let height = undefined

  /**
   * for updating the svg grabbers
   */
  function updateWidthHeight()
  {
    let rect = getClientRect(table.id)
    width = rect.width
    height = rect.height
  }
  const container = document.getElementById('nodeContainer')
  const table = document.createElement('table')
  table.id = 'childNodeTable'
  table.className = 'childNodeTable'
  const row1 = table.insertRow()//create row
  row1.id = "row"
  row1.classname = "row"
  const cell1 = row1.insertCell()
  const cell2 = row1.insertCell()
  const cell3 = row1.insertCell()
  cell1.innerHTML = "Name"
  cell2.innerHTML = '='
  cell3.innerHTML = 'Value'

  return {
    /**
     * To check if the node in question is a childNode
     * @returns {string}
     */
    isChildNode: () => {
      return "true"
    },
    /**
     * Get the bounds of the object
     * @returns {{x: *, width: undefined, y: *, height: undefined}}
     */
    getBounds: () => {
      updateWidthHeight()
      return {
        x,
        y,
        width,
        height
      }
    },
    /**
     *
     * @param p the point to check
     * @returns {boolean}
     */
    contains: p => {
      updateWidthHeight()
      if (p.x >= x && p.x <= (x + width) && p.y >= y && p.y <= y+ height)
        return true
      else
        return false
    },
    /**
     *
     * @param dx the amount to move the x coordinate of the object
     * @param dy the amount to move the y coordinate of the object
     */
    translate: (dx, dy) => {
      x += dx
      y += dy
    },
    /**
     *
     * @param p the point p to compare to
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
     * Method that draws the object and adds it to the graph panel
     */
    draw: () => {
      table.style.left = x + 'px'
      table.style.top = y + 'px'
      table.style.width = width + 'px'
      table.style.height = height + 'px'
      container.appendChild(table)
    },
    /**
     *
     * @param anypanel the toolbar that adds the icon
     */
    toolDraw: (anypanel) => {
          const t = document.createElementNS('http://www.w3.org/2000/svg', 'text' )
          t.setAttribute('x', x - 5)
	  t.setAttribute('y', y + 10)	
	  t.textContent = 'name = value'
          t.setAttribute('font-size', 5)
          anypanel.appendChild(t)	  
      },
    /**
     * duplicates the base object
     * @returns {{setName: setName, getValue: (function(): string), contains: contains, getName: (function(): string), toolDraw: toolDraw, getConnectionPoint: getConnectionPoint, setValue: setValue, clone: (function(): {setName: setName, getValue: (function(): string), contains: contains, getName: (function(): string), toolDraw: toolDraw, getConnectionPoint: getConnectionPoint, setValue: setValue, clone, isChildNode: (function(): string), draw: draw, getBounds: (function(): {x: *, width: undefined, y: *, height: undefined}), translate: translate}), isChildNode: (function(): string), draw: draw, getBounds: (function(): {x: *, width: undefined, y: *, height: undefined}), translate: translate}}
     */
    clone: () => {
	return createChildNode()
    },
    /**
     *
     * @param text set the text of the child node
     */
    setName: text => { cell1.innerHTML = ''
      cell1.innerHTML = text },
    /**
     * @returns {string}
     */
    getName: () => { return cell1.innerText},
    /**
     * @param text to set value to
     */
    setValue: text =>{ cell3.innerHTML = ''
     cell3.innerHTML = text},
    /**
     * @returns {string}
     */
    getValue: () =>{return cell3.innerHTML},
  }
}
