export function removePreviousHighlightBorder() {
  // Remove highlight border from previously selected node
  const previouslySelectedNode = document.querySelector('.border-sky-200');
  if (previouslySelectedNode) {
    previouslySelectedNode.classList.remove('border-2', 'border-sky-200');
  }
}

export function addHighlightBorder(nodeId: string) {
  // Add highlight border to the currently selected node
  const selectedNode = document.getElementById(nodeId);
  if (selectedNode) {
    selectedNode.classList.add('border-2', 'border-sky-200');
  }
}
