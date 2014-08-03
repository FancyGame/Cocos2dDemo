/**
 *.
 * author: lijian
 * Date: 13-9-19
 * Time: 下午9:21
 */

var TMXTest = cc.TMXLayer.extend({
    ctor: function () {
        this._super();

        //map.runAction(cc.ScaleBy.create(2, 0.5));
    }/*,
    title: function () {
        return "TMX Ortho test";
    },

    // Automation
    testDuration: 2.1,
    pixel1: {"0": 218, "1": 218, "2": 208, "3": 255},
    pixel2: {"0": 193, "1": 143, "2": 72, "3": 255},
    pixel3: {"0": 200, "1": 15, "2": 160, "3": 255},
    getExpectedResult: function () {
        var ret = {"pixel1": "yes", "pixel2": "yes", "pixel3": "yes"};
        return JSON.stringify(ret);
    },
    getCurrentResult: function () {
        var ret1 = this.readPixels(82, 114, 10, 10);
        var ret2 = this.readPixels(475, 100, 10, 10);
        var ret3 = this.readPixels(312, 196, 10, 10);
        var ret = {"pixel1": this.containsPixel(ret1, this.pixel1, false) ? "yes" : "no",
            "pixel2": this.containsPixel(ret2, this.pixel2, false) ? "yes" : "no",
            "pixel3": this.containsPixel(ret3, this.pixel3, true, 5) ? "yes" : "no"};
        return JSON.stringify(ret);
    }*/
});
