"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3Shape = require("d3-shape");

var _GenericChartComponent = require("../GenericChartComponent");

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _GenericComponent = require("../GenericComponent");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AreaOnlySeries = function (_Component) {
	_inherits(AreaOnlySeries, _Component);

	function AreaOnlySeries(props) {
		_classCallCheck(this, AreaOnlySeries);

		var _this = _possibleConstructorReturn(this, (AreaOnlySeries.__proto__ || Object.getPrototypeOf(AreaOnlySeries)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		_this.drawOnCanvas = _this.drawOnCanvas.bind(_this);
		return _this;
	}

	_createClass(AreaOnlySeries, [{
		key: "drawOnCanvas",
		value: function drawOnCanvas(ctx, moreProps) {
			var _props = this.props,
			    yAccessor = _props.yAccessor,
			    defined = _props.defined,
			    base = _props.base;
			var _props2 = this.props,
			    fill = _props2.fill,
			    stroke = _props2.stroke,
			    opacity = _props2.opacity;
			var xScale = moreProps.xScale,
			    yScale = moreProps.chartConfig.yScale,
			    plotData = moreProps.plotData,
			    xAccessor = moreProps.xAccessor;


			var newBase = (0, _utils.functor)(base);

			ctx.fillStyle = (0, _utils.hexToRGBA)(fill, opacity);
			ctx.strokeStyle = stroke;

			var points0 = [],
			    points1 = [];

			for (var i = 0; i < plotData.length; i++) {
				var d = plotData[i];
				if (defined(yAccessor(d), i)) {
					var _ref = [xScale(xAccessor(d)), yScale(yAccessor(d)), newBase(yScale, d, moreProps)],
					    x = _ref[0],
					    y1 = _ref[1],
					    y0 = _ref[2];


					points0.push([x, y0]);
					points1.push([x, y1]);
				} else if (points0.length) {
					segment(points0, points1, ctx);
					points0 = [];
					points1 = [];
				}
			}
			if (points0.length) segment(points0, points1, ctx);
		}
	}, {
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var _props3 = this.props,
			    yAccessor = _props3.yAccessor,
			    defined = _props3.defined,
			    base = _props3.base;
			var _props4 = this.props,
			    stroke = _props4.stroke,
			    fill = _props4.fill,
			    className = _props4.className,
			    opacity = _props4.opacity;
			var xScale = moreProps.xScale,
			    yScale = moreProps.chartConfig.yScale,
			    plotData = moreProps.plotData,
			    xAccessor = moreProps.xAccessor;


			var newBase = (0, _utils.functor)(base);
			var areaSeries = (0, _d3Shape.area)().defined(function (d) {
				return defined(yAccessor(d));
			}).x(function (d) {
				return xScale(xAccessor(d));
			}).y0(function (d) {
				return newBase(yScale, d, moreProps);
			}).y1(function (d) {
				return yScale(yAccessor(d));
			});

			var d = areaSeries(plotData);
			var newClassName = className.concat((0, _utils.isDefined)(stroke) ? "" : " line-stroke");
			return _react2.default.createElement("path", { d: d, stroke: stroke, fill: fill, className: newClassName, opacity: opacity });
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(_GenericChartComponent2.default, {
				svgDraw: this.renderSVG,
				canvasDraw: this.drawOnCanvas,
				canvasToDraw: _GenericComponent.getAxisCanvas,
				drawOn: ["pan"]
			});
		}
	}]);

	return AreaOnlySeries;
}(_react.Component);

AreaOnlySeries.propTypes = {
	className: _propTypes2.default.string,
	yAccessor: _propTypes2.default.func.isRequired,
	stroke: _propTypes2.default.string,
	fill: _propTypes2.default.string,
	opacity: _propTypes2.default.number,
	defined: _propTypes2.default.func,
	base: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.number])
};

AreaOnlySeries.defaultProps = {
	className: "line ",
	fill: "none",
	opacity: 1,
	defined: function defined(d) {
		return !isNaN(d);
	},
	base: function base(yScale /* , d, moreProps */) {
		return (0, _utils.first)(yScale.range());
	}
};

function segment(points0, points1, ctx) {
	ctx.beginPath();

	var _first = (0, _utils.first)(points0),
	    _first2 = _slicedToArray(_first, 2),
	    x0 = _first2[0],
	    y0 = _first2[1];

	ctx.moveTo(x0, y0);

	var i = void 0;
	for (i = 0; i < points1.length; i++) {
		var _points1$i = _slicedToArray(points1[i], 2),
		    x1 = _points1$i[0],
		    y1 = _points1$i[1];

		ctx.lineTo(x1, y1);
	}

	for (i = points0.length - 1; i >= 0; i--) {
		var _points0$i = _slicedToArray(points0[i], 2),
		    _x = _points0$i[0],
		    _y = _points0$i[1];

		ctx.lineTo(_x, _y);
	}
	ctx.closePath();
	ctx.fill();
}

exports.default = AreaOnlySeries;
//# sourceMappingURL=AreaOnlySeries.js.map