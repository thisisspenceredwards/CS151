
let counter = 0

/**
 *
 * @param xIn the upper left x value for the object node
 * @param yIn the upper left y value for the object node
 * @returns {{setName: setName, getName: getName, toolDraw: toolDraw, addChildNode: addChildNode, draw: draw, getBounds: (function(): {x: *, width: number, y: *, height: number}), translate: translate, getChildName: getChildName, contains: contains, getChildValue: getChildValue, setChildValue: setChildValue, getConnectionPoint: getConnectionPoint, setChildName: setChildName, clone: (function(): {setName: setName, getName: getName, toolDraw: toolDraw, addChildNode: addChildNode, draw: draw, getBounds: (function(): {x: *, width: number, y: *, height: number}), translate: translate, getChildName: getChildName, contains: contains, getChildValue: getChildValue, setChildValue: setChildValue, getConnectionPoint: getConnectionPoint, setChildName: setChildName, clone})}}
 */
function createObjectNode () {
  let x = 0
  let y = 0
  let width = 125
  let height = 90
  let i = 0
  let nodeToSend = undefined
  let nodeToWriteTo = undefined

  function updateWidthHeight()
  {
    let rect = getClientRect(table.id)
    width = rect.width
    height = rect.height
  }
  const container = document.getElementById('nodeContainer')
  const table = document.createElement('table')
  table.id = 'ObjectNodeTable' + counter
  counter++
  table.className = 'ObjectNodeTable'
  table.zIndex = -1;
  const row1 = table.insertRow()//create row
  row1.id = "row"
  row1.classname = "row"
  const cell1 = row1.insertCell()
  cell1.innerHTML = ""
  cell1.setAttribute('colspan',3)
  cell1.style.width = 75 + "px"
  cell1.style.height = 75 + "px"
  let rowContainer = []
  //container.appendChild(table)
//  updateWidthHeight()
  let newCell1
  let newCell2
  let newCell3
  return {
    /**
     * gets the bounds of the object
     * @returns {{x: *, width: number, y: *, height: number}}
     */
    getBounds: () => {
//      updateWidthHeight()
      return {
        x: x,
        y: y,
        width: width,
        height: height
      }
    },
    /**
     *
     * @param p the mouse point to check for
     * @returns {boolean} if the mouse point is in the object
     */
    contains: p => {
//      updateWidthHeight()
      if (p.x >= x && p.x <= (x + width) && p.y >= y && p.y <= y+ height)
        return true
      else
        return false
    },
    /**
     *
     * @param dx the amount to shift the x value
     * @param dy the amount to shift the y value
     */
    translate: (dx, dy) => {
      x += dx
      y += dy
    },
    /**
     *  draws the object and adds it to the div
     */
    draw: () => {
	//container.appendChild(table)
//      updateWidthHeight()
      table.style.left = x + 'px'
      table.style.top = y+ 'px'
      table.style.width = width + 'px'
      table.style.height = height + 'px'
//      updateWidthHeight()
      container.appendChild(table)
    },
    
      //this method is required for toolbar.js but I have not got it to work
    /**
     *
     * @param anypanel the div to add the draw to
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
	  table.setAttribute('fill', 'white')
          anypanel.appendChild(table)	  
      },
    /**
     *
     * @param p point to compare as to return the correct connection point
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
     * adds a childnode to the object node
     */
    addChildNode: () =>
    {
      const newRow = table.insertRow(-1)
      newRow.id = i
      newCell1 = newRow.insertCell(0)
      newCell2 = newRow.insertCell(1)
      newCell3 = newRow.insertCell(2)
      newCell1.style.whiteSpace = "nowrap"
      newCell3.style.whiteSpace = "nowrap"
      let newText1 = document.createTextNode('Name')
      let newText2 = document.createTextNode('=')
      let newText3 = document.createTextNode('Value')
      newCell1.appendChild(newText1)
      newCell2.appendChild(newText2)
      newCell3.appendChild(newText3)

      newRow.addEventListener('mousedown', event=> {
        console.log("hi this is row " + newRow.id)
        nodeToSend = newRow.id
        nodeToWriteTo = newRow.id
      })
      rowContainer.push(newRow)
      updateWidthHeight()
      console.log(rowContainer)
      i++
    },
    /**
     *
     * @returns {string} gets the name of the child
     */
    getChildName: () => {
      if(nodeToSend === undefined) {

        return "No row selected"
      }
       let r = rowContainer[nodeToSend]
      let rowNumber = parseFloat(nodeToSend) + 1
       return r.cells[0].innerHTML + " " + (rowNumber)
    },
    /**
     *
     * @returns {string} the value of the specific child row
     */
    getChildValue: () => {
      if(nodeToSend === undefined)
        return "No row selected"
      let temp = nodeToSend
      nodeToSend = undefined  //TO make deselecting work, propertysheet reads name first then value so resetting
      let r = rowContainer[temp]//nodeToSend must be done here
      let rowNumber = parseFloat(temp) + 1
      //console.log(rowNumber)
      return r.cells[2].innerHTML + " " + rowNumber
    },
    /**
     *
     * @param text sets the name of the child name cell
     * @returns {string} returns no row selected if no row is selected
     */
    setChildName: text => {
      if(nodeToWriteTo === undefined)
        return "No row selected"
      let r = rowContainer[nodeToWriteTo]
      r.cells[0].innerHTML = ''
      r.cells[0].innerHTML =text
      r.style.backgroundColor = 'White'      
    },
    /**
     *
     * @param text sets the value cell to the input value
     * @returns {string} returns no row selected if no row is selected
     */
    setChildValue:(text) => {
      if(nodeToWriteTo === undefined)
        return "No row selected"
      let r = rowContainer[nodeToWriteTo ]
      r.cells[2].innerHTML = ''
      r.cells[2].innerHTML =text
    },
    /**
     *
     * @returns {{setName: setName, getName: getName, toolDraw: toolDraw, addChildNode: addChildNode, draw: draw, getBounds: (function(): {x: *, width: number, y: *, height: number}), translate: translate, getChildName: getChildName, contains: contains, getChildValue: getChildValue, setChildValue: setChildValue, getConnectionPoint: getConnectionPoint, setChildName: setChildName, clone: (function(): {setName: setName, getName: getName, toolDraw: toolDraw, addChildNode: addChildNode, draw: draw, getBounds: (function(): {x: *, width: number, y: *, height: number}), translate: translate, getChildName: getChildName, contains: contains, getChildValue: getChildValue, setChildValue: setChildValue, getConnectionPoint: getConnectionPoint, setChildName: setChildName, clone})}}
     */
    clone: ()=>{
	return createObjectNode(0,0)
    },
    /**
     *
     * @param text sets the name of the ObjectNode to the input
     */
    setName: text => {

      cell1.innerHTML = ''
      cell1.innerHTML =text
    },
    /**
     *
     * @returns {string} the text within the name field of the object node
     */
    getName: () => { for(let td of table.rows){
      return td.innerText}},
  }
}
