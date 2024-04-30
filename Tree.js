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
      root.leftChild = this.insertRec(root.leftChild, value);
    } else if(value > root.data){
      root.rightChild = this.insertRec(root.rightChild, value);
    }

    return root;
  }

  deleteItem(value){
    this._root = this.deleteItemRec(this._root, value);
  }

  deleteItemRec(root, value){
    // base case
    if(root === null){
      return root;
    }

    // recurse down tree
    // if the value is smaller than the root, then it lies in the left subtree
    if(value < root.data){
      root.leftChild = this.deleteItemRec(root.leftChild, value);
    } 
    // if the value is greater than the root, then it lies in the right subtree
    else if(value > root.data){
      root.rightChild = this.deleteItemRec(root.rightChild, value);
    }
    // if the value matches the root, then this is the node to be deleted
    else {
      // for nodes with only one child or no children
      if(root.leftChild === null){
        return root.rightChild;
      } else if(root.rightChild === null){
        return root.leftChild;
      }

      // for nodes with two children: get the inorder successor (smallest in the right subtree)
      root.data = this.minValue(root.rightChild);

      // delete the inorder successor
      root.rightChild = this.deleteItemRec(root.rightChild, root.data);
    }
    return root;
  }

  // helper function for deletion - finds the inorder successor from a subtree
  minValue(node) {
    let minv = node.data;
    while (node.leftChild !== null) {
        minv = node.leftChild.data;
        node = node.leftChild;
    }
    return minv;
  }

  // returns the node with the given value, null if not found
  find(value){
    let node = this._root;

    while(node !== null){
      if(node.data === value){
        return node;
      } else if(value < node.data){
        node = node.leftChild;
      } else {
        node = node.rightChild;
      }
    }
    // value not found
    return null;
  }

  // traverses the tree in breadth-first level order
  // optional callback parameter
  //      if provided, each node will be used as an argument to the callback
  //      if not, returns an array of values 
  levelOrder(callback = null){
    // if root is null, then return null
    if(this._root === null){
      return null;
    }

    // use an array to act as a queue data structure (FIFO)
    const queue = [this._root];
    // another array to hold the in-order data
    const levelOrderArray = [];

    while(queue.length > 0){
      // dequeue the next in-order node from the queue
      let node = queue.shift();
      // if there's a callback, call it back
      if(callback){
        callback(node.data);
      }
      // push the node's data to the end of the levelOrderArray
      levelOrderArray.push(node.data);

      // enqueue the left child, then right child
      // ensure that the node has each of those children first, though
      if(node.leftChild){
        queue.push(node.leftChild);
      }
      if(node.rightChild){
        queue.push(node.rightChild);
      }
    }

    return levelOrderArray;
  }

  // traverses the tree in depth-first inorder
  inOrder(callback = null){
    const inOrderArray = [];

    function traverseInOrder(root){
      if(root === null) return;
      // go left
      traverseInOrder(root.leftChild);
      // do something to the data at the current node
      if(callback){
        callback(root.data);
      }
      inOrderArray.push(root.data);
      // go right
      traverseInOrder(root.rightChild);
    }
    traverseInOrder(this._root);
    return inOrderArray;
  }

  // traverses the tree in depth-first preorder
  preOrder(callback = null){
    const preOrderArray = [];

    function traversePreOrder(root){
      if(root === null) return;

      // do something to the data at the current node
      if(callback){
        callback(root.data);
      }
      preOrderArray.push(root.data);

      // go left
      traversePreOrder(root.leftChild);
      // go right
      traversePreOrder(root.rightChild);
    }
    traversePreOrder(this._root);
    return preOrderArray;
  }

  // traverses the tree in depth-first post-order
  postOrder(callback = null){
    const postOrderArray = [];

    function traversePostOrder(root){
      if(root === null) return;

      // go left
      traversePostOrder(root.leftChild);
      // go right
      traversePostOrder(root.rightChild);

      // do something to the data at the current node
      if(callback){
        callback(root.data);
      }
      postOrderArray.push(root.data);
    }
    traversePostOrder(this._root);
    return postOrderArray;
  }

  // returns the given node's height 
  //      height is the number of edges in the longest path from a given node to a leaf node
  height(node){
    // base case
    if(node === null){
      return -1;
    }

    // recursive case, every level, add one, and then add to it the larger of the two subtrees
    return 1 + Math.max(this.height(node.leftChild), this.height(node.rightChild));
  }

  // returns the given node's depth
  //      depth is the number of edges in the path from a given node to the tree's root node
  depth(node){
    // easiest solution using the existing height method. Might not be the most efficient, but it works. 
    return this.height(this._root) - this.height(node);
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
prettyPrint(tree1.root);

// node with one child
tree1.deleteItem(5);
prettyPrint(tree1.root);

// node with two children
tree1.deleteItem(4);
prettyPrint(tree1.root);
// node with two children
tree1.deleteItem(67);
prettyPrint(tree1.root);

// root
tree1.deleteItem(8);
prettyPrint(tree1.root);

// find success
console.log(tree1.find(324));
// find failure
console.log(tree1.find(3245));

// levelOrder traversal
console.log(tree1.levelOrder(console.log));

// inOrder traversal
console.log(tree1.inOrder(console.log));

// preOrder traversal
console.log(tree1.preOrder(console.log));

// postOrder traversal
console.log(tree1.postOrder(console.log));

// height
console.log(tree1.height(tree1.find(9)));

prettyPrint(tree1.root);

// depth
console.log(tree1.depth(tree1.root));
console.log(tree1.depth(tree1.find(70)));
console.log(tree1.depth(tree1.find(324)));
console.log(tree1.depth(tree1.find(6345)));