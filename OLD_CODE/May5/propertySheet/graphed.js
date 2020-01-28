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
 *This function updated the properties of an object
 * @param panel div to append to
 * @param val value to change
 * @param onchange function onchange
 */
function updateProperties (panel, val, onchange) {
  const inp = document.createElement('Input')
  inp.value = val  
  inp.onchange = () => { onchange(inp.value) }  //update the property
  panel.appendChild(inp)
}

/**
 *This functions displays the attributes of an object. The object must have both a getter and a setter in order to be displayed and updated
 * @param obj to check from getters
 */
function showProperties (object) {
  const propeditor = document.getElementById('propertyEditor')
  propeditor.innerHTML = ''  
  for (const property of Object.getOwnPropertyNames(object).filter(func => (typeof object[func] === 'function' && func.substring(0, 3) === 'set'))) { //ooking for all setter functions 
    let element = object['g' + property.substring(1)]() //NOTE: setter must also have a getter in order to be updated via propertysheet
    const attribute = document.createTextNode(property.substring(3) + ': ')
    propeditor.appendChild(attribute)   //display the names of the attributes
    updateProperties(propeditor, element, object[property])    
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
      if (selected !== undefined)
        edgeOrNode = "node"
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
    }
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
      } 
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

