import React, {useState} from 'react';
import {Handle, Position} from 'reactflow';
import styles from './CustomNode.module.css';
import expandIcon from "../assets/expand-icon.png"

const CustomNode = ({data}) => {
    const [is_expanded, setExpanded] = useState(false);

    const toggleExpanded = (e) => {
        e.stopPropagation();
        setExpanded((prev) => !prev);
    };

    return (
        <div className={styles.nodeContainer} style={{height: is_expanded ? 'auto' : '24px'}}>
            <div>{data.label}</div>

            {data.type !== 'origin' &&
                <button onClick={toggleExpanded} className={`${styles.expandButton} ${is_expanded ? styles.expandPosition : ''}`}>
                    <img src={expandIcon} alt="Expand" className={`${styles.expandIcon} ${is_expanded ? styles.rotated : ''}`} />
                </button>
            }
            {is_expanded && <div className={styles.separator}/>}

            {is_expanded && Array.isArray(data.fields) && (
                <ul className={styles.fieldsList}>
                    {data.fields.map((field, index) => (
                        <li key={index}>{field}</li>
                    ))}
                </ul>
            )}

            <Handle type="target" position={Position.Top}/>
            <Handle type="source" position={Position.Bottom}/>
        </div>
    );
};

export default CustomNode;
