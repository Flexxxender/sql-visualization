import dagre from "@dagrejs/dagre";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

export const calculateNodeWidth = (text) => {
    const baseWidth = 50;
    const charWidth = 6;
    return Math.min(baseWidth + (text.length * charWidth), 300);
};

export const getLayoutedElements = (nodes, edges, direction = 'TB') => {
    dagreGraph.setGraph({rankdir: direction});

    nodes.forEach((node) => {
        const nodeWidth = calculateNodeWidth(node.data.label);
        const nodeHeight = 36;

        dagreGraph.setNode(node.id, {width: nodeWidth, height: nodeHeight});

        node.style = {
            ...node.style,
            width: nodeWidth,
            height: nodeHeight,
            padding: '6px 8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            wordBreak: 'break-word',
            overflow: 'hidden',
        };
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        const nodeWidth = calculateNodeWidth(node.data.label);

        node.position = {
            x: nodeWithPosition.x - nodeWidth / 2,
            y: nodeWithPosition.y - 18,
        };
    });

    return {nodes, edges};
};
