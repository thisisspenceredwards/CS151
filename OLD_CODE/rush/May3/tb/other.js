
const TBLists = {
    mode: [
        selectMode(),
      deleteMode()
    ],
    nodes: [
	createCircleNode(0, 0, 20, 'red'),
	createDiamondNode(0, 0, 20, 'goldenrod'),
	createObjectNode(0,0),
	createChildNode(0,0),
	createNoteNode(0,0, 'bisque')
    ],
    edges: [

    createEdge(0),
        createDottedEdge()
    ]
}

function selectMode ( ) {
    let x = 0
    let y = 0
    return {
        getType: () => {
            return 'selectMode'
        },
        translate: (dx, dy) => {
            x += dx
            y += dy
        },
        toolDraw: (anyPanel) => {
            y = y - 3  // for centering
            x = x - 1  // for centering
            let width = x + 8
            let height = y + 8
            drawGrabber(x, y, anyPanel)  // added argument for adding to tool bar
            drawGrabber(x + width, y, anyPanel)
            drawGrabber(x, y + height, anyPanel)
            drawGrabber(x + width, y + height, anyPanel)
        },}}

function deleteMode()
{
    let    size = 20
    let x = 0
    let y = 0
    return {
        getType: () => {
            return "deleteMode"
        },
        toolDraw: (anyPanel) => {
            const t = document.createElementNS('http://www.w3.org/2000/svg', 'text' )
            t.setAttribute('x', x -10)
            t.setAttribute('y', y + 10)
            t.textContent = 'DELETE'
            t.setAttribute('font-size', 10)
            anyPanel.appendChild(t)

        },
        translate: (dx, dy) => {
            x += dx
            y += dy
        },

    }
}
