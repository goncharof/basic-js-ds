const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinarySearchTree {

  #root = null;

  #add(node, data) {
    if (!node) {
      return new Node(data);
    }

    if (data < node.data) {
      node.left = this.#add(node.left, data);
    } else {
      node.right = this.#add(node.right, data);
    }

    return node;
  }

  #find(node, data) {
    if (!node) {
      return null;
    }

    if (data === node.data) {
      return node;
    } else if (data < node.data) {
      return this.#find(node.left, data);
    } else {
      return this.#find(node.right, data);
    }
  }

  #remove(node, data) {
    if (!node) {
      return null;
    }

    if (data < node.data) {
      node.left = this.#remove(node.left, data);
    } else if (data > node.data) {
      node.right = this.#remove(node.right, data);
    } else {
      if (!node.left && !node.right) {
        return null;
      } else if (!node.left) {
        return node.right;
      } else if (!node.right) {
        return node.left;
      }
      const minNode = this.#findMin(node.right);
      node.data = minNode.data;
      node.right = this.#remove(node.right, minNode.data);
    }

    return node;
  }

  #findMin(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  #findMax(node) {
    while (node.right) {
      node = node.right;
    }
    return node;
  }

  root() {
    return this.#root;
  }

  add(data) {
    this.#root = this.#add(this.#root, data);
  }

  has(data) {
    return !!this.#find(this.#root, data);
  }

  find(data) {
    return this.#find(this.#root, data);
  }

  remove(data) {
    this.#root = this.#remove(this.#root, data);
  }

  min() {
    return this.#findMin(this.#root).data;
  }

  max() {
    return this.#findMax(this.#root).data;
  }
}

module.exports = {
  BinarySearchTree
};