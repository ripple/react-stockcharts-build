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

var _GenericChartComponent = require("../../GenericChartComponent");

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _GenericComponent = require("../../GenericComponent");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InteractivePriceCoordinate = function (_Component) {
	_inherits(InteractivePriceCoordinate, _Component);

	function InteractivePriceCoordinate(props) {
		_classCallCheck(this, InteractivePriceCoordinate);

		var _this = _possibleConstructorReturn(this, (InteractivePriceCoordinate.__proto__ || Object.getPrototypeOf(InteractivePriceCoordinate)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		_this.drawOnCanvas = _this.drawOnCanvas.bind(_this);
		_this.isHover = _this.isHover.bind(_this);
		return _this;
	}

	_createClass(InteractivePriceCoordinate, [{
		key: "isHover",
		value: function isHover(moreProps) {
			var _props = this.props,
			    onHover = _props.onHover,
			    selected = _props.selected;


			if ((0, _utils.isDefined)(onHover)) {
				var _helper = helper(this.props, moreProps),
				    x1 = _helper.x1,
				    x2 = _helper.x2,
				    y = _helper.y,
				    rect = _helper.rect;

				var _moreProps$mouseXY = _slicedToArray(moreProps.mouseXY, 2),
				    mouseX = _moreProps$mouseXY[0],
				    mouseY = _moreProps$mouseXY[1];

				if (selected && mouseX >= rect.x && mouseX <= rect.x + rect.width && mouseY >= rect.y && mouseY <= rect.y + rect.height) {
					return true;
				}
				if (x1 <= mouseX && x2 >= mouseX && Math.abs(mouseY - y) < 4) {
					return true;
				}
			}
			return false;
		}
	}, {
		key: "drawOnCanvas",
		value: function drawOnCanvas(ctx, moreProps) {
			var _props2 = this.props,
			    bgFill = _props2.bgFill,
			    bgOpacity = _props2.bgOpacity,
			    textFill = _props2.textFill,
			    fontFamily = _props2.fontFamily,
			    fontSize = _props2.fontSize,
			    fontStyle = _props2.fontStyle,
			    fontWeight = _props2.fontWeight;
			var _props3 = this.props,
			    selected = _props3.selected,
			    hovering = _props3.hovering;

			var _helper2 = helper(this.props, moreProps),
			    x1 = _helper2.x1,
			    x2 = _helper2.x2,
			    y = _helper2.y,
			    rect = _helper2.rect;

			ctx.fillStyle = (0, _utils.hexToRGBA)(bgFill, bgOpacity);
			ctx.strokeStyle = textFill;

			ctx.beginPath();
			if (selected || hovering) {
				ctx.lineWidth = 2;
				ctx.setLineDash((0, _utils.getStrokeDasharrayCanvas)("LongDash"));
				ctx.moveTo(x1, y);
				ctx.lineTo(rect.x, y);

				ctx.moveTo(rect.x + rect.width, y);
				ctx.lineTo(x2, y);
				ctx.stroke();

				ctx.setLineDash([]);
				ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
				ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);

				ctx.fillStyle = textFill;
				ctx.textBaseline = "middle";
				ctx.textAlign = "start";
				ctx.font = fontStyle + " " + fontWeight + " " + fontSize + "px " + fontFamily;
				ctx.beginPath();
				ctx.fillText("Alert", rect.x + 10, y);
			} else {
				ctx.setLineDash((0, _utils.getStrokeDasharrayCanvas)("ShortDash"));
				ctx.moveTo(x1, y);
				ctx.lineTo(x2, y);
				ctx.stroke();
			}
		}
	}, {
		key: "renderSVG",
		value: function renderSVG() {
			throw new Error("svg not implemented");
		}
	}, {
		key: "render",
		value: function render() {
			var _props4 = this.props,
			    selected = _props4.selected,
			    interactiveCursorClass = _props4.interactiveCursorClass;
			var _props5 = this.props,
			    onHover = _props5.onHover,
			    onUnHover = _props5.onUnHover;
			var _props6 = this.props,
			    onDragStart = _props6.onDragStart,
			    onDrag = _props6.onDrag,
			    onDragComplete = _props6.onDragComplete;


			return _react2.default.createElement(_GenericChartComponent2.default, {
				isHover: this.isHover,

				svgDraw: this.renderSVG,
				canvasToDraw: _GenericComponent.getMouseCanvas,
				canvasDraw: this.drawOnCanvas,

				interactiveCursorClass: interactiveCursorClass,
				selected: selected,
				enableDragOnHover: true,

				onDragStart: onDragStart,
				onDrag: onDrag,
				onDragComplete: onDragComplete,
				onHover: onHover,
				onUnHover: onUnHover,

				drawOn: ["mousemove", "mouseleave", "pan", "drag"]
			});
		}
	}]);

	return InteractivePriceCoordinate;
}(_react.Component);

function helper(props, moreProps) {
	var yValue = props.yValue;
	var _moreProps$chartConfi = moreProps.chartConfig,
	    width = _moreProps$chartConfi.width,
	    yScale = _moreProps$chartConfi.yScale;


	var y = Math.round(yScale(yValue));
	var height = 24;
	var rect = {
		x: 20,
		y: y - height / 2,
		width: 80,
		height: height
	};
	return {
		x1: 0,
		x2: width,
		y: y,
		rect: rect
	};
}

InteractivePriceCoordinate.propTypes = {
	bgFill: _propTypes2.default.string.isRequired,
	bgOpacity: _propTypes2.default.number.isRequired,

	textFill: _propTypes2.default.string.isRequired,
	fontFamily: _propTypes2.default.string.isRequired,
	fontSize: _propTypes2.default.number.isRequired,
	fontWeight: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,
	fontStyle: _propTypes2.default.string.isRequired,

	text: _propTypes2.default.string.isRequired,

	onDragStart: _propTypes2.default.func.isRequired,
	onDrag: _propTypes2.default.func.isRequired,
	onDragComplete: _propTypes2.default.func.isRequired,
	onHover: _propTypes2.default.func,
	onUnHover: _propTypes2.default.func,

	defaultClassName: _propTypes2.default.string,
	interactiveCursorClass: _propTypes2.default.string,

	tolerance: _propTypes2.default.number.isRequired,
	selected: _propTypes2.default.bool.isRequired,
	hovering: _propTypes2.default.bool.isRequired
};

InteractivePriceCoordinate.defaultProps = {
	onDragStart: _utils.noop,
	onDrag: _utils.noop,
	onDragComplete: _utils.noop,

	type: "SD", // standard dev
	fontWeight: "normal", // standard dev

	strokeWidth: 1,
	tolerance: 4,
	selected: false,
	hovering: false
};

exports.default = InteractivePriceCoordinate;
//# sourceMappingURL=InteractivePriceCoordinate.js.map