//started messing around with this; still doesn't work though
function addChildNode(t){
  const parent = t
  const newRow = parent.insertRow(-1)
  newRow.id = "row"
  let newCell1 = newRow.insertCell(0)
  let newCell2 = newRow.insertCell(1)
  let newCell3 = newRow.insertCell(2)
  newCell1.style.whiteSpace = "nowrap"
  newCell3.style.whiteSpace = "nowrap"
  let newText1 = document.createTextNode('Name')
  let newText2 = document.createTextNode('=')
  let newText3 = document.createTextNode('Value')
  newCell1.appendChild(newText1)
  newCell2.appendChild(newText2)
  newCell3.appendChild(newText3)
}

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
  container.appendChild(table)
  updateWidthHeight()
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
    clone: ()=> {
      createChildNode(xIn,yIn)
    },
    setName: text => { cell1.innerHTML = ''
      cell1.innerHTML = text },
    getName: () => { return cell1.innerText},
    setValue: text =>{ cell3.innerHTML = ''
     cell3.innerHTML = text},
    getValue: () =>{return cell3.innerHTML},
  }
}
