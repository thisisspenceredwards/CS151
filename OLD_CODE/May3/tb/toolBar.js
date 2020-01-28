function ToolBar (toolbarPanel) {


    let toolToUse
    let selectTool
    // create toolbar buttons
    let index = 0
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
	console.log('hello')
	console.log(index)
	console.log(i)

	//Joe left this here but I commented out for now, I am not sure what his intentions were
	/*
        if (button.getType() === 'EDGE') {
            //    tbd
	    
        }
        else {*/
	//This is to translate the object to center it in the button, kind of
        console.log("before translate")
        i.translate(15 + 50 * index , 18)
	console.log('kkkk')
        //}

	//the objects need to have a toolDraw(panel) method in order for the following line to work. I added it into circleNode and diamondNode. The fakeNode that Joe implemented uses this method so I just added it to cricleNode, DiamondNode, and ObjectNode and modified to make it work
        i.toolDraw(icon)
        icon.addEventListener('click', select)
        toolbarPanel.appendChild(icon)

        function select () {
            if (rect.getAttribute('stroke') === 'black') {
                if (selectTool !== undefined) {
                    selectTool.childNodes[0].setAttribute('stroke', 'black')
                }
                rect.setAttribute('stroke', 'red')
                toolToUse = button
                selectTool = icon
            } else {
                rect.setAttribute('stroke', 'black')
                toolToUse = undefined
                selectTool = undefined
            }
        }
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
