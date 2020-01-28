'use strict'

function center(rect) {
  return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
}

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
      isSelected = false
      p = center(start.getBounds())
      q = center(end.getBounds())
      if(q.x !== p.x)//does not work if the x's are the same
      {
        let slope = (q.y - p.y)/(q.x - p.x)
        let yIntercept = q.y - (slope*q.x)
        let equation = (slope*z.x) + yIntercept
        if ( equation >z.y- 10 && (slope*z.x) + yIntercept < z.y+10 ) { //10 is arbitrary, seemed like a good number
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
  square.setAttribute('fill', 'violet')
  panel.appendChild(square)  
}
function createChildNode(xIn, yIn) {
  let x = xIn
  let y = yIn
  const width = 80  //got number from Violet source code
  const height = 60  //got number from Violet source code
  return {
    getBounds: () => {
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
      const container = document.getElementById('nodeContainer')
      const table = document.createElement('table')
      table.id = 'childNodeTable'
      table.className = 'childNodeTable'
      table.style.left = x + 'px'
      table.style.top = y + 'px'
      table.style.width = width + 'px'
      table.style.height = height + 'px'
      table.setAttribute("contenteditable", "true")
      const row1 = table.insertRow()//create row
      row1.id = "row"
      row1.classname = "row"
      const row2 = table.insertRow()
      const cell1 = row1.insertCell()
      const cell2 = row1.insertCell()
      const cell3 = row1.insertCell()
      cell1.setAttribute("contenteditable", "true")
      cell3.setAttribute("contenteditable", "true")
      cell1.innerHTML = "Name"
      cell2.innerHTML = '='
      cell3.innerHTML = 'Value'
      container.appendChild(table)
    },
    clone: ()=> {
      createChildNode(xIn,yIn)
    }
  }
}
function createObjectNode (xIn, yIn) {
  let x = xIn
  let y = yIn
  let t = null
  let width = 125
  let height = 90
  const container = document.getElementById('nodeContainer')
  const table = document.createElement('table')
  table.id = 'ObjectNodeTable'
  table.className = 'ObjectNodeTable'
  table.setAttribute("contenteditable", "true")
  const row1 = table.insertRow()//create row
  row1.id = "row"
  row1.classname = "row"
  const row2 = table.insertRow()
  row2.id = "row"
  row2.classname = "row"
  const cell1 = row1.insertCell()
  const cell2 = row2.insertCell()
  cell1.setAttribute("contenteditable", "true")
  cell2.setAttribute("contenteditable", "true")
  cell1.innerHTML = "Object"
  cell2.innerHTML = 'Attributes'
  if(t === null)
  {
    t = table
  }
  container.appendChild(table)
  return {
    getBounds: () => {
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
    addChildNode: ()=>{
      const parent = t
      const newRow = parent.insertRow(-1)
      newRow.id = "row"
      newRow.setAttribute("contenteditable", "true")
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
    },
    clone: ()=>{
          return createObjectNode(xIn, yIn)
    }
  }
}
function createNoteNode (xIn, yIn) {

  let width = 60
  let height = 40
  let x = xIn
  let y = yIn
  const container = document.getElementById('nodeContainer')
  const table = document.createElement('table')
  table.id = 'noteNodeTable'
  table.className = 'noteNodeTable'
  const row1 = table.insertRow()//create row
  row1.id = "row"
  row1.classname = "row"
  const cell1 = row1.insertCell()
  cell1.setAttribute("contenteditable", "true")
  cell1.innerHTML = "Note"
  container.appendChild(table)
  return {
    getBounds: () => {

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
    }
  }
}
function createDiamondNode (x, y, sizeIn,color) {
  let size = sizeIn
 // let width = 40
 // let height = 65
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
      poly.setAttribute("points", (x) +" ," + (y) + " " + (x+size/2) + "," +
        (y-size/2) + " " + (x+size) + "," + (y) + " " + (x+size/2) + ", " + (y+size/2))
      poly.setAttribute("fill",(color))
      panel.appendChild(poly)
    },
    clone: ()=>{
      return createDiamondNode(x, y, color)
    }
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
    }
  }
}
class Graph {
  constructor() {
    this.nodes = []
    this.edges = []
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
  add(n) {
      this.nodes.push(n)
      
  }
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
  }
  getNodeArray() {
    return this.nodes
  }
  getEdgeArray() {
    return this.edges
  }
}
<<<<<<< HEAD

