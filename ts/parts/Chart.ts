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
        interface Axis {
            index?: number;
        }
        interface ChartCallbackFunction {
            (this: Chart, chart: Chart): void;
        }
        interface ChartRenderer extends SVGRenderer {
            plotBox: BBoxObject;
            spacingBox: BBoxObject;
        }
        interface Options {
            series?: Array<SeriesOptionsType>;
        }
        interface Series {
            index?: number;
            linkedParent?: Series;
        }
        interface SubtitleObject extends SVGElement {
            update(titleOptions: SubtitleOptions, redraw?: boolean): void;
        }
        interface TitleObject extends SVGElement {
            update(titleOptions: TitleOptions, redraw?: boolean): void;
        }
        class Chart {
            public constructor();
            public _cursor?: (CursorValue|null);
            public axes: Array<Axis>;
            public axisOffset: Array<number>;
            public bounds: Dictionary<Dictionary<number>>;
            public callback: ChartCallbackFunction;
            public callbacks: Array<ChartCallbackFunction>;
            public chartBackground?: SVGElement;
            public chartHeight: number;
            public chartWidth: number;
            public clipBox?: BBoxObject;
            public clipOffset?: Array<number>;
            public clipRect?: SVGElement;
            public colorCounter: number;
            public container: HTMLDOMElement;
            public containerHeight?: string;
            public containerWidth?: string;
            public credits?: SVGElement;
            public hasCartesianSeries?: boolean;
            public hasRendered?: boolean;
            public index: number;
            public isDirtyBox?: boolean;
            public isDirtyLegend?: boolean;
            public isResizing: number;
            public labelCollectors: Array<Function>;
            public legend: Legend;
            public margin: Array<number>;
            public oldChartHeight?: number;
            public oldChartWidth?: number;
            public options: Options;
            public plotBackground?: SVGElement;
            public plotBGImage?: SVGElement;
            public plotBorder?: SVGElement;
            public plotBorderWidth?: number;
            public plotBox: BBoxObject;
            public plotHeight: number;
            public plotLeft: number;
            public plotSizeX?: number;
            public plotSizeY?: number;
            public plotTop: number;
            public plotWidth: number;
            public pointCount: number;
            public pointer: Pointer;
            public reflowTimeout?: number;
            public renderer: ChartRenderer;
            public renderTo: HTMLDOMElement;
            public series: Array<Series>;
            public seriesGroup?: SVGElement;
            public spacing: Array<number>;
            public spacingBox: BBoxObject;
            public styledMode?: boolean;
            public subtitle?: SVGElement;
            public symbolCounter: number;
            public time: Time;
            public title?: SVGElement;
            public titleOffset: Array<number>;
            public unbindReflow?: Function;
            public userOptions: Options;
            public xAxis: Array<Axis>;
            public yAxis: Array<Axis>;
            public addCredits(credits?: CreditsOptions): void;
            public destroy(): void;
            public drawChartBox(): void;
            public firstRender(): void;
            public get(id: string): (Axis|Series|Point|undefined);
            public getArgs(...args: Array<any>): Array<any>;
            public getAxes(): void;
            public getAxisMargins(): void;
            public getChartSize(): void;
            public getContainer(): void;
            public getMargins(skipAxes?: boolean): void;
            public getSelectedPoints(): Array<Point>;
            public getSelectedSeries(): Array<Series>;
            public init(
                userOptions: Options,
                callback?: ChartCallbackFunction
            ): void;
            public initSeries(options: SeriesOptions): Series;
            public linkSeries(): void;
            public isInsidePlot(
                plotX: number,
                plotY: number,
                inverted?: boolean
            ): boolean;
            public layOutTitles(redraw?: boolean): void;
            public onload(): void;
            public orderSeries(fromIndex?: number): void;
            public propFromSeries(): void;
            public redraw(animation?: (boolean|AnimationOptionsObject)): void;
            public reflow(e?: Event): void;
            public render(): void;
            public renderLabels(): void;
            public renderSeries(): void;
            public resetMargins(): void;
            public setChartSize(skipAxes?: boolean): void;
            public setClassName(className?: string): void;
            public setReflow(reflow?: boolean): void;
            public setSize(
                width?: (null|number),
                height?: (null|number),
                animation?: (boolean|AnimationOptionsObject)
            ): void;
            public setTitle(
                titleOptions?: TitleOptions,
                subtitleOptions?: SubtitleOptions,
                redraw?: boolean
            ): void;
            public temporaryDisplay(revert?: boolean): void;
        }
        function chart(
            options: Options,
            callback?: ChartCallbackFunction
        ): Chart;
        function chart(
            renderTo: (string|HTMLDOMElement),
            options: Options,
            callback?: ChartCallbackFunction
        ): Chart;
    }
}

/**
 * Callback for chart constructors.
 *
 * @callback Highcharts.ChartCallbackFunction
 *
 * @param {Highcharts.Chart} chart
 *        Created chart.
 */

/**
 * The chart title. The title has an `update` method that allows modifying the
 * options directly or indirectly via `chart.update`.
 *
 * @interface Highcharts.TitleObject
 * @extends Highcharts.SVGElement
 *//**
 * Modify options for the title.
 *
 * @function Highcharts.TitleObject#update
 *
 * @param {Highcharts.TitleOptions} titleOptions
 *        Options to modify.
 *
 * @param {boolean} [redraw=true]
 *        Whether to redraw the chart after the title is altered. If doing more
 *        operations on the chart, it is a good idea to set redraw to false and
 *        call {@link Chart#redraw} after.
 */

/**
 * The chart subtitle. The subtitle has an `update` method that
 * allows modifying the options directly or indirectly via
 * `chart.update`.
 *
 * @interface Highcharts.SubtitleObject
 * @extends Highcharts.SVGElement
 *//**
 * Modify options for the subtitle.
 *
 * @function Highcharts.SubtitleObject#update
 *
 * @param {Highcharts.SubtitleOptions} subtitleOptions
 *        Options to modify.
 *
 * @param {boolean} [redraw=true]
 *        Whether to redraw the chart after the subtitle is altered. If doing
 *        more operations on the chart, it is a good idea to set redraw to false
 *        and call {@link Chart#redraw} after.
 */

import U from './Utilities.js';
const {
    defined,
    isArray,
    isNumber,
    isString,
    pInt
} = U;

import './Axis.js';
import './Legend.js';
import './Options.js';
import './Pointer.js';

var addEvent = H.addEvent,
    animate = H.animate,
    animObject = H.animObject,
    attr = H.attr,
    doc = H.doc,
    Axis = H.Axis, // @todo add as requirement
    createElement = H.createElement,
    defaultOptions = H.defaultOptions,
    discardElement = H.discardElement,
    charts = H.charts,
    css = H.css,
    extend = H.extend,
    find = H.find,
    fireEvent = H.fireEvent,
    isObject = H.isObject,
    Legend = H.Legend, // @todo add as requirement
    marginNames = H.marginNames,
    merge = H.merge,
    objectEach = H.objectEach,
    Pointer = H.Pointer, // @todo add as requirement
    pick = H.pick,
    removeEvent = H.removeEvent,
    seriesTypes = H.seriesTypes,
    splat = H.splat,
    syncTimeout = H.syncTimeout,
    win = H.win;

/* eslint-disable no-invalid-this, valid-jsdoc */

/**
 * The Chart class. The recommended constructor is {@link Highcharts#chart}.
 *
 * @example
 * var chart = Highcharts.chart('container', {
 *        title: {
 *               text: 'My chart'
 *        },
 *        series: [{
 *            data: [1, 3, 2, 4]
 *        }]
 * })
 *
 * @class
 * @name Highcharts.Chart
 *
 * @param {string|Highcharts.HTMLDOMElement} [renderTo]
 *        The DOM element to render to, or its id.
 *
 * @param {Highcharts.Options} options
 *        The chart options structure.
 *
 * @param {Highcharts.ChartCallbackFunction} [callback]
 *        Function to run when the chart has loaded and and all external images
 *        are loaded. Defining a
 *        [chart.events.load](https://api.highcharts.com/highcharts/chart.events.load)
 *        handler is equivalent.
 */
var Chart = H.Chart = function (
    this: Highcharts.Chart
): any {
    this.getArgs.apply(this, arguments as any);
} as any;

/**
 * Factory function for basic charts.
 *
 * @example
 * // Render a chart in to div#container
 * var chart = Highcharts.chart('container', {
 *     title: {
 *         text: 'My chart'
 *     },
 *     series: [{
 *         data: [1, 3, 2, 4]
 *     }]
 * });
 *
 * @function Highcharts.chart
 *
 * @param {string|Highcharts.HTMLDOMElement} [renderTo]
 *        The DOM element to render to, or its id.
 *
 * @param {Highcharts.Options} options
 *        The chart options structure.
 *
 * @param {Highcharts.ChartCallbackFunction} [callback]
 *        Function to run when the chart has loaded and and all external images
 *        are loaded. Defining a
 *        [chart.events.load](https://api.highcharts.com/highcharts/chart.events.load)
 *        handler is equivalent.
 *
 * @return {Highcharts.Chart}
 *         Returns the Chart object.
 */
