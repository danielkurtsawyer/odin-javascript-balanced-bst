import Node from "./Node.js";

class Tree {
  constructor(array){
    // sorts the array, and removes duplicates by converting to a set and back to an array
    // it is necessary to sort using a function since sort's default behavior is for strings
    const uniqueSortedArray = [... new Set(array)].sort(function(a, b){return a - b});
    this._root = this.buildTree(uniqueSortedArray, 0, uniqueSortedArray.length-1);
  }

  get root(){
    return this._root;
  }

  buildTree(array, start, end){
    if(start>end) return null;
    // integer division is not built in so we have to round down
    const mid = Math.floor((start+end)/2);
    console.log(mid, array[mid]);
    const root = new Node(array[mid]);
    
    root.leftChild = this.buildTree(array, start, mid-1);
    root.rightChild = this.buildTree(array, mid+1, end);

    return root;
  }

  insert(value){
    this._root = this.insertRec(this._root, value);
  }

  insertRec(root, value){
    // if the root is null, set the root to the new value 
    if(root === null){
      root = new Node(value);
      return root;
    }

    // if not, recurse down the tree
    if(value < root.data){
      console.log('left');
      root.leftChild = this.insertRec(root.leftChild, value);
    } else if(value > root.data){
      console.log('right');
      root.rightChild = this.insertRec(root.rightChild, value);
    }

    return root;
  }

  deleteItem(value){

  }
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

const tree1 = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// test buildTree
prettyPrint(tree1.root);

// test insert(value)
tree1.insert(70);
tree1.insert(6);
prettyPrint(tree1.root);

// test deletion at different depth levels
// leaf 
tree1.deleteItem(6);
// middle of tree
tree1.deleteItem(5);
// root
tree1.deleteItem(8);
