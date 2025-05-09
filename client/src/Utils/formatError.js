export const formatError = (error) => {
    if (!error) return null;

    if (error.detail?.errors) {
        return (
            <div>
                {error.detail.errors.map((err, index) => (
                    <div key={index} style={{marginBottom: '10px'}}>
                        {err.split('\n').map((line, i) => {
                            const cleanLine = line.replace(/\u001b\[\d+m/g, ''); // Убираем коды
                            return (
                                <div
                                    key={i}
                                    style={{
                                        fontFamily: '"Fira Code", monospace',
                                        fontSize: '14px',
                                        color: '#333',
                                        whiteSpace: 'pre-wrap'
                                    }}
                                >
                                    {cleanLine}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        );
    }

    if (typeof error === 'string') {
        return <div style={{whiteSpace: 'pre-wrap'}}>{error}</div>;
    }

    return <pre style={{whiteSpace: 'pre-wrap'}}>{JSON.stringify(error, null, 2)}</pre>;
};