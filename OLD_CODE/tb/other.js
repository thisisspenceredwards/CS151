const TBLists = {
    mode: [
        selectMode(),
    ],
    nodes: [

        createfakeNode(20, 'goldenrod'),
        createfakeNode(50, 'blue'),

        //createCircleNode(30, 'blue')
        // createNoteNode(),
        // createImplicitParameterNode(),
        // createCallNode()
        // ImplicitParameterNode()
    ],
    edges: [
        // createLineEdge(),
        // createNoteEdge(),
        // createCallEdge()
    ]
}

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
        draw: (anyPanel) => {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
            line.setAttribute('x1', 0)
            line.setAttribute('y1', 0)
            line.setAttribute('x2', 20)
            line.setAttribute('y2', 20)
            anyPanel.appendChild(line)
        },}}