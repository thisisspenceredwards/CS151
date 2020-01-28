function createfakeNode (size, color) {
    let _size = size
    let _color = color
    let x = 0
    let y = 0
    return {
        getType: () => {
            return 'NODE'
        },
        getBounds: () => {
            return {
                x: x,
                y: y,
                width: _size,
                height: _size
            }
        },
        contains: p => {
            return (x + _size / 2 - p.x) ** 2 + (y + _size / 2 - p.y) ** 2 <= _size ** 2 / 4
        },
        translate: (dx, dy) => {
            x += dx
            y += dy
        },
        draw: (anyPanel) => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
            circle.setAttribute('cx', x + _size / 2)
            circle.setAttribute('cy', y + _size / 2)
            circle.setAttribute('r', _size / 2)
            circle.setAttribute('fill', _color)
            anyPanel.appendChild(circle)
        },

    }

}