//
// // helper functions
// function drawGrabber (x, y) {
//     const size = 5
//
//     const panel = document.getElementById('graphpanel')
//     const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
//     rect.setAttribute('x', x - size / 2)
//     rect.setAttribute('y', y - size / 2)
//     rect.setAttribute('width', size)
//     rect.setAttribute('height', size)
//     rect.setAttribute('fill', 'black')
//     panel.appendChild(rect)
// }
//
// function Node (type, props) { // creates node of proper type
//     if (type === 'circle') { return createCircleNode(props.size, props.color) }
//     if (type === 'rectangle') { return RectangleNode(props.size, props.color) }
// }
//
// function Edge (type, json) { // returns new generic edge objects
//
// }
//
// function center(rect) {
//     return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
// }
// function resize(){//for resizeing graph panel
//
// }


// Framework
function Graph (json) { // returns new generic edge objects
    const edges = []
    const nodes = []
    if (json) {
        for (const n of json.nodes) {
            nodes.push(Node(n.type, n))
        }
        for (const e of json.edges) {
            edges.push(Edge(e.type, e))//won't work find another way for edges(store edge as type and center points for each of its nodes)
        }
    }
    return {
        add (n) {
            nodes.push(n)
        },
        remove (n) {//remove a node or edge
            for (let i = edges.length-1; i >=0; i--) {
                if(edges[i].start()===n || edges[i].end()===n || edges[i]===n){
                    edges.splice(i,1)
                }
            }
            for (let i = nodes.length-1; i >=0 ; i--) {//no real need to run decremnting loop since only removing one item
                if (nodes[i] === n) {
                    nodes.splice(i, 1)
                    return;
                }
            }
        },
        findNode (p) { // requires Node: contains
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].contains(p)) {
                    return nodes[i]
                }
            }
        },

        findEdge (p) {
            for (let i = 0; i < edges.length; i++) {
                if (edges[i].contains(p) ) {
                    return edges[i]
                }
            }
        },

        connect (edge, p1, p2) {
            const s = this.findNode(p1)
            const e = this.findNode(p2)
            for(const ed of edges){//don't add edge if exists already?
                if(ed.start()===s && ed.end()===e){//order matters
                    return false
                }
            }
            if (s && e) {
                edge.connect(s, e)
                edges.push(edge)
                return true
            }
            return false
        },
        draw () {
            const graphSVG = document.getElementById('graphpanel').getBoundingClientRect()
            for (const n of nodes) {
                /*n.getBounds()
                if(){

                }*/
                n.draw(document.getElementById('graphpanel'))
            }
            for (const e of edges) {
                e.draw(document.getElementById('graphpanel'))
            }
        },
        save () {
            saveBlob(new Blob([JSON.stringify({ edges, nodes })], { type: 'application/json' }), 'graph.json', true)
        }
    }
}