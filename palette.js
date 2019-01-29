import {HSL} from './hsl.js';

function Palette(options) {
    this.options = options;
    this.opts = null;
    this.timer = null;
    this.global_base_hsl = null;
}

Palette.prototype = {
    defaults: {
        box: {
            type: 'division',
            count: 3
        },
        hsl: null,
        autoRefresh: false,
        interval: 1200,
        step: 120
    },

    init: function () {
        this.opts = Object.assign(this.defaults, this.options);
        this.global_base_hsl = null;   // 初始化时，重置 global_base_hsl 为 null
        // console.log(this);
        let that = this;

        clearInterval(that.timer);

        this.createDOM();

        // 定时刷新
        if (this.opts.autoRefresh) {
            this.timer = setInterval(function () {
                that.createDOM();

                if (!that.opts.autoRefresh) {
                    clearInterval(that.timer);
                }
            }, this.opts.interval);
        }

        return this;
    },

    createDOM: function () {
        const container = document.querySelector('#container');
        let dom = ``;

        for (let index = 0; index < this.opts.box.count; index++) {
            this.global_base_hsl = this.generateColor(this.global_base_hsl, this.opts.step);
            dom = `${dom}<div class="box-${this.opts.box.type}" style="background:${this.global_base_hsl};"></div>`;
        }
        // console.log(dom);

        container.innerHTML = dom;
        this.bindEvent();
    },

    generateColor: function (base_hsl, step = 120) {
        const rnd = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const hsl = new HSL();

        if (base_hsl instanceof HSL) {
            hsl.setColor(base_hsl.h + step, base_hsl.s, base_hsl.l);
        } else {
            hsl.setColor(rnd(-30, 270), rnd(100, 100), rnd(50, 50));
            this.hsl = hsl;
            // console.log(hsl);
        }

        return hsl;
    },

    bindEvent: function () {
        const _ = this;
        const first_div = document.querySelector('#container div:first-child');
        // console.log(first_div);

        function foo() {
            _.init();
        }
        first_div.removeEventListener('click', foo);
        first_div.addEventListener('click', foo);
    }
};

export {
    Palette
}
