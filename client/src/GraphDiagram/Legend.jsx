import React, {useState} from 'react';
import styles from './Legend.module.css';

const legendTables = [
    {color: '#d4edda', label: 'Исходная таблица'},
    {color: '#d7cfe2', label: 'Промежуточная таблица'},
    {color: '#cce5ff', label: 'Результирующая таблица'},
    {color: '#f8d7da', label: 'Лишняя таблица'},
    {color: '#fff3cd', label: 'Не удаленная таблица'},
];

const legendEdges = [
    {color: '#a8adb2', label: 'Нужное ребро'},
    {color: '#e77681', label: 'Лишнее ребро'}
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
                    <h4>Таблицы</h4>
                    {legendTables.map((item, index) => (
                        <div key={index} className={styles.legendRow}>
                            <div
                                className={styles.legendColorBox}
                                style={{backgroundColor: item.color}}
                            />
                            <span>{item.label}</span>
                        </div>
                    ))}

                    <div className={styles.legendSeparator} />

                    <h4>Ребра</h4>
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
            <button className={`${styles.toggleButton} ${isVisible ? '': styles.toggleButtonRotated}`} onClick={toggleVisibility}>
                ✕
            </button>
        </div>
    );
};

export default Legend;
