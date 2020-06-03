import Deduce from './Deduce';


/**
 * hy控制层入口
 * @author xiecan
 * @desc 2020-5-30 09:05:25
 */
class Controls{
  constructor(root){
    this.root = root;
    this.deduce = new Deduce(root);
  }
}

export default Controls;