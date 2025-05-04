import React, {useState} from 'react';
import styles from './Legend.module.css';
import closeIcon from "../assets/close-icon.png";
import openIcon from "../assets/open-icon.png"

const legendTables = [
    {color: '#d4edda', label: 'Origin table'},
    {color: '#d7cfe2', label: 'Temp table'},
    {color: '#cce5ff', label: 'Result table'},
    {color: '#f8d7da', label: 'Excess table'},
    {color: '#fff3cd', label: 'Not deleted table'},
];

const legendEdges = [
    {color: '#a8adb2', label: 'Necessary edge'},
    {color: '#e77681', label: 'Unnecessary edge'}
];

const Legend = ({fullscreen = false}) => {
    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className={`${styles.legend} ${fullscreen ? styles.legendFullscreen : ''}`}>
            {isVisible && (
                <div>
                    <h4>Tables</h4>
                    {legendTables.map((item, index) => (
                        <div key={index} className={styles.legendRow}>
                            <div
                                className={styles.legendColorBox}
                                style={{backgroundColor: item.color}}
                            />
                            <span>{item.label}</span>
                        </div>
                    ))}

                    <div className={styles.legendSeparator}/>

                    <h4>Edges</h4>
                    {legendEdges.map((item, index) => (
                        <div key={index} className={styles.legendRow}>
                            <div
                                className={styles.legendColorBox}
                                style={{backgroundColor: item.color}}
                            />
                            <span>{item.label}</span>
                        </div>
                    ))}
                </div>
            )}
            <button className={styles.toggleButton} onClick={toggleVisibility}>
                <img src={isVisible ? closeIcon : openIcon} alt="Fullscreen" className={styles.closeIcon}/>
            </button>
        </div>
    );
};

export default Legend;
