//add objects to the tool bar here
const TBLists = {
    mode: [
        selectMode(),
    ],
    nodes: [
	createCircleNode(),
	createDiamondNode(),
	createObjectNode(),
	createChildNode(),
	createNoteNode()
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
