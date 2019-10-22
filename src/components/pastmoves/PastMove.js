import React from 'react';
import PastRow from "./PastRow"

export default function PastMove({squares}) {
    return [...Array(3).keys()].map(i => {
        return <PastRow key={i} iterator={i} squares={squares}/>
    })
}
