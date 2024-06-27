import { Tree } from "./tree";

let tree = new Tree();
let array = new Array(10).fill(0).map(() => Math.floor(Math.random() * 100));

tree.buildTree(array);

tree.prettyPrint(tree.root);
