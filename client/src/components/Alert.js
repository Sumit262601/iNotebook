import React from 'react'

const Alert = (props) => {
    const capitalized = (word) => {
        // if (word === "danger"){
        //     word === "error"
        // }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    return (
        <div style={{ height: '15px' }} className='my-3'>
            {props.alert && (
            <div className={`alert alert-${props.alert.type} alert-dismissible fade show col-md-4`}role="alert">
                <strong> {capitalized(props.alert.msg)}</strong>
            </div>
            )}
        </div>
    )
}

export default Alert