interface TreeNode {
  name: string;
  children?: TreeNode[];
}

export function filterTreeData(data: TreeNode, query: string): TreeNode {
  if (!query.trim()) {
    return data;
  }

  const searchTerm = query.toLowerCase();

  function matchesSearch(node: TreeNode): boolean {
    return node.name.toLowerCase().includes(searchTerm);
  }

  function hasMatchingDescendant(node: TreeNode): boolean {
    if (!node.children) return false;
    return node.children.some(child => 
      matchesSearch(child) || hasMatchingDescendant(child)
    );
  }

  function filterNode(node: TreeNode): TreeNode | null {
    const nodeMatches = matchesSearch(node);
    const hasMatchingChildren = hasMatchingDescendant(node);

    if (!nodeMatches && !hasMatchingChildren) {
      return null;
    }

    const filteredChildren = node.children
      ?.map(child => filterNode(child))
      .filter((child): child is TreeNode => child !== null);

    return {
      name: node.name,
      ...(filteredChildren && filteredChildren.length > 0 && { children: filteredChildren })
    };
  }

  const result = filterNode(data);
  return result || { name: "No matches found", children: [] };
}