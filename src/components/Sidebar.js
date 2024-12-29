import React, { useContext, useState } from "react";
import { DiagramContext } from "../context/DiagramContext";

const Sidebar = () => {
  const { nodes, edges, setNodes, setEdges } = useContext(DiagramContext);
  const [nodeLabel, setNodeLabel] = useState("");
  const [sourceId, setSourceId] = useState("");
  const [targetId, setTargetId] = useState("");

  const addNode = () => {
    const newNode = {
      id: `${nodes.length + 1}`,
      type: "default",
      data: { label: nodeLabel || `Node ${nodes.length + 1}` },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeLabel("");
  };

  const addEdge = () => {
    if (sourceId && targetId) {
      const newEdge = {
        id: `e${sourceId}-${targetId}`,
        source: sourceId,
        target: targetId,
        label: `Edge ${sourceId}-${targetId}`,
      };
      setEdges((eds) => [...eds, newEdge]);
      setSourceId("");
      setTargetId("");
    }
  };

  const deleteNode = (id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== id && edge.target !== id)
    );
  };

  const deleteEdge = (id) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== id));
  };

  return (
    <aside>
      <h3>Add Node</h3>
      <input
        type="text"
        placeholder="Node Label"
        value={nodeLabel}
        onChange={(e) => setNodeLabel(e.target.value)}
      />
      <button onClick={addNode}>Add Node</button>

      <h3>Add Edge</h3>
      <input
        type="text"
        placeholder="Source Node ID"
        value={sourceId}
        onChange={(e) => setSourceId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Target Node ID"
        value={targetId}
        onChange={(e) => setTargetId(e.target.value)}
      />
      <button onClick={addEdge}>Add Edge</button>

      <h3>Delete Node</h3>
      <input
        type="text"
        placeholder="Node ID to Delete"
        onBlur={(e) => deleteNode(e.target.value)}
      />

      <h3>Delete Edge</h3>
      <input
        type="text"
        placeholder="Edge ID to Delete"
        onBlur={(e) => deleteEdge(e.target.value)}
      />
    </aside>
  );
};

export default Sidebar;
