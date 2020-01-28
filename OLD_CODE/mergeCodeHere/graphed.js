'use strict'

function center(rect) {
  return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
}


function createCircleNode1 (xIn, yIn, colorIn) {
  let x = xIn
  let y = yIn
  const width = 80   //got number from Violet source code
  const height = 60  //got number from Violet source code
  const color = colorIn
  return {

    getBounds: () => {

    return {
      x: x,
      y: y,
      width: 80,
      height: 60
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
    const panel = document.getElementById('graphpanel')
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    rect.setAttribute('x', x )
    rect.setAttribute('y', y )
    rect.setAttribute('width', width)
    rect.setAttribute('height', height)
    rect.setAttribute('stroke', 'black')
    rect.setAttribute('fill', color)
    rect.setAttribute('stroke-width', 0.5)
    panel.appendChild(rect)
  }
}
}

function drawToolBar() {
  return {
  getBounds: () => {

      return {
        x: 10,
        y: 10,
        width: 380,
        height: 50
      }
    },

contains: p => {
      return false
    },
draw: () => {
  const panel = document.getElementById('graphpanel')
  const toolBar = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
  toolBar.setAttribute ('x', 10)
  toolBar.setAttribute ('y', 10)
  toolBar.setAttribute ('width', 380)
  toolBar.setAttribute ('height', 50)
  toolBar.setAttribute('fill', 'white')
  toolBar.setAttribute('stroke', 'black')
  toolBar.setAttribute('stroke-width', 0.5)
  panel.appendChild(toolBar)  
}
}

}

function drawObjectNode() {
  return {
  getBounds: () => {

      return {
        x: 50,
        y: 20,
        width: 30,
        height: 20
      }
    },

contains: p => {
      return p.x >= 50 && p.y >= 20 && p.x <= 80 && p.y <= 50
    },
draw: () => {
  const panel = document.getElementById('graphpanel')
  const toolBar = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    //<rect x="100" y="100" width="100" height="70"  stroke="gray" stroke-width="5" fill="white" />
  toolBar.setAttribute ('x', 50)
  toolBar.setAttribute ('y', 20)
  toolBar.setAttribute ('width', 30)
  toolBar.setAttribute ('height', 20)
  toolBar.setAttribute('fill', 'white')
  toolBar.setAttribute('stroke', 'gray')
  toolBar.setAttribute('stroke-width', 0.5)
  panel.appendChild(toolBar)  
  }
  // crate: (p) => {

  // }
}
}

function drawDiamondNode() {
  return {
    getBounds: () => {

    return {
      x: 150,
      y: 20,
      width: 30,
      height: 30
    }
  },

      contains: p => {
    return p.x >= 150 && p.y >= 20 && p.x <= 180 && p.y <= 50
  },
  draw: () => {
    const panel = document.getElementById('graphpanel')
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')

        // <rect x="100" y="100" width="100" height="100" rx="30" ry="30" stroke="gray" stroke-width="5" fill="white" />
        //
        //
        //
        // <polygon points="150 185 185 150 150 115 115 150" fill="none" stroke="black" stroke-width="5"/>
    //<rect x="100" y="100" width="100" height="70"  stroke="gray" stroke-width="5" fill="white" />
    rect.setAttribute ('x', 150)
    rect.setAttribute ('y', 20)
    rect.setAttribute ('width', 30)
    rect.setAttribute ('height', 30)
    rect.setAttribute('rx', 3)
    rect.setAttribute('ry', 3)
    rect.setAttribute('fill', "white")
    rect.setAttribute('stroke', "gray")
    rect.setAttribute('stroke-width', 0.5)
    const diam = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
    diam.setAttribute('points', "165 23 177 35 165 47 153 35")
    diam.setAttribute('fill', "white")
    diam.setAttribute('stroke', "black")
    diam.setAttribute('stroke-width', 0.5)
    panel.appendChild(rect)
    panel.appendChild(diam)
  }
  // crate: (p) => {

  // }
}
}

function drawNoteNode() {
   return {
  getBounds: () => {

      return {
        x: 100,
        y: 20,
        width: 30,
        height: 30
      }
    },
    contains: p => {
      return p.x >= 100 && p.y >= 20 && p.x <= 130 && p.y <= 50
    },
  draw: () => {
  const panel = document.getElementById('graphpanel')
  const nodeP = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
    //<polygon points="100 100 180 100 180 120 200 120 200 170 100 170 " fill="wheat" stroke="black" stroke-width="2"/>
    //   <line x1="180" y1="100" x2="200" y2="120"  stroke-width="2" style="stroke:black" />
    nodeP.setAttribute('points', "100 20 100 40 130 40 130 25 125 25 125 20 ")
    nodeP.setAttribute('fill', "wheat")
    nodeP.setAttribute('stroke', "black")
    nodeP.setAttribute('stroke-width', 0.5)

    const nodeL = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    nodeL.setAttribute('x1', 125)
    nodeL.setAttribute('y1', 20)
    nodeL.setAttribute('x2', 130)
    nodeL.setAttribute('y2', 25)
    nodeL.setAttribute('stroke',  'black')
    nodeL.setAttribute('stroke-width', 0.5)

  panel.appendChild(nodeP)
    panel.appendChild(nodeL)
}
}
}




/*
This function is used to enable the edges to be edited via the property editor
*/
function createEdge(bool) {
  let start = undefined
  let end = undefined
  let p
  let q
  let isSelected = false
  let bend = 'Straight'
  const panel = document.getElementById('graphpanel')
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    const vLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    const hLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
  return {
    connect: (s, e) => {
      start = s
      end = e
    },
    getBounds: () => {
        return {
          x: p.x,
          y: p.y,
          width: q.x - p.x,
          height: q.y - p.y
        }
    },
    contains: z => {
     //find slope of current line
      p = center(start.getBounds())
      q = center(end.getBounds())
      isSelected = false
      if(q.x !== p.x)//does not work if the x's are the same
      {
        let slope = (q.y - p.y)/(q.x - p.x)
        let yIntercept = q.y - (slope*q.x)
        let equation = (slope*z.x) + yIntercept
        if ( equation >z.y- 10 && (slope*z.x) + yIntercept < z.y+10 ) {
          isSelected = true
          return true
        }
      }
      else if (p.x >= (q.x - 5) && (p.x <= q.x + 5) && p.x + 10 >= z.x && p.x - 10 <= z.x )//if x = x
      {
        isSelected = true
          return true
      }
      else{
        isSelected = false
        return false
      }
    },
    translate: () => {
      return
    },
      draw: () => {
      
      line.id = 'solidEdge'
      const p = center(start.getBounds())
      const q = center(end.getBounds())
      line.setAttribute('x1', p.x )
      line.setAttribute('x2', q.x)
      line.setAttribute('y1', p.y)
      line.setAttribute('y2', q.y )
      if(isSelected === true)
      {
        line.setAttribute('stroke', 'darkgrey')
      }
      else {
        line.setAttribute('stroke', 'black')
      }
	  line.setAttribute('stroke-width', '1')
	  if(bool === 1)
	      line.setAttribute('stroke-dasharray', '4', '4')
	  
	  if(bend === 'HV')
	  {	      
	      line.setAttribute('x1', p.x)
	      line.setAttribute('x2', q.x)
	      line.setAttribute('y1', p.y)
	      line.setAttribute('y2', p.y)
	      vLine.setAttribute('stroke', 'black')
	      vLine.setAttribute('stroke-width', '1')
	      vLine.setAttribute('x1', q.x)
	      vLine.setAttribute('x2', q.x)
	      vLine.setAttribute('y1', p.y)
	      vLine.setAttribute('y2', q.y)
	      panel.append(vLine)
	  }
	  else if(bend === 'VH')
	  {
	      console.log("I am in here for some reason")
	      line.setAttribute('x1', p.x)
	      line.setAttribute('x2', p.x)
	      line.setAttribute('y1', p.y)
	      line.setAttribute('y2', q.y)
	      hLine.setAttribute('stroke', 'black')
	      hLine.setAttribute('stroke-width', '1')
	      hLine.setAttribute('x1', p.x)
	      hLine.setAttribute('x2', q.x)
	      hLine.setAttribute('y1', q.y)
	      hLine.setAttribute('y2', q.y)	      
	      panel.append(hLine)
	  }
      panel.append(line)	
    },
    clone: ()=>{
      return createSolidEdge()
    },
      
      getStroke: () =>{
	  if(bool == 0)
	      return 'Solid - Type 1 to change to dotted'
	  else
	      return 'Dotted - Type 0 to change to solid'
      },
      setStroke: b =>{
	  if(b == 0){
	      line.removeAttribute('stroke-dasharray')
	      vLine.removeAttribute('stroke-dasharray')
	      hLine.removeAttribute('stroke-dasharray')
	  }
	  else{
              line.setAttribute('stroke-dasharray', '4', '4')
              vLine.setAttribute('stroke-dasharray', '4', '4')
	      hLine.setAttribute('stroke-dasharray', '4', '4')
	      bool = b
	  }
      },
      getBend:() =>{
	  return bend
      },
      setBend: d =>{
	  if(d === 'HV')
	      bend = 'HV'
	  else if(d === 'VH')	     
	      bend = 'VH'
	  else
	      bend = 'Straight'	  	  
      }
  }
}

function getClientRect(id) {
  var div = document.getElementById(id);

  if (div == null)
  {
    return new DOMRect();
  }

  return div.getBoundingClientRect();
}

/**********************************/
/*
NOTE: can be used to connect Object nodes to Object nodes, Note nodes to Note nodes, or Object nodes to Note nodes. Will implement this later on in the project.
*/ 
function createSolidEdge() {
  let start = undefined
  let end = undefined
  let p
  let q
  let isSelected = false
  return {
    connect: (s, e) => {
      start = s
      end = e
    },
    getBounds: () => {
        return {
          x: p.x,
          y: p.y,
          width: q.x - p.x,
          height: q.y - p.y
        }
    },
  contains: z => {
    //find slope of current line
    p = center(start.getBounds())
    q = center(end.getBounds())
    isSelected = false
    let minimumX
    let minimumY
    let maximumX
    let maximumY
    if(p.x > q.x){
      maximumX = p.x
      minimumX = q.x
    }
    else {
      maximumX = q.x
      minimumX = p.x
    }
    if(p.y > q.y) {
      maximumY = p.y
      minimumY = q.y
    }
    else {
      maximumY = q.y
      minimumY = p.y
    }
    if( Math.abs(q.x - p.x) > 10)//does not work if the x's are the same or too close to the same value
    {
      let slope = (q.y - p.y)/(q.x - p.x)
      let yIntercept = q.y - (slope*q.x) //solve for b
      let equation = (slope*z.x) + yIntercept  //find what Y should be given an X to be on the line
      if ( equation >= z.y- 10 && equation <= z.y+10 && z.x >= minimumX-10 && z.x <= maximumX+10 && z.y >= minimumY-10 && z.y <= maximumY+10 ) {
        isSelected = true
        return true
      }
    }
    else if (p.x + 10 >= z.x && p.x - 10 <= z.x && z.y >= minimumY-10 && z.y <= maximumY+10 )//if x = x
    {
      isSelected = true
      return true
    }
    else{
      isSelected = false
      return false
    }
  },
    translate: () => {
      return
    },
      draw: () => {
      const panel = document.getElementById('graphpanel')
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        line.id = 'solidEdge'
      const p = center(start.getBounds())
      const q = center(end.getBounds())
      line.setAttribute('x1', p.x )
      line.setAttribute('x2', q.x)
      line.setAttribute('y1', p.y)
      line.setAttribute('y2', q.y )
      if(isSelected === true)
      {
        line.setAttribute('stroke', 'darkgrey')
      }
      else {
        line.setAttribute('stroke', 'black')
      }
      line.setAttribute('stroke-width', '1')
      panel.append(line)	
    },
    clone: ()=>{
      return createSolidEdge()
    }
  }
}

/*
NOTE: can only be used to connect Note nodes to Note nodes or Note nodes to Object nodes, NOT Object nodes to Object nodes. Will implement this later on in the project
*/
function createDottedEdge() {
  let start = undefined
  let end = undefined
  let p
  let q
  let isSelected
  return {
    connect: (s, e) => {
      start = s
      end = e
    },
    getBounds: () => {
      return {
        x: p.x,
        y: p.y,
        width: q.x - p.x,
        height: q.y - p.y
      }
    },
  contains: z => {
    //find slope of current line
    p = center(start.getBounds())
    q = center(end.getBounds())
    isSelected = false
    let minimumX
    let minimumY
    let maximumX
    let maximumY
    if(p.x > q.x){
      maximumX = p.x
      minimumX = q.x
    }
    else {
      maximumX = q.x
      minimumX = p.x
    }
    if(p.y > q.y) {
      maximumY = p.y
      minimumY = q.y
    }
    else {
      maximumY = q.y
      minimumY = p.y
    }
    if( Math.abs(q.x - p.x) > 10)//does not work if the x's are the same or too close to the same value
    {
      let slope = (q.y - p.y)/(q.x - p.x)
      let yIntercept = q.y - (slope*q.x) //solve for b
      let equation = (slope*z.x) + yIntercept  //find what Y should be given an X to be on the line
      if ( equation >= z.y- 10 && equation <= z.y+10 && z.x >= minimumX-10 && z.x <= maximumX+10 && z.y >= minimumY-10 && z.y <= maximumY+10 ) {
        isSelected = true
        return true
      }
    }
    else if (p.x + 10 >= z.x && p.x - 10 <= z.x && z.y >= minimumY-10 && z.y <= maximumY+10 )//if x = x
    {
      isSelected = true
      return true
    }
    else{
      isSelected = false
      return false
    }
  },
    translate: () => {
      return
    },
      draw: () => {
      const panel = document.getElementById('graphpanel')
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      const p = center(start.getBounds())
      const q = center(end.getBounds())
      line.setAttribute('x1', p.x )
      line.setAttribute('x2', q.x)
      line.setAttribute('y1', p.y)
      line.setAttribute('y2', q.y )
        if(isSelected === true)
        {
          line.setAttribute('stroke', 'darkgrey')
        }
        else {
          line.setAttribute('stroke', 'black')
        }
      line.setAttribute('stroke-dasharray', '4', '4')
      panel.append(line)	
    },
    clone : ()=>
    {
      createDottedEdge()
    }
  }
}

function drawGrabber(x, y) {
  const size = 5;
  const panel = document.getElementById('graphpanel')
  const square = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
  square.setAttribute('x', x - size / 2)
  square.setAttribute('y', y - size / 2)
  square.setAttribute('width', size)
  square.setAttribute('height', size)
  square.setAttribute('fill', 'mediumorchid') //this color is closest to on violet, feel free to change it if you guys want to
  panel.appendChild(square)  
}

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
      getName: () => { return cell1.innerText },
      setValue: text =>{ cell3.innerHTML = ''
			 cell3.innerHTML = text},
      getValue: () =>{return cell3.innerHTML},
  }
}

