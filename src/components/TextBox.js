import React from 'react';

const TextBox = ({ onPressEnter, rupiahValue, onTextChange, helper, isHelperEnabled }) => {
    return (
        <div className="measure pa4 black-80" onSubmit={ onPressEnter }>
            <label htmlFor="name" className="f6 b db mb2">Number <span className="normal black-60">(in Rupiah)</span></label>
            <input 
                id="name" 
                className={ isHelperEnabled ? "input-reset ba b--red pa2 mb2 db w-100" : "input-reset ba b--black-20 pa2 mb2 db w-100"} 
                type="text" 
                aria-describedby="name-desc" 
                autoComplete='off' 
                onKeyDown={ onPressEnter }
                value={ rupiahValue }    
                onChange={ onTextChange }
            />
            {
                isHelperEnabled ? <small id="name-desc" className="f6 red db mb2">{ helper }</small> : null
            }
        </div>
    );
}

export default TextBox;