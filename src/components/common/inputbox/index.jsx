import React from "react";
import './style.css';

const InputBox = ({ type, placeholder, style, handleChange, handleKeypress, value }) => {
    return (
        <input type={type ? type : "text"} style={style ? style : {}} placeholder={placeholder ? placeholder : ''} onChange={(e) => handleChange(e)} onKeyDown={(e) => handleKeypress(e)} value={value} />
    )
}

export default InputBox;