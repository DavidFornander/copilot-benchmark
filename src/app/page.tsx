"use client";

import { useEffect, useState } from "react";
import { TreeVisualization } from "@/components/tree-visualization";
import { SearchFilter } from "@/components/search-filter";
import { ThemeToggle } from "@/components/theme-toggle";
import { filterTreeData } from "@/lib/tree-filter";

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

export default function Home() {
  const [treeData, setTreeData] = useState<TreeNode | null>(null);
  const [filteredData, setFilteredData] = useState<TreeNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<any>(null);
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
    setSelectedNode(nodeData);
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

      <div className="flex h-[calc(100vh-64px)]">
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
        {selectedNode && (
          <aside className="w-80 bg-gray-50 dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 p-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Node Details
              </h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  {selectedNode.name}
                </h3>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedNode.children ? (
                    <div>
                      <p className="mb-2">
                        <strong>Type:</strong> Category
                      </p>
                      <p className="mb-2">
                        <strong>Sub-items:</strong> {selectedNode.children.length}
                      </p>
                      <div>
                        <strong>Contains:</strong>
                        <ul className="mt-1 ml-4 list-disc">
                          {selectedNode.children.slice(0, 5).map((child: any, index: number) => (
                            <li key={index}>{child.name}</li>
                          ))}
                          {selectedNode.children.length > 5 && (
                            <li>... and {selectedNode.children.length - 5} more</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p>
                        <strong>Type:</strong> Job Role
                      </p>
                      <p className="mt-2 text-gray-700 dark:text-gray-300">
                        Click on category nodes to explore related roles and specializations.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
