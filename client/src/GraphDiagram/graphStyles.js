export const getNodeStyle = (type, was_deleted) => ({
    fontFamily: "'JetBrains Mono', monospace",
    borderRadius: '4px',
    fontSize: '12px',
    border: 'none',
    ...(!was_deleted && type === 'temp' ? {
        backgroundColor: '#fff3cd',
        color: '#856404',
    } : type === 'origin' ? {
        backgroundColor: '#d4edda',
        color: '#155724',
    } : type === 'temp' ? {
        backgroundColor: '#d7cfe2',
        color: '#59565e',
    } : type === 'result' ? {
        backgroundColor: '#cce5ff',
        color: '#004085',
    } : {
        backgroundColor: '#f8d7da',
        color: '#721c24',
    })
});

export const getEdgeStyle = (type) => ({
    stroke: type === 'excess' ? '#dc3545' : '#6c757d',
    strokeWidth: 1.5,
});
