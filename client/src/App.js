import React, {useState, useRef} from 'react';
import axios from 'axios';
import GraphDiagram from "./GraphDiagram/GraphDiagram";
import 'reactflow/dist/style.css';
import SQLCodeEditor from './SqlCodeEditor/SQLCodeEditor';
import {exportToPDF} from './Utils/exportToPDF';
import {formatError} from './Utils/formatError';
import GraphModal from './GraphDiagram/GraphModal'
import styles from './App.module.css';

function App() {
    const [sql, setSql] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [showGraph, setShowGraph] = useState(false);
    const reactFlowWrapper = useRef(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenFullScreen = () => setIsModalOpen(true);
    const handleCloseFullScreen = () => setIsModalOpen(false);


    const handleAnalyzeSQL = async () => {
        setError(null);
        setResult(null);
        setShowGraph(false);

        try {
            const response = await axios.post('http://localhost:8000/sql/parse', {sql});
            setResult(response.data);
            setShowGraph(true);
        } catch (err) {
            const errorData = err.response?.data || err.message;
            setError(errorData);
        }
    };

    const handleExportToPDF = async () => {
        if (!result) return;
        try {
            await exportToPDF(reactFlowWrapper.current);
        } catch (error) {
            setError({message: 'Не удалось экспортировать диаграмму в PDF'});
        }
    };

    return (
        <div className={styles.appContainer}>
            <div className={styles.card}>
                <h1 className={styles.title}>SQL Visualizer</h1>

                <SQLCodeEditor value={sql} onChange={setSql}/>

                <div className={styles.buttonCenter}>
                    <button className={styles.button} onClick={handleAnalyzeSQL}>Анализировать</button>
                </div>

                {error && (
                    <div className={styles.errorContainer}>
                        <div className={styles.errorHeader}>
                            <div className={styles.errorIcon}>
                                !
                            </div>
                            <h3 style={{margin: 0}}>Ошибка выполнения запроса</h3>
                        </div>
                        <div className={styles.errorDetails}>
                            {formatError(error)}
                        </div>
                        <div className={styles.errorHint}>
                            Проверьте синтаксис SQL и попробуйте снова
                        </div>
                    </div>
                )}

                {showGraph && result && (
                    <div className={styles.graphWrapper} ref={reactFlowWrapper}>
                        <GraphDiagram data={result}/>
                    </div>
                )}

                {showGraph && result && (
                    <>
                        <div className={styles.buttonRow}>
                            <button className={styles.button} onClick={handleExportToPDF}>Экспорт в PDF</button>
                            <button className={styles.button} onClick={handleOpenFullScreen}>Открыть на весь экран</button>
                        </div>
                        {isModalOpen && (
                            <GraphModal data={result} onClose={handleCloseFullScreen}/>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default App;