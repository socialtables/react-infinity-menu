import React from "react";
import NestedObjects from "nested-objects";
import dcopy from "deep-copy";
/*
 *  @class InfinityMenu
 */
export default class InfinityMenu extends React.Component {
	/*
	 *  @constructs InfinityMenu
	 */
	constructor(props) {
		super(props);
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
	 *	@function onNodeClick
	 *	@description open or close folder
	 *
	 *	@param {string} folder - key name of folder object
	 */
	onNodeClick(tree, node, keyPath, event) {
		event.preventDefault();
		if (!this.state.search.isSearching || !this.state.search.searchInput.length) {
			node.isOpen = !node.isOpen;
			NestedObjects.set(tree, keyPath, node);
			if (this.props.onNodeMouseClick) {
				const currLevel = Math.floor(keyPath.length / 2);
				this.props.onNodeMouseClick(event, tree, node, currLevel);
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
	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.tree !== nextProps.tree) {
			return true;
		}

		if (this.state.search.isSearching &&
			this.state.search.isSearching === nextState.search.isSearching &&
			this.state.search.searchInput === nextState.search.searchInput) {
			return false;
		}
		return true;
	}
	/*
	 *	@function startSearching
	 *	@description when not searching and search icon clicked, set state to start
	 */
	startSearching() {
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
	stopSearching() {
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
	setSearchInput(event) {
		this.setState({
			search: {
				isSearching: true,
				searchInput: event.target.value
			}
		});
	}

	findFilted(trees, node, key) {
		if (!node.children) {
			if (node.name.toLowerCase().includes(this.state.search.searchInput.toLowerCase())) {
				trees[key] = node;
				return trees;
			}
			else {
				return trees;
			}
		}
		else {
			const filteredSubFolder = node.children.length ? node.children.reduce((p, c, k) => {
				return this.findFilted(p, c, k);
			}, []) : [];
			if (filteredSubFolder.length !== 0) {
				node.isOpen = true;
				node.children = filteredSubFolder;
				trees[key] = node;
				return trees;
			}
			else {
				return trees;
			}
		}
	}

	/*
	 *	@function setDisplayTree
	 *	@description recursive go through the tree and set the render tree
	 *
	 *	@param {array} tree - whole tree
	 *	@param {array} prevs - the whole rendering array
	 *	@param {object} curr - current node/leaf
	 *	@param {string} keyPath - the path to current node/leaf, e.g.  "0.children.1"
	 */
	setDisplayTree(tree, prevs, curr, keyPath) {
		const currLevel = Math.floor(keyPath.length / 2);
		/*the leaves*/
		if (!curr.children) {
			const itemKey = "infinity-menu-leaf-" + curr.id;
			if (curr.customComponent) {
				const componentProps = {
					key: itemKey,
					onMouseDown: this.props.onLeafMouseDown,
					onMouseUp: this.props.onLeafMouseUp,
					onClick: this.props.onLeafMouseClick,
					name: curr.name,
					icon: curr.icon,
					data: curr
				};
				prevs.push(React.createElement(curr.customComponent, componentProps));
			}
			else {
				prevs.push(
					<li key={itemKey}
						className="infinity-menu-leaf-container"
						onMouseDown={(e) => this.props.onLeafMouseDown ? this.props.onLeafMouseDown(e, curr) : null}
						onMouseUp={(e) => this.props.onLeafMouseUp ? this.props.onLeafMouseUp(e, curr) : null}
						onClick={(e) => this.props.onLeafMouseClick ? this.props.onLeafMouseClick(e, curr) : null}
						>
						<span>{curr.name}</span>
					</li>
				);
			}
			return prevs;
		}
		/*the node*/
		else {
			const key = "infinity-menu-node-" + currLevel + "-" + curr.id;
			const nodeName = curr.name;
			if (!curr.isOpen) {
				if (curr.customComponent) {
					const nodeProps = {
						onClick: this.onNodeClick.bind(this, tree, curr, keyPath),
						name: nodeName,
						isOpen: curr.isOpen,
						isSearching: false,
						data: curr,
						key
					};
					prevs.push(React.createElement(curr.customComponent, nodeProps));
				}
				else {
					prevs.push(
						<div key={key}
							onClick={this.onNodeClick.bind(this, tree, curr, keyPath)}
							className="infinity-menu-node-container"
						>
							<label>{nodeName}</label>
						</div>
					);
				}
				return prevs;
			}
			else {
				let openedNode = [];
				const isSearching = this.state.search.isSearching && this.state.search.searchInput.length;

				if (curr.customComponent) {
					const nodeProps = {
						onClick: this.onNodeClick.bind(this, tree, curr, keyPath),
						name: nodeName,
						isOpen: curr.isOpen,
						data: curr,
						key,
						isSearching
					};
					openedNode.push(React.createElement(curr.customComponent, nodeProps));
				}
				else {
					openedNode.push(
						<div key={key}
							onClick={this.onNodeClick.bind(this, tree, curr, keyPath)}
							className="infinity-menu-node-container"
						>
							<label>{nodeName}</label>
						</div>
					);
				}

				const childrenList = curr.children.length ? curr.children.reduce((p, c, k) => {
					if (c === undefined || k === undefined) {
						return p;
					}
					return this.setDisplayTree(tree, p, c, keyPath + ".children." + k);
				}, []) : [];


				if (childrenList.length > 0) {
					openedNode.push(
						<ul key={"infinity-menu-children-list" + currLevel}>
							{childrenList}
						</ul>
					);
				}
				prevs.push(openedNode);
				return prevs;
			}
		}
	}
	/*
	 *  @function render
	 *  @description React render method for creating infinity menu
	 */
	render() {
		const tree = dcopy(this.props.tree);

		/*find filtered folders base on search, if there no search, return all*/
		const filteredTree = this.state.search.isSearching && this.state.search.searchInput.length ? tree.reduce((prev, curr, key) => {
			if (key === undefined) {
				return prev;
			}
			return this.findFilted(prev, curr, key);
		}, []) : tree;


		/*recursive go through the tree*/
		const displayTree = filteredTree.reduce((prev, curr, key) => {
			if (key === undefined) {
				return prev;
			}
			return this.setDisplayTree(tree, prev, curr, key.toString());
		}, []);

		/*header component*/
		const headerProps = {
			isSearching: this.state.search.isSearching,
			searchInput: this.state.search.searchInput,
			setSearchInput: this.setSearchInput,
			stopSearching: this.stopSearching,
			startSearching: this.startSearching,
			onClose: this.props.onClose,
				...this.props.headerProps
		};
		const headerContent = this.props.headerContent ? React.createElement(this.props.headerContent, headerProps) : null;

		return (
			<div className="infinity-menu-container">
				{headerContent}
				{displayTree}
			</div>
		);
	}
}

InfinityMenu.propTypes = {
	tree: React.PropTypes.array,
	headerProps: React.PropTypes.object,
	onNodeMouseClick: React.PropTypes.func,
	onLeafMouseClick: React.PropTypes.func,
	onLeafMouseDown: React.PropTypes.func,
	onLeafMouseUp: React.PropTypes.func,
	onClose: React.PropTypes.func
};

InfinityMenu.defaultProps = {
	tree: [],
	headerProps: null,
	onNodeMouseClick: ()=>{},
	onLeafMouseClick: ()=>{},
	onLeafMouseDown: ()=>{},
	onLeafMouseUp: ()=>{},
	onClose: ()=>{}
};
