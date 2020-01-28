
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
      //this method is required for toolbar.js
      toolDraw: (anyPanel) => {
	    
          const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
	  console.log(color)
            circle.setAttribute('cx', x + size / 2)
            circle.setAttribute('cy', y + size / 2)
            circle.setAttribute('r', size / 2)
            circle.setAttribute('fill', color)
            anyPanel.appendChild(circle)
      },
      //Joe left this here
      // drawInTB: () => {
      //     const panel = document.getElementById('toolbar')
      //     const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      //     circle.setAttribute('cx', x + size / 2)
      //     circle.setAttribute('cy', y + size / 2)
      //     circle.setAttribute('r',size/2)
      //     circle.setAttribute('fill', color)
      //     panel.appendChild(circle)
      // },
      getConnectionPoint: p=>{
	  let centerX = x + size / 2
	  let centerY = y + size / 2
	  let dx = p.x - centerX
	  let dy = p.y - centerY
	  let distance = (dx * dx + dy * dy) ** 0.5
	  if(distance === 0) return p
	  else{
	      return {x: centerX + dx * (size / 2) / distance, y: centerY + dy * (size / 2) / distance}
	  }
      },
    clone: ()=>{
      return createCircleNode(0, 0, size, color)
    },
    setColor: c => { color = c },
      getColor: () => { return color },
  }
}
