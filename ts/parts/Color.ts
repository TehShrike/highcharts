/* *
 *
 *  (c) 2010-2019 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

'use strict';

import H from './Globals.js';

/**
 * Internal types
 * @private
 */
declare global {
    namespace Highcharts {
        type ColorNone = [];
        type ColorRGBA = [number, number, number, number];
        type ColorString = string;
        interface ColorParser {
            regex: RegExp;
            parse: (
                result: RegExpExecArray
            ) => ColorRGBA;
        }
        interface GradientColorObject {
            linearGradient?: LinearGradientColorObject;
            radialGradient?: RadialGradientColorObject;
            stops: Array<GradientColorStopObject>;
        }
        interface GradientColorStopObject {
            0: number;
            1: ColorString;
            color?: Highcharts.Color;
        }
        interface LinearGradientColorObject {
            x1: number;
            x2: number;
            y1: number;
            y2: number;
        }
        interface RadialGradientColorObject {
            cx: number;
            cy: number;
            r: number;
        }
        class Color {
            public constructor(input: (ColorString|GradientColorObject));
            public input: (ColorString|GradientColorObject);
            public names: Dictionary<ColorString>;
            public parsers: Array<ColorParser>;
            public rgba: (ColorNone|ColorRGBA);
            public stops: Array<Color>;
            public brighten(alpha: number): Color;
            public get(format?: ('a'|'rgb'|'rgba')): Color['input'];
            public init(input: (ColorString|GradientColorObject)): void;
            public setOpacity(alpha: number): Color;
            public tweenTo(to: Color, alpha: number): ColorString;
        }
        function color(input: ColorString): Color;
    }
}

/**
 * A valid color to be parsed and handled by Highcharts. Highcharts internally
 * supports hex colors like `#ffffff`, rgb colors like `rgb(255,255,255)` and
 * rgba colors like `rgba(255,255,255,1)`. Other colors may be supported by the
 * browsers and displayed correctly, but Highcharts is not able to process them
 * and apply concepts like opacity and brightening.
 *
 * @typedef {string} Highcharts.ColorString
 */

/**
 * Gradient options instead of a solid color.
 *
 * @example
 * // Linear gradient used as a color option
 * color: {
 *     linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
 *     stops: [
 *         [0, '#003399'], // start
 *         [0.5, '#ffffff'], // middle
 *         [1, '#3366AA'] // end
 *     ]
 * }
 *
 * @interface Highcharts.GradientColorObject
 *//**
 * Holds an object that defines the start position and the end position relative
 * to the shape.
 * @name Highcharts.GradientColorObject#linearGradient
 * @type {Highcharts.LinearGradientColorObject|undefined}
 *//**
 * Holds an object that defines the center position and the radius.
 * @name Highcharts.GradientColorObject#radialGradient
 * @type {Highcharts.RadialGradientColorObject|undefined}
 *//**
 * The first item in each tuple is the position in the gradient, where 0 is the
 * start of the gradient and 1 is the end of the gradient. Multiple stops can be
 * applied. The second item is the color for each stop. This color can also be
 * given in the rgba format.
 * @name Highcharts.GradientColorObject#stops
 * @type {Array<Highcharts.GradientColorStopObject>}
 */

/**
 * Color stop tuple.
 *
 * @see Highcharts.GradientColorObject
 *
 * @interface Highcharts.GradientColorStopObject
 *//**
 * @name Highcharts.GradientColorStopObject#0
 * @type {number}
 *//**
 * @name Highcharts.GradientColorStopObject#1
 * @type {Highcharts.ColorString}
 *//**
 * @name Highcharts.GradoentColorStopObject#color
 * @type {Highcharts.Color|undefined}
 */

/**
 * Defines the start position and the end position for a gradient relative
 * to the shape. Start position (x1, y1) and end position (x2, y2) are relative
 * to the shape, where 0 means top/left and 1 is bottom/right.
 *
 * @interface Highcharts.LinearGradientColorObject
 *//**
 * Start horizontal position of the gradient. Float ranges 0-1.
 * @name Highcharts.LinearGradientColorObject#x1
 * @type {number}
 *//**
 * End horizontal position of the gradient. Float ranges 0-1.
 * @name Highcharts.LinearGradientColorObject#x2
 * @type {number}
 *//**
 * Start vertical position of the gradient. Float ranges 0-1.
 * @name Highcharts.LinearGradientColorObject#y1
 * @type {number}
 *//**
 * End vertical position of the gradient. Float ranges 0-1.
 * @name Highcharts.LinearGradientColorObject#y2
 * @type {number}
 */

