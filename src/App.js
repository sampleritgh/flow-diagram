import React, { useState } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";
import "./styles.css";

const initialNodes = [
  { id: "1", data: { label: "Node 1" }, position: { x: 100, y: 100 } },
  { id: "2", data: { label: "Node 2" }, position: { x: 300, y: 100 } },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    label: "Edge from 1 to 2",
  },
];

const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [newNodeLabel, setNewNodeLabel] = useState("");
  const [newEdgeSource, setNewEdgeSource] = useState("");
  const [newEdgeTarget, setNewEdgeTarget] = useState("");

  const addNode = () => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      data: { label: newNodeLabel || `Node ${nodes.length + 1}` },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    setNodes((nds) => [...nds, newNode]);
    setNewNodeLabel("");
  };

  const addEdgeBetweenNodes = () => {
    if (!newEdgeSource || !newEdgeTarget) {
      alert("Source and target node IDs are required!");
      return;
    }
    const newEdge = {
      id: `e${newEdgeSource}-${newEdgeTarget}`,
      source: newEdgeSource,
      target: newEdgeTarget,
      label: `Edge from ${newEdgeSource} to ${newEdgeTarget}`,
    };
    setEdges((eds) => [...eds, newEdge]);
    setNewEdgeSource("");
    setNewEdgeTarget("");
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

  const editNodeLabel = (id, newLabel) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { label: newLabel } } : node
      )
    );
  };

  // Edit edge to update source, target, or label
  const editEdgeLabel = () => {
    const edgeId = prompt("Enter Edge ID to edit (e.g., e1-2):");
    if (!edgeId) return;

    const newSource = prompt("Enter new Source Node ID:");
    const newTarget = prompt("Enter new Target Node ID:");
    const newLabel = prompt("Enter new Edge Label (optional):");

    setEdges((eds) =>
      eds.map((edge) =>
        edge.id === edgeId
          ? {
              ...edge,
              source: newSource || edge.source, // Update source if provided
              target: newTarget || edge.target, // Update target if provided
              label: newLabel || edge.label, // Update label if provided
            }
          : edge
      )
    );
  };

  return (
    <div style={{ height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      <div className="controls">
        <h3>Node Management</h3>
        <input
          type="text"
          placeholder="New Node Label"
          value={newNodeLabel}
          onChange={(e) => setNewNodeLabel(e.target.value)}
        />
        <button onClick={addNode}>Add Node</button>

        <h3>Edge Management</h3>
        <input
          type="text"
          placeholder="Source Node ID"
          value={newEdgeSource}
          onChange={(e) => setNewEdgeSource(e.target.value)}
        />
        <input
          type="text"
          placeholder="Target Node ID"
          value={newEdgeTarget}
          onChange={(e) => setNewEdgeTarget(e.target.value)}
        />
        <button onClick={addEdgeBetweenNodes}>Add Edge</button>

        <h3>Delete or Edit</h3>
        <button onClick={() => deleteNode(prompt("Enter Node ID to delete:"))}>
          Delete Node
        </button>
        <button onClick={() => deleteEdge(prompt("Enter Edge ID to delete:"))}>
          Delete Edge
        </button>
        <button
          onClick={() =>
            editNodeLabel(prompt("Enter Node ID:"), prompt("Enter New Label:"))
          }
        >
          Edit Node
        </button>
        <button
          onClick={() =>
            editEdgeLabel(prompt("Enter Edge ID:"), prompt("Enter New Label:"))
          }
        >
          Edit Edge
        </button>
      </div>
    </div>
  );
};

export default App;
