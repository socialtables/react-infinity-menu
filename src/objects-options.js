import { OrderedMap, fromJS } from "immutable";
import React from "react";

/*
 *  @class ObjectsOptions
 *  @description content of Objects section in menu drawer
 */
export default class ObjectsOptions extends React.Component {
	/*
	 *  @constructs ObjectsOptions
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
	 *	@function onFolderClicked
	 *	@description open or close folder
	 *
	 *	@param {string} folder - key name of folder object
	 */
	onFolderClicked(folderTree, folder, keyPath, event) {
		event.preventDefault();
		if (!this.state.search.isSearching || !this.state.search.searchInput.length) {
			const newFolder = folder.set("isOpen", !folder.get("isOpen"));
			const newFolders = folderTree.setIn(keyPath, newFolder);
			if (this.props.onNodeMouseClick) {
				const currLevel = Math.floor(keyPath.length / 2);
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

	findFilted(folders, folder, key) {
		if (!folder.get("children")) {
			if (folder.get("name").toLowerCase().includes(this.state.search.searchInput.toLowerCase())) {
				return folders.set(key, folder);
			}
			else {
				return folders;
			}
		}
		else {
			const filteredSubFolder = folder.get("children").size ? folder.get("children").reduce((p, c, k) => {
				return this.findFilted(p, c, k);
			}, OrderedMap()) : OrderedMap();
			if (filteredSubFolder.size !== 0) {
				return folders.set(key, folder.set("isOpen", true).set("children", filteredSubFolder));
			}
			else {
				return folders;
			}
		}
	}

	setDisplayFolders(folderTree, prevs, curr, keyPath) {
		const currLevel = Math.floor(keyPath / 2);
		/*the leaves*/
		if (!curr.get("children")) {
			const itemKey = "objects-options-leaf-" + curr.get("id");
			if (curr.get("customComponent")) {
				const componentProps = {
					key: itemKey,
					onLeafMouseDown: this.props.onLeafMouseDown,
					onLeafMouseUp: this.props.onLeafMouseUp,
					onLeafMouseClick: this.props.onLeafMouseClick,
					name: curr.get("name"),
					icon: curr.get("icon"),
					data: curr
				};
				prevs.push(React.createElement(curr.get("customComponent"), componentProps));
			}
			else {
				prevs.push(
					<li key={itemKey}
						className="infinity-menu-leaf-container"
						onMouseDown={(e) => this.props.onLeafMouseDown ? this.props.onLeafMouseDown(e, curr) : null}
						onMouseUp={(e) => this.props.onLeafMouseUp ? this.props.onLeafMouseUp(e, curr) : null}
						onClick={(e) => this.props.onLeafMouseClick ? this.props.onLeafMouseClick(e, curr) : null}
						>
						<span>{curr.get("name")}</span>
					</li>
				);
			}
			return prevs;
		}
		/*the node*/
		else {
			const key = "object-options-node-" + currLevel + "-" + curr.get("id");
			const folderName = curr.get("name");
			if (!curr.get("isOpen")) {
				if (curr.get("customComponent")) {
					const folderProps = {
						onFolderClicked: this.onFolderClicked.bind(this, folderTree, curr, keyPath),
						folderName: folderName,
						isOpen: curr.get("isOpen"),
						isSearching: false,
						key
					};
					prevs.push(React.createElement(curr.get("customComponent"), folderProps));
				}
				else {
					prevs.push(
						<div key={key}
							onClick={this.onFolderClicked.bind(this, folderTree, curr, keyPath)}
							className="infinity-menu-node-container"
						>
							<label>{folderName}</label>
						</div>
					);
				}
				return prevs;
			}
			else {
				let openedFolder = [];
				const isSearching = this.state.search.isSearching && this.state.search.searchInput.length;
				const icon = isSearching ? "" : <i className="st-icon st-icon-down"></i>;

				/*unname folder is not showing as parent*/
				const isDefault = curr.get("name") === "";
				if (!isDefault) {
					if (curr.get("customComponent")) {
						const folderProps = {
							onFolderClicked: this.onFolderClicked.bind(this, folderTree, curr, keyPath),
							folderName: folderName,
							isOpen: curr.get("isOpen"),
							key,
							isSearching
						};
						openedFolder.push(React.createElement(curr.get("customComponent"), folderProps));
					}
					else {
						openedFolder.push(
							<div key={key}
								onClick={this.onFolderClicked.bind(this, folderTree, curr, keyPath)}
								className="infinity-menu-node-container"
							>
								<label>{folderName}</label>
								{icon}
							</div>
						);
					}
				}

				const floorElementsLIs = curr.get("children").size ? curr.get("children").reduce((p, c, k) => {
					if (c === undefined || k === undefined) {
						return p;
					}
					const newKeyPath = [].concat(keyPath).concat(["children", k]);
					return this.setDisplayFolders(folderTree, p, c, newKeyPath);
				}, []) : [];

				if (floorElementsLIs.length > 0) {
					openedFolder.push(
						<ul key={"objects-folder-list" + currLevel}>
							{floorElementsLIs}
						</ul>
					);
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
	render() {
		const folderTree = fromJS(this.props.tree);
		/*find filtered folders base on search, if there no search, return all*/
		const filteredFolders = this.state.search.isSearching && this.state.search.searchInput.length ? folderTree.reduce((folders, folder, key) => {
			if (key === undefined) {
				return folders;
			}
			return this.findFilted(folders, folder, key);
		}, OrderedMap()) : folderTree;


		const displayFolders = filteredFolders.reduce((folders, folder, key) => {
			if (key === undefined) {
				return folders;
			}
			return this.setDisplayFolders(folderTree, folders, folder, [key]);
		}, []);

		const headerProps = {
			isSearching: this.state.search.isSearching,
			searchInput: this.state.search.searchInput,
			setSearchInput: this.setSearchInput,
			stopSearching: this.stopSearching,
			startSearching: this.startSearching,
			onClose: this.props.onClose
		};
		const headerContent = this.props.headerContent ? React.createElement(this.props.headerContent, headerProps) : null;

		return (
			<div className="infinity-menu-container">
				{headerContent}
				{displayFolders}
			</div>
		);
	}
}

ObjectsOptions.propTypes = {
	tree: React.PropTypes.array,
	onNodeMouseClick: React.PropTypes.func,
	onLeafMouseClick: React.PropTypes.func,
	onLeafMouseDown: React.PropTypes.func,
	onLeafMouseUp: React.PropTypes.func,
	onClose: React.PropTypes.func
};

ObjectsOptions.defaultProps = {
	tree: [],
	onNodeMouseClick: ()=>{},
	onLeafMouseClick: ()=>{},
	onLeafMouseDown: ()=>{},
	onLeafMouseUp: ()=>{},
	onClose: ()=>{}
};
