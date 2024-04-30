import Tree from "./Tree.js";

const createArray = function createRandomNumberArray(){
  const array = [];
  for(let i = 0; i < 20; i++){
    array.push(Math.floor(100 * Math.random()));
  }
  return array;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.rightChild !== null) {
    prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.leftChild !== null) {
    prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// create a binary search tree from a random number array 
const tree1 = new Tree(createArray());
prettyPrint(tree1.root);

// confirm the tree is balanced
console.log('isBalanced', tree1.isBalanced());

// print elements in level order
console.log('level order', tree1.levelOrder());

// print elements in pre-order
console.log('preorder', tree1.preOrder());

// print elements in post-order
console.log('postorder', tree1.postOrder());

// print elements in order
console.log('inorder', tree1.inOrder());

// unbalance the tree by adding several numbers > 100
tree1.insert(105);
tree1.insert(200);
tree1.insert(280);
tree1.insert(1500);

prettyPrint(tree1.root);

// confirm the tree is unbalanced
console.log('isBalanced', tree1.isBalanced());

// balance the tree by using rebalance
tree1.rebalance();
prettyPrint(tree1.root);

// confirm tree is balanced
console.log('isBalanced', tree1.isBalanced());

// print elements in level order
console.log('level order', tree1.levelOrder());

// print elements in pre-order
console.log('preorder', tree1.preOrder());

// print elements in post-order
console.log('postorder', tree1.postOrder());

// print elements in order
console.log('inorder', tree1.inOrder());
