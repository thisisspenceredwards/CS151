/*
 connect Object field to another object
*/

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

	   let p1 ={
	       x: start.getBounds().x,
	       y: start.getBounds().y
	   }
	   let p2 ={
	       x: end.getBounds().x,
	       y: end.getBounds().y
	   }
      let p = start.getConnectionPoint(p2)
	   let q = end.getConnectionPoint(p1)
	   p = start.getConnectionPoint(q)
	   q = end.getConnectionPoint(p)
	       /*
      const p = center(start.getBounds())
      const q = center(end.getBounds()) */
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