function createObjectNode (xIn, yIn) {
  let x = xIn
  let y = yIn
  let width = 125
  let height = 90
  function updateWidthHeight()
  {
    let rect = getClientRect(table.id)
    width = rect.width
    height = rect.height
  }
  const container = document.getElementById('nodeContainer')
  const table = document.createElement('table')
  table.id = 'ObjectNodeTable'
  table.className = 'ObjectNodeTable'
  const row1 = table.insertRow()//create row
  row1.id = "row"
  row1.classname = "row"
  const row2 = table.insertRow()
  row2.id = "row"
  row2.classname = "row"
  const cell1 = row1.insertCell()
  cell1.innerHTML = ""
  cell1.setAttribute('colspan',3)

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
    draw: () => {
      table.style.left = x + 'px'
      table.style.top = y + 'px'
      table.style.width = width + 'px'
      table.style.height = height + 'px'
      container.appendChild(table)
    },
    addChildNode: (nm, val) =>
    {
      const newRow = table.insertRow(-1)
      newRow.id = "row"
      //newRow.setAttribute("contenteditable", "true")
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

      updateWidthHeight()
    },
    clone: ()=>{
          return createObjectNode(xIn, yIn)
    },
    setName: text => { cell1.innerHTML = ''
		       cell1.innerHTML =text
		     },
      getName: () => { for(let td of table.rows){
	  return td.innerText}},
  }
}

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

