/**
 *
 * @param toolbarPanel  toolbarPanel to add node
 * @returns a toolbar
 */
function ToolBar (toolbarPanel) {
    let toolToUse
    let selectTool
    // create toolbar buttons
    let index = 0
    /**
     *
     * @param button nodes to draw
     * @param toolbarPanel add buttons to toolbarPanel
     * @returns a toolbar
     */
    function createButton (toolbarPanel, button) {
        const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        rect.setAttribute('x', 50 * index)
        rect.setAttribute('width', 50)
        rect.setAttribute('height', 50)
        rect.setAttribute('stroke', 'black')
        rect.setAttribute('stroke-width', '3')
        rect.setAttribute('fill', 'white')
        icon.appendChild(rect)
        toolbarPanel.appendChild(icon)
        const i = button
        i.translate(15 + 50 * index , 18)
        i.toolDraw(icon)
        icon.addEventListener('click', function () {
            let me = rect.getAttribute('stroke')
            if (me === 'black') {
                if (selectTool !== undefined) {
                    selectTool.childNodes[0].setAttribute('stroke', 'black')
                }
                rect.setAttribute('stroke', 'red')
                toolToUse = button
                selectTool = icon
            } else if (me === "red"){
                rect.setAttribute('stroke', 'black')
                toolToUse = undefined
                selectTool = undefined
            }
        })
        toolbarPanel.appendChild(icon)
        index++
    }

    // Add modes to the toolbar
    TBLists.mode.forEach((node) => {
        createButton(toolbarPanel, node)
    })


    // Add nodes to the toolbar
    TBLists.nodes.forEach((node) => {
        createButton(toolbarPanel, node)
    })


    // // Add edges to the toolbar
    TBLists.edges.forEach((edge) => {
        createButton(toolbarPanel, edge)

    })

    return {
        getTool () { return toolToUse }
    }
}
