
let counter = 0
function createObjectNode (xIn, yIn) {
  let x = xIn
  let y = yIn
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
  let className = 'ObjectNodeTable' + counter
  counter++
  table.className = 'ObjectNodeTable'
  const row1 = table.insertRow()//create row
  row1.id = "row"
  row1.classname = "row"

  const cell1 = row1.insertCell()
  cell1.innerHTML = ""
  cell1.setAttribute('colspan',3)
  cell1.style.width = 75 + "px"
  cell1.style.height = 75 + "px"
  let rowContainer = []
  container.appendChild(table)
  updateWidthHeight()
  let newCell1
  let newCell2
  let newCell3
  return {
    getBounds: () => {
      updateWidthHeight()
      return {
        x: x,
        y: y,
        width: width,
        height: height
      }
    },
    contains: p => {
      if (p.x >= x && p.x <= (x + width) && p.y >= y && p.y <= y+ height)
        return true
      else
        return false
    },
    translate: (dx, dy) => {
      x += dx
      y += dy
    },
    draw: () => {
      table.style.left = x + 'px'
      table.style.top = y + 'px'
      table.style.width = width + 'px'
      table.style.height = height + 'px'

      container.appendChild(table)
    },
       getConnectionPoint: p=>{
      let centerX = x + width /2
      let centerY = y + height / 2
      let dx = p.x - centerX
      let dy = p.y - centerY
      let distance = (dx * dx + dy * dy) ** 0.5
      if(dx < -dy && dx < dy)
	     return {x: centerX - (width / 2), y: centerY}
	 else if(dx >= dy && dx  >= -dy)
	     return {x: centerX + (width / 2), y: centerY}
	 else if(dx >= -dy && dx < dy)
	     return {x: centerX, y: centerY + (height / 2)}
	 else 
	     return {x: centerX, y: centerY - (height / 2)}
    },
    addChildNode: (nm, val) =>
    {
       const newRow = table.insertRow(-1)
        newRow.id =  i
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
    getChildName: () => {
      if(nodeToSend === undefined)
        return "No row selected"
       let r = rowContainer[nodeToSend ]
      let rowNumber = parseFloat(nodeToSend) + 1
       return r.cells[0].innerHTML + " " + (rowNumber)
    },
    getChildValue: () => {
      if(nodeToSend === undefined)
        return "No row selected"
      let temp = nodeToSend
      nodeToSend = undefined  //TO make deselecting work, propertysheet reads name first then value so resetting
      let r = rowContainer[temp]//nodeToSend must be done here
      let rowNumber = parseFloat(temp) + 1
      console.log(rowNumber)
      return r.cells[2].innerHTML + " " + rowNumber
    },
    setChildName: text => {
      if(nodeToWriteTo === undefined)
        return "No row selected"
      let r = rowContainer[nodeToWriteTo]
      r.cells[0].innerHTML = ''
        r.cells[0].innerHTML =text
    },
    setChildValue:(text) => {
      if(nodeToWriteTo === undefined)
        return "No row selected"
      let r = rowContainer[nodeToWriteTo ]
      r.cells[2].innerHTML = ''
      r.cells[2].innerHTML =text

    },
    clone: ()=>{
      return createObjectNode(xIn, yIn)
    },
    setName: text => {

      cell1.innerHTML = ''
      cell1.innerHTML =text
    },
    getName: () => { for(let td of table.rows){
      return td.innerText}},
  }
}