function createDiamondNode (x, y, sizeIn,color) {
  let size = sizeIn
  let width = 40
  let height = 65
  return {
    getBounds: () => {
      return {
        x: x,
        y: y - size/2,
        width: size,
        height: size
      }
    },
    contains: p => {
      return (p.x >= x && p.x <= (x+size) && p.y >= y-size/2 && p.y <= y+size/2)
    },
    translate: (dx, dy) => {
      x += dx
      y += dy
    },
    draw: () => {
      const panel = document.getElementById('graphpanel')
      const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
     // console.log("30 + " + x)
      poly.setAttribute("points", (x) +" ," + (y) + " " + (x+size/2) + "," +
        (y-size/2) + " " + (x+size) + "," + (y) + " " + (x+size/2) + ", " + (y+size/2))
      poly.setAttribute("fill",(color))
      panel.appendChild(poly)
    },
    clone: ()=>{
      return createDiamondNode(x, y, color)
    },
    setColor: c => { color = c },
    getColor: () => { return color }
  }
}

function createCircleNode (x, y, size, color) {
  return {
    getBounds: () => {
      return {
        x: x,
        y: y,
        width: size,
        height: size
      }
    },
    contains: p => {
      return (x + size / 2 - p.x) ** 2 + (y + size / 2 - p.y) ** 2 <= size ** 2 / 4
    },
    translate: (dx, dy) => {
      x += dx
      y += dy
    },
    draw: () => {
      const panel = document.getElementById('graphpanel')
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.setAttribute('cx', x + size / 2)
      circle.setAttribute('cy', y + size / 2)
      circle.setAttribute('r',size/2)
      circle.setAttribute('fill', color)
      panel.appendChild(circle)
    },
    clone: ()=>{
      return createCircleNode(x, y, size, color)
    },
    setColor: c => { color = c },
    getColor: () => { return color },  
  }
}

