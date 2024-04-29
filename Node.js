class Node {
  constructor(data, leftChild = null, rightChild = null){
    this._data = data;
    this._leftChild = leftChild;
    this._rightChild = rightChild;
  }

  get data(){
    return this._data;
  }

  get leftChild(){
    return this._leftChild;
  }

  get rightChild(){
    return this._rightChild;
  }

  set data(newData) {
    this._data = newData;
  }

  set leftChild(leftChild){
    this._leftChild = leftChild;
  }

  set rightChild(rightChild){
    this._rightChild = rightChild;
  }
}