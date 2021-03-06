
function createNoteNode (xIn, yIn, color) {
  let x = xIn
  let y = yIn
  let table = undefined
  let width = undefined
  let height = undefined
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
  table.setAttribute("background-color", color)
  const row1 = table.insertRow()//create row
  row1.id = "row"
  row1.classname = "row"
  const cell1 = row1.insertCell()
  //cell1.setAttribute("contenteditable", "true")
  cell1.innerHTML = "Note"
  //container.appendChild(table)
  updateWidthHeight()
  return {
    getBounds: () => {
      //updateWidthHeight()
      return {
        x: x,
        y: y,
        width: width,
        height: height
      }
    },
    contains: p => {
      updateWidthHeight()
      if(p.x >= x && p.x <= (x+width) && p.y >= y && p.y <= y+height)
        return true
      else
        return false
    },
    translate: (dx, dy) => {
      x += dx
      y += dy
    },
    draw: () => {
      table.style.left = x   + 'px'
      table.style.top = y   + 'px'
      table.style.width = width + 'px'
      table.style.height = height + 'px'
      container.appendChild(table)
    },
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
          anypanel.appendChild(table)	  
      },
    clone: ()=>{
	return createNoteNode(xIn, yIn, color)
    },
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
    //does not quite work yet
    setColor: c => { table.removetAttribute("background-color")
      table.setAttribute("background-color", c)},
    getColor: () => { return color },
    setText: text => { cell1.innerHTML = ''
      cell1.innerHTML = text },
    getText: () => { return cell1.innerHTML },
  }
}