function modify (pane, val, onchange) {
  const inp = document.createElement('input')
  inp.value = val  
  inp.onchange = () => { onchange(inp.value) }  
  pane.appendChild(inp)
  pane.appendChild(document.createElement('br')) 
}

function showProps (obj, pane) { s
  let element
  for (const prop of Object.getOwnPropertyNames(obj).filter(x => typeof obj[x] !== 'function')) { 
    element = obj[prop]
    const setter = (val) => { obj[prop] = val }
    const label = document.createTextNode(prop + ': ')
    pane.appendChild(label)
    modify(pane, element, setter)
    
  }
}

function showProperties (obj) {
  const pane = document.getElementById('propertyEditor')
  pane.innerHTML = ''
  let element
  for (const property of Object.getOwnPropertyNames(obj).filter(func => (typeof obj[func] === 'function' && func.substring(0, 3) === 'set'))) { 
    element = obj['g' + property.substring(1)]()
    const attribute = document.createTextNode(property.substring(3) + ': ')
    pane.appendChild(attribute)    
    modify(pane, element, obj[property])    
  }
}
       
class Graph {
  constructor() {
    this.nodes = []
    this.edges = []
    this.toolbar = []
  }
  connect(e, p1, p2) {
    const n1 = this.findNode(p1)
    const n2 = this.findNode(p2)
    if (n1 !== undefined && n2 !== undefined) {
      e.connect(n1, n2)
      this.edges.push(e)
      return true
    }
    return false
  }

