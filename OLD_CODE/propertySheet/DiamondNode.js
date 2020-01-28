
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
     getConnectionPoint: p =>{
       let centerX = x + size / 2
       let centerY = y 
       let dx = p.x - centerX
       let dy = p.y - centerY

	 console.log(centerX)
	 console.log(centerY)
	 if(dx < -dy && dx < dy)
	     return {x: centerX - (size / 2), y: centerY}
	 else if(dx >= dy && dx  >= -dy)
	     return {x: centerX + (size / 2), y: centerY}
	 else if(dx >= -dy && dx < dy)
	     return {x: centerX, y: centerY + (size / 2)}
	 else 
	     return {x: centerX, y: centerY - (size / 2)}
	 
    },
    setColor: c => { color = c },
    getColor: () => { return color }
  }
}
