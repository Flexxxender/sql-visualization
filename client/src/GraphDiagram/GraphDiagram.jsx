import React from 'react';
import ReactFlow, {Background, MarkerType, useEdgesState, useNodesState} from 'reactflow';
import Legend from './Legend';
import {getLayoutedElements} from './layoutUtils';
import {getEdgeStyle, getNodeStyle} from './graphStyles';
import styles from './GraphDiagram.module.css';

const GraphDiagram = ({data, fullscreen = false}) => {

    const convertDataToElements = (data) => {
        const nodes = [];
        const edges = [];
        const nodeIds = new Set();

        data.edges.forEach((edge) => {
            const sourceId = edge.source.table.name;
            const targetId = edge.target.table.name;

            if (!nodeIds.has(sourceId)) {
                nodes.push({
                    id: sourceId,
                    data: {label: sourceId},
                    style: getNodeStyle(edge.source.type, edge.source.table.was_deleted),
                });
                nodeIds.add(sourceId);
            }

            if (!nodeIds.has(targetId)) {
                nodes.push({
                    id: targetId,
                    data: {label: targetId},
                    style: getNodeStyle(edge.target.type, edge.target.table.was_deleted),
                });
                nodeIds.add(targetId);
            }

            edges.push({
                id: `${sourceId}-${targetId}`,
                source: sourceId,
                target: targetId,
                markerEnd: {type: MarkerType.ArrowClosed},
                style: getEdgeStyle(edge.type),
            });
        });

        return getLayoutedElements(nodes, edges);
    };

    const {nodes: initialNodes, edges: initialEdges} = convertDataToElements(data);
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, , onEdgesChange] = useEdgesState(initialEdges);

    return (
        <div className={fullscreen ? styles.diagramWrapperFullscreen : styles.diagramWrapper}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
            >
                <Background/>
                <Legend fullscreen={fullscreen}/>
            </ReactFlow>
        </div>
    );
};

export default GraphDiagram;