  addToolbar(n){
     this.toolbar.push(n)
  }

  selectTool(p){
    for (let i = this.toolbar.length - 1; i >= 0; i--) {
      const n = this.toolbar[i]
      if (n.contains(p)) return n
    }
    return undefined
  }

  add(n) {
      this.nodes.push(n)
      
  }
  // function removeEdge
  //   function findEdge
  findNode(p) {
    for (let i = this.nodes.length - 1; i >= 0; i--) {
      const n = this.nodes[i]
      if (n.contains(p)) return n
    }
    return undefined
  }
  draw() {
    for (const n of this.nodes) {
	  n.draw()
    }

    for (const e of this.edges) {
	  e.draw()
    }
    for (const t of this.toolbar) {
      t.draw()
    }
  }
    getNodeArray() {
    return this.nodes
  }
  getEdgeArray() {
    return this.edges
  }
}

function findEdge(p, eArray, nArray ) {
  return {
    findEdges: (p) => {
      for (let i = eArray.length - 1; i >= 0; i--) {
        const e = eArray[i]
        if (e.contains(p)) {
          return e
        }
      }
    },
    draw: () => {
      for (const p of eArray) {
        p.draw()
      }
      for (const n of nArray) {
        n.draw()
      }
      for (const t of this.toolbar) {
        t.draw()
    }
    }

  }
}

