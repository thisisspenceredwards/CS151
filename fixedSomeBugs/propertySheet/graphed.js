'use strict'

/**
 *
 * @param rect get the center of the rectangle
 * @returns {{x: *, y: *}}
 */
function center(rect) {
  return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
}

/**
 *
 * @param id get the boundaries of the html table
 * @returns {ClientRect | DOMRect|DOMRect}
 */
function getClientRect(id)
{
  var div = document.getElementById(id);

  if (div == null)
  {
    return new DOMRect();
  }

  return div.getBoundingClientRect();
}

/**
 *
 * @param x the x value for the grabber
 * @param y the y value for the grabber
 * @param anyPanel the div for the toolbar
 */
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

/**
 *
 * @param pane div to append to
 * @param val value to change
 * @param onchange function onchange
 */
function modifyProperties (pane, val, onchange) {
  const inp = document.createElement('input')
  inp.value = val  
  inp.onchange = () => { onchange(inp.value) }  
  pane.appendChild(inp)
}

/**
 * @param obj to check from getters
 */
function showProperties (obj) {
  const panel = document.getElementById('propertyEditor')
  panel.innerHTML = ''
  let element
  for (const property of Object.getOwnPropertyNames(obj).filter(func => (typeof obj[func] === 'function' && func.substring(0, 3) === 'set'))) { 
    element = obj['g' + property.substring(1)]()
    const attribute = document.createTextNode(property.substring(3) + ': ')
    panel.appendChild(attribute)    
    modifyProperties(panel, element, obj[property])    
  }
}


class Graph {
  constructor() {
    this.nodes = []
    this.edges = []
  }

  /**
   *
   * @param e type of edge
   * @param p1 start node
   * @param p2 ending node
   * @returns {boolean}
   */
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

  /**
   *
   * @param n node to be added to the node array
   */
  add(n) {
      this.nodes.push(n)
      
  }
  // function removeEdge
  //   function findEdge
  /**
   *
   * @param p point to check
   * @returns {undefined|*} or if node is in the array return the node
   */
  findNode(p) {
    for (let i = this.nodes.length - 1; i >= 0; i--) {
      const n = this.nodes[i]
      if (n.contains(p)) return n
    }
    return undefined
  }
  deleteNode(p) {
    for( let i = this.nodes.length -1; i >=0; i--){
      const n = this.nodes[i]
      if(n.contains(p))
      {
        this.nodes.splice(i,1)
        return
      }
    }
  }
  deleteEdge(p) {
    for( let i = this.edges.length -1; i >=0; i--){
      const n = this.edges[i]
      if(n.contains(p))
      {
        this.edges.splice(i,1)
        return
      }
    }
  }
  draw() {
    for (const n of this.nodes) {
	n.draw()
    }

      for (const e of this.edges) {
	  e.draw()
      }
  }

  /**
   *
   * @returns {Array} of nodes
   */
    getNodeArray() {
    return this.nodes
  }

  /**
   *
   * @returns {Array} of edges
   */
  getEdgeArray() {
    return this.edges
  }
}

/**
 *
 * @param p point to check
 * @param eArray array of edges
 * @param nArray array of nodes
 * @returns {{findEdges: findEdges, draw: draw}}
 */
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

  /**
   *
   * @param event is a mouse click
   * @returns {{x: number, y: number}}
   */
  function mouseLocation(event) {
   // console.log(mouseLocation)
    let rect = panel.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }
  const graphSVG = document.getElementById('graphpanel')
  const toolbarSVG = document.getElementById('toolbar')
  const toolbar = ToolBar(graph, graphSVG, toolbarSVG)

  let toolSelected
  document.addEventListener('toolSelect',()=>{
    toolSelected=toolbar.getTool()
  })

  let mouseOne = undefined
  let mouseTwo = undefined

  document.addEventListener('mousedown', event => { //mousePressed analogue
    let mousePoint = mouseLocation(event)
    if (TBLists.mode.includes(toolSelected)) {
      selected = graph.findNode(mousePoint)
      if (toolSelected.getType() === 'deleteMode') {
        if (selected !== undefined) {
          graph.deleteNode(mousePoint)
         // repaint()
        }
          if (selected === undefined) {
            let eArray = graph.getEdgeArray()
            let nArray = graph.getNodeArray()
            let fEdge = findEdge(mousePoint, eArray, nArray)
            selected = fEdge.findEdges(mousePoint)
            graph.deleteEdge(mousePoint)
            repaint()
          }
        }
    if (toolSelected.getType() === 'selectMode') {
      if (selected !== undefined)
        edgeOrNode = "node"
      if (selected === undefined){
        let eArray = graph.getEdgeArray()
        let nArray = graph.getNodeArray()
        let fEdge = findEdge(mousePoint, eArray, nArray)
        selected = fEdge.findEdges(mousePoint)
        if (selected !== undefined) {
          edgeOrNode = "edge"
        }
      }
      if (selected !== undefined) {
        dragStartPoint = mousePoint
        dragStartBounds = selected.getBounds()
        showProperties(selected)
        repaint()
      }
    }
  }
    if(TBLists.edges.includes(toolSelected) === false) //Was registering clicking the tool bar as the first in a set of connections
      //if an edge was already selected
    {
      mouseOne = undefined
      mouseTwo = undefined
    }
    if (TBLists.edges.includes(toolSelected))  //logic for making new edges
    {
      console.log("REGISTERED")
      let newEdge = toolSelected.clone()
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
        graph.connect(newEdge, { x: mX1, y: mY1 }, { x: mX2, y: mY2 })
        repaint()
        mouseOne = undefined
        mouseTwo = undefined
      }
    }
    if(event.shiftKey === true) {
      repaint()
      let mousePoint = mouseLocation(event) //logic for Object nodes adding a child node
      if ((TBLists.nodes.includes(toolSelected))) {
        if (toolSelected.hasOwnProperty("isChildNode")) {
          selected = graph.findNode(mousePoint)
          if (selected !== undefined && selected.hasOwnProperty("addChildNode")) {
            selected.addChildNode()
          } else {
            let newChildNode = toolSelected.clone()
            newChildNode.translate(mousePoint.x, mousePoint.y)
            graph.add(newChildNode)
            repaint()
          }
        } else {
          let newNode = toolSelected.clone()
          newNode.translate(mousePoint.x, mousePoint.y)
          graph.add(newNode)
          repaint()
        }
      }

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

