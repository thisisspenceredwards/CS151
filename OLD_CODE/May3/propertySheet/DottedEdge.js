/*
NOTE: can only be used to connect Note nodes to Note nodes or Note nodes to Object nodes, NOT Object nodes to Object nodes. Will implement this later on in the project
*/
function createDottedEdge() {
  let x  //for tool bar icon
  let y // for tool bar icon
  let start = undefined
  let end = undefined
  let p
    let q
    let fromPoint = undefined
    let toPoint = undefined
  let isSelected
  return {
    connect: function (s, e) {
      start = s
      end = e
    },
    getBounds: () => {
      return {
        x: p.x,
        y: p.y,
        width: q.x - p.x,
        height: q.y - p.y
      }
    },
    toolDraw: function (anyPanel) { //lots of jumping through hoops to get this drawn from the draw method...
      let flag = 1
      let littleCircle1 = createCircleNode(x-10, y-10, 10)  //point node equivalent from violet
      let littleCircle2 = createCircleNode(x + 20, y+ 19, 10) //19 to get rid of the small extra dot
      this.connect(littleCircle1, littleCircle2)
      this.draw(flag, anyPanel)
    },
    contains: z => {
      //find slope of current line
      let p1 = {
        x: start.getBounds().x,
        y: start.getBounds().y
      }
      let p2 = {
        x: end.getBounds().x,
        y: end.getBounds().y
      }
      p = start.getConnectionPoint(p2)
      q = end.getConnectionPoint(p1)
      isSelected = false
      let minimumX
      let minimumY
      let maximumX
      let maximumY
      if(p.x > q.x){
        maximumX = p.x
        minimumX = q.x
      }
      else {
        maximumX = q.x
        minimumX = p.x
      }
      if(p.y > q.y) {
        maximumY = p.y
        minimumY = q.y
      }
      else {
        maximumY = q.y
        minimumY = p.y
      }
      if( Math.abs(q.x - p.x) > 10)//does not work if the x's are the same or too close to the same value
      {
        let slope = (q.y - p.y)/(q.x - p.x)
        let yIntercept = q.y - (slope*q.x) //solve for b
        let equation = (slope*z.x) + yIntercept  //find what Y should be given an X to be on the line
        if ( equation >= z.y- 10 && equation <= z.y+10 && z.x >= minimumX-10 && z.x <= maximumX+10 && z.y >= minimumY-10 && z.y <= maximumY+10 ) {
          isSelected = true
          return true
        }
      }
      else if (p.x + 10 >= z.x && p.x - 10 <= z.x && z.y >= minimumY-10 && z.y <= maximumY+10 )//if x = x
      {
        isSelected = true
        return true
      }
      else{
        isSelected = false
        return false
      }
    },
    translate: (xIn, yIn) => { //for toolbar icon translate
      console.log("IN translate dotted edge")
      x = xIn
      y = yIn
      return
    },

    draw: function (flag, anyPanel) {
      const panel = document.getElementById('graphpanel')
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      let p1 = {
	    x: start.getBounds().x,
	    y: start.getBounds().y	    
	}
	let p2 = {
	    x: end.getBounds().x,
	    y: end.getBounds().y	    
	}
	fromPoint = start.getConnectionPoint(p2)
	toPoint = end.getConnectionPoint(p1)
	fromPoint = start.getConnectionPoint(toPoint)
	toPoint = end.getConnectionPoint(fromPoint)

      line.setAttribute('x1', fromPoint.x )
      line.setAttribute('x2', toPoint.x)
      line.setAttribute('y1', fromPoint.y)
      line.setAttribute('y2', toPoint.y )
      if(isSelected === true)
      {
        line.setAttribute('stroke', 'darkgrey')
      }
      else {
        line.setAttribute('stroke', 'black')
      }
      line.setAttribute('stroke-dasharray', '4', '4')

      if(flag === 1)
      {
        anyPanel.appendChild(line)
      }
      else {
        panel.append(line)
      }
    },
    clone : ()=>
    {
      createDottedEdge()
    }
  }
}
