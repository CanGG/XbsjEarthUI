import Scene from './Scene';
class Controls{
  constructor(root){
    this.root = root;
    this.scene = new Scene(root);
  }
}

export default Controls;