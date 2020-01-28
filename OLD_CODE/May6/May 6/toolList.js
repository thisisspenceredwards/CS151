
const TBLists = {
    mode: [
        selectMode(),
    ],
    nodes: [

	/*these are the list of nodes that will be added to the toolbar. NOTE: they all require the method toolDraw in order to work */
	//the first two are functions created by Joe but we will not use them later in the project
        //createfakeNode(20, 'goldenrod'),
        //createfakeNode(20, 'blue'),
	createCircleNode(0, 0, 20, 'red'),
	createDiamondNode(0, 0, 20, 'goldenrod'),
	createObjectNode(0,0),
	createChildNode(0,0),
	createNoteNode(0,0, 'bisque')

	//Joe left these here
        //createCircleNode(30, 'blue')
        // createNoteNode(),
        // createImplicitParameterNode(),
        // createCallNode()
        // ImplicitParameterNode()
    ],
    edges: [
	/*This is where the edges have to be added in order to be shown in the toolbar I was trying to create an edge with random points in hopes that it would draw but it didn't work. The edges are also going to need a toolDraw method that I have not yet implemented*/
    createEdge(0),
        createDottedEdge()
	//createEdge(0).connect({x: 5,y: 20},{x: 20,y: 5}),

	//Joe left these here
        // createNoteEdge(),
        // createCallEdge()
    ]
}
/**
 *
 * @returns a node that present selectMode
 */
function selectMode ( ) {
    let x = 0
    let y = 0
    return {
        getType: () => {
            return 'selectMode'
        },
        // getBounds: () => {
        //     return {
        //         x: x,
        //         y: y,
        //         width: _size,
        //         height: _size
        //     }
        // },
        // contains: p => {
        //     return (x + _size / 2 - p.x) ** 2 + (y + _size / 2 - p.y) ** 2 <= _size ** 2 / 4
        // },
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
