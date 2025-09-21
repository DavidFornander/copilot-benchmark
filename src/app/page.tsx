"use client";

import { useEffect, useState } from "react";
import { TreeVisualization } from "@/components/tree-visualization";
import { SearchFilter } from "@/components/search-filter";
import { ThemeToggle } from "@/components/theme-toggle";
import { filterTreeData } from "@/lib/tree-filter";
import { FileText } from "lucide-react";

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

export default function Home() {
  const [treeData, setTreeData] = useState<TreeNode | null>(null);
  const [filteredData, setFilteredData] = useState<TreeNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showFullTree, setShowFullTree] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/software-development-tree.json")
      .then((response) => response.json())
      .then((data: TreeNode) => {
        setTreeData(data);
        setFilteredData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading tree data:", error);
        setLoading(false);
      });
  }, []);

  const handleFilter = (query: string) => {
    if (!treeData) return;
    const filtered = filterTreeData(treeData, query);
    setFilteredData(filtered);
  };

  const handleNodeClick = (nodeData: any) => {
    if (
      isSidebarOpen &&
      selectedNode &&
      selectedNode.__rd3t.id === nodeData.__rd3t.id &&
      !showFullTree
    ) {
      setIsSidebarOpen(false);
    } else {
      setSelectedNode(nodeData);
      setShowFullTree(false);
      setIsSidebarOpen(true);
    }
  };

  const handleShowFullTree = () => {
    setShowFullTree(true);
    setIsSidebarOpen(true);
  };

  const levelColors = [
    "text-sky-500 dark:text-sky-400",
    "text-emerald-500 dark:text-emerald-400",
    "text-amber-500 dark:text-amber-400",
    "text-violet-500 dark:text-violet-400",
    "text-rose-500 dark:text-rose-400",
    "text-lime-500 dark:text-lime-400",
  ];

  const formatTree = (
    node: TreeNode,
    level = 0
  ): { text: string; level: number }[] => {
    let result = [{ text: node.name, level }];
    if (node.children) {
      node.children.forEach((child) => {
        result = result.concat(formatTree(child, level + 1));
      });
    }
    return result;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading tree data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Software Development Tree
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <SearchFilter
                onFilter={handleFilter}
                className="w-64"
              />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)] relative">
        <button
          onClick={handleShowFullTree}
          className="absolute top-6 left-6 z-10 p-2 bg-gray-100 dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Show full tree"
        >
          <FileText className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
        {/* Main Tree Visualization */}
        <main className="flex-1 p-6">
          {filteredData ? (
            <TreeVisualization
              filteredData={filteredData}
              onNodeClick={handleNodeClick}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 dark:text-gray-400">No data available</p>
            </div>
          )}
        </main>

        {/* Node Details Sidebar */}
        {isSidebarOpen && (
          <aside className="w-80 bg-gray-50 dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {showFullTree ? "Full Tree" : "Node Details"}
              </h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-1 rounded-full text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
                aria-label="Close details"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            {showFullTree && treeData ? (
              <div className="font-mono text-sm">
                {formatTree(treeData).map((line, index) => (
                  <div
                    key={index}
                    className={levelColors[line.level % levelColors.length]}
                    style={{ paddingLeft: `${line.level * 1.5}em` }}
                  >
                    {line.text}
                  </div>
                ))}
              </div>
            ) : selectedNode ? (
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    {selectedNode.name}
                  </h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    {selectedNode.attributes?.type && (
                      <p>
                        <strong>Type:</strong> {selectedNode.attributes.type}
                      </p>
                    )}
                    {selectedNode.children && (
                      <p>
                        <strong>Sub-items:</strong>{" "}
                        {selectedNode.children.length}
                      </p>
                    )}
                    {selectedNode.children && (
                      <div>
                        <strong>Contains:</strong>
                        <ul className="list-disc list-inside pl-2 mt-1">
                          {selectedNode.children
                            .slice(0, 5)
                            .map((child: any, index: number) => (
                              <li key={index}>{child.name}</li>
                            ))}
                          {selectedNode.children.length > 5 && (
                            <li>
                              ... and {selectedNode.children.length - 5} more
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </aside>
        )}
      </div>
    </div>
  );
}
