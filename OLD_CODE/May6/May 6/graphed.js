'use strict'

function center(rect) {
  return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
}


function getClientRect(id)
{
  var div = document.getElementById(id);

  if (div == null)
  {
    return new DOMRect();
  }

  return div.getBoundingClientRect();
}



function drawGrabber(x, y, anyPanel) {
  const size = 5;
  const panel = document.getElementById('graphpanel')
  const square = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
  console.log("this is drawgrabber x")
  console.log(x)
  square.setAttribute('x', x - size / 2)
  square.setAttribute('y', y - size / 2)
  square.setAttribute('width', size)
  square.setAttribute('height', size)
  square.setAttribute('fill', 'mediumorchid') //this color is closest to on violet, feel free to change it if you guys want to
  if(anyPanel !== undefined)
  {
    anyPanel.appendChild(square)
  }
  else
  panel.appendChild(square)
}



function modify (pane, val, onchange) {
  const inp = document.createElement('input')
  inp.value = val  
  inp.onchange = () => { onchange(inp.value) }  
  pane.appendChild(inp)
  pane.appendChild(document.createElement('br')) 
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
    }

  }
}

document.addEventListener('DOMContentLoaded', function () {
  const graph = new Graph()
    //this part draws and object node, note node, and two circle nodes connected with solid edge
  //  console.log("hi this it the draw method")

  const panel = document.getElementById('nodeContainer')
  const svg = document.getElementById('graphpanel')
  let selected = undefined
  let edgeOrNode = undefined
  let dragStartPoint = undefined
  let dragStartBounds = undefined

  function repaint() {
    panel.innerHTML = ''
    svg.innerHTML=''
    graph.draw()
   // console.log("this is edge")
    //console.log(edgeOrNode)
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
    }
  
  function mouseLocation(event) {
   // console.log(mouseLocation)
    let rect = panel.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }

  const toolbarPanel = document.getElementById('toolbar')
  // create toolabr
  const toolbar = ToolBar(toolbarPanel)// COMMENTED THIS IN



  let mouseOne = undefined
  let mouseTwo = undefined
let currentlySelectedTool = undefined



  document.addEventListener('mousedown', event => { //mousePressed analogue
    repaint()
    let toolSelected = toolbar.getTool()


    if(currentlySelectedTool !== toolSelected)
    {
        currentlySelectedTool = toolSelected
    }
    else {
      if (TBLists.edges.includes(toolSelected))  //logic for making new edges
      {
        console.log("EDGE")
        let newEdge = toolSelected.clone()
        console.log("newEdge")
        console.log(newEdge)
        if (mouseOne !== undefined && mouseTwo === undefined)
          mouseTwo = mouseLocation(event)
        if (mouseOne === undefined) {
          mouseOne = mouseLocation(event)

        }  //doesn't use proper attachment points or does it?  Sometimes it does???
        if (mouseOne !== undefined && mouseTwo !== undefined) {
          let mX1 = mouseOne.x
          let mY1 = mouseOne.y
          let mX2 = mouseTwo.x
          let mY2 = mouseTwo.y
          console.log("this is graph.connect")
          console.log(newEdge)
          graph.connect(newEdge, { x: mX1, y: mY1 }, { x: mX2, y: mY2 })
          mouseOne = undefined
          mouseTwo = undefined
        }
      }
      let mousePoint = mouseLocation(event) //logic for Object nodes adding a child node
      if (currentlySelectedTool === toolSelected && (TBLists.nodes.includes(toolSelected))) {
        if (toolSelected.hasOwnProperty("isChildNode")) {
          selected = graph.findNode(mousePoint)
          if (selected !== undefined && selected.hasOwnProperty("addChildNode")) {
            selected.addChildNode()
          } else {
            let newChildNode = toolSelected.clone()
            graph.add(newChildNode)
          }
        } else {
          console.log("this is toolSelected")
          console.log(toolSelected)
          console.log(toolSelected.clone())
          let newNode = toolSelected.clone()
          console.log("this is newNode")
          console.log(newNode)
          //newNode.translate(mousePoint.x, mousePoint.y)
          graph.add(newNode)
        }
      }
      if (TBLists.edges.includes(toolSelected)) {
        console.log("EDGE")
      }

      if (TBLists.mode.includes(toolSelected)) {  // COMMENT
        // if(toolSelected.getType() === 'selectMode'){
        // // if（TBLists.nodes.contains(toolSelected)){
        console.log("this is tool selected")
        console.log(toolSelected)
//    let mousePoint = mouseLocation(event)
        selected = graph.findNode(mousePoint)
        if (selected !== undefined)
          edgeOrNode = "node"
        //  console.log(selected)

        if (selected === undefined) {
          let eArray = graph.getEdgeArray()
          let nArray = graph.getNodeArray()
          let fEdge = findEdge(mousePoint, eArray, nArray)
          selected = fEdge.findEdges(mousePoint)
          if (selected !== undefined) {
            edgeOrNode = "edge"
            console.log(edgeOrNode)
          }
        }
        if (selected !== undefined) {
          dragStartPoint = mousePoint
          dragStartBounds = selected.getBounds()
          showProperties(selected)
        }

      } // tool bar thing
    }
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

