
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
      table.style.left = x + 'px'
      table.style.top = y + 'px'
      table.style.width = width + 'px'
      table.style.height = height + 'px'
      container.appendChild(table)
    },
    clone: ()=>{
      return createNoteNode(xIn, yIn)
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
