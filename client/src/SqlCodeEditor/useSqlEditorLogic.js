import {useState} from 'react';

const useSqlEditorLogic = ({value, onChange, textareaRef}) => {
    const [content, setContent] = useState(value);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setContent(newValue);
        onChange?.(newValue);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const {selectionStart, selectionEnd} = e.target;
            const newValue =
                content.slice(0, selectionStart) + '  ' + content.slice(selectionEnd);
            setContent(newValue);
            onChange?.(newValue);

            requestAnimationFrame(() => {
                textareaRef.current.selectionStart = textareaRef.current.selectionEnd =
                    selectionStart + 2;
            });
        }
    };

    const getLineNumbers = () => {
        const lines = content.split('\n').length || 1;
        return Array.from({length: lines}, (_, i) => i + 1).join('\n');
    };

    return {
        content,
        setContent,
        handleChange,
        handleKeyDown,
        getLineNumbers,
    };
};

export default useSqlEditorLogic;