document.addEventListener('DOMContentLoaded', function () {
  const graph = new Graph()
    //this part draws and object node, note node, and two circle nodes connected with solid edge
  //  console.log("hi this it the draw method")
 //  const n1 = createCircleNode(150, 10, 20, 'goldenrod')
 //  const n2 = createCircleNode(300, 30, 20, 'blue')
 //  const n3 = createObjectNode(100, 210)
 //  const n6 = createNoteNode(10, 170, 'bisque')
 //  const n7 = createChildNode(400, 250)
 // // const n8 = n3.clone()
 //  const n10 = n6.clone()
   //const n11 = createDiamondNode(75, 75, 40,'goldenrod')

  const n31 = drawToolBar()
  //const n5 = createCircleNode(30, 30, 'blue')
   // const n4 = createCircleNode(30, 30, 'blue')
  const nObject = drawObjectNode()//createObjectNode
  const nNote = drawNoteNode()//createNoteNode
  const nDiamond = drawDiamondNode()

  //graph.add(n5)
  graph.addToolbar(n31)
  
  graph.addToolbar(nObject)
  graph.addToolbar(nNote)
  graph.addToolbar(nDiamond)

  // graph.add(n11)
 // // graph.add(n8)
 //  graph.add(n10)
 // // n3.addChildNode()
 // // n3.addChildNode()
 // // n3.addChildNode()
 //  //graph.add(n8)
 //  graph.add(n1)
 //  graph.add(n2)
 //  graph.add(n3)
 //  //graph.add(n7)
 //  graph.add(n7)
 //  graph.add(n6)
 //  const solidEdge = createEdge(0)
 //  let cloneOfSolidEdge = solidEdge.clone()


  //this part draws two circle nodes connected with a dotted edge
  // const n4 = createCircleNode(150, 100, 20, 'goldenrod')
  // const n5 = createCircleNode(300, 120, 20, 'blue')
 // graph.connect(cloneOfSolidEdge, { x: 15, y: 15 }, { x: 310, y: 40 })

  // graph.add(n4)
  // graph.add(n5)
  // const dottedEdge = createDottedEdge()
  // graph.connect(solidEdge, { x: 160, y: 110 }, { x: 160, y: 20 })
  // graph.connect(dottedEdge, { x: 75, y: 75}, {x: 400, y: 250 })
  graph.draw()
  // n3.addChildNode() //must be called after the first draw
  //   n3.addChildNode()
    
  const panel = document.getElementById('nodeContainer')
  const svg = document.getElementById('graphpanel')
  let selected = undefined
  let edgeOrNode = undefined
  let dragStartPoint = undefined
  let dragStartBounds = undefined
  let selectBounds = undefined
  let nodeToDraw = undefined

  
  let toolSelected = undefined
 
  let nodeSelected = undefined

  function repaint() {
    panel.innerHTML = ''
    svg.innerHTML=''
    graph.draw()
    console.log("this is edge")
    console.log(edgeOrNode)
    if (selected !== undefined && edgeOrNode === "node") {
      const bounds = selected.getBounds()
      drawGrabber(bounds.x, bounds.y)
      drawGrabber(bounds.x + bounds.width, bounds.y)
      drawGrabber(bounds.x, bounds.y + bounds.height)
      drawGrabber(bounds.x + bounds.width, bounds.y + bounds.height)
    }
        if(selected !== undefined && edgeOrNode === "edge") {
          const bounds = selected.getBounds()
          drawGrabber(bounds.x, bounds.y)
          drawGrabber(bounds.x + bounds.width, bounds.y + bounds.height)
      }
    if (nodeToDraw !== undefined) {
      const bounds = nodeToDraw.getBounds()
      drawGrabber(bounds.x, bounds.y)
      drawGrabber(bounds.x + bounds.width, bounds.y)
      drawGrabber(bounds.x, bounds.y + bounds.height)
      drawGrabber(bounds.x + bounds.width, bounds.y + bounds.height)
    }
  }
  
  function mouseLocation(event) {
    console.log(mouseLocation)
    let rect = panel.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }

  document.addEventListener('mousedown', event => { //mousePressed analogue
    let mousePoint = mouseLocation(event)
    selected = graph.findNode(mousePoint)
    toolSelected = graph.selectTool(mousePoint)

    if(toolSelected !== undefined){
      nodeToDraw = toolSelected
      // return
    }else{
    if(nodeToDraw !== undefined) {
      selectBounds = nodeToDraw.getBounds()

      if (selected !== undefined) { // situation 1 : ToolBar was selected, and the mousepoint has another node already.
        dragStartPoint = mousePoint
        dragStartBounds = selected.getBounds()
      } else { // situation 2 : ToolBar was selected, and the mousepoint has no node yet. Let create the node we selected in toolbar
        if (nodeToDraw === nObject) {
          let me = createObjectNode(mousePoint.x, mousePoint.y)
          // let me = createCircleNode1(mousePoint.x, mousePoint.y, 'black')
          graph.add(me)
        }

        if (nodeToDraw === nNote) {
          //let me = createCircleNode1(mousePoint.x, mousePoint.y, 'blue')
          let me = createNoteNode(mousePoint.x, mousePoint.y, 'bisque')
          graph.add(me)
        }
        if(nodeToDraw === nDiamond ){
          let me = createDiamondNode(mousePoint.x, mousePoint.y, 40, 'goldenrod')

          graph.add(me)
        }

      }
    }

  }










  //   let mousePoint = mouseLocation(event)
  //   selected = graph.findNode(mousePoint)
  //   toolSelected = graph.selectTool(mousePoint)
  //   if(selected !== undefined)
  // edgeOrNode = "node"
  // console.log(selected)
  // if (toolSelected !== undefined) {
  //   if(selected !== undefined) {
  //     if (toolSelected === n32) {
  //       let me = createObjectNode(mousePoint.x, mousePoint.y)
  //       // let me = createCircleNode1(mousePoint.x, mousePoint.y, 'black')
  //       graph.add(me)
  //     }
  //
  //     if (toolSelected === n33) {
  //       let me = createCircleNode1(mousePoint.x, mousePoint.y, 'blue')
  //       graph.add(me)
  //     }
  //   }
  // }
  //
  // if (selected === undefined) {
  //   let eArray = graph.getEdgeArray()
  //   let nArray = graph.getNodeArray()
  //   let fEdge = findEdge(mousePoint, eArray, nArray)
  //   selected = fEdge.findEdges(mousePoint)
  //   if(selected !== undefined)
  //   {
  //     edgeOrNode = "edge"
  //   }
  // }
  // if (selected !== undefined) {
  //   dragStartPoint = mousePoint
  //   dragStartBounds = selected.getBounds()
  //   showProperties(selected) //NOTE: property sheet is not completely working
  // }
  // repaint()




//     let mousePoint = mouseLocation(event)
//     selected = graph.findNode(mousePoint)
//
//     toolSelected = graph.selectTool(mousePoint)
//
//     if(selected !== undefined
// )
//   edgeOrNode = "node"
//   console.log(selected)
//
//
//   if (toolSelected === undefined) {
//     if (selected === undefined) {
//       let eArray = graph.getEdgeArray()
//       let nArray = graph.getNodeArray()
//       let fEdge = findEdge(mousePoint, eArray, nArray)
//       selected = fEdge.findEdges(mousePoint)
//       if (selected !== undefined) {
//         edgeOrNode = "edge"
//       }
//     }
//     if (selected !== undefined) {
//       dragStartPoint = mousePoint
//       dragStartBounds = selected.getBounds()
//       showProperties(selected) //NOTE: property sheet is not completely working
//     }
//
//
//   } else {
//     if (selected !== undefined) {
//       dragStartPoint = mousePoint
//       dragStartBounds = selected.getBounds()
//     } else {
//       if (toolSelected !== undefined) {
//         if (toolSelected === n32) {
//           let me = createObjectNode(mousePoint.x, mousePoint.y)
//           // let me = createCircleNode1(mousePoint.x, mousePoint.y, 'black')
//           graph.add(me)
//         }
//
//         if (toolSelected === n33) {
//           let me = createCircleNode1(mousePoint.x, mousePoint.y, 'blue')
//           graph.add(me)
//         }
//
//       }
//     }
//   }
   repaint()
})




  // if (selected === undefined) {
  //   let eArray = graph.getEdgeArray()
  //   let nArray = graph.getNodeArray()
  //   let fEdge = findEdge(mousePoint, eArray, nArray)
  //   selected = fEdge.findEdges(mousePoint)
  //   if(selected !== undefined)
  //   {
  //     edgeOrNode = "edge"
  //   }
  // }
  // if (selected !== undefined) {
  //   dragStartPoint = mousePoint
  //   dragStartBounds = selected.getBounds()
  //   showProperties(selected) //NOTE: property sheet is not completely working
  // }
//    repaint()
// })

    

  document.addEventListener('mousemove', event => {
    if (dragStartPoint === undefined) return
    let mousePoint = mouseLocation(event)
    if (selected !== undefined) {
      const bounds = selected.getBounds();
      
      selected.translate(
        dragStartBounds.x - bounds.x 
          + mousePoint.x - dragStartPoint.x,
        dragStartBounds.y - bounds.y 
          + mousePoint.y - dragStartPoint.y);
      repaint()
    }
  })
  
  document.addEventListener('mouseup', event => {
    dragStartPoint = undefined
    dragStartBounds = undefined
  })
})

