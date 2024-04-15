#!/usr/bin/env node

function mergeSort(arr) {
    if (arr.length < 2) {
        return arr;
    }
    let mid = Math.floor(arr.length / 2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid);
    let result = [];
    let leftSor = mergeSort(left);
    let rightSor = mergeSort(right);
    let pointerLeft = 0,
        pointerRight = 0;
    while (pointerLeft < leftSor.length && pointerRight < rightSor.length) {
        if (leftSor[pointerLeft] < rightSor[pointerRight]) {
            result.push(leftSor[pointerLeft]);
            pointerLeft++;
        } else {
            result.push(rightSor[pointerRight]);
            pointerRight++;
        }
    }
    while (pointerLeft < leftSor.length) {
        result.push(leftSor[pointerLeft]);
        pointerLeft++;
    }
    while (pointerRight < rightSor.length) {
        result.push(rightSor[pointerRight]);
        pointerRight++;
    }
    return result;
}

function returnOneHundredNums() {
    returnArray = [];
    for (let i = 0; i < 100; i++) {
        returnArray.push(Math.round(Math.random() * 100));
    }
    return returnArray;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array, start = 0, end = array.length - 1) {
        if (start > end) {
            return null;
        }

        let mid = Math.floor((start + end) / 2);
        let node = new Node(array[mid]);

        node.left = this.buildTree(array, start, mid - 1);
        node.right = this.buildTree(array, mid + 1, end);

        return node;
    }

    insert(value, root = this.root) {

        // if tree is empty, set root = new Node(value), return root
        if (root === null) {
            root = new Node(value);
            return root;
        }

        // if value < root
        if (value < root.value) {
            root.left = this.insert(value, root.left);
        }
        else if (value > root.value) {
            root.right = this.insert(value, root.right);
        }

        return root;
    }

    deleteItem(value, root = this.root) {
        if (root === null) {
            return root;
        }

        if (value > root.value) {
            root.right = this.deleteItem(value, root.right);
        } else if (value < root.value) {
            root.left = this.deleteItem(value, root.left);
        } else {
            if (root.left === null) {
                return root.right;
            } else if (root.right === null) {
                return root.left;
            }

            let currentNode = root.right;

            while (currentNode.left) {
                currentNode = currentNode.left;
            }

            root.value = currentNode.value;
            root.right = this.deleteItem(root.value, root.right);
        }
        return root;
    }

    find(value, root = this.root) {

        if (value === root.value || root === null) {
            return root;
        }

        if (value < root.value) {
            return this.find(value, root.left);
        }
        
        else {
            return this.find(value, root.right);
        }
    }

    levelOrder(callback, root = this.root) {

        if (!root) {
            return [];
        }

        let returnArray = [];
        let queue = [root];

        const traverse = () => {
            if (queue.length === 0) {
                return;
            }

            let nextInQueue = queue.shift();
            returnArray.push(callback ? callback(nextInQueue) : nextInQueue.value);

            if (nextInQueue.left) {
                queue.push(nextInQueue.left);
            }

            if (nextInQueue.right) {
                queue.push(nextInQueue.right);
            }

            traverse();
        }

        traverse();

        return returnArray;
    }

    // In-order traversal (Left, Root, Right)
    inOrder(callback, root = this.root) {
        let returnArray = [];

        const traverse = (node) => {
            if (node) {
                traverse(node.left);
                returnArray.push(callback ? callback(node) : node.value);
                traverse(node.right);
            }
        }
        traverse(root);
        return returnArray;
    }

    // Pre-order traversal (Root, Left, Right)
    preOrder(callback, root = this.root) {
        let returnArray = [];

        const traverse = (node) => {
            if (node) {
                returnArray.push(callback ? callback(node) : node.value);
                traverse(node.left);
                traverse(node.right);
            }
        }
        traverse(root);
        return returnArray;
    }

    // Post-order traversal (Left, Right, Root)
    postOrder(callback, root = this.root) {
        let returnArray = [];

        const traverse = (node) => {
            if (node) {
                traverse(node.left);
                traverse(node.right);
                returnArray.push(callback ? callback(node) : node.value);
            }
        }
        traverse(root);
        return returnArray;
    }

    height(node) {
        if (node === null) {
            return -1;
        }

        let heightLeft = this.height(node.left);
        let heightRight = this.height(node.right);

        return Math.max(heightLeft, heightRight) + 1;
    }

    depth(node, current = this.root, depth = 0) {

        if (current === null) {
            return -1;
        }

        if (current === node) {
            return depth;
        }

        const leftDepth = this.depth(node, current.left, depth + 1);
        if (leftDepth !== -1) {
            return leftDepth;
        }

        const rightDepth = this.depth(node, current.right, depth + 1);
        if (rightDepth !== -1) {
            return rightDepth;
        }

        return -1;
    }

    isBalanced(root = this.root) {

        const traverse = (root) => {
            if (root === null) {
                return [true, 0];
            }

            let leftBalanced = traverse(root.left);
            let rightBalanced = traverse(root.right);

            let isCurrBalanced = (leftBalanced[0] && rightBalanced[0] && Math.abs(leftBalanced[1] - rightBalanced[1]) <= 1)

            return [isCurrBalanced, 1 + Math.max(leftBalanced[1], rightBalanced[1])];
        }
        
        return traverse(root)[0];
    }

    rebalance() {
        const nodes = this.inOrder();

        this.root = this.buildTree(nodes);
    }
}


// Driver Script ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

let randomNumsArray = returnOneHundredNums();
console.log(`\nGenerating 100 random numbers:\n\n${randomNumsArray}\n`);

randomNumsArray = mergeSort([...new Set(randomNumsArray)]);
console.log(`\nRemoving duplicates & sorting numbers:\n\n${randomNumsArray}\n`);

const tree = new Tree(randomNumsArray);
console.log(`\nCreating BST from numbers:\n\n`);
prettyPrint(tree.root);

console.log(`\nTree is balanced check:\n`);
console.log(`${tree.isBalanced()}\n\n`);

console.log(`\nLevel-order:\n`);
console.log(`${tree.levelOrder()}`)

console.log(`\nPre-order:\n`);
console.log(`${tree.preOrder()}`)

console.log(`\nPost-order:\n`);
console.log(`${tree.postOrder()}`)

console.log(`\nIn-order:\n`);
console.log(`${tree.inOrder()}\n`)

console.log(`\nInserting 7 random values > 100:\n`);
for (let i = 0; i < 7; i++) {
    tree.insert((Math.round(Math.random() * 100)) + 100);
}
prettyPrint(tree.root);

console.log(`\nTree is balanced check:\n`);
console.log(`${tree.isBalanced()}\n\n`);

console.log(`\nRebalancing Tree:\n`);
tree.rebalance();
prettyPrint(tree.root);

console.log(`\nTree is balanced check:\n`);
console.log(`${tree.isBalanced()}\n\n`);

console.log(`\nLevel-order:\n`);
console.log(`${tree.levelOrder()}`)

console.log(`\nPre-order:\n`);
console.log(`${tree.preOrder()}`)

console.log(`\nPost-order:\n`);
console.log(`${tree.postOrder()}`)

console.log(`\nIn-order:\n`);
console.log(`${tree.inOrder()}\n`)