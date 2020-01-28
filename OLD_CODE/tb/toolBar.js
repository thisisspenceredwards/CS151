
function ToolBar (g, graphSVG, toolbarSVG) {

    toolbarSVG.setAttribute('width', 2000)
    toolbarSVG.setAttribute('height', 50)

    // Set current active button
    let activeTool
    let activeIcon
    // create toolbar buttons
    let index = 0
    function createButton (toolbarSVG, button) {
        const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        rect.setAttribute('x', 50 * index)
        rect.setAttribute('width', 50)
        rect.setAttribute('height', 50)
        rect.setAttribute('stroke', 'black')
        rect.setAttribute('stroke-width', '3')
        rect.setAttribute('fill', 'white')
        icon.appendChild(rect)
        toolbarSVG.appendChild(icon)
        const i = button
        if (button.getType() === 'EDGE') {
        //    tbd
        } else {
             i.translate(25 + 50 * index, 25)
         }
         i.draw(icon)
        icon.addEventListener('click', activate)
        // toolbarSVG.appendChild(icon)

        function activate () {
            if (rect.getAttribute('stroke') === 'black') {
                if (activeIcon !== undefined) {
                    activeIcon.childNodes[0].setAttribute('stroke', 'black')
                    // rect.setAttribute('stroke-width', '0.5')
                }
                rect.setAttribute('stroke', 'red')
                // rect.setAttribute('stroke-width', '2')
                activeTool = button
                activeIcon = icon
                const toolChange= new Event('toolSelect')
                  document.dispatchEvent(toolChange)
            } else {
                rect.setAttribute('stroke', 'black')
                // rect.setAttribute('stroke-width', '0.5')
                activeTool = undefined
                activeIcon = undefined
            }
        }
        index++
    }

    // Add modes to the toolbar
    TBLists.mode.forEach((node) => {
        createButton(toolbarSVG, node)
    })


    // Add nodes to the toolbar
    TBLists.nodes.forEach((node) => {
        createButton(toolbarSVG, node)
    })

    // // Add edges to the toolbar


    return {
        getTool () { return activeTool }
    }
}