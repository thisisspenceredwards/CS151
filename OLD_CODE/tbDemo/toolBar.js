
function ToolBar (g, graphSVG, toolbarSVG) {
    // Set height and width of toolbar
    const toolbarHeight = 50
    toolbarSVG.setAttribute('width', 750)
    toolbarSVG.setAttribute('height', toolbarHeight)

    // Set current active button
    let activeTool
    let activeIcon




    // create toolbar buttons
    let offset = 0
    function createButton (toolbarSVG, image) {
        const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        rect.setAttribute('x', 50 * offset)
        rect.setAttribute('width', 50)
        rect.setAttribute('height', 50)
        rect.setAttribute('stroke', 'black')
        rect.setAttribute('fill', 'white')
        icon.appendChild(rect)
        // const i = image.clone()
        const i = image
        // if (image.getType() === 'EDGE') {
        //     let p = createPointNode()
        //     p.translate(50 * offset, 0)
        //     let q = createPointNode()
        //     q.translate(50 * offset + 50, 50)
        //     i.connect(p, q)
        // } else {
            i.translate(15 + 50 * offset, 15)
        // }
        i.draw(icon)
        icon.addEventListener('click', activate)
        toolbarSVG.appendChild(icon)

        function activate () {
            if (rect.getAttribute('fill') === 'white') {
                if (activeIcon !== undefined) {
                    activeIcon.childNodes[0].setAttribute('fill', 'white')
                }
                rect.setAttribute('fill', 'grey')
                activeTool = image
                activeIcon = icon
                document.dispatchEvent(toolChange)
            } else {
                rect.setAttribute('fill', 'white')
                activeTool = undefined
                activeIcon = undefined
            }
        }

        offset++
    }

    // Add select button
    // createButton(toolbarSVG, selectIcon())

    // Add nodes to the toolbar
    simplegraph.nodes.forEach((node) => {
        createButton(toolbarSVG, node)
    })

    // // Add edges to the toolbar
    // simplegraph.edges.forEach((edge) => {
    //     createButton(toolbarSVG, edge)
    // })

    return {
        getTool () { return activeTool }
    }
}