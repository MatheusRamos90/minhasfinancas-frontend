import React from 'react';

export default (props) => {

    const options = props.options.map((opt,index) => {
        return(
            <>
                <option value={opt.value} key={index}>{opt.label}</option>
            </>
        );
    });

    return(
        <>
            <select {...props}>
                {options}
            </select>
        </>
    )
};