import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Alert = (props) => {
    // Capitalize function
    const capitalized = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    };

    // Show toast based on alert prop
    useEffect(() => {
        if (props.alert) {
            const { type, msg } = props.alert;

            switch (type) {
                case 'success':
                    toast.success(capitalized(msg));
                    break;
                case 'error':
                    toast.error(capitalized(msg));
                    break;
                case 'info':
                    toast(capitalized(msg), { icon: 'ℹ️' });
                    break;
                case 'warning':
                    toast(capitalized(msg), { icon: '⚠️' });
                    break;
                default:
                    toast(capitalized(msg));
            }
        }
    }, [props.alert]); // Re-run this when the alert prop changes

    return (
        // Placeholder div for consistent layout
        <div style={{ height: '15px' }} className='my-3'></div>
    );
};

export default Alert;
