'use strict'

function center(rect) {
  return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
}
function createLineEdge() {

  /*
  NOTE: can be used to connect Object nodes to Object nodes, Note nodes to Note nodes, or Object nodes to Note nodes. Will implement this later on in the project.
  */
  function createSolidEdge () {
    let start = undefined
    let end = undefined
    return {
      connect: (s, e) => {
        start = s
        end = e
      },
      draw: () => {
        const panel = document.getElementById('graphpanel')
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        const p = center(start.getBounds())
        const q = center(end.getBounds())
        line.setAttribute('x1', p.x)
        line.setAttribute('x2', q.x)
        line.setAttribute('y1', p.y)
        line.setAttribute('y2', q.y)
        line.setAttribute('stroke', 'black')
        line.setAttribute('stroke-width', '1')
        panel.append(line)
      }
    }
  }

  /*
  NOTE: can only be used to connect Note nodes to Note nodes or Note nodes to Object nodes, NOT Object nodes to Object nodes. Will implement this later on in the project
  */
  function createDottedEdge () {
    let start = undefined
    let end = undefined
    return {
      connect: (s, e) => {
        start = s
        end = e
      },
      draw: () => {
        const panel = document.getElementById('graphpanel')
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        const p = center(start.getBounds())
        const q = center(end.getBounds())
        line.setAttribute('x1', p.x)
        line.setAttribute('x2', q.x)
        line.setAttribute('y1', p.y)
        line.setAttribute('y2', q.y)
        line.setAttribute('stroke', 'black')
        line.setAttribute('stroke-dasharray', '4', '4')
        panel.append(line)
      }
    }
  }

  function drawGrabber (x, y) {
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

  /*
  function createObjectNode (xIn, yIn, widthIn, heightIn, colorIn) {
    const width = widthIn
    const height = heightIn
    const color = colorIn
    let x = xIn
    let y = yIn
    const table = document.getElementById("forId")

    square.setAttribute('fill', 'violet')
    panel.appendChild(square)
  }
  */
  function createObjectNode (xIn, yIn, widthIn, heightIn) {
    let x = xIn
    let y = yIn
    const width = 80   //got number from Violet source code
    const height = 60  //got number from Violet source code
    return {

      getBounds: () => {

        return {
          x: x,
          y: y,
          width: widthIn,
          height: heightIn
        }
      },
      contains: p => {
        if (p.x >= x && p.x <= (x + width) && p.y >= y && p.y <= y + height)
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
        const tr = document.createElement('tr')
        const td = document.createElement('td')
        table.appendChild(tr)
        tr.appendChild(td)
        table.style.position = 'absolute'
        table.style.left = x + 'px'
        table.style.top = y + 'px'
        table.style.width = width + 'px'
        table.style.height = height + 'px'
        //I think we should keep the tables white with a black border
        //table.style.background = color
        container.appendChild(table)
      }
    }
  }

  function createNoteNode (x, y, color) {
    const width = 60
    const height = 40
    return {
      getBounds: () => {

        return {
          x: x,
          y: y,
          width: sizeIn / 2,
          height: sizeIn
        }
      },
      contains: p => {
        if (p.x >= x && p.x <= (x + width) && p.y >= y && p.y <= y + height)
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
        const overLay = document.getElementById("overLay");
        const overLaysvg = document.getElementById("overLaysvg");
        rect.setAttribute('x', x)
        rect.setAttribute('y', y)
        rect.setAttribute('width', width - .5)
        rect.setAttribute('height', height)
        rect.setAttribute('fill', color)
        rect.setAttribute('stroke', 'black')
        table.setAttribute('stroke', 'black')
        table.setAttribute('x', x)
        table.setAttribute('y', y + 15)
        table.setAttribute('width', width)
        table.setAttribute('height', height)
        table.setAttribute('fill', color)
        overLay.setAttribute('x', x);
        overLay.setAttribute('y', y)
        overLay.setAttribute('width', width)
        overLay.setAttribute('height', height)
        overLaysvg.setAttribute('x', x);
        overLaysvg.setAttribute('y', y)
        overLaysvg.setAttribute('width', width)
        overLaysvg.setAttribute('height', height)
        //console.log("hi this it the draw method")
        rect.setAttribute('x', x)
        rect.setAttribute('y', y)
        rect.setAttribute('width', width)
        rect.setAttribute('height', height)
        rect.setAttribute('stroke', 'black')
        rect.setAttribute('fill', color)
        rect.setAttribute('stroke-width', 0.5)
        panel.appendChild(rect)

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
        circle.setAttribute('r', size / 2)
        circle.setAttribute('fill', color)
        panel.appendChild(circle)
      }
    }
  }

  class Graph {
    constructor () {
      this.nodes = []
      this.edges = []
    }

    connect (e, p1, p2) {
      const n1 = this.findNode(p1)
      const n2 = this.findNode(p2)
      if (n1 !== undefined && n2 !== undefined) {
        e.connect(n1, n2)
        this.edges.push(e)
        return true
      }
      return false
    }

    add (n) {
      this.nodes.push(n)

    }

    findNode (p) {
      for (let i = this.nodes.length - 1; i >= 0; i--) {
        const n = this.nodes[i]
        if (n.contains(p)) return n
      }
      return undefined
    }

    draw () {
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
    const n1 = createCircleNode(150, 10, 20, 'goldenrod')
    const n2 = createCircleNode(300, 30, 20, 'blue')
    const n3 = createObjectNode(10, 10, 'aliceblue')
    //const n6 = createNoteNode(10, 170, 'bisque')
    graph.add(n1)
    graph.add(n2)
    graph.add(n3)
    const solidEdge = createSolidEdge()
    graph.connect(solidEdge, { x: 160, y: 20 }, { x: 310, y: 40 })

    //this part draws two circle nodes connected with a dotted edge
    const n4 = createCircleNode(150, 100, 20, 'goldenrod')
    const n5 = createCircleNode(300, 120, 20, 'blue')
    graph.add(n4)
    graph.add(n5)
    const dottedEdge = createDottedEdge()
    graph.connect(dottedEdge, { x: 160, y: 110 }, { x: 310, y: 130 })
    graph.draw()

    const panel = document.getElementById('graphpanel')
    let selected = undefined
    let dragStartPoint = undefined
    let dragStartBounds = undefined

    function repaint () {
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

    function mouseLocation (event) {
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
}
