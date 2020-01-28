/*
NOTE: can only be used to connect Note nodes to Note nodes or Note nodes to Object nodes, NOT Object nodes to Object nodes. Will implement this later on in the project
*/
/**
 * Creates an edge that is dashed
 * @returns {{contains: contains, toolDraw: toolDraw, clone: (function(): {contains: contains, toolDraw: toolDraw, clone, draw: draw, connect: connect, getBounds: (function(): {x: *, width: number, y: *, height: number}), translate: translate}), draw: draw, connect: connect, getBounds: (function(): {x: *, width: number, y: *, height: number}), translate: translate}}
 */
function createDottedEdge() {
  let x  //for tool bar icon
  let y  // for tool bar icon
  let start = undefined
  let end = undefined
  let p
  let q
  let fromPoint = undefined
  let toPoint = undefined
  let isSelected
  return {
    /**
     *
     * @param s starting point
     * @param e ending point
     */
    connect: function (s, e) {
      start = s
      end = e
    },
    /**
     * return the bounds of the edge
     * @returns {{x: *, width: number, y: *, height: number}}
     */
    getBounds: () => {
      return {
        x: p.x,
        y: p.y,
        width: q.x - p.x,
        height: q.y - p.y
      }
    },
    /**
     * draws the image on the icon
     * @param anyPanel the div containing the toolbar
     */
    toolDraw: function (anyPanel) { 
      let flag = 1
      let littleCircle1 = createCircleNode()  
      littleCircle1.translate(x - 20, y - 20)
      let littleCircle2 = createCircleNode(0) 
      littleCircle2.translate(x + 20, y + 20)
      this.connect(littleCircle1, littleCircle2)
      this.draw(flag, anyPanel)
    },
    /**
     *
     * @param z the point in question
     * @returns {boolean} if the point is 'on' the line
     */
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
    /**
     *
     * @param xIn the amount to move x
     * @param yIn the amount to move y
     */
    translate: (xIn, yIn) => { //for toolbar icon translate
      console.log("IN translate dotted edge")
      x = xIn
      y = yIn
      return
    },
    /**
     *
     * @param flag for whether the draw method is being used for the graph or toolbar
     * @param anyPanel the div for the tool bar if it is needed
     */
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
    /**
     * makes a clone of the edge
     * @returns {{contains: contains, toolDraw: toolDraw, clone: (function(): {contains: contains, toolDraw: toolDraw, clone, draw: draw, connect: connect, getBounds: (function(): {x: *, width: number, y: *, height: number}), translate: translate}), draw: draw, connect: connect, getBounds: (function(): {x: *, width: number, y: *, height: number}), translate: translate}}
     */
    clone : ()=>
    {
      return createDottedEdge()
    }
  }
}
