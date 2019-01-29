function HSL(params) {
    this.h = 0;
    this.s = 0;
    this.l = 0;
}

HSL.prototype = {
    // getH: function () {
    //     return this.h;
    // },
    // getS: function () {
    //     return this.s;
    // },
    // getL: function () {
    //     return this.l;
    // },
    getColor: function () {
        return `hsl(${this.h}, ${this.s}%, ${this.l}%)`;
    },

    // setH: function (params) {
    //     this.h = params;
    //     return this;
    // },
    // setS: function (params) {
    //     this.s = params;
    //     return this;
    // },
    // setL: function (params) {
    //     this.l = params;
    //     return this;
    // },
    setColor: function (h, s, l) {
        this.h = h;
        this.s = s;
        this.l = l;
        return this;
    },

    toString: function () {
        return this.getColor();
    }
}

export {
    HSL
};
