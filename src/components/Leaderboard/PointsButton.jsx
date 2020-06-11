import React from 'react';
import styled from 'styled-components';
const classnames = require('classnames');

const PointsButton = styled.button.attrs(props => ({
    className: props.className,
}))`

    & .Selected{
        background: green;
    }

    background: blue;
    border-radius: 0.5em;
    color: white;
    font-size: 1em;`
     

export default function Pointsbutton(props) {

    return (
       <PointsButton>
        {props.children}
       </PointsButton>

    )
}