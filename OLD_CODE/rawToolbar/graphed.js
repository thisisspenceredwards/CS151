'use strict'

function center(rect) {
  return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
}

function drawGrabber(x, y) {
  const size = 5;
  const panel = document.getElementById('graphpanel')
  const square = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
  square.setAttribute('x', x - size / 2)
  square.setAttribute('y', y - size / 2)
  square.setAttribute('width', size)
  square.setAttribute('height', size)
  square.setAttribute('fill', 'black')
  panel.appendChild(square)  
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


function drawNodeInToolBar1() {
  return {
  getBounds: () => {

      return {
        x: 50,
        y: 20,
        width: 30,
        height: 30
      }
    },

contains: p => {
      return p.x >= 50 && p.y >= 20 && p.x <= 80 && p.y <= 50
    },
draw: () => {
  const panel = document.getElementById('graphpanel')
  const toolBar = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
  toolBar.setAttribute ('x', 50)
  toolBar.setAttribute ('y', 20)
  toolBar.setAttribute ('width', 30)
  toolBar.setAttribute ('height', 30)
  toolBar.setAttribute('fill', 'white')
  toolBar.setAttribute('stroke', 'black')
  toolBar.setAttribute('stroke-width', 0.5)
  panel.appendChild(toolBar)  
  }
  // crate: (p) => {

  // }
}
}

function drawNodeInToolBar2() {
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
  const toolBar = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
  toolBar.setAttribute ('x', 100)
  toolBar.setAttribute ('y', 20)
  toolBar.setAttribute ('width', 30)
  toolBar.setAttribute ('height', 30)
  toolBar.setAttribute('fill', 'green')
  toolBar.setAttribute('stroke', 'black')
  toolBar.setAttribute('stroke-width', 0.5)
  panel.appendChild(toolBar)  
}
}
}


// function createCircleNode (x, y, size, color) {
//   return {
//     getBounds: () => {
//       return {
//         x: x,
//         y: y,
//         width: size,
//         height: size
//       }
//     },
//     contains: p => {
//       return (x + size / 2 - p.x) ** 2 + (y + size / 2 - p.y) ** 2 <= size ** 2 / 4
//     },
//     translate: (dx, dy) => {
//       x += dx
//       y += dy
//     },
//     draw: () => {
//       const panel = document.getElementById('graphpanel')
//       const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
//       circle.setAttribute('cx', x + size / 2)
//       circle.setAttribute('cy', y + size / 2)
//       circle.setAttribute('r',size/2)
//       circle.setAttribute('fill', color)
//       panel.appendChild(circle)
//     }
//   }
// }


// function createCircleNode (x, y, size, color) {
  function createCircleNode (xIn, yIn, colorIn) {
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

class Graph {
  constructor() {
    this.nodes = []
    // this.edges = []
     this.toolbar = []
  }
  // connect(e, p1, p2) {
  //   const n1 = this.findNode(p1)
  //   const n2 = this.findNode(p2)
  //   if (n1 !== undefined && n2 !== undefined) {
  //     e.connect(n1, n2)
  //     this.edges.push(e)
  //     return true
  //   }
  //   return false
  // }
  add(n) {
      this.nodes.push(n)
      
  }
  // TOOoooooooooooooooooobar------------------------------------------toolbar
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


  findNode(p) {
    for (let i = this.nodes.length - 1; i >= 0; i--) {
      const n = this.nodes[i]
      if (n.contains(p)) return n
    }
    return undefined
  }
  //added for tool bar
  // selectNode(p){
  //   for (let i = this.toolbar.length - 1; i >= 0; i--) {
  //     const n = this.toolbar[i]
  //     if (n.contains(p)) return n
  //   }
  //   return undefined
  // }
  draw() {
    for (const n of this.nodes) {
	n.draw()
    }
   //    for (const e of this.edges) {
	  // e.draw()
   //    }
      for (const t of this.toolbar) {
  t.draw()
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const graph = new Graph()
  const n1 = drawToolBar()
  //const n5 = createCircleNode(30, 30, 'blue')
   // const n4 = createCircleNode(30, 30, 'blue')
  const n3 = drawNodeInToolBar2()
  const n4 = drawNodeInToolBar1()
  //graph.add(n5)
  graph.addToolbar(n1)
  
  graph.addToolbar(n3)
  graph.addToolbar(n4)
  // const e = createLineEdge()
  //   graph.connect(e, { x: 20, y: 20 }, { x: 40, y: 40 })
  //   graph.draw()
  
  const panel = document.getElementById('graphpanel')
  let selected = undefined
  let toolSelected = undefined
  let dragStartPoint = undefined
  let dragStartBounds = undefined
  let nodeSelected = undefined

  function repaint() {
    panel.innerHTML = ''
    graph.draw()
    if (selected !== undefined) {
      const bounds = selected.getBounds()
      drawGrabber(bounds.x, bounds.y)
      drawGrabber(bounds.x + bounds.width, bounds.y)
      drawGrabber(bounds.x, bounds.y + bounds.height)      
      drawGrabber(bounds.x + bounds.width, bounds.y + bounds.height)
    }   
    if (toolSelected !== undefined) {
      const bounds = toolSelected.getBounds()
      drawGrabber(bounds.x, bounds.y)
      drawGrabber(bounds.x + bounds.width, bounds.y)
      drawGrabber(bounds.x, bounds.y + bounds.height)      
      drawGrabber(bounds.x + bounds.width, bounds.y + bounds.height)
    }   
  }
  
  function mouseLocation(event) {
    var rect = panel.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }
  
  panel.addEventListener('mousedown', event => {
    let mousePoint = mouseLocation(event)
    selected = graph.findNode(mousePoint)
    toolSelected = graph.selectTool(mousePoint)

    // if (selected !== undefined) {
    //   dragStartPoint = mousePoint
    //   dragStartBounds = selected.getBounds()
    // }
    // repaint()
    if (toolSelected !== undefined){
      dragStartPoint = mousePoint
      nodeSelected = toolSelected
      dragStartBounds = toolSelected.getBounds()
      repaint()
      //return 
    }


        // if(selected.contains(mousePoint) === true){

        // }

      else {
        if (selected !== undefined) {
          dragStartPoint = mousePoint
          dragStartBounds = selected.getBounds()
        }else{
          if (nodeSelected !== undefined ){
        if(nodeSelected === n4){
          let me =  createCircleNode(mousePoint.x, mousePoint.y, 'black')
          graph.add(me)
        }
     
        if(nodeSelected === n3){
          let me =  createCircleNode(mousePoint.x, mousePoint.y, 'blue')
          graph.add(me)
        }
      } 

        }

      }

     

    // if (nodeSelected !== undefined){
    //   let me =  createCircleNode(mousePoint.x, mousePoint.y)
    //   graph.add(me)

    // }
    repaint()
  })

  panel.addEventListener('mousemove', event => {
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
  
  panel.addEventListener('mouseup', event => {
    dragStartPoint = undefined
    dragStartBounds = undefined

  })
})

