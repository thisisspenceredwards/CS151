
function createCurvedEdge() {
   let start = undefined
  let end = undefined
  return {
    connect: (s, e) => {
      start = s
      end = e
    },
       draw: () => {
      const panel = document.getElementById('graphpanel')
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      const p = center(start.getBounds())
      const q = center(end.getBounds())
      var h = (q.x - p.x)/4
      var v = (q.y - p.y)/4
      var cPointX = p.x + h
      var cPointY = p.y + v
      var midX = p.x + 2 * h
      var midY = p.y + 2 * v
      var qH = q.x - h
      var me ='M' + p.x +' '+ p.y+ ' C' + cPointX +' '+ p.y + ',' + cPointX +' '+ p.y + ',' +midX + ' ' + midY + ' S ' + qH +' '+ q.y + ',' + q.x +' '+ q.y
      path.setAttribute('d', me)

      path.setAttribute('fill', 'transparent' )
      path.setAttribute('stroke', 'black')
      path.setAttribute('stroke-width', '1')
      panel.append(path)
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

function createObjectNode (xIn, yIn,  colorIn) {
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
}

document.addEventListener('DOMContentLoaded', function () {
  const graph = new Graph()

  //this part draws and object node, note node, and two circle nodes connected with solid edge
  // const n1 = createCircleNode(150, 10, 20, 'goldenrod')
  // const n2 = createCircleNode(300, 30, 20, 'blue')
  // const n3 = createObjectNode(10, 10, 'aliceblue')
  const n7 = createObjectNode(200, 100, 'aliceblue')
  const n8 = createObjectNode(300, 200, 'aliceblue')
  //const n6 = createNoteNode(10, 170, 'bisque')
  // graph.add(n6)
  // graph.add(n1)
  // graph.add(n2)
  // graph.add(n3)
  graph.add(n7)
  graph.add(n8)

  const curvedEdge = createCurveddEdge()
  graph.connect(curvedEdge, { x: 210, y: 110 }, { x: 310, y: 210 })



  // const solidEdge = createSolidEdge()
  // graph.connect(solidEdge, { x: 160, y: 20 }, { x: 310, y: 40 })

  //this part draws two circle nodes connected with a dotted edge
  // const n4 = createCircleNode(150, 100, 20, 'goldenrod')
  // const n5 = createCircleNode(300, 120, 20, 'blue')
  // graph.add(n4)
  // graph.add(n5)
  // const dottedEdge = createDottedEdge()
  // graph.connect(dottedEdge, { x: 160, y: 110}, {x: 310, y: 130 })
  graph.draw()

  const panel = document.getElementById('graphpanel')
  let selected = undefined
  let dragStartPoint = undefined
  let dragStartBounds = undefined

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
    if (selected !== undefined) {
      dragStartPoint = mousePoint
      dragStartBounds = selected.getBounds()
    }
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
