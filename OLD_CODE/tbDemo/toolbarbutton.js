// let offset = 0
// function createToolBarButton (toolbarSVG, image, onclickaction) {
//     const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
//     const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
//     rect.setAttribute('x', 50 * offset)
//     offset++
//     rect.setAttribute('width', 50)
//     rect.setAttribute('height', 50)
//     rect.setAttribute('stroke', 'black')
//     rect.setAttribute('fill', 'white')
//     icon.appendChild(rect)
//     const n = image(15 + 50, 15)
//     n.draw(icon)
//     icon.addEventListener('click', activate)
//     toolbarSVG.appendChild(icon)
//
//     function activate () {
//         if (rect.getAttribute('fill') === 'white') {
//              rect.setAttribute('fill', 'grey')
//         } else {
//             rect.setAttribute('fill', 'white')
//         }
//         onclickaction()
//     }
//
//     // return {
//     //     activate: activate
//     // }
// }
//
//