function toolBar(graph) {
  const toolBar = document.createElementNS("http://www.w3.org/2000/svg", "rect")
  const panel = document.getElementById("graphpanel")
  toolBar.setAttribute('x', 43)
  toolBar.setAttribute('y', 90)
  toolBar.setAttribute('height', 40)
  toolBar.setAttribute('width', 50)
  panel.appendChild(toolBar)
  let nodeGroup = graph.getNode()
  let edgeGroup = graph.getEdge()
  let IconHeight = 8;
  let IconWidth = 8;
  let toolbarContainer = null
  for(let i = 0; i < nodeGroup.length; i++ )
  {
      add(nodeGroup[i])
  }
  for(let i = 0; i < edgeGroup.length; i++)
  {
    add(edgeGroup[i])
  }
=======
function findEdge(p, eArray, nArray ) {
>>>>>>> f9f6d57fd47d460bb3bfd295f6d726106c1e74dc
  return {
    findEdges: (p) => {
      for (let i = eArray.length - 1; i >= 0; i--) {
        const e = eArray[i]
        console.log("this is p")
        console.log(p)
        console.log(e.contains(p))
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
    }

  }
}
<<<<<<< HEAD




document.addEventListener('DOMContentLoaded', function () {
  const graph = new Graph()
  const toolbar = new toolBar(graph)
=======
document.addEventListener('DOMContentLoaded', function () {
  const graph = new Graph()
>>>>>>> f9f6d57fd47d460bb3bfd295f6d726106c1e74dc
  //this part draws and object node, note node, and two circle nodes connected with solid edge
  const n1 = createCircleNode(150, 10, 20, 'goldenrod')
  const n2 = createCircleNode(300, 30, 20, 'blue')
  const n3 = createObjectNode(10, 10)
  const n6 = createNoteNode(10, 170)
  const n7 = createChildNode(50, 50)
  const n8 = n3.clone()
  const n10 = n6.clone()
  const n11 = createDiamondNode(75, 75, 40,'goldenrod')
  graph.add(n11)
  graph.add(n8)
  graph.add(n10)
 // n3.addChildNode()
 // n3.addChildNode()
 // n3.addChildNode()
  //graph.add(n8)
  graph.add(n1)
  graph.add(n2)
  graph.add(n3)
  //graph.add(n7)
  graph.add(n7)
  graph.add(n6)
  const solidEdge = createSolidEdge()
  let cloneOfSolidEdge = solidEdge.clone()
  //this part draws two circle nodes connected with a dotted edge
  const n4 = createCircleNode(150, 100, 20, 'goldenrod')
  const n5 = createCircleNode(300, 120, 20, 'blue')
  graph.connect(cloneOfSolidEdge, { x: 15, y: 15 }, { x: 310, y: 40 })
  graph.add(n4)
  graph.add(n5)
  const dottedEdge = createDottedEdge()
  graph.connect(solidEdge, { x: 160, y: 110 }, { x: 160, y: 20 })
  graph.connect(dottedEdge, { x: 15, y: 175}, {x: 55, y: 55 })
  graph.draw()
  n3.addChildNode() //must be called after the first draw
  n3.addChildNode()

  const panel = document.getElementById('nodeContainer')
  const svg = document.getElementById('graphpanel')
  let selected = undefined
  let dragStartPoint = undefined
  let dragStartBounds = undefined

  function repaint() {
    panel.innerHTML = ''
    svg.innerHTML=''
    graph.draw()
    if (selected !== undefined) {
      const bounds = selected.getBounds()
      drawGrabber(bounds.x, bounds.y)
      drawGrabber(bounds.x + bounds.width, bounds.y)
      drawGrabber(bounds.x, bounds.y + bounds.height)
      drawGrabber(bounds.x + bounds.width, bounds.y + bounds.height)
    }    
  }
  
  function mouseLocation(event) {
    //console.log(mouseLocation)
    let rect = panel.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }
  
  document.addEventListener('mousedown', event => { //mousePressed analogue
    let mousePoint = mouseLocation(event)
    selected = graph.findNode(mousePoint)

    if (selected === undefined) {
      console.log("here i is")
      let eArray = graph.getEdgeArray()
      let nArray = graph.getNodeArray()
      let fEdge = findEdge(mousePoint, eArray, nArray)
      selected = fEdge.findEdges(mousePoint)
    }
    console.log(selected)
    if (selected !== undefined) {
      dragStartPoint = mousePoint
      dragStartBounds = selected.getBounds()

      //add selecting edge logic
    }
    repaint()
  })
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
