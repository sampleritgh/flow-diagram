import React, { useContext, useCallback } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
} from "react-flow-renderer";
import { DiagramContext } from "../context/DiagramContext";

const DiagramFlow = () => {
  const { nodes, edges, setNodes, setEdges } = useContext(DiagramContext);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeDoubleClick = (event, node) => {
    const newLabel = prompt("Edit Node Label", node.data.label);
    if (newLabel) {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === node.id ? { ...n, data: { label: newLabel } } : n
        )
      );
    }
  };

  const onEdgeDoubleClick = (event, edge) => {
    const newLabel = prompt("Edit Edge Label", edge.label);
    if (newLabel) {
      setEdges((eds) =>
        eds.map((e) => (e.id === edge.id ? { ...e, label: newLabel } : e))
      );
    }
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={setNodes}
        onEdgesChange={setEdges}
        onConnect={onConnect}
        onNodeDoubleClick={onNodeDoubleClick}
        onEdgeDoubleClick={onEdgeDoubleClick}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background gap={16} />
      </ReactFlow>
    </div>
  );
};

export default DiagramFlow;
