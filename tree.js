import { Node } from "./node";

export class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    const sortedArray = array.sort((a, b) => a - b);
    const duplicateRemovedArray = removeDuplicates(sortedArray);
    let begin = 0;
    let end = duplicateRemovedArray.length - 1;

    if (begin > end) return null;

    const middle = Math.floor((begin + end) / 2);

    const left = this.buildTree(duplicateRemovedArray.slice(begin, middle));
    const right = this.buildTree(duplicateRemovedArray.slice(middle + 1, end));

    return new Node(left, right, duplicateRemovedArray[middle]);
  }

  prettyPrint(node, prefix = "", isLeft = false) {
    if (node) {
      console.log(prefix + (isLeft ? "├── " : "└── ") + node.value);
      this.prettyPrint(node.left, prefix + (isLeft ? "│   " : "    "), true);
      this.prettyPrint(node.right, prefix + (isLeft ? "│   " : "    "), false);
    }
  }

  removeDuplicates(array) {
    return array.filter((value, index) => array.indexOf(value) === index);
  }

  insert(element, position = this.root, parent = this.root) {
    if (this.root.value === null) {
      this.root = new Node(null, null, element);
      return;
    }

    if (position === null) {
      position = new Node(null, null, element);
      if (element < parent.value) {
        parent.left = position;
      } else {
        parent.right = position;
      }
      return;
    }

    if (element < position.value) {
      this.insert(element, position.left, position);
    }

    if (element > position.value) {
      this.insert(element, position.right, position);
    }

    //print the tree
    this.prettyPrint(left);
  }

  delete(element, position = this.root, parent = this.root) {
    if (position === null) {
      return;
    }

    if (element < position.value) {
      this.delete(element, position.left, position);
    } else if (element > position.value) {
      this.delete(element, position.right, position);
    } else {
      if (position.left === null && position.right === null) {
        if (parent.left === position) {
          parent.left = null;
        } else {
          parent.right = null;
        }
      } else if (position.left === null) {
        if (parent.left === position) {
          parent.left = position.right;
        } else {
          parent.right = position.right;
        }
      } else if (position.right === null) {
        if (parent.left === position) {
          parent.left = position.left;
        } else {
          parent.right = position.left;
        }
      } else {
        let temp = position.right;
        while (temp.left !== null) {
          temp = temp.left;
        }
        position.value = temp.value;
        this.delete(temp.value, position.right, position);
      }
    }
  }

  find(value, temp = this.root) {
    if (temp === null) {
      return new Node(null, null, null);
    }

    if (temp.value === value) {
      return temp;
    }

    if (value < temp.value) {
      return this.find(value, temp.left);
    }

    if (value > temp.value) {
      return this.find(value, temp.right);
    }
  }

  levelOrderTraversal() {
    const queue = [];
    queue.push(this.root);
    let result = "";
    while (queue.length > 0) {
      const temp = queue.shift();
      result += temp.value + " ";
      if (temp.left !== null) {
        queue.push(temp.left);
      }
      if (temp.right !== null) {
        queue.push(temp.right);
      }
    }
    console.log(result);
  }

  inOrderTraversal(temp = this.root) {
    if (temp === null) {
      return;
    }

    this.inOrderTraversal(temp.left);
    console.log(temp.value);
    this.inOrderTraversal(temp.right);
  }

  preOrderTraversal(temp = this.root) {
    if (temp === null) {
      return;
    }

    console.log(temp.value);
    this.preOrderTraversal(temp.left);
    this.preOrderTraversal(temp.right);
  }

  postOrderTraversal(temp = this.root) {
    if (temp === null) {
      return;
    }

    this.postOrderTraversal(temp.left);
    this.postOrderTraversal(temp.right);
    console.log(temp.value);
  }

  height(temp = this.root) {
    if (temp === null) {
      return 0;
    }

    const leftHeight = this.height(temp.left);
    const rightHeight = this.height(temp.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(value, temp = this.root, depth = 0) {
    if (temp === null) {
      return 0;
    }

    if (temp.value === value) {
      return depth;
    }

    if (value < temp.value) {
      return this.depth(value, temp.left, depth + 1);
    }

    if (value > temp.value) {
      return this.depth(value, temp.right, depth + 1);
    }
  }

  isBalanced(temp = this.root) {
    if (temp === null) {
      return true;
    }

    const leftHeight = this.height(temp.left);
    const rightHeight = this.height(temp.right);

    if (Math.abs(leftHeight - rightHeight) <= 1) {
      return this.isBalanced(temp.left) && this.isBalanced(temp.right);
    }

    return false;
  }
}
