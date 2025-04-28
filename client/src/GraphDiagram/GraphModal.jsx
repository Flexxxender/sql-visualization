import React from 'react';
import GraphDiagram from './GraphDiagram';
import styles from './GraphModal.module.css';

const GraphModal = ({data, onClose}) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>
                    ✕
                </button>
                <div className={styles.diagramContainer}>
                    <GraphDiagram data={data} fullscreen/>
                </div>
            </div>
        </div>
    );
};

export default GraphModal;
