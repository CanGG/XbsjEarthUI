/**
 * Hy厂区选择面板脚本
 * @class
 * @author 谢灿
 * @desc 2020-6-1 15:39:06
 */
class HyModelOnline {
    constructor(root) {
        this._root = root;
        this._comp = root._comp.$refs.hyModelOnline[0];
        XE.MVVM.extend(this, {
            /**
             * 是否可见
             * @type {boolean}
             * @default false 
             * @instance
             * @memberof ModelOnline
             */
            show: true,
        });
        var tool = root._comp.$refs.mainBarControl.$refs.hytileset;
        this.unbind = XE.MVVM.bind(
            tool,
            "modelOnline",
            this,
            "show"
        );

        this.unbind2 = XE.MVVM.bind(
            this._comp,
            "show",
            this,
            "show"
        );
    }

    isDestroyed() {
        return false;
    }

    destroy() {

        this.unbind1 = this.unbind1 && this.unbind1();
        this.unbind2 = this.unbind2 && this.unbind2();

    }
}

export default HyModelOnline;