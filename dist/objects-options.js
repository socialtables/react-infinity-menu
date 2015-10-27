"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _immutable = require("immutable");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

/*
 *  @class ObjectsOptions
 *  @description content of Objects section in menu drawer
 */

var ObjectsOptions = (function (_React$Component) {
	_inherits(ObjectsOptions, _React$Component);

	/*
  *  @constructs ObjectsOptions
  */

	function ObjectsOptions(props) {
		_classCallCheck(this, ObjectsOptions);

		_get(Object.getPrototypeOf(ObjectsOptions.prototype), "constructor", this).call(this, props);
		this.state = {
			search: {
				isSearching: false,
				searchInput: ""
			}
		};
		this.setSearchInput = this.setSearchInput.bind(this);
		this.stopSearching = this.stopSearching.bind(this);
		this.startSearching = this.startSearching.bind(this);
	}

	/*
  *	@function onFolderClicked
  *	@description open or close folder
  *
  *	@param {string} folder - key name of folder object
  */

	_createClass(ObjectsOptions, [{
		key: "onFolderClicked",
		value: function onFolderClicked(folderTree, folder, keyPath, event) {
			event.preventDefault();
			if (!this.state.search.isSearching || !this.state.search.searchInput.length) {
				var newFolder = folder.set("isOpen", !folder.get("isOpen"));
				var newFolders = folderTree.setIn(keyPath, newFolder);
				if (this.props.onNodeMouseClick) {
					var currLevel = Math.floor(keyPath.length / 2);
					this.props.onNodeMouseClick(event, newFolders.toJS(), newFolder.toJS(), currLevel);
				}
			}
		}

		/*
   *	@function shouldComponentUpdate
   *	@description check for edge cases with filtering that can cause loops
   *
   *	@param {object} nextProps - next props to be fed into this component
   *	@param {object} nextState - next state based on user interactions
   *
   *	@returns {boolean} true if something changed based on user interaction
   */
	}, {
		key: "shouldComponentUpdate",
		value: function shouldComponentUpdate(nextProps, nextState) {
			if (this.props.tree !== nextProps.tree) {
				return true;
			}

			if (this.state.search.isSearching && this.state.search.isSearching === nextState.search.isSearching && this.state.search.searchInput === nextState.search.searchInput) {
				return false;
			}
			return true;
		}

		/*
   *	@function startSearching
   *	@description when not searching and search icon clicked, set state to start
   */
	}, {
		key: "startSearching",
		value: function startSearching() {
			this.setState({
				search: {
					isSearching: true,
					searchInput: ""
				}
			});
		}

		/*
   *	@function stopSearching
   *	@description when searching and close icon clicked, set state to stop
   */
	}, {
		key: "stopSearching",
		value: function stopSearching() {
			this.setState({
				search: {
					isSearching: false,
					searchInput: ""
				}
			});
		}

		/*
   *	@function setSearchInput
   *	@description when user types in search input, set phrase in state for filter
   */
	}, {
		key: "setSearchInput",
		value: function setSearchInput(event) {
			this.setState({
				search: {
					isSearching: true,
					searchInput: event.target.value
				}
			});
		}
	}, {
		key: "findFilted",
		value: function findFilted(folders, folder, key) {
			var _this = this;

			if (!folder.get("children")) {
				if (folder.get("name").toLowerCase().includes(this.state.search.searchInput.toLowerCase())) {
					return folders.set(key, folder);
				} else {
					return folders;
				}
			} else {
				var filteredSubFolder = folder.get("children").size ? folder.get("children").reduce(function (p, c, k) {
					return _this.findFilted(p, c, k);
				}, (0, _immutable.OrderedMap)()) : (0, _immutable.OrderedMap)();
				if (filteredSubFolder.size !== 0) {
					return folders.set(key, folder.set("isOpen", true).set("children", filteredSubFolder));
				} else {
					return folders;
				}
			}
		}
	}, {
		key: "setDisplayFolders",
		value: function setDisplayFolders(folderTree, prevs, curr, keyPath) {
			var _this2 = this;

			var currLevel = Math.floor(keyPath / 2);
			/*the leaves*/
			if (!curr.get("children")) {
				var itemKey = "objects-options-leaf-" + curr.get("id");
				if (curr.get("customComponent")) {
					var componentProps = {
						key: itemKey,
						onMouseDown: this.props.onLeafMouseDown,
						onMouseUp: this.props.onLeafMouseUp,
						onClick: this.props.onLeafMouseClick,
						name: curr.get("name"),
						icon: curr.get("icon"),
						data: curr
					};
					prevs.push(_react2["default"].createElement(curr.get("customComponent"), componentProps));
				} else {
					prevs.push(_react2["default"].createElement(
						"li",
						{ key: itemKey,
							className: "infinity-menu-leaf-container",
							onMouseDown: function (e) {
								return _this2.props.onLeafMouseDown ? _this2.props.onLeafMouseDown(e, curr) : null;
							},
							onMouseUp: function (e) {
								return _this2.props.onLeafMouseUp ? _this2.props.onLeafMouseUp(e, curr) : null;
							},
							onClick: function (e) {
								return _this2.props.onLeafMouseClick ? _this2.props.onLeafMouseClick(e, curr) : null;
							}
						},
						_react2["default"].createElement(
							"span",
							null,
							curr.get("name")
						)
					));
				}
				return prevs;
			}
			/*the node*/
			else {
					var key = "object-options-node-" + currLevel + "-" + curr.get("id");
					var folderName = curr.get("name");
					if (!curr.get("isOpen")) {
						if (curr.get("customComponent")) {
							var folderProps = {
								onClick: this.onFolderClicked.bind(this, folderTree, curr, keyPath),
								name: folderName,
								isOpen: curr.get("isOpen"),
								isSearching: false,
								key: key
							};
							prevs.push(_react2["default"].createElement(curr.get("customComponent"), folderProps));
						} else {
							prevs.push(_react2["default"].createElement(
								"div",
								{ key: key,
									onClick: this.onFolderClicked.bind(this, folderTree, curr, keyPath),
									className: "infinity-menu-node-container"
								},
								_react2["default"].createElement(
									"label",
									null,
									folderName
								)
							));
						}
						return prevs;
					} else {
						var openedFolder = [];
						var isSearching = this.state.search.isSearching && this.state.search.searchInput.length;
						var icon = isSearching ? "" : _react2["default"].createElement("i", { className: "st-icon st-icon-down" });

						/*unname folder is not showing as parent*/
						var isDefault = curr.get("name") === "";
						if (!isDefault) {
							if (curr.get("customComponent")) {
								var folderProps = {
									onClick: this.onFolderClicked.bind(this, folderTree, curr, keyPath),
									name: folderName,
									isOpen: curr.get("isOpen"),
									key: key,
									isSearching: isSearching
								};
								openedFolder.push(_react2["default"].createElement(curr.get("customComponent"), folderProps));
							} else {
								openedFolder.push(_react2["default"].createElement(
									"div",
									{ key: key,
										onClick: this.onFolderClicked.bind(this, folderTree, curr, keyPath),
										className: "infinity-menu-node-container"
									},
									_react2["default"].createElement(
										"label",
										null,
										folderName
									),
									icon
								));
							}
						}

						var floorElementsLIs = curr.get("children").size ? curr.get("children").reduce(function (p, c, k) {
							if (c === undefined || k === undefined) {
								return p;
							}
							var newKeyPath = [].concat(keyPath).concat(["children", k]);
							return _this2.setDisplayFolders(folderTree, p, c, newKeyPath);
						}, []) : [];

						if (floorElementsLIs.length > 0) {
							openedFolder.push(_react2["default"].createElement(
								"ul",
								{ key: "objects-folder-list" + currLevel },
								floorElementsLIs
							));
						}
						prevs.push(openedFolder);
						return prevs;
					}
				}
		}

		/*
   *  @function render
   *  @description React render method for creating objects menu drawer content
   */
	}, {
		key: "render",
		value: function render() {
			var _this3 = this;

			var folderTree = (0, _immutable.fromJS)(this.props.tree);
			/*find filtered folders base on search, if there no search, return all*/
			var filteredFolders = this.state.search.isSearching && this.state.search.searchInput.length ? folderTree.reduce(function (folders, folder, key) {
				if (key === undefined) {
					return folders;
				}
				return _this3.findFilted(folders, folder, key);
			}, (0, _immutable.OrderedMap)()) : folderTree;

			var displayFolders = filteredFolders.reduce(function (folders, folder, key) {
				if (key === undefined) {
					return folders;
				}
				return _this3.setDisplayFolders(folderTree, folders, folder, [key]);
			}, []);

			var headerProps = {
				isSearching: this.state.search.isSearching,
				searchInput: this.state.search.searchInput,
				setSearchInput: this.setSearchInput,
				stopSearching: this.stopSearching,
				startSearching: this.startSearching,
				onClose: this.props.onClose
			};
			var headerContent = this.props.headerContent ? _react2["default"].createElement(this.props.headerContent, headerProps) : null;

			return _react2["default"].createElement(
				"div",
				{ className: "infinity-menu-container" },
				headerContent,
				displayFolders
			);
		}
	}]);

	return ObjectsOptions;
})(_react2["default"].Component);

exports["default"] = ObjectsOptions;

ObjectsOptions.propTypes = {
	tree: _react2["default"].PropTypes.array,
	onNodeMouseClick: _react2["default"].PropTypes.func,
	onLeafMouseClick: _react2["default"].PropTypes.func,
	onLeafMouseDown: _react2["default"].PropTypes.func,
	onLeafMouseUp: _react2["default"].PropTypes.func,
	onClose: _react2["default"].PropTypes.func
};

ObjectsOptions.defaultProps = {
	tree: [],
	onNodeMouseClick: function onNodeMouseClick() {},
	onLeafMouseClick: function onLeafMouseClick() {},
	onLeafMouseDown: function onLeafMouseDown() {},
	onLeafMouseUp: function onLeafMouseUp() {},
	onClose: function onClose() {}
};
module.exports = exports["default"];