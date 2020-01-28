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
  const n1 = createCircleNode(150, 10, 20, 'goldenrod')
  const n2 = createCircleNode(300, 30, 20, 'blue')
  const n3 = createObjectNode(100, 210)
  const n99 = createObjectNode(400, 60)
  const n6 = createNoteNode(10, 170, 'bisque')
  const n7 = createChildNode(400, 250)
 // const n8 = n3.clone()
  const n10 = n6.clone()
    const n11 = createDiamondNode(75, 75, 40,'goldenrod')
    const n12 = createDiamondNode(75, 150, 40, 'red')
    graph.add(n12)
  graph.add(n11)
 // graph.add(n8)
  graph.add(n10)
 // n3.addChildNode()
 // n3.addChildNode()
 // n3.addChildNode()
  //graph.add(n8)
  graph.add(n1)
  graph.add(n2)
  graph.add(n3)
  graph.add(n99)
  graph.add(n7)
  graph.add(n6)
  const solidEdge = createEdge(0)
  let cloneOfSolidEdge = solidEdge.clone()

    
  //this part draws two circle nodes connected with a dotted edge
  const n4 = createCircleNode(150, 100, 20, 'goldenrod')
  const n5 = createCircleNode(350, 120, 20, 'blue')
  //graph.connect(cloneOfSolidEdge, { x: 15, y: 15 }, { x: 310, y: 40 })

  graph.add(n4)
  graph.add(n5)
  const dottedEdge = createDottedEdge()
  graph.connect(solidEdge, { x: 160, y: 110 }, { x: 160, y: 20 })
    graph.connect(dottedEdge, { x: 75, y: 150}, {x: 400, y: 250 })
    const dottedEdge2 = createDottedEdge()
    graph.connect(dottedEdge2, {x: 75, y: 75}, {x: 75, y: 150})
    const solidEdge2 = createEdge()
    graph.connect(solidEdge2, {x:360, y: 130}, {x:400, y: 60})
    const solidEdge3 = createEdge(1)
    graph.connect(solidEdge3, {x: 450, y: 110}, {x: 400, y: 250})
//  const curvedEdge = createCurvedEdge()
//  graph.connect(curvedEdge, {x:360 ,y:130 }, {x:310 , y:40})
  graph.draw()
  n3.addChildNode() //must be called after the first draw
  n3.addChildNode()
  n3.addChildNode()
  n99.addChildNode()
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
  
  document.addEventListener('mousedown', event => { //mousePressed analogue
    let mousePoint = mouseLocation(event)
    selected = graph.findNode(mousePoint)
    if(selected !== undefined)
      edgeOrNode = "node"
    //  console.log(selected)

      if (selected === undefined) {
      let eArray = graph.getEdgeArray()
      let nArray = graph.getNodeArray()
      let fEdge = findEdge(mousePoint, eArray, nArray)
      selected = fEdge.findEdges(mousePoint)
        if(selected !== undefined)
        {
          edgeOrNode = "edge"
        }
    }
    if (selected !== undefined) {
      dragStartPoint = mousePoint
      dragStartBounds = selected.getBounds()
      showProperties(selected) //NOTE: property sheet is not completely working
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