H.chart = function (
    a: (string|Highcharts.HTMLDOMElement|Highcharts.Options),
    b?: (Highcharts.ChartCallbackFunction|Highcharts.Options),
    c?: Highcharts.ChartCallbackFunction
): Highcharts.Chart {
    return new Chart(a, b, c);
} as any;

extend(Chart.prototype, /** @lends Highcharts.Chart.prototype */ {

    // Hook for adding callbacks in modules
    callbacks: [] as Array<Highcharts.ChartCallbackFunction>,

    /**
     * Handle the arguments passed to the constructor.
     *
     * @private
     * @function Highcharts.Chart#getArgs
     *
     * @param {...Array<*>} arguments
     *        All arguments for the constructor.
     *
     * @return {Array<*>}
     *         Passed arguments without renderTo.
     *
     * @fires Highcharts.Chart#event:init
     * @fires Highcharts.Chart#event:afterInit
     */
    getArgs: function (this: Highcharts.Chart): void {
        var args = [].slice.call(arguments) as any;

        // Remove the optional first argument, renderTo, and
        // set it on this.
        if (isString(args[0]) || args[0].nodeName) {
            this.renderTo = args.shift();
        }
        this.init(args[0], args[1]);
    },

    /**
     * Overridable function that initializes the chart. The constructor's
     * arguments are passed on directly.
     *
     * @function Highcharts.Chart#init
     *
     * @param {Highcharts.Options} userOptions
     *        Custom options.
     *
     * @param {Function} [callback]
     *        Function to run when the chart has loaded and and all external
     *        images are loaded.
     *
     * @return {void}
     *
     * @fires Highcharts.Chart#event:init
     * @fires Highcharts.Chart#event:afterInit
     */
    init: function (
        this: Highcharts.Chart,
        userOptions: Highcharts.Options,
        callback: Highcharts.ChartCallbackFunction
    ): void {

        // Handle regular options
        var options,
            // skip merging data points to increase performance
            seriesOptions = userOptions.series,
            userPlotOptions = userOptions.plotOptions || {};

        // Fire the event with a default function
        fireEvent(this, 'init', { args: arguments }, function (
            this: Highcharts.Chart
        ): void {

            userOptions.series = null as any;
            options = merge(defaultOptions, userOptions); // do the merge

            // Override (by copy of user options) or clear tooltip options
            // in chart.options.plotOptions (#6218)
            objectEach(options.plotOptions, function (
                typeOptions: Highcharts.Dictionary<any>,
                type: string
            ): void {
                if (isObject(typeOptions)) { // #8766
                    typeOptions.tooltip = (
                        userPlotOptions[type] &&
                        merge(userPlotOptions[type].tooltip) // override by copy
                    ) || undefined; // or clear
                }
            });

            // User options have higher priority than default options
            // (#6218). In case of exporting: path is changed
            (options.tooltip as any).userOptions = (
                userOptions.chart &&
                userOptions.chart.forExport &&
                (userOptions.tooltip as any).userOptions
            ) || userOptions.tooltip;

            // set back the series data
            options.series = userOptions.series = seriesOptions;

            /**
             * The original options given to the constructor or a chart factory
             * like {@link Highcharts.chart} and {@link Highcharts.stockChart}.
             *
             * @name Highcharts.Chart#userOptions
             * @type {Highcharts.Options}
             */
            this.userOptions = userOptions;

            var optionsChart = options.chart as Highcharts.ChartOptions;

            var chartEvents = optionsChart.events;

            this.margin = [];
            this.spacing = [];

            // Pixel data bounds for touch zoom
            this.bounds = { h: {}, v: {} };

            // An array of functions that returns labels that should be
            // considered for anti-collision
            this.labelCollectors = [];

            this.callback = callback;
            this.isResizing = 0;

            /**
             * The options structure for the chart after merging
             * {@link #defaultOptions} and {@link #userOptions}. It contains
             * members for the sub elements like series, legend, tooltip etc.
             *
             * @name Highcharts.Chart#options
             * @type {Highcharts.Options}
             */
            this.options = options;

            /**
             * All the axes in the chart.
             *
             * @see  Highcharts.Chart.xAxis
             * @see  Highcharts.Chart.yAxis
             *
             * @name Highcharts.Chart#axes
             * @type {Array<Highcharts.Axis>}
             */
            this.axes = [];

            /**
             * All the current series in the chart.
             *
             * @name Highcharts.Chart#series
             * @type {Array<Highcharts.Series>}
             */
            this.series = [];

            /**
             * The `Time` object associated with the chart. Since v6.0.5,
             * time settings can be applied individually for each chart. If
             * no individual settings apply, the `Time` object is shared by
             * all instances.
             *
             * @name Highcharts.Chart#time
             * @type {Highcharts.Time}
             */
            this.time =
                userOptions.time && Object.keys(userOptions.time).length ?
                    new H.Time(userOptions.time) :
                    H.time;

            /**
             * Whether the chart is in styled mode, meaning all presentatinoal
             * attributes are avoided.
             *
             * @name Highcharts.Chart#styledMode
             * @type {boolean}
             */
            this.styledMode = optionsChart.styledMode;
            this.hasCartesianSeries = optionsChart.showAxes;

            var chart = this;

            /**
             * Index position of the chart in the {@link Highcharts#charts}
             * property.
             *
             * @name Highcharts.Chart#index
             * @type {number}
             */
            chart.index = charts.length; // Add the chart to the global lookup

            charts.push(chart);
            H.chartCount++;

            // Chart event handlers
            if (chartEvents) {
                objectEach(chartEvents, function (
                    event: Highcharts.EventCallbackFunction<Highcharts.Chart>,
                    eventType: string
                ): void {
                    if (H.isFunction(event)) {
                        addEvent(chart, eventType, event);
                    }
                });
            }

            /**
             * A collection of the X axes in the chart.
             *
             * @name Highcharts.Chart#xAxis
             * @type {Array<Highcharts.Axis>}
             */
            chart.xAxis = [];

            /**
             * A collection of the Y axes in the chart.
             *
             * @name Highcharts.Chart#yAxis
             * @type {Array<Highcharts.Axis>}
             *
             * @todo
             * Make events official: Fire the event `afterInit`.
             */
            chart.yAxis = [];

            chart.pointCount = chart.colorCounter = chart.symbolCounter = 0;

            // Fire after init but before first render, before axes and series
            // have been initialized.
            fireEvent(chart, 'afterInit');

            chart.firstRender();
        });
    },

    /**
     * Internal function to unitialize an individual series.
     *
     * @private
     * @function Highcharts.Chart#initSeries
     *
     * @param {Highcharts.SeriesOptions} options
     *
     * @return {Highcharts.Series}
     */
    initSeries: function (
        this: Highcharts.Chart,
        options: Highcharts.SeriesOptions
    ): Highcharts.Series {
        var chart = this,
            optionsChart = chart.options.chart as Highcharts.ChartOptions,
            type = (
                options.type ||
                optionsChart.type ||
                optionsChart.defaultSeriesType
            ) as string,
            series,
            Constr = seriesTypes[type];

        // No such series type
        if (!Constr) {
            H.error(17, true, chart);
        }

        series = new Constr();
        series.init(this, options);
        return series;
    },

    /**
     * Order all series above a given index. When series are added and ordered
     * by configuration, only the last series is handled (#248, #1123, #2456,
     * #6112). This function is called on series initialization and destroy.
     *
     * @private
     * @function Highcharts.Series#orderSeries
     * @param {number} [fromIndex]
     *        If this is given, only the series above this index are handled.
     * @return {void}
     */
    orderSeries: function (this: Highcharts.Chart, fromIndex?: number): void {
        var series = this.series,
            i = fromIndex || 0;

        for (; i < series.length; i++) {
            if (series[i]) {
                series[i].index = i;
                series[i].name = series[i].getName();
            }
        }
    },

    /**
     * Check whether a given point is within the plot area.
     *
     * @function Highcharts.Chart#isInsidePlot
     *
     * @param {number} plotX
     *        Pixel x relative to the plot area.
     *
     * @param {number} plotY
     *        Pixel y relative to the plot area.
     *
     * @param {boolean} [inverted]
     *        Whether the chart is inverted.
     *
     * @return {boolean}
     *         Returns true if the given point is inside the plot area.
     */
    isInsidePlot: function (
        this: Highcharts.Chart,
        plotX: number,
        plotY: number,
        inverted?: boolean
    ): boolean {
        var x = inverted ? plotY : plotX,
            y = inverted ? plotX : plotY;

        return x >= 0 &&
            x <= this.plotWidth &&
            y >= 0 &&
            y <= this.plotHeight;
    },

    /**
     * Redraw the chart after changes have been done to the data, axis extremes
     * chart size or chart elements. All methods for updating axes, series or
     * points have a parameter for redrawing the chart. This is `true` by
     * default. But in many cases you want to do more than one operation on the
     * chart before redrawing, for example add a number of points. In those
     * cases it is a waste of resources to redraw the chart for each new point
     * added. So you add the points and call `chart.redraw()` after.
     *
     * @function Highcharts.Chart#redraw
     *
     * @param {boolean|Highcharts.AnimationOptionsObject} [animation]
     *        If or how to apply animation to the redraw.
     *
     * @return {void}
     *
     * @fires Highcharts.Chart#event:afterSetExtremes
     * @fires Highcharts.Chart#event:beforeRedraw
     * @fires Highcharts.Chart#event:predraw
     * @fires Highcharts.Chart#event:redraw
     * @fires Highcharts.Chart#event:render
     * @fires Highcharts.Chart#event:updatedData
     */
    redraw: function (
        this: Highcharts.Chart,
        animation?: (boolean|Highcharts.AnimationOptionsObject)
    ): void {

        fireEvent(this, 'beforeRedraw');

        var chart = this,
            axes = chart.axes,
            series = chart.series,
            pointer = chart.pointer,
            legend = chart.legend,
            legendUserOptions = chart.userOptions.legend,
            redrawLegend = chart.isDirtyLegend,
            hasStackedSeries: (boolean|undefined),
            hasDirtyStacks,
            hasCartesianSeries = chart.hasCartesianSeries,
            isDirtyBox = chart.isDirtyBox,
            i,
            serie,
            renderer = chart.renderer,
            isHiddenChart = renderer.isHidden(),
            afterRedraw = [] as Array<Function>;

        // Handle responsive rules, not only on resize (#6130)
        if (chart.setResponsive) {
            chart.setResponsive(false);
        }

        H.setAnimation(animation as any, chart);

        if (isHiddenChart) {
            chart.temporaryDisplay();
        }

        // Adjust title layout (reflow multiline text)
        chart.layOutTitles();

        // link stacked series
        i = series.length;
        while (i--) {
            serie = series[i];

            if (serie.options.stacking) {
                hasStackedSeries = true;

                if (serie.isDirty) {
                    hasDirtyStacks = true;
                    break;
                }
            }
        }
        if (hasDirtyStacks) { // mark others as dirty
            i = series.length;
            while (i--) {
                serie = series[i];
                if (serie.options.stacking) {
                    serie.isDirty = true;
                }
            }
        }

        // Handle updated data in the series
        series.forEach(function (serie: Highcharts.Series): void {
            if (serie.isDirty) {
                if (serie.options.legendType === 'point') {
                    if (serie.updateTotals) {
                        serie.updateTotals();
                    }
                    redrawLegend = true;
                } else if (
                    legendUserOptions &&
                    (
                        legendUserOptions.labelFormatter ||
                        legendUserOptions.labelFormat
                    )
                ) {
                    redrawLegend = true; // #2165
                }
            }
            if (serie.isDirtyData) {
                fireEvent(serie, 'updatedData');
            }
        });

        // handle added or removed series
        if (redrawLegend && legend && legend.options.enabled) {
            // draw legend graphics
            legend.render();

            chart.isDirtyLegend = false;
        }

        // reset stacks
        if (hasStackedSeries) {
            chart.getStacks();
        }


        if (hasCartesianSeries) {
            // set axes scales
            axes.forEach(function (axis: Highcharts.Axis): void {
                axis.updateNames();
                axis.setScale();
            });
        }

        chart.getMargins(); // #3098

        if (hasCartesianSeries) {
            // If one axis is dirty, all axes must be redrawn (#792, #2169)
            axes.forEach(function (axis: Highcharts.Axis): void {
                if (axis.isDirty) {
                    isDirtyBox = true;
                }
            });

            // redraw axes
            axes.forEach(function (axis: Highcharts.Axis): void {

                // Fire 'afterSetExtremes' only if extremes are set
                var key = axis.min + ',' + axis.max;

                if (axis.extKey !== key) { // #821, #4452
                    axis.extKey = key;

                    // prevent a recursive call to chart.redraw() (#1119)
                    afterRedraw.push(function (): void {
                        fireEvent(
                            axis,
                            'afterSetExtremes',
                            extend(axis.eventArgs, axis.getExtremes())
                        ); // #747, #751
                        delete axis.eventArgs;
                    });
                }
                if (isDirtyBox || hasStackedSeries) {
                    axis.redraw();
                }
            });
        }

        // the plot areas size has changed
        if (isDirtyBox) {
            chart.drawChartBox();
        }

        // Fire an event before redrawing series, used by the boost module to
        // clear previous series renderings.
        fireEvent(chart, 'predraw');

        // redraw affected series
        series.forEach(function (serie: Highcharts.Series): void {
            if ((isDirtyBox || serie.isDirty) && serie.visible) {
                serie.redraw();
            }
            // Set it here, otherwise we will have unlimited 'updatedData' calls
            // for a hidden series after setData(). Fixes #6012
            serie.isDirtyData = false;
        });

        // move tooltip or reset
        if (pointer) {
            pointer.reset(true);
        }

        // redraw if canvas
        renderer.draw();

        // Fire the events
        fireEvent(chart, 'redraw');
        fireEvent(chart, 'render');

        if (isHiddenChart) {
            chart.temporaryDisplay(true);
        }

        // Fire callbacks that are put on hold until after the redraw
        afterRedraw.forEach(function (callback: Function): void {
            (callback.call as any)();
        });
    },

    /**
     * Get an axis, series or point object by `id` as given in the configuration
     * options. Returns `undefined` if no item is found.
     *
     * @sample highcharts/plotoptions/series-id/
     *         Get series by id
     *
     * @function Highcharts.Chart#get
     *
     * @param {string} id
     *        The id as given in the configuration options.
     *
     * @return {Highcharts.Axis|Highcharts.Series|Highcharts.Point|undefined}
     *         The retrieved item.
     */
    get: function (
        this: Highcharts.Chart,
        id: string
    ): (Highcharts.Axis|Highcharts.Series|Highcharts.Point|undefined) {

        var ret: (Highcharts.Axis|Highcharts.Series|Highcharts.Point|undefined),
            series = this.series,
            i;

        /**
         * @private
         * @param {Highcharts.Axis|Highcharts.Series} item
         * @return {boolean}
         */
        function itemById(item: (Highcharts.Axis|Highcharts.Series)): boolean {
            return item.id === id || (item.options && item.options.id === id);
        }

        ret =
            // Search axes
            find(this.axes, itemById) ||

            // Search series
            find(this.series, itemById);

        // Search points
        for (i = 0; !ret && i < series.length; i++) {
            ret = find(series[i].points || [], itemById);
        }

        return ret;
    },

    /**
     * Create the Axis instances based on the config options.
     *
     * @private
     * @function Highcharts.Chart#getAxes
     *
     * @return {void}
     *
     * @fires Highcharts.Chart#event:afterGetAxes
     * @fires Highcharts.Chart#event:getAxes
     */
    getAxes: function (this: Highcharts.Chart): void {
        var chart = this,
            options = this.options,
            xAxisOptions = options.xAxis = splat(options.xAxis || {}),
            yAxisOptions = options.yAxis = splat(options.yAxis || {}),
            optionsArray;

        fireEvent(this, 'getAxes');

        // make sure the options are arrays and add some members
        xAxisOptions.forEach(function (axis: any, i: number): void {
            axis.index = i;
            axis.isX = true;
        });

        yAxisOptions.forEach(function (axis: any, i: number): void {
            axis.index = i;
        });

        // concatenate all axis options into one array
        optionsArray = xAxisOptions.concat(yAxisOptions);

        optionsArray.forEach(function (
            axisOptions: Highcharts.AxisOptions
        ): void {
            new Axis(chart, axisOptions); // eslint-disable-line no-new
        });

        fireEvent(this, 'afterGetAxes');
    },


    /**
     * Returns an array of all currently selected points in the chart. Points
     * can be selected by clicking or programmatically by the
     * {@link Highcharts.Point#select}
     * function.
     *
     * @sample highcharts/plotoptions/series-allowpointselect-line/
     *         Get selected points
     *
     * @function Highcharts.Chart#getSelectedPoints
     *
     * @return {Array<Highcharts.Point>}
     *         The currently selected points.
     */
    getSelectedPoints: function (
        this: Highcharts.Chart
    ): Array<Highcharts.Point> {
        var points = [] as Array<Highcharts.Point>;

        this.series.forEach(function (serie: Highcharts.Series): void {
            // For one-to-one points inspect series.data in order to retrieve
            // points outside the visible range (#6445). For grouped data,
            // inspect the generated series.points.
            points = points.concat(
                (serie[serie.hasGroupedData ? 'points' : 'data'] || []).filter(
                    function (point: Highcharts.Point): boolean {
                        return pick(point.selectedStaging, point.selected);
                    }
                )
            );
        });
        return points;
    },

    /**
     * Returns an array of all currently selected series in the chart. Series
     * can be selected either programmatically by the
     * {@link Highcharts.Series#select}
     * function or by checking the checkbox next to the legend item if
     * [series.showCheckBox](https://api.highcharts.com/highcharts/plotOptions.series.showCheckbox)
     * is true.
     *
     * @sample highcharts/members/chart-getselectedseries/
     *         Get selected series
     *
     * @function Highcharts.Chart#getSelectedSeries
     *
     * @return {Array<Highcharts.Series>}
     *         The currently selected series.
     */
    getSelectedSeries: function (
        this: Highcharts.Chart
    ): Array<Highcharts.Series> {
        return this.series.filter(function (serie: Highcharts.Series): boolean {
            return serie.selected;
        });
    },

    /**
     * Set a new title or subtitle for the chart.
     *
     * @sample highcharts/members/chart-settitle/
     *         Set title text and styles
     *
     * @function Highcharts.Chart#setTitle
     *
     * @param {Highcharts.TitleOptions} [titleOptions]
     *        New title options. The title text itself is set by the
     *        `titleOptions.text` property.
     *
     * @param {Highcharts.SubtitleOptions} [subtitleOptions]
     *        New subtitle options. The subtitle text itself is set by the
     *        `subtitleOptions.text` property.
     *
     * @param {boolean} [redraw]
     *        Whether to redraw the chart or wait for a later call to
     *        `chart.redraw()`.
     *
     * @return {void}
     */
    setTitle: function (
        this: Highcharts.Chart,
        titleOptions?: Highcharts.TitleOptions,
        subtitleOptions?: Highcharts.SubtitleOptions,
        redraw?: boolean
    ): void {
        var chart = this,
            options = chart.options,
            styledMode = chart.styledMode,
            chartTitleOptions: Highcharts.TitleOptions,
            chartSubtitleOptions: Highcharts.SubtitleOptions;

        chartTitleOptions = options.title = merge(
            // Default styles
            (!styledMode && {
                style: {
                    color: '${palette.neutralColor80}',
                    fontSize: options.isStock ? '16px' : '18px' // #2944
                }
            }) as Highcharts.TitleOptions,
            options.title as Highcharts.TitleOptions,
            titleOptions as Highcharts.TitleOptions
        );
        chartSubtitleOptions = options.subtitle = merge(
            // Default styles
            (!styledMode && {
                style: {
                    color: '${palette.neutralColor60}'
                }
            }) as Highcharts.SubtitleOptions,
            options.subtitle as Highcharts.SubtitleOptions,
            subtitleOptions as Highcharts.SubtitleOptions
        );


        // add title and subtitle

        /**
         * The chart title. The title has an `update` method that allows
         * modifying the options directly or indirectly via
         * `chart.update`.
         *
         * @sample highcharts/members/title-update/
         *         Updating titles
         *
         * @name Highcharts.Chart#title
         * @type {Highcharts.TitleObject}
         */

        /**
         * The chart subtitle. The subtitle has an `update` method that
         * allows modifying the options directly or indirectly via
         * `chart.update`.
         *
         * @name Highcharts.Chart#subtitle
         * @type {Highcharts.SubtitleObject}
         */

        [
            ['title', titleOptions, chartTitleOptions],
            ['subtitle', subtitleOptions, chartSubtitleOptions]
        ].forEach(function (
            arr: Array<(
                string|
                Highcharts.TitleOptions|
                Highcharts.SubtitleOptions|
                undefined
            )>,
            i: number
        ): void {
            var name = arr[0] as string,
                title = (chart as any)[name],
                titleOptions = arr[1],
                chartTitleOptions = arr[2] as (
                    Highcharts.TitleOptions|Highcharts.SubtitleOptions
                );

            if (title && titleOptions) {
                (chart as any)[name] = title = title.destroy(); // remove old
            }

            if (chartTitleOptions && !title) {
                (chart as any)[name] = chart.renderer.text(
                    chartTitleOptions.text as any,
                    0,
                    0,
                    chartTitleOptions.useHTML
                )
                    .attr({
                        align: chartTitleOptions.align,
                        'class': 'highcharts-' + name,
                        zIndex: (chartTitleOptions as any).zIndex || 4
                    })
                    .add();

                // Update methods, shortcut to Chart.setTitle
                (chart as any)[name].update = function (
                    o: (Highcharts.TitleOptions|Highcharts.SubtitleOptions)
                ): void {
                    chart.setTitle(
                        (!i && o) as (Highcharts.TitleOptions|undefined),
                        (i && o) as (Highcharts.SubtitleOptions|undefined)
                    );
                };

                // Presentational
                if (!styledMode) {
                    (chart as any)[name].css(chartTitleOptions.style);
                }

            }
        });
        chart.layOutTitles(redraw);
    },

    /**
     * Internal function to lay out the chart titles and cache the full offset
     * height for use in `getMargins`. The result is stored in
     * `this.titleOffset`.
     *
     * @private
     * @function Highcharts.Chart#layOutTitles
     *
     * @param {boolean} [redraw=true]
     *
     * @return {void}
     */
    layOutTitles: function (
        this: Highcharts.Chart,
        redraw?: boolean
    ): void {
        var titleOffset = [0, 0, 0],
            requiresDirtyBox,
            renderer = this.renderer,
            spacingBox = this.spacingBox as Highcharts.BBoxObject;

        // Lay out the title and the subtitle respectively
        ['title', 'subtitle'].forEach(function (
            this: Highcharts.Chart,
            key: string
        ): void {
            var title = (this as any)[key],
                titleOptions = (this as any).options[key],
                offset = key === 'title' ? -3 :
                    // Floating subtitle (#6574)
                    titleOptions.verticalAlign ? 0 : titleOffset[0] + 2,
                bottomAlign = (
                    key === 'subtitle' &&
                    titleOptions.verticalAlign === 'bottom'
                ),
                titleSize,
                height;

            if (title) {

                if (!this.styledMode) {
                    titleSize = titleOptions.style.fontSize;
                }
                titleSize = renderer.fontMetrics(titleSize, title).b;
                title
                    .css({
                        width: (titleOptions.width ||
                            spacingBox.width + titleOptions.widthAdjust) + 'px'
                    });

                // Skip the cache for HTML (#3481)
                height = title.getBBox(titleOptions.useHTML).height;

                title.align(extend({
                    y: bottomAlign ? titleSize : offset + titleSize,
                    height
                }, titleOptions), false, 'spacingBox');

                if (!titleOptions.floating && !titleOptions.verticalAlign) {
                    titleOffset[0] = Math.ceil(
                        titleOffset[0] +
                        height
                    );
                }
                if (
                    key === 'subtitle' &&
                    titleOptions.verticalAlign === 'bottom'
                ) {
                    titleOffset[2] = height;
                }
            }
        }, this);

        requiresDirtyBox = (
            !this.titleOffset ||
            this.titleOffset.join(',') !== titleOffset.join(',')
        );

        // Used in getMargins
        this.titleOffset = titleOffset;

        if (!this.isDirtyBox && requiresDirtyBox) {
            this.isDirtyBox = this.isDirtyLegend = requiresDirtyBox;
            // Redraw if necessary (#2719, #2744)
            if (this.hasRendered && pick(redraw, true) && this.isDirtyBox) {
                this.redraw();
            }
        }
    },

    /**
     * Internal function to get the chart width and height according to options
     * and container size. Sets {@link Chart.chartWidth} and
     * {@link Chart.chartHeight}.
     *
     * @private
     * @function Highcharts.Chart#getChartSize
     *
     * @return {void}
     */
    getChartSize: function (this: Highcharts.Chart): void {
        var chart = this,
            optionsChart = chart.options.chart as Highcharts.ChartOptions,
            widthOption = optionsChart.width,
            heightOption = optionsChart.height,
            renderTo = chart.renderTo;

        // Get inner width and height
        if (!defined(widthOption)) {
            chart.containerWidth = H.getStyle(renderTo, 'width') as any;
        }
        if (!defined(heightOption)) {
            chart.containerHeight = H.getStyle(renderTo, 'height') as any;
        }

        /**
         * The current pixel width of the chart.
         *
         * @name Highcharts.Chart#chartWidth
         * @type {number}
         */
        chart.chartWidth = Math.max( // #1393
            0,
            widthOption || (chart.containerWidth as any) || 600 // #1460
        );
        /**
         * The current pixel height of the chart.
         *
         * @name Highcharts.Chart#chartHeight
         * @type {number}
         */
        chart.chartHeight = Math.max(
            0,
            H.relativeLength(
                heightOption as any,
                chart.chartWidth
            ) ||
            (
                (chart.containerHeight as any) > 1 ?
                    (chart.containerHeight as any) :
                    400
            )
        );
    },

    /**
     * If the renderTo element has no offsetWidth, most likely one or more of
     * its parents are hidden. Loop up the DOM tree to temporarily display the
     * parents, then save the original display properties, and when the true
     * size is retrieved, reset them. Used on first render and on redraws.
     *
     * @private
     * @function Highcharts.Chart#temporaryDisplay
     *
     * @param {boolean} [revert]
     *        Revert to the saved original styles.
     *
     * @return {void}
     */
    temporaryDisplay: function (
        this: Highcharts.Chart,
        revert?: boolean
    ): void {
        var node = this.renderTo,
            tempStyle: Highcharts.CSSObject;

        if (!revert) {
            while (node && node.style) {

                // When rendering to a detached node, it needs to be temporarily
                // attached in order to read styling and bounding boxes (#5783,
                // #7024).
                if (!doc.body.contains(node) && !node.parentNode) {
                    (node as any).hcOrigDetached = true;
                    doc.body.appendChild(node);
                }
                if (
                    H.getStyle(node, 'display', false) === 'none' ||
                    (node as any).hcOricDetached
                ) {
                    (node as any).hcOrigStyle = {
                        display: node.style.display,
                        height: node.style.height,
                        overflow: node.style.overflow
                    };
                    tempStyle = {
                        display: 'block',
                        overflow: 'hidden'
                    };
                    if (node !== this.renderTo) {
                        tempStyle.height = 0;
                    }

                    H.css(node, tempStyle);

                    // If it still doesn't have an offset width after setting
                    // display to block, it probably has an !important priority
                    // #2631, 6803
                    if (!node.offsetWidth) {
                        node.style.setProperty('display', 'block', 'important');
                    }
                }
                node = node.parentNode as any;

                if (node === doc.body) {
                    break;
                }
            }
        } else {
            while (node && node.style) {
                if ((node as any).hcOrigStyle) {
                    H.css(node, (node as any).hcOrigStyle);
                    delete (node as any).hcOrigStyle;
                }
                if ((node as any).hcOrigDetached) {
                    doc.body.removeChild(node);
                    (node as any).hcOrigDetached = false;
                }
                node = node.parentNode as any;
            }
        }
    },

    /**
     * Set the {@link Chart.container|chart container's} class name, in
     * addition to `highcharts-container`.
     *
     * @function Highcharts.Chart#setClassName
     *
     * @param {string} [className]
     *
     * @return {void}
     */
    setClassName: function (this: Highcharts.Chart, className?: string): void {
        this.container.className = 'highcharts-container ' + (className || '');
    },

    /**
     * Get the containing element, determine the size and create the inner
     * container div to hold the chart.
     *
     * @private
     * @function Highcharts.Chart#afterGetContainer
     *
     * @return {void}
     *
     * @fires Highcharts.Chart#event:afterGetContainer
     */
    getContainer: function (this: Highcharts.Chart): void {
        var chart = this,
            container,
            options = chart.options,
            optionsChart = options.chart as Highcharts.ChartOptions,
            chartWidth,
            chartHeight,
            renderTo = chart.renderTo,
            indexAttrName = 'data-highcharts-chart',
            oldChartIndex,
            Ren,
            containerId = H.uniqueKey(),
            containerStyle,
            key;

        if (!renderTo) {
            chart.renderTo = renderTo =
                optionsChart.renderTo as Highcharts.HTMLDOMElement;
        }

        if (isString(renderTo)) {
            chart.renderTo = renderTo =
                doc.getElementById(renderTo as any) as any;
        }

        // Display an error if the renderTo is wrong
        if (!renderTo) {
            H.error(13, true, chart);
        }

        // If the container already holds a chart, destroy it. The check for
        // hasRendered is there because web pages that are saved to disk from
        // the browser, will preserve the data-highcharts-chart attribute and
        // the SVG contents, but not an interactive chart. So in this case,
        // charts[oldChartIndex] will point to the wrong chart if any (#2609).
        oldChartIndex = pInt(attr(renderTo, indexAttrName));
        if (
            isNumber(oldChartIndex) &&
            charts[oldChartIndex] &&
            (charts[oldChartIndex] as any).hasRendered
        ) {
            (charts[oldChartIndex] as any).destroy();
        }

        // Make a reference to the chart from the div
        attr(renderTo, indexAttrName, chart.index);

        // remove previous chart
        renderTo.innerHTML = '';

        // If the container doesn't have an offsetWidth, it has or is a child of
        // a node that has display:none. We need to temporarily move it out to a
        // visible state to determine the size, else the legend and tooltips
        // won't render properly. The skipClone option is used in sparklines as
        // a micro optimization, saving about 1-2 ms each chart.
        if (!optionsChart.skipClone && !renderTo.offsetWidth) {
            chart.temporaryDisplay();
        }

        // get the width and height
        chart.getChartSize();
        chartWidth = chart.chartWidth;
        chartHeight = chart.chartHeight;

        // Allow table cells and flex-boxes to shrink without the chart blocking
        // them out (#6427)
        css(renderTo, { overflow: 'hidden' });

        // Create the inner container
        if (!chart.styledMode) {
            containerStyle = extend({
                position: 'relative',
                // needed for context menu (avoidscrollbars) and content
                // overflow in IE
                overflow: 'hidden',
                width: chartWidth + 'px',
                height: chartHeight + 'px',
                textAlign: 'left',
                lineHeight: 'normal', // #427
                zIndex: 0, // #1072
                '-webkit-tap-highlight-color': 'rgba(0,0,0,0)'
            }, optionsChart.style as any);
        }

        /**
         * The containing HTML element of the chart. The container is
         * dynamically inserted into the element given as the `renderTo`
         * parameter in the {@link Highcharts#chart} constructor.
         *
         * @name Highcharts.Chart#container
         * @type {Highcharts.HTMLDOMElement}
         */
        container = createElement(
            'div',
            {
                id: containerId
            },
            containerStyle,
            renderTo
        );
        chart.container = container;

        // cache the cursor (#1650)
        chart._cursor = container.style.cursor as Highcharts.CursorValue;

        // Initialize the renderer
        Ren = (H as any)[optionsChart.renderer] || H.Renderer;

        /**
         * The renderer instance of the chart. Each chart instance has only one
         * associated renderer.
         *
         * @name Highcharts.Chart#renderer
         * @type {Highcharts.SVGRenderer}
         */
        chart.renderer = new Ren(
            container,
            chartWidth,
            chartHeight,
            null,
            optionsChart.forExport,
            options.exporting && options.exporting.allowHTML,
            chart.styledMode
        );


        chart.setClassName(optionsChart.className);
        if (!chart.styledMode) {
            chart.renderer.setStyle(optionsChart.style as any);
        } else {
            // Initialize definitions
            for (key in options.defs) { // eslint-disable-line guard-for-in
                this.renderer.definition(options.defs[key]);
            }
        }

        // Add a reference to the charts index
        chart.renderer.chartIndex = chart.index;

        fireEvent(this, 'afterGetContainer');
    },

    /**
     * Calculate margins by rendering axis labels in a preliminary position.
     * Title, subtitle and legend have already been rendered at this stage, but
     * will be moved into their final positions.
     *
     * @private
     * @function Highcharts.Chart#getMargins
     * @param {boolean} skipAxes
     * @return {void}
     * @fires Highcharts.Chart#event:getMargins
     */
    getMargins: function (this: Highcharts.Chart, skipAxes?: boolean): void {
        const { spacing, margin, titleOffset } = this;

        this.resetMargins();

        // Adjust for title and subtitle
        if (titleOffset[0] && !defined(margin[0])) {
            this.plotTop = Math.max(
                this.plotTop,
                titleOffset[0] + (this.options.title as any).margin + spacing[0]
            );
        }

        if (titleOffset[2] && !defined(margin[2])) {
            this.marginBottom = Math.max(
                this.marginBottom,
                titleOffset[2] + (this.options.title as any).margin + spacing[2]
            );
        }

        // Adjust for legend
        if (this.legend && this.legend.display) {
            this.legend.adjustMargins(margin, spacing);
        }

        fireEvent(this, 'getMargins');

        if (!skipAxes) {
            this.getAxisMargins();
        }
    },

    /**
     * @private
     * @function Highcharts.Chart#getAxisMargins
     * @return {void}
     */
    getAxisMargins: function (this: Highcharts.Chart): void {

        var chart = this,
            // [top, right, bottom, left]
            axisOffset = chart.axisOffset = [0, 0, 0, 0],
            margin = chart.margin;

        // pre-render axes to get labels offset width
        if (chart.hasCartesianSeries) {
            chart.axes.forEach(function (axis: Highcharts.Axis): void {
                if (axis.visible) {
                    axis.getOffset();
                }
            });
        }

        // Add the axis offsets
        marginNames.forEach(function (m: string, side: number): void {
            if (!defined(margin[side])) {
                (chart as any)[m] += axisOffset[side];
            }
        });

        chart.setChartSize();

    },

    /**
     * Reflows the chart to its container. By default, the chart reflows
     * automatically to its container following a `window.resize` event, as per
     * the [chart.reflow](https://api.highcharts.com/highcharts/chart.reflow)
     * option. However, there are no reliable events for div resize, so if the
     * container is resized without a window resize event, this must be called
     * explicitly.
     *
     * @sample highcharts/members/chart-reflow/
     *         Resize div and reflow
     * @sample highcharts/chart/events-container/
     *         Pop up and reflow
     *
     * @function Highcharts.Chart#reflow
     *
     * @param {global.Event} [e]
     *        Event arguments. Used primarily when the function is called
     *        internally as a response to window resize.
     */
    reflow: function (this: Highcharts.Chart, e?: Event): void {
        var chart = this,
            optionsChart = chart.options.chart as Highcharts.ChartOptions,
            renderTo = chart.renderTo,
            hasUserSize = (
                defined(optionsChart.width) &&
                defined(optionsChart.height)
            ),
            width = optionsChart.width || H.getStyle(renderTo, 'width'),
            height = optionsChart.height || H.getStyle(renderTo, 'height'),
            target = e ? e.target : win;

        // Width and height checks for display:none. Target is doc in IE8 and
        // Opera, win in Firefox, Chrome and IE9.
        if (
            !hasUserSize &&
            !chart.isPrinting &&
            width &&
            height &&
            (target === win || target === doc)
        ) {
            if (
                width !== chart.containerWidth ||
                height !== chart.containerHeight
            ) {
                H.clearTimeout(chart.reflowTimeout as any);
                // When called from window.resize, e is set, else it's called
                // directly (#2224)
                chart.reflowTimeout = syncTimeout(function (): void {
                    // Set size, it may have been destroyed in the meantime
                    // (#1257)
                    if (chart.container) {
                        chart.setSize(undefined, undefined, false);
                    }
                }, e ? 100 : 0);
            }
            chart.containerWidth = width as any;
            chart.containerHeight = height as any;
        }
    },

    /**
     * Toggle the event handlers necessary for auto resizing, depending on the
     * `chart.reflow` option.
     *
     * @private
     * @function Highcharts.Chart#setReflow
     * @param {boolean} [reflow]
     * @return {void}
     */
    setReflow: function (this: Highcharts.Chart, reflow?: boolean): void {
        var chart = this;

        if (reflow !== false && !this.unbindReflow) {
            this.unbindReflow = addEvent(win, 'resize', function (
                e: Event
            ): void {
                chart.reflow(e);
            });
            addEvent(this, 'destroy', this.unbindReflow);

        } else if (reflow === false && this.unbindReflow) {

            // Unbind and unset
            this.unbindReflow = this.unbindReflow();
        }

        // The following will add listeners to re-fit the chart before and after
        // printing (#2284). However it only works in WebKit. Should have worked
        // in Firefox, but not supported in IE.
        /*
        if (win.matchMedia) {
            win.matchMedia('print').addListener(function reflow() {
                chart.reflow();
            });
        }
        //*/
    },

    /**
     * Resize the chart to a given width and height. In order to set the width
     * only, the height argument may be skipped. To set the height only, pass
     * `undefined` for the width.
     *
     * @sample highcharts/members/chart-setsize-button/
     *         Test resizing from buttons
     * @sample highcharts/members/chart-setsize-jquery-resizable/
     *         Add a jQuery UI resizable
     * @sample stock/members/chart-setsize/
     *         Highstock with UI resizable
     *
     * @function Highcharts.Chart#setSize
     *
     * @param {number|null} [width]
     *        The new pixel width of the chart. Since v4.2.6, the argument can
     *        be `undefined` in order to preserve the current value (when
     *        setting height only), or `null` to adapt to the width of the
     *        containing element.
     *
     * @param {number|null} [height]
     *        The new pixel height of the chart. Since v4.2.6, the argument can
     *        be `undefined` in order to preserve the current value, or `null`
     *        in order to adapt to the height of the containing element.
     *
     * @param {boolean|Highcharts.AnimationOptionsObject} [animation=true]
     *        Whether and how to apply animation.
     *
     * @return {void}
     *
     * @fires Highcharts.Chart#event:endResize
     * @fires Highcharts.Chart#event:resize
     */
    setSize: function (
        this: Highcharts.Chart,
        width?: (number|null),
        height?: (number|null),
        animation?: (boolean|Highcharts.AnimationOptionsObject)
    ): void {
        var chart = this,
            renderer = chart.renderer,
            globalAnimation;

        // Handle the isResizing counter
        chart.isResizing += 1;

        // set the animation for the current process
        H.setAnimation(animation, chart);

        chart.oldChartHeight = chart.chartHeight;
        chart.oldChartWidth = chart.chartWidth;
        if (width !== undefined) {
            (chart.options.chart as any).width = width;
        }
        if (height !== undefined) {
            (chart.options.chart as any).height = height;
        }
        chart.getChartSize();

        // Resize the container with the global animation applied if enabled
        // (#2503)
        if (!chart.styledMode) {
            globalAnimation = renderer.globalAnimation;
            (globalAnimation ? animate : css)(chart.container, {
                width: chart.chartWidth + 'px',
                height: chart.chartHeight + 'px'
            }, globalAnimation);
        }

        chart.setChartSize(true);
        renderer.setSize(
            (chart.chartWidth as any),
            (chart.chartHeight as any),
            animation
        );

        // handle axes
        chart.axes.forEach(function (axis: Highcharts.Axis): void {
            axis.isDirty = true;
            axis.setScale();
        });

        chart.isDirtyLegend = true; // force legend redraw
        chart.isDirtyBox = true; // force redraw of plot and chart border

        chart.layOutTitles(); // #2857
        chart.getMargins();

        chart.redraw(animation);


        chart.oldChartHeight = null as any;
        fireEvent(chart, 'resize');

        // Fire endResize and set isResizing back. If animation is disabled,
        // fire without delay
        syncTimeout(function (): void {
            if (chart) {
                fireEvent(chart, 'endResize', null as any, function (): void {
                    chart.isResizing -= 1;
                });
            }
        }, animObject(globalAnimation).duration);
    },

    /**
     * Set the public chart properties. This is done before and after the
     * pre-render to determine margin sizes.
     *
     * @private
     * @function Highcharts.Chart#setChartSize
     *
     * @param {boolean} skipAxes
     *
     * @return {void}
     *
     * @fires Highcharts.Chart#event:afterSetChartSize
     */
    setChartSize: function (this: Highcharts.Chart, skipAxes: boolean): void {
        var chart = this,
            inverted = chart.inverted,
            renderer = chart.renderer,
            chartWidth = chart.chartWidth,
            chartHeight = chart.chartHeight,
            optionsChart = chart.options.chart as Highcharts.ChartOptions,
            spacing = chart.spacing,
            clipOffset = chart.clipOffset,
            clipX,
            clipY,
            plotLeft,
            plotTop,
            plotWidth,
            plotHeight,
            plotBorderWidth;

        /**
         * The current left position of the plot area in pixels.
         *
         * @name Highcharts.Chart#plotLeft
         * @type {number}
         */
        chart.plotLeft = plotLeft = Math.round(chart.plotLeft);

        /**
         * The current top position of the plot area in pixels.
         *
         * @name Highcharts.Chart#plotTop
         * @type {number}
         */
        chart.plotTop = plotTop = Math.round(chart.plotTop);

        /**
         * The current width of the plot area in pixels.
         *
         * @name Highcharts.Chart#plotWidth
         * @type {number}
         */
        chart.plotWidth = plotWidth = Math.max(
            0,
            Math.round((chartWidth as any) - plotLeft - chart.marginRight)
        );

        /**
         * The current height of the plot area in pixels.
         *
         * @name Highcharts.Chart#plotHeight
         * @type {number}
         */
        chart.plotHeight = plotHeight = Math.max(
            0,
            Math.round((chartHeight as any) - plotTop - chart.marginBottom)
        );

        chart.plotSizeX = inverted ? plotHeight : plotWidth;
        chart.plotSizeY = inverted ? plotWidth : plotHeight;

        chart.plotBorderWidth = optionsChart.plotBorderWidth || 0;

        // Set boxes used for alignment
        chart.spacingBox = renderer.spacingBox = {
            x: spacing[3],
            y: spacing[0],
            width: (chartWidth as any) - spacing[3] - spacing[1],
            height: (chartHeight as any) - spacing[0] - spacing[2]
        };
        chart.plotBox = renderer.plotBox = {
            x: plotLeft,
            y: plotTop,
            width: plotWidth,
            height: plotHeight
        };

        plotBorderWidth = 2 * Math.floor(chart.plotBorderWidth / 2);
        clipX = Math.ceil(
            Math.max(plotBorderWidth, (clipOffset as any)[3]) / 2
        );
        clipY = Math.ceil(
            Math.max(plotBorderWidth, (clipOffset as any)[0]) / 2
        );
        chart.clipBox = {
            x: clipX,
            y: clipY,
            width: Math.floor(
                chart.plotSizeX -
                Math.max(plotBorderWidth, (clipOffset as any)[1]) / 2 -
                clipX
            ),
            height: Math.max(
                0,
                Math.floor(
                    chart.plotSizeY -
                    Math.max(plotBorderWidth, (clipOffset as any)[2]) / 2 -
                    clipY
                )
            )
        };

        if (!skipAxes) {
            chart.axes.forEach(function (axis: Highcharts.Axis): void {
                axis.setAxisSize();
                axis.setAxisTranslation();
            });
        }

        fireEvent(chart, 'afterSetChartSize', { skipAxes: skipAxes });
    },

    /**
     * Initial margins before auto size margins are applied.
     *
     * @private
     * @function Highcharts.Chart#resetMargins
     * @return {void}
     */
    resetMargins: function (this: Highcharts.Chart): void {

        fireEvent(this, 'resetMargins');

        var chart = this,
            chartOptions = chart.options.chart as Highcharts.ChartOptions;

        // Create margin and spacing array
        ['margin', 'spacing'].forEach(function splashArrays(
            target: string
        ): void {
            var value = (chartOptions as any)[target],
                values = isObject(value) ? value : [value, value, value, value];

            [
                'Top',
                'Right',
                'Bottom',
                'Left'
            ].forEach(function (sideName: string, side: number): void {
                (chart as any)[target][side] = pick(
                    (chartOptions as any)[target + sideName],
                    values[side]
                );
            });
        });

        // Set margin names like chart.plotTop, chart.plotLeft,
        // chart.marginRight, chart.marginBottom.
        marginNames.forEach(function (m: string, side: number): void {
            (chart as any)[m] = pick(chart.margin[side], chart.spacing[side]);
        });
        chart.axisOffset = [0, 0, 0, 0]; // top, right, bottom, left
        chart.clipOffset = [0, 0, 0, 0];
    },

    /**
     * Internal function to draw or redraw the borders and backgrounds for chart
     * and plot area.
     *
     * @private
     * @function Highcharts.Chart#drawChartBox
     * @return {void}
     * @fires Highcharts.Chart#event:afterDrawChartBox
     */
    drawChartBox: function (this: Highcharts.Chart): void {
        var chart = this,
            optionsChart = chart.options.chart as Highcharts.ChartOptions,
            renderer = chart.renderer,
            chartWidth = chart.chartWidth,
            chartHeight = chart.chartHeight,
            chartBackground = chart.chartBackground,
            plotBackground = chart.plotBackground,
            plotBorder = chart.plotBorder,
            chartBorderWidth,
            styledMode = chart.styledMode,
            plotBGImage = chart.plotBGImage,
            chartBackgroundColor = optionsChart.backgroundColor,
            plotBackgroundColor = optionsChart.plotBackgroundColor,
            plotBackgroundImage = optionsChart.plotBackgroundImage,
            mgn,
            bgAttr: Highcharts.CSSObject,
            plotLeft = chart.plotLeft,
            plotTop = chart.plotTop,
            plotWidth = chart.plotWidth,
            plotHeight = chart.plotHeight,
            plotBox = chart.plotBox,
            clipRect = chart.clipRect,
            clipBox = chart.clipBox,
            verb = 'animate';

        // Chart area
        if (!chartBackground) {
            chart.chartBackground = chartBackground = renderer.rect()
                .addClass('highcharts-background')
                .add();
            verb = 'attr';
        }

        if (!styledMode) {
            // Presentational
            chartBorderWidth = optionsChart.borderWidth || 0;
            mgn = chartBorderWidth + (optionsChart.shadow ? 8 : 0);

            bgAttr = {
                fill: (chartBackgroundColor as any) || 'none'
            };

            if (chartBorderWidth || chartBackground['stroke-width']) { // #980
                bgAttr.stroke = optionsChart.borderColor;
                bgAttr['stroke-width'] = chartBorderWidth;
            }
            chartBackground
                .attr(bgAttr)
                .shadow(optionsChart.shadow);
        } else {
            chartBorderWidth = mgn = chartBackground.strokeWidth();
        }


        chartBackground[verb]({
            x: mgn / 2,
            y: mgn / 2,
            width: (chartWidth as any) - mgn - chartBorderWidth % 2,
            height: (chartHeight as any) - mgn - chartBorderWidth % 2,
            r: optionsChart.borderRadius
        });

        // Plot background
        verb = 'animate';
        if (!plotBackground) {
            verb = 'attr';
            chart.plotBackground = plotBackground = renderer.rect()
                .addClass('highcharts-plot-background')
                .add();
        }
        plotBackground[verb](plotBox);

        if (!styledMode) {
            // Presentational attributes for the background
            plotBackground
                .attr({
                    fill: (plotBackgroundColor as any) || 'none'
                })
                .shadow(optionsChart.plotShadow);

            // Create the background image
            if (plotBackgroundImage) {
                if (!plotBGImage) {
                    chart.plotBGImage = renderer.image(
                        plotBackgroundImage,
                        plotLeft,
                        plotTop,
                        plotWidth,
                        plotHeight
                    ).add();
                } else {
                    plotBGImage.animate(plotBox as Highcharts.SVGAttributes);
                }
            }
        }

        // Plot clip
        if (!clipRect) {
            chart.clipRect = (renderer.clipRect as any)(clipBox);
        } else {
            clipRect.animate({
                width: (clipBox as any).width,
                height: (clipBox as any).height
            });
        }

        // Plot area border
        verb = 'animate';
        if (!plotBorder) {
            verb = 'attr';
            chart.plotBorder = plotBorder = renderer.rect()
                .addClass('highcharts-plot-border')
                .attr({
                    zIndex: 1 // Above the grid
                })
                .add();
        }

        if (!styledMode) {
            // Presentational
            plotBorder.attr({
                stroke: optionsChart.plotBorderColor,
                'stroke-width': optionsChart.plotBorderWidth || 0,
                fill: 'none'
            });
        }

        plotBorder[verb](plotBorder.crisp({
            x: plotLeft,
            y: plotTop,
            width: plotWidth,
            height: plotHeight
        }, -plotBorder.strokeWidth())); // #3282 plotBorder should be negative;

        // reset
        chart.isDirtyBox = false;

        fireEvent(this, 'afterDrawChartBox');
    },

    /**
     * Detect whether a certain chart property is needed based on inspecting its
     * options and series. This mainly applies to the chart.inverted property,
     * and in extensions to the chart.angular and chart.polar properties.
     *
     * @private
     * @function Highcharts.Chart#propFromSeries
     * @return {void}
     */
    propFromSeries: function (this: Highcharts.Chart): void {
        var chart = this,
            optionsChart = chart.options.chart as Highcharts.ChartOptions,
            klass,
            seriesOptions =
                chart.options.series as Array<Highcharts.SeriesOptions>,
            i,
            value;

        /**
         * The flag is set to `true` if a series of the chart is inverted.
         *
         * @name Highcharts.Chart#inverted
         * @type {boolean|undefined}
         */
        ['inverted', 'angular', 'polar'].forEach(function (key: string): void {

            // The default series type's class
            klass = seriesTypes[(optionsChart.type ||
                optionsChart.defaultSeriesType) as any];

            // Get the value from available chart-wide properties
            value =
                // It is set in the options:
                (optionsChart as any)[key] ||
                // The default series class:
                (klass && (klass.prototype as any)[key]);
            // requires it

            // 4. Check if any the chart's series require it
            i = seriesOptions && seriesOptions.length;
            while (!value && i--) {
                klass = seriesTypes[seriesOptions[i].type as any];
                if (klass && (klass.prototype as any)[key]) {
                    value = true;
                }
            }

            // Set the chart property
            (chart as any)[key] = value;
        });

    },

    /**
     * Internal function to link two or more series together, based on the
     * `linkedTo` option. This is done from `Chart.render`, and after
     * `Chart.addSeries` and `Series.remove`.
     *
     * @private
     * @function Highcharts.Chart#linkSeries
     * @return {void}
     * @fires Highcharts.Chart#event:afterLinkSeries
     */
    linkSeries: function (this: Highcharts.Chart): void {
        var chart = this,
            chartSeries = chart.series;

        // Reset links
        chartSeries.forEach(function (series: Highcharts.Series): void {
            series.linkedSeries.length = 0;
        });

        // Apply new links
        chartSeries.forEach(function (series: Highcharts.Series): void {
            var linkedTo = series.options.linkedTo;

            if (isString(linkedTo)) {
                if (linkedTo === ':previous') {
                    linkedTo = chart.series[(series.index as any) - 1] as any;
                } else {
                    linkedTo = chart.get(linkedTo as any) as any;
                }
                // #3341 avoid mutual linking
                if (linkedTo && (linkedTo as any).linkedParent !== series) {
                    (linkedTo as any).linkedSeries.push(series);
                    series.linkedParent = linkedTo as any;
                    series.visible = pick(
                        series.options.visible,
                        (linkedTo as any).options.visible,
                        series.visible
                    ); // #3879
                }
            }
        });

        fireEvent(this, 'afterLinkSeries');
    },

    /**
     * Render series for the chart.
     *
     * @private
     * @function Highcharts.Chart#renderSeries
     * @return {void}
     */
    renderSeries: function (this: Highcharts.Chart): void {
        this.series.forEach(function (serie: Highcharts.Series): void {
            serie.translate();
            serie.render();
        });
    },

    /**
     * Render labels for the chart.
     *
     * @private
     * @function Highcharts.Chart#renderLabels
     * @return {void}
     */
    renderLabels: function (this: Highcharts.Chart): void {
        var chart = this,
            labels = chart.options.labels as Highcharts.LabelsOptions;

        if (labels.items) {
            labels.items.forEach(function (
                label: Highcharts.LabelsItemsOptions
            ): void {
                var style = extend(labels.style as any, label.style as any),
                    x = pInt(style.left) + chart.plotLeft,
                    y = pInt(style.top) + chart.plotTop + 12;

                // delete to prevent rewriting in IE
                delete style.left;
                delete style.top;

                chart.renderer.text(
                    label.html as any,
                    x,
                    y
                )
                    .attr({ zIndex: 2 })
                    .css(style)
                    .add();

            });
        }
    },

    /**
     * Render all graphics for the chart. Runs internally on initialization.
     *
     * @private
     * @function Highcharts.Chart#render
     * @return {void}
     */
    render: function (this: Highcharts.Chart): void {
        var chart = this,
            axes = chart.axes,
            renderer = chart.renderer,
            options = chart.options,
            correction = 0, // correction for X axis labels
            tempWidth,
            tempHeight,
            redoHorizontal: boolean,
            redoVertical: boolean;

        // Title
        chart.setTitle();

        /**
         * The overview of the chart's series.
         *
         * @name Highcharts.Chart#legend
         * @type {Highcharts.Legend}
         */
        chart.legend = new Legend(chart, options.legend as any);

        // Get stacks
        if (chart.getStacks) {
            chart.getStacks();
        }

        // Get chart margins
        chart.getMargins(true);
        chart.setChartSize();

        // Record preliminary dimensions for later comparison
        tempWidth = chart.plotWidth;

        axes.some(function (axis: Highcharts.Axis): (boolean|undefined) {
            if (
                axis.horiz &&
                axis.visible &&
                (axis.options.labels as any).enabled &&
                axis.series.length
            ) {
                // 21 is the most common correction for X axis labels
                correction = 21;
                return true;
            }
        } as any);

        // use Math.max to prevent negative plotHeight
        chart.plotHeight = Math.max(chart.plotHeight - correction, 0);
        tempHeight = chart.plotHeight;

        // Get margins by pre-rendering axes
        axes.forEach(function (axis: Highcharts.Axis): void {
            axis.setScale();
        });
        chart.getAxisMargins();

        // If the plot area size has changed significantly, calculate tick
        // positions again
        redoHorizontal = tempWidth / chart.plotWidth > 1.1;
        // Height is more sensitive, use lower threshold
        redoVertical = tempHeight / chart.plotHeight > 1.05;

        if (redoHorizontal || redoVertical) {

            axes.forEach(function (axis: Highcharts.Axis): void {
                if (
                    (axis.horiz && redoHorizontal) ||
                    (!axis.horiz && redoVertical)
                ) {
                    // update to reflect the new margins
                    axis.setTickInterval(true);
                }
            });
            chart.getMargins(); // second pass to check for new labels
        }

        // Draw the borders and backgrounds
        chart.drawChartBox();


        // Axes
        if (chart.hasCartesianSeries) {
            axes.forEach(function (axis: Highcharts.Axis): void {
                if (axis.visible) {
                    axis.render();
                }
            });
        }

        // The series
        if (!chart.seriesGroup) {
            chart.seriesGroup = renderer.g('series-group')
                .attr({ zIndex: 3 })
                .add();
        }
        chart.renderSeries();

        // Labels
        chart.renderLabels();

        // Credits
        chart.addCredits();

        // Handle responsiveness
        if (chart.setResponsive) {
            chart.setResponsive();
        }

        // Set flag
        chart.hasRendered = true;

    },

    /**
     * Set a new credits label for the chart.
     *
     * @sample highcharts/credits/credits-update/
     *         Add and update credits
     *
     * @function Highcharts.Chart#addCredits
     *
     * @param {Highcharts.CreditsOptions} credits
     *        A configuration object for the new credits.
     *
     * @return {void}
     */
    addCredits: function (
        this: Highcharts.Chart,
        credits: Highcharts.CreditsOptions
    ): void {
        var chart = this;

        credits = merge(
            true, this.options.credits as Highcharts.CreditsOptions, credits
        );
        if (credits.enabled && !this.credits) {

            /**
             * The chart's credits label. The label has an `update` method that
             * allows setting new options as per the
             * [credits options set](https://api.highcharts.com/highcharts/credits).
             *
             * @name Highcharts.Chart#credits
             * @type {Highcharts.SVGElement}
             */
            this.credits = this.renderer.text(
                credits.text + (this.mapCredits || ''),
                0,
                0
            )
                .addClass('highcharts-credits')
                .on('click', function (): void {
                    if (credits.href) {
                        win.location.href = credits.href;
                    }
                })
                .attr({
                    align: (credits.position as any).align,
                    zIndex: 8
                });


            if (!chart.styledMode) {
                this.credits.css(credits.style as any);
            }

            this.credits
                .add()
                .align(credits.position);

            // Dynamically update
            this.credits.update = function (
                options: Highcharts.CreditsOptions
            ): void {
                chart.credits = (chart.credits as any).destroy() as any;
                chart.addCredits(options);
            };
        }
    },

    /**
     * Remove the chart and purge memory. This method is called internally
     * before adding a second chart into the same container, as well as on
     * window unload to prevent leaks.
     *
     * @sample highcharts/members/chart-destroy/
     *         Destroy the chart from a button
     * @sample stock/members/chart-destroy/
     *         Destroy with Highstock
     *
     * @function Highcharts.Chart#destroy
     *
     * @return {void}
     *
     * @fires Highcharts.Chart#event:destroy
     */
    destroy: function (this: Highcharts.Chart): void {
        var chart = this,
            axes = chart.axes,
            series = chart.series,
            container = chart.container,
            i,
            parentNode = container && container.parentNode;

        // fire the chart.destoy event
        fireEvent(chart, 'destroy');

        // Delete the chart from charts lookup array
        if (chart.renderer.forExport) {
            H.erase(charts, chart); // #6569
        } else {
            charts[chart.index] = undefined;
        }
        H.chartCount--;
        chart.renderTo.removeAttribute('data-highcharts-chart');

        // remove events
        removeEvent(chart);

        // ==== Destroy collections:
        // Destroy axes
        i = axes.length;
        while (i--) {
            axes[i] = axes[i].destroy() as any;
        }

        // Destroy scroller & scroller series before destroying base series
        if (this.scroller && this.scroller.destroy) {
            this.scroller.destroy();
        }

        // Destroy each series
        i = series.length;
        while (i--) {
            series[i] = series[i].destroy() as any;
        }

        // ==== Destroy chart properties:
        [
            'title', 'subtitle', 'chartBackground', 'plotBackground',
            'plotBGImage', 'plotBorder', 'seriesGroup', 'clipRect', 'credits',
            'pointer', 'rangeSelector', 'legend', 'resetZoomButton', 'tooltip',
            'renderer'
        ].forEach(function (name: string): void {
            var prop = (chart as any)[name];

            if (prop && prop.destroy) {
                (chart as any)[name] = prop.destroy();
            }
        });

        // Remove container and all SVG, check container as it can break in IE
        // when destroyed before finished loading
        if (container) {
            container.innerHTML = '';
            removeEvent(container);
            if (parentNode) {
                discardElement(container);
            }

        }

        // clean it all up
        objectEach(chart, function (val: any, key: string): void {
            delete (chart as any)[key];
        });

    },

    /**
     * Prepare for first rendering after all data are loaded.
     *
     * @private
     * @function Highcharts.Chart#firstRender
     * @return {void}
     *
     * @fires Highcharts.Chart#event:beforeRender
     */
    firstRender: function (this: Highcharts.Chart): void {
        var chart = this,
            options = chart.options;

        // Hook for oldIE to check whether the chart is ready to render
        if (chart.isReadyToRender && !chart.isReadyToRender()) {
            return;
        }

        // Create the container
        chart.getContainer();

        chart.resetMargins();
        chart.setChartSize();

        // Set the common chart properties (mainly invert) from the given series
        chart.propFromSeries();

        // get axes
        chart.getAxes();

        // Initialize the series
        (isArray(options.series) ? (options.series as any) : []).forEach(
            // #9680
            function (serieOptions: Highcharts.SeriesOptions): void {
                chart.initSeries(serieOptions);
            }
        );

        chart.linkSeries();

        // Run an event after axes and series are initialized, but before
        // render. At this stage, the series data is indexed and cached in the
        // xData and yData arrays, so we can access those before rendering. Used
        // in Highstock.
        fireEvent(chart, 'beforeRender');

        // depends on inverted and on margins being set
        if (Pointer) {

            /**
             * The Pointer that keeps track of mouse and touch interaction.
             *
             * @memberof Highcharts.Chart
             * @name pointer
             * @type {Highcharts.Pointer}
             * @instance
             */
            chart.pointer = new Pointer(chart, options);
        }

        chart.render();

        // Fire the load event if there are no external images
        if (!chart.renderer.imgCount && chart.onload) {
            chart.onload();
        }

        // If the chart was rendered outside the top container, put it back in
        // (#3679)
        chart.temporaryDisplay(true);

    },

    /**
     * Internal function that runs on chart load, async if any images are loaded
     * in the chart. Runs the callbacks and triggers the `load` and `render`
     * events.
     *
     * @private
     * @function Highcharts.Chart#onload
     * @return {void}
     * @fires Highcharts.Chart#event:load
     * @fires Highcharts.Chart#event:render
     */
    onload: function (this: Highcharts.Chart): void {

        // Run callbacks, first the ones registered by modules, then user's one
        this.callbacks.concat([this.callback]).forEach(function (
            this: Highcharts.Chart,
            fn: Highcharts.ChartCallbackFunction
        ): void {
            // Chart destroyed in its own callback (#3600)
            if (fn && this.index !== undefined) {
                fn.apply(this, [this]);
            }
        }, this);

        fireEvent(this, 'load');
        fireEvent(this, 'render');


        // Set up auto resize, check for not destroyed (#6068)
        if (defined(this.index)) {
            this.setReflow((this.options.chart as any).reflow);
        }

        // Don't run again
        this.onload = null as any;
    }

}); // end Chart
