import { IRow } from "../../../widgets/WorkingSection/model/workingSectionSlice";

export function countTotalChildren(node: IRow) {
  let count = node.child.length;

  if (node.child.length > 0) {
    const lastChildNode = node.child[node.child.length - 1];
    if (lastChildNode.child && lastChildNode.child.length > 0) {
      count -= lastChildNode.child.length;
    }
  }
  node.child.forEach((childNode) => {
    count += countTotalChildren(childNode);
  });

  return count;
}
