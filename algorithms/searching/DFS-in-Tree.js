class Node {
    constructor(data) {
        this.value = data;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
      const newNode = new Node(value);
      if (this.root === null) {
        this.root = newNode;
        return this;
      }

      let currentNode = this.root;
      while(true) {
        // LEFT
        if (value <= currentNode.value) {
            if (!currentNode.left) {
                currentNode.left = newNode;
                return this;
            }
            currentNode = currentNode.left;
        } else {
            // RIGHT
            if (!currentNode.right) {
                currentNode.right = newNode;
                return this;
            }
            currentNode = currentNode.right;
        }
      }
    }

    lookup(value) {
        if (!this.root) {
            return false;
        }  
        let currentNode = this.root;
        while(currentNode) {
            if (value === currentNode.value) {
                return true;
               } else if (value <= currentNode.value) {
                   currentNode = currentNode.left;
               } else if (value > currentNode.value){
                    currentNode = currentNode.right;
               }
        }
        return false;
    }

    remove(value) {
        // If no children - Just delete.
        // If a single child - Copy that child to the node.
        // If two children - Determine the  minumum element (inorder successor) in the right subtree. Replace the node to be removed with the inorder successor. Delete the inorder successor duplicate.
         if (!this.root) {
            return false;
        }  
        // Find the node  
        let currentNode = this.root;
        let parentNode = null;     // we need the reference to parent

        while(currentNode) {
            if (value < currentNode.value){
               parentNode = currentNode;
               currentNode = currentNode.left;
            } else if (value > currentNode.value) {
                parentNode = currentNode;
                currentNode = currentNode.right;
            } else if (value === currentNode.value) {
                // We have a match, get to work!
                if (currentNode.right === null) {
                  // Option 1: No right child
                    if (parentNode === null) {
                        this.root = currentNode.left;
                    } else {
                        if (currentNode.value <= parentNode.value) {
                            parentNode.left = currentNode.left;
                        } else if(currentNode.value > parentNode.value) {
                            parentNode.right = currentNode.left;
                        }
                    }
                } else if (currentNode.right.left === null) {
                  // Option 2: Right child which doesnt have a left child
                  if (parentNode === null) {
                     this.root = currentNode.left;
                   } else {
                    currentNode.right.left = currentNode.left; //???
                    if (currentNode.value <= parentNode.value) {
                       parentNode.left = currentNode.right;
                    } else if(currentNode.value > parentNode.value) {
                       parentNode.right = currentNode.right;
                    }
                  }
                } else {
                  // option 3: Right child that has a left child

                  // find the node that is the left one of this node
                  // find the right child's the most left child
                  let leftmost = currentNode.right.left;
                  let leftmostParent = currentNode.right;
                   
                  while(leftmost.left !== null) {
                    leftmostParent = leftmost;
                    leftmost = leftmost.left;     
                  }

                  // Parent's left subtree in now leftmost's right substance
                  leftmostParent.left = leftmost.right;
                  leftmost.left = currentNode.left;
                  leftmost.right = currentNode.right;
                  if (parentNode === null) {
                    this.root = leftmost;
                  } else {
                    if (currentNode.value <= parentNode.value) {
                        parentNode.left = leftmost;
                    } else if (currentNode.value > parentNode.value) {
                        parentNode.right = leftmost;
                    }
                  }
                }
                return true;
            }
        }
    } 

    traverse(root, nodes= []) {
        if(root != null) {
            this.traverse(root.left, nodes);   /* Traverse the left subtree */
            nodes.push(root.value);
            this.traverse(root.right, nodes);  /* Traverse the right subtree */
         }
         return nodes;
    }

    DFSInorder() {
        return traverseInOrder(this.root, [])
    }

    DFSPostorder() {
        return traversePostOrder(this.root, [])
    }

    DFSPreorder() {
        return traversePreOrder(this.root, [])
    }
}

function traverseInOrder(node, list) {
    if (node.left) {
        traverseInOrder(node.left, list)
    }
    list.push(node.value);
    if (node.right) {
        traverseInOrder(node.right, list)
    }
    return list;
}

function traversePostOrder(node, list) {
    if (node.left) {
        traversePostOrder(node.left, list)
    }
    if (node.right) {
        traversePostOrder(node.right, list)
    }
    list.push(node.value);

    return list;
}

function traversePreOrder(node, list) {
    list.push(node.value);
    if (node.left) {
        traversePreOrder(node.left, list)
    }
    if (node.right) {
        traversePreOrder(node.right, list)
    }

    return list;
}


const tree = new BinarySearchTree();
tree.insert(9);
tree.insert(4);
tree.insert(6);
tree.insert(20);
tree.insert(170);
tree.insert(15);
tree.insert(1);

// console.log(tree.DFSInorder());    // [1, 4, 6, 9, 15, 20, 170 ]
// console.log(tree.DFSPreorder());   // [9, 4, 1, 6, 20, 15, 170]
console.log(tree.DFSPostorder());    //  [1,  6, 4, 15, 170, 20, 9]








