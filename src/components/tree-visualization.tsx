"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

interface TreeNode {
  name: string;
  children?: TreeNode[];
  attributes?: {
    [key: string]: string | number | boolean;
  };
}

interface TreeVisualizationProps {
  filteredData: TreeNode;
  onNodeClick?: (nodeData: any) => void;
}

// Dynamically import Tree to avoid SSR issues
const Tree = dynamic(() => import("react-d3-tree"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      <span className="ml-2 text-gray-600 dark:text-gray-400">Loading D3 Tree...</span>
    </div>
  ),
});

export function TreeVisualization({ filteredData, onNodeClick }: TreeVisualizationProps) {
  const { theme } = useTheme();
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const newDimensions = {
          width: rect.width || 800,
          height: rect.height || 600,
        };
        setDimensions(newDimensions);
        setTranslate({
          x: 100,
          y: newDimensions.height / 2,
        });
      }
    };

    // Initial call with delay to ensure DOM is ready
    const timer = setTimeout(updateDimensions, 100);
    
    window.addEventListener("resize", updateDimensions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const nodeSize = { x: 350, y: 80 };
  const separation = { siblings: 1, nonSiblings: 2 };

  const customNodeElement = ({ nodeDatum, toggleNode }: any) => {
    const hasChildren = nodeDatum.children && nodeDatum.children.length > 0;
    
    return (
      <g>
        <circle
          r={hasChildren ? 18 : 12}
          fill={
            theme === "dark"
              ? hasChildren
                ? "#3b82f6"
                : "#10b981"
              : hasChildren
              ? "#2563eb"
              : "#059669"
          }
          stroke={theme === "dark" ? "#6b7280" : "#374151"}
          strokeWidth="2"
          onClick={() => {
            if (hasChildren && toggleNode) toggleNode();
          }}
          style={{ cursor: hasChildren ? "pointer" : "default" }}
        />
        <text
          fill={theme === "dark" ? "#f9fafb" : "#111827"}
          strokeWidth="0"
          fontSize="11"
          textAnchor="start"
          x={hasChildren ? 25 : 20}
          dy="0.35em"
          onClick={() => {
            if (onNodeClick) onNodeClick(nodeDatum);
          }}
          style={{ cursor: "pointer", fontWeight: "500" }}
        >
          {nodeDatum.name.length > 46
            ? `${nodeDatum.name.substring(0, 46)}...`
            : nodeDatum.name}
        </text>
        {nodeDatum.name.length > 46 && (
          <title>{nodeDatum.name}</title>
        )}
      </g>
    );
  };

  return (
    <div ref={containerRef} className="w-full h-full">
      {dimensions.width > 0 && dimensions.height > 0 && (
        <Tree
          data={filteredData}
          translate={translate}
          orientation="horizontal"
          nodeSize={nodeSize}
          separation={separation}
          renderCustomNodeElement={customNodeElement}
          collapsible={true}
          initialDepth={2}
          zoom={0.9}
          scaleExtent={{ min: 0.1, max: 3 }}
          pathClassFunc={() =>
            theme === "dark"
              ? "stroke-gray-400 stroke-2 fill-none"
              : "stroke-gray-600 stroke-2 fill-none"
          }
          enableLegacyTransitions={false}
          transitionDuration={500}
        />
      )}
    </div>
  );
}