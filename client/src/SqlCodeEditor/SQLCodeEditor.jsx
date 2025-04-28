import React, {useEffect, useRef} from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-sql';
import './prism-custom.css';
import styles from './SqlCodeEditor.module.css';

import useSqlEditorLogic from './useSqlEditorLogic';

const SqlCodeEditor = ({value = '', onChange, placeholder = 'Введите SQL-запрос...'}) => {
    const codeRef = useRef(null);
    const textareaRef = useRef(null);

    const {content, handleChange, handleKeyDown, getLineNumbers} = useSqlEditorLogic({
        value,
        onChange,
        textareaRef,
    });

    useEffect(() => {
        Prism.highlightElement(codeRef.current);
    }, [content]);


    return (
        <div className={styles.editorWrapper}>
            <pre className={styles.lineNumbers} aria-hidden="true">
                {getLineNumbers()}
            </pre>

            <div className={styles.codeContainer}>
                {/* Подсветка */}
                <pre
                    style={{
                        margin: 0,
                        padding: '10px',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        minHeight: '100%',
                        pointerEvents: 'none',
                    }}
                >
                    <code ref={codeRef} className="language-sql">
                        {content || ' '}
                    </code>
                </pre>

                <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    spellCheck={false}
                    className={styles.textarea}
                />
            </div>
        </div>
    );
};

export default SqlCodeEditor;
