import { Node } from "./node";

class Tree {
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
}