/**
 * Defines the center position and the radius for a gradient.
 *
 * @interface Highcharts.RadialGradientColorObject
 *//**
 * Center horizontal position relative to the shape. Float ranges 0-1.
 * @name Highcharts.RadialGradientColorObject#cx
 * @type {number}
 *//**
 * Center vertical position relative to the shape. Float ranges 0-1.
 * @name Highcharts.RadialGradientColorObject#cy
 * @type {number}
 *//**
 * Radius relative to the shape. Float ranges 0-1.
 * @name Highcharts.RadialGradientColorObject#r
 * @type {number}
 */

import U from './Utilities.js';
const {
    isNumber,
    pInt
} = U;

var merge = H.merge;

/* eslint-disable no-invalid-this, valid-jsdoc */

/**
 * Handle color operations. Some object methods are chainable.
 *
 * @class
 * @name Highcharts.Color
 *
 * @param {Highcharts.ColorString|Highcharts.GradientColorObject} input
 *        The input color in either rbga or hex format
 */
H.Color = function (
    this: Highcharts.Color,
    input: (Highcharts.ColorString|Highcharts.GradientColorObject)
): any {
    // Backwards compatibility, allow instanciation without new
    if (!(this instanceof H.Color)) {
        return new H.Color(input);
    }
    // Initialize
    this.init(input);
} as any;
H.Color.prototype = {

    // Collection of parsers. This can be extended from the outside by pushing
    // parsers to Highcharts.Color.prototype.parsers.
    parsers: [{
        // RGBA color
        regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/, // eslint-disable-line security/detect-unsafe-regex
        parse: function (result: RegExpExecArray): Highcharts.ColorRGBA {
            return [
                pInt(result[1]),
                pInt(result[2]),
                pInt(result[3]),
                (parseFloat as any)(result[4], 10)
            ];
        }
    }, {
        // RGB color
        regex:
            /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
        parse: function (result: RegExpExecArray): Highcharts.ColorRGBA {
            return [pInt(result[1]), pInt(result[2]), pInt(result[3]), 1];
        }
    }],

    // Collection of named colors. Can be extended from the outside by adding
    // colors to Highcharts.Color.prototype.names.
    names: {
        white: '#ffffff',
        black: '#000000'
    },

    /**
     * Parse the input color to rgba array
     *
     * @private
     * @function Highcharts.Color#init
     *
     * @param {Highcharts.ColorString|Highcharts.GradientColorObject} input
     *        The input color in either rbga or hex format
     *
     * @return {void}
     */
    init: function (
        this: Highcharts.Color,
        input: (Highcharts.ColorString|Highcharts.GradientColorObject)
    ): void {
        var result: (RegExpExecArray|null),
            rgba: any,
            i: number,
            parser: Highcharts.ColorParser,
            len: number;

        this.input = input = this.names[
            input && (input as any).toLowerCase ?
                (input as any).toLowerCase() :
                ''
        ] || input;

        // Gradients
        if (input && (input as any).stops) {
            this.stops = (input as any).stops.map(function (
                stop: [number, Highcharts.ColorString]
            ): Highcharts.Color {
                return new H.Color(stop[1]);
            });

        // Solid colors
        } else {

            // Bitmasking as input[0] is not working for legacy IE.
            if (input &&
                (input as any).charAt &&
                (input as any).charAt() === '#'
            ) {

                len = (input as any).length;
                input = parseInt((input as any).substr(1), 16) as any;

                // Handle long-form, e.g. #AABBCC
                if (len === 7) {

                    rgba = [
                        ((input as any) & 0xFF0000) >> 16,
                        ((input as any) & 0xFF00) >> 8,
                        ((input as any) & 0xFF),
                        1
                    ];

                // Handle short-form, e.g. #ABC
                // In short form, the value is assumed to be the same
                // for both nibbles for each component. e.g. #ABC = #AABBCC
                } else if (len === 4) {

                    rgba = [
                        (
                            (((input as any) & 0xF00) >> 4) |
                            ((input as any) & 0xF00) >> 8
                        ),
                        (
                            (((input as any) & 0xF0) >> 4) |
                            ((input as any) & 0xF0)
                        ),
                        (((input as any) & 0xF) << 4) | ((input as any) & 0xF),
                        1
                    ];
                }
            }

            // Otherwise, check regex parsers
            if (!rgba) {
                i = this.parsers.length;
                while (i-- && !rgba) {
                    parser = this.parsers[i];
                    result = parser.regex.exec(input as Highcharts.ColorString);
                    if (result) {
                        rgba = parser.parse(result);
                    }
                }
            }
        }
        this.rgba = rgba || [];
    },

    /**
     * Return the color or gradient stops in the specified format
     *
     * @function Highcharts.Color#get
     *
     * @param {string} [format]
     *        Possible values are 'a', 'rgb', 'rgba' (default).
     *
     * @return {Highcharts.ColorString|Highcharts.GradientColorObject}
     *         This color as a string or gradient stops.
     */
    get: function (
        this: Highcharts.Color,
        format?: ('a'|'rgb'|'rgba')
    ): Highcharts.Color['input'] {
        var input = this.input,
            rgba = this.rgba,
            ret: (string|Highcharts.GradientColorObject);

        if (this.stops) {
            ret = merge(input);
            (ret as any).stops = [].concat((ret as any).stops);
            this.stops.forEach(function (
                stop: Highcharts.Color,
                i: number
            ): void {
                (ret as any).stops[i] = [
                    (ret as any).stops[i][0],
                    stop.get(format)
                ];
            });

        // it's NaN if gradient colors on a column chart
        } else if (rgba && isNumber(rgba[0])) {
            if (format === 'rgb' || (!format && rgba[3] === 1)) {
                ret = 'rgb(' + rgba[0] + ',' + rgba[1] + ',' + rgba[2] + ')';
            } else if (format === 'a') {
                ret = rgba[3] as any;
            } else {
                ret = 'rgba(' + rgba.join(',') + ')';
            }
        } else {
            ret = input;
        }
        return ret as any;
    },

    /**
     * Brighten the color instance.
     *
     * @function Highcharts.Color#brighten
     *
     * @param {number} alpha
     *        The alpha value.
     *
     * @return {Highcharts.Color}
     *         This color with modifications.
     */
    brighten: function (
        this: Highcharts.Color,
        alpha: number
    ): Highcharts.Color {
        var i,
            rgba = this.rgba;

        if (this.stops) {
            this.stops.forEach(function (stop: Highcharts.Color): void {
                stop.brighten(alpha);
            });

        } else if (isNumber(alpha) && alpha !== 0) {
            for (i = 0; i < 3; i++) {
                rgba[i] += pInt(alpha * 255);

                if (rgba[i] < 0) {
                    rgba[i] = 0;
                }
                if (rgba[i] > 255) {
                    rgba[i] = 255;
                }
            }
        }
        return this;
    },

    /**
     * Set the color's opacity to a given alpha value.
     *
     * @function Highcharts.Color#setOpacity
     *
     * @param {number} alpha
     *        Opacity between 0 and 1.
     *
     * @return {Highcharts.Color}
     *         Color with modifications.
     */
    setOpacity: function (
        this: Highcharts.Color,
        alpha: number
    ): Highcharts.Color {
        this.rgba[3] = alpha;
        return this;
    },

    /**
     * Return an intermediate color between two colors.
     *
     * @function Highcharts.Color#tweenTo
     *
     * @param {Highcharts.Color} to
     *        The color object to tween to.
     *
     * @param {number} pos
     *        The intermediate position, where 0 is the from color (current
     *        color item), and 1 is the `to` color.
     *
     * @return {Highcharts.ColorString}
     *         The intermediate color in rgba notation.
     */
    tweenTo: function (
        this: Highcharts.Color,
        to: Highcharts.Color,
        pos: number
    ): Highcharts.ColorString {
        // Check for has alpha, because rgba colors perform worse due to lack of
        // support in WebKit.
        var fromRgba = this.rgba,
            toRgba = to.rgba,
            hasAlpha,
            ret: Highcharts.ColorString;

        // Unsupported color, return to-color (#3920, #7034)
        if (!toRgba.length || !fromRgba || !fromRgba.length) {
            ret = to.input as any || 'none';

        // Interpolate
        } else {
            hasAlpha = (toRgba[3] !== 1 || fromRgba[3] !== 1);
            ret = (hasAlpha ? 'rgba(' : 'rgb(') +
                Math.round(toRgba[0] + (fromRgba[0] - toRgba[0]) * (1 - pos)) +
                ',' +
                Math.round(toRgba[1] + (fromRgba[1] - toRgba[1]) * (1 - pos)) +
                ',' +
                Math.round(toRgba[2] + (fromRgba[2] - toRgba[2]) * (1 - pos)) +
                (
                    hasAlpha ?
                        (
                            ',' +
                            (toRgba[3] + (fromRgba[3] - toRgba[3]) * (1 - pos))
                        ) :
                        ''
                ) +
                ')';
        }
        return ret;
    }
} as any;

/**
 * Creates a color instance out of a color string.
 *
 * @function Highcharts.color
 *
 * @param {Highcharts.ColorString} input
 *        The input color in either rbga or hex format
 *
 * @return {Highcharts.Color}
 *         Color instance
 */
H.color = function (input: Highcharts.ColorString): Highcharts.Color {
    return new H.Color(input);
};
