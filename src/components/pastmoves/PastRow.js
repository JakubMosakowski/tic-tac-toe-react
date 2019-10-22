import React from 'react'

export default function PastRow({squares, iterator}) {
    iterator *= 3
    return <tr>
        {[...Array(3).keys()].map(i => {
            return <td key={i}>{squares[iterator + i]}</td>
        })}
    </tr>
}
