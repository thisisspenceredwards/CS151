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