import React from 'react';
import ReactFlow, {Background, MarkerType, useEdgesState, useNodesState} from 'reactflow';
import Legend from './Legend';
import {getLayoutedElements} from './layoutUtils';
import {getEdgeStyle, getNodeStyle} from './graphStyles';
import styles from './GraphDiagram.module.css';
import CustomNode from './CustomNode';
import fullscreenIcon from '../assets/fullscreen-icon.png';

const nodeTypes = {
    custom: CustomNode,
};

const GraphDiagram = ({data, fullscreen = false, onOpenFullscreen}) => {

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
                    type: 'custom',
                    data: {
                        label: sourceId,
                        fields: edge.source.table.attributes,
                        type: edge.source.type
                    },
                    className: styles.node,
                    style: getNodeStyle(edge.source.type, edge.source.table.was_deleted),
                });
                nodeIds.add(sourceId);
            }

            if (!nodeIds.has(targetId)) {
                nodes.push({
                    id: targetId,
                    type: 'custom',
                    data: {
                        label: targetId,
                        fields: edge.target.table.attributes,
                        type: edge.target.type
                    },
                    className: styles.node,
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
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
            >
                <Background/>
                <Legend fullscreen={fullscreen}/>
                {!fullscreen && (
                    <div className={styles.fullscreenButton}>
                        <button onClick={onOpenFullscreen}>
                            <img src={fullscreenIcon} alt="Fullscreen" className={styles.fullscreenIcon} />
                        </button>
                    </div>
                )}
            </ReactFlow>
        </div>
    );
};

export default GraphDiagram;
