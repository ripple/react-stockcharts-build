"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _GenericComponent = require("../GenericComponent");

var _GenericComponent2 = _interopRequireDefault(_GenericComponent);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CrossHairCursor = function (_Component) {
	_inherits(CrossHairCursor, _Component);

	function CrossHairCursor(props) {
		_classCallCheck(this, CrossHairCursor);

		var _this = _possibleConstructorReturn(this, (CrossHairCursor.__proto__ || Object.getPrototypeOf(CrossHairCursor)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		_this.drawOnCanvas = _this.drawOnCanvas.bind(_this);
		return _this;
	}

	_createClass(CrossHairCursor, [{
		key: "drawOnCanvas",
		value: function drawOnCanvas(ctx, moreProps) {
			var _props = this.props,
			    dotRadius = _props.dotRadius,
			    dotFill = _props.dotFill,
			    dotStroke = _props.dotStroke,
			    dotStrokeWidth = _props.dotStrokeWidth;

			var lines = helper(this.props, moreProps);
			if ((0, _utils.isDefined)(lines)) {
				var _context = this.context,
				    margin = _context.margin,
				    ratio = _context.ratio;

				var originX = 0.5 * ratio + margin.left;
				var originY = 0.5 * ratio + margin.top;

				ctx.save();
				ctx.setTransform(1, 0, 0, 1, 0, 0);
				ctx.scale(ratio, ratio);

				ctx.translate(originX, originY);

				lines.forEach(function (line) {
					var dashArray = (0, _utils.getStrokeDasharray)(line.strokeDasharray).split(",").map(function (d) {
						return +d;
					});

					ctx.lineWidth = line.strokeWidth;
					ctx.strokeStyle = (0, _utils.hexToRGBA)(line.stroke, line.opacity);
					ctx.setLineDash(dashArray);
					ctx.beginPath();
					ctx.moveTo(line.x1, line.y1);
					ctx.lineTo(line.x2, line.y2);
					ctx.stroke();
				});

				ctx.beginPath();
				ctx.arc(lines[1].x1, lines[0].y1, dotRadius, 0, 2 * Math.PI, false);
				ctx.fillStyle = (0, _utils.hexToRGBA)(dotFill, 1);
				ctx.fill();
				ctx.lineWidth = dotStrokeWidth;
				ctx.strokeStyle = (0, _utils.hexToRGBA)(dotStroke, 1);
				ctx.stroke();
				ctx.restore();
			}
		}
	}, {
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var className = this.props.className;

			var lines = helper(this.props, moreProps);

			if ((0, _utils.isNotDefined)(lines)) return null;

			return _react2.default.createElement(
				"g",
				{ className: "react-stockcharts-crosshair " + className },
				lines.map(function (_ref, idx) {
					var strokeDasharray = _ref.strokeDasharray,
					    rest = _objectWithoutProperties(_ref, ["strokeDasharray"]);

					return _react2.default.createElement("line", _extends({
						key: idx,
						strokeDasharray: (0, _utils.getStrokeDasharray)(strokeDasharray)
					}, rest));
				})
			);
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(_GenericComponent2.default, {
				svgDraw: this.renderSVG,
				clip: false,
				canvasDraw: this.drawOnCanvas,
				canvasToDraw: _GenericComponent.getMouseCanvas,
				drawOn: ["mousemove", "pan", "drag"]
			});
		}
	}]);

	return CrossHairCursor;
}(_react.Component);

CrossHairCursor.propTypes = {
	className: _propTypes2.default.string,
	strokeDasharray: _propTypes2.default.oneOf(_utils.strokeDashTypes),
	yAccessor: _propTypes2.default.func
};

CrossHairCursor.contextTypes = {
	margin: _propTypes2.default.object.isRequired,
	ratio: _propTypes2.default.number.isRequired
	// xScale for getting update event upon pan end, this is needed to get past the PureComponent shouldComponentUpdate
	// xScale: PropTypes.func.isRequired,
};

function customX(props, moreProps) {
	var xScale = moreProps.xScale,
	    xAccessor = moreProps.xAccessor,
	    currentItem = moreProps.currentItem,
	    mouseXY = moreProps.mouseXY;
	var snapX = props.snapX;

	var x = snapX ? Math.round(xScale(xAccessor(currentItem))) : mouseXY[0];
	return x;
}

function customY(props, moreProps) {
	var yScale = moreProps.chartConfig.yScale,
	    currentItem = moreProps.currentItem,
	    mouseXY = moreProps.mouseXY;
	var snapY = props.snapY,
	    yAccessor = props.yAccessor;

	var y = snapY ? Math.round(yScale(yAccessor(currentItem))) : mouseXY[1];
	return y;
}

CrossHairCursor.defaultProps = {
	strokeX: "#666666",
	strokeY: "#666666",
	strokeWidthX: 1,
	strokeWidthY: 1,
	dotFill: "#666666",
	dotRadius: 0.0,
	dotStroke: "#666666",
	dotStrokeWidth: 0.0,
	opacity: 0.3,
	strokeDasharray: "ShortDash",
	snapX: true,
	snapY: false,
	customX: customX,
	customY: customY
};

function helper(props, moreProps) {
	var mouseXY = moreProps.mouseXY,
	    currentItem = moreProps.currentItem,
	    show = moreProps.show,
	    height = moreProps.height,
	    width = moreProps.width;
	var customX = props.customX,
	    customY = props.customY,
	    strokeX = props.strokeX,
	    strokeY = props.strokeY,
	    strokeWidthX = props.strokeWidthX,
	    strokeWidthY = props.strokeWidthY,
	    opacity = props.opacity,
	    strokeDasharray = props.strokeDasharray;


	if (!show || (0, _utils.isNotDefined)(currentItem)) return null;

	var x = customX(props, moreProps);
	var y = customY(props, moreProps);

	var line1 = {
		x1: 0,
		x2: width,
		y1: y,
		y2: y,
		stroke: strokeY,
		strokeWidth: strokeWidthY,
		strokeDasharray: strokeDasharray, opacity: opacity
	};

	var line2 = {
		x1: x,
		x2: x,
		y1: 0,
		y2: height,
		stroke: strokeX,
		strokeWidth: strokeWidthX,
		strokeDasharray: strokeDasharray, opacity: opacity
	};
	return [line1, line2];
}

exports.default = CrossHairCursor;
//# sourceMappingURL=CrossHairCursor.js.map