let childCounter = 0
function createChildNode(xIn, yIn) {
  let x = xIn
  let y = yIn
  let width = undefined
  let height = undefined
  function updateWidthHeight()
  {
    let rect = getClientRect(table.id)
    width = rect.width
    height = rect.height
  }
  const container = document.getElementById('nodeContainer')
  const table = document.createElement('table')
  table.id = 'childNodeTable' + childCounter
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
  //container.appendChild(table)
// updateWidthHeight()
  childCounter++
  return {
    isChildNode: () => {
      return "true"
    },
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
      updateWidthHeight()
      if (p.x >= x && p.x <= (x + width) && p.y >= y && p.y <= y+ height)
        return true
      else
        return false
    },
    translate: (dx, dy) => {
      x += dx
      y += dy
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
    draw: () => {
      table.style.left = x + 'px'
      table.style.top = y + 'px'
      table.style.width = width + 'px'
      table.style.height = height + 'px'
      container.appendChild(table)
    },
    toolDraw: (anypanel) => {
          const t = document.createElementNS('http://www.w3.org/2000/svg', 'text' )
          t.setAttribute('x', x -10)
	  t.setAttribute('y', y + 10)	
	  t.textContent = 'name = value'
          t.setAttribute('font-size', 5)
          anypanel.appendChild(t)	  
      },
    clone: () => {
      return createChildNode(x,y)
    },
    setName: text => { cell1.innerHTML = ''
      cell1.innerHTML = text },
    getName: () => { return cell1.innerText},
    setValue: text =>{ cell3.innerHTML = ''
     cell3.innerHTML = text},
    getValue: () =>{return cell3.innerHTML},
  }
}
