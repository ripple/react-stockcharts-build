var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import PropTypes from "prop-types";

import { isDefined, noop } from "../utils";

import { getValueFromOverride, terminate, saveNodeType, isHoverForInteractiveType } from "./utils";
import EachPriceCoordinate from "./wrapper/EachPriceCoordinate";
import HoverTextNearMouse from "./components/HoverTextNearMouse";

var InteractivePriceCoordinate = function (_Component) {
	_inherits(InteractivePriceCoordinate, _Component);

	function InteractivePriceCoordinate(props) {
		_classCallCheck(this, InteractivePriceCoordinate);

		var _this = _possibleConstructorReturn(this, (InteractivePriceCoordinate.__proto__ || Object.getPrototypeOf(InteractivePriceCoordinate)).call(this, props));

		_this.handleDrag = _this.handleDrag.bind(_this);
		_this.handleDragComplete = _this.handleDragComplete.bind(_this);
		_this.terminate = terminate.bind(_this);

		_this.saveNodeType = saveNodeType.bind(_this);
		_this.getSelectionState = isHoverForInteractiveType("alertList").bind(_this);

		_this.nodes = [];
		_this.state = {};
		return _this;
	}

	_createClass(InteractivePriceCoordinate, [{
		key: "handleDrag",
		value: function handleDrag(index, yValue) {
			this.setState({
				override: {
					index: index,
					yValue: yValue
				}
			});
		}
	}, {
		key: "handleDragComplete",
		value: function handleDragComplete(moreProps) {
			var _this2 = this;

			var override = this.state.override;

			if (isDefined(override)) {
				var alertList = this.props.alertList;

				var newAlertList = alertList.map(function (each, idx) {
					var selected = idx === override.index;
					return selected ? _extends({}, each, {
						yValue: override.yValue,
						selected: selected
					}) : _extends({}, each, {
						selected: selected
					});
				});
				var draggedAlert = newAlertList[override.index];
				this.setState({
					override: null
				}, function () {
					_this2.props.onDragComplete(newAlertList, moreProps, draggedAlert);
				});
			}
		}
	}, {
		key: "handleDrawLine",
		value: function handleDrawLine(xyValue) {
			var current = this.state.current;


			if (isDefined(current) && isDefined(current.start)) {
				this.setState({
					current: {
						start: current.start,
						end: xyValue
					}
				});
			}
		}
	}, {
		key: "render",
		value: function render() {
			var _this3 = this;

			var alertList = this.props.alertList;
			var override = this.state.override;

			return React.createElement(
				"g",
				null,
				alertList.map(function (each, idx) {
					var props = each;
					return React.createElement(EachPriceCoordinate, _extends({ key: idx,
						ref: _this3.saveNodeType(idx),
						index: idx
					}, props, {
						selected: each.selected,
						yValue: getValueFromOverride(override, idx, "yValue", each.yValue),

						onDrag: _this3.handleDrag,
						onDragComplete: _this3.handleDragComplete,
						edgeInteractiveCursor: "react-stockcharts-move-cursor"
					}));
				})
			);
		}
	}]);

	return InteractivePriceCoordinate;
}(Component);

InteractivePriceCoordinate.propTypes = {
	onChoosePosition: PropTypes.func.isRequired,
	onDragComplete: PropTypes.func.isRequired,
	onSelect: PropTypes.func,

	defaultPriceCoordinate: PropTypes.shape({
		bgFill: PropTypes.string.isRequired,
		bgOpacity: PropTypes.number.isRequired,
		textFill: PropTypes.string.isRequired,
		fontFamily: PropTypes.string.isRequired,
		fontWeight: PropTypes.string.isRequired,
		fontStyle: PropTypes.string.isRequired,
		fontSize: PropTypes.number.isRequired,
		text: PropTypes.string.isRequired
	}).isRequired,

	hoverText: PropTypes.object.isRequired,
	alertList: PropTypes.array.isRequired,
	enabled: PropTypes.bool.isRequired
};

InteractivePriceCoordinate.defaultProps = {
	onChoosePosition: noop,
	onDragComplete: noop,
	onSelect: noop,

	defaultPriceCoordinate: {
		bgFill: "#FFFFFF",
		bgOpacity: 1,
		textFill: "#F10040",
		fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		text: "Lorem ipsum..."
	},
	hoverText: _extends({}, HoverTextNearMouse.defaultProps, {
		enable: true,
		bgHeight: 18,
		bgWidth: 175,
		text: "Click and drag the edge circles"
	}),
	alertList: []
};

InteractivePriceCoordinate.contextTypes = {
	subscribe: PropTypes.func.isRequired,
	unsubscribe: PropTypes.func.isRequired,
	generateSubscriptionId: PropTypes.func.isRequired,
	chartId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
};

export default InteractivePriceCoordinate;
//# sourceMappingURL=InteractivePriceCoordinate.js.map