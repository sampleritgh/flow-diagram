import React, { createContext, useState, useCallback } from "react";

export const DiagramContext = createContext();

const DiagramProvider = ({ children }) => {
  const [nodes, setNodes] = useState([
    {
      id: "1",
      type: "default",
      data: { label: "Node 1" },
      position: { x: 250, y: 5 },
    },
  ]);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback(
    (changes) =>
      setNodes((nds) =>
        nds.map((node) => ({
          ...node,
          ...(changes.find((chg) => chg.id === node.id) || {}),
        }))
      ),
    []
  );

  const onEdgesChange = useCallback(
    (changes) =>
      setEdges((eds) =>
        eds.map((edge) => ({
          ...edge,
          ...(changes.find((chg) => chg.id === edge.id) || {}),
        }))
      ),
    []
  );

  return (
    <DiagramContext.Provider value={{ nodes, edges, setNodes, setEdges }}>
      {children}
    </DiagramContext.Provider>
  );
};

export default DiagramProvider;
