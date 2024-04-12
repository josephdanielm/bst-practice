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
}


const inputArrayHere = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const preppedArray = mergeSort([...new Set(inputArrayHere)]);
const tree = new Tree(preppedArray);


console.log('\n\nFirst Tree:\n\n');
prettyPrint(tree.root);

console.log('\n\nTree after insert:\n\n');
tree.insert(2);
prettyPrint(tree.root);