import uuid from "uuid";
import classNames from "classnames";
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
		/*the leaves*/
		if (!curr.get("children")) {
			const itemKey = "objects-folder-folder-" + uuid.v4();
			prevs.push(
				<li key={itemKey} className="st-vm-objects-options-folder-item"
					onMouseDown={(e) => this.props.onLeafMouseDown ? this.props.onLeafMouseDown(e, curr) : null}
					onMouseUp={(e) => this.props.onLeafMouseUp ? this.props.onLeafMouseUp(e, curr) : null}
					onClick={(e) => this.props.onLeafMouseClick ? this.props.onLeafMouseClick(e, curr) : null}
					>
					<span className="st-vm-objects-options-folder-item-name">{curr.get("name")}</span>
					<i className={"st-vm-floor-element-icon " + curr.get("icon")}></i>
				</li>
			);
			return prevs;
		}
		/*the node*/
		else {
			const key = "object-options-folder-" + uuid.v4();
			const folderName = curr.get("name");
			if (!curr.get("isOpen")) {
				prevs.push(
					<div key={key} className="st-vm-objects-options-folder"
						onClick={this.onFolderClicked.bind(this, folderTree, curr, keyPath)}>
						<label className="st-vm-objects-options-folder-type">{folderName}</label>
						<i className="st-icon st-icon-right"></i>
					</div>
				);
				return prevs;
			}
			else {
				let openedFolder = [];
				const isSearching = this.state.search.isSearching && this.state.search.searchInput.length;
				const icon = isSearching ? "" : <i className="st-icon st-icon-down"></i>;

				/*unname folder is not showing as parent*/
				const isDefault = curr.get("name") === "";
				if (!isDefault) {
					openedFolder.push(
						<div key={key} className="st-vm-objects-options-folder"
							onClick={this.onFolderClicked.bind(this, folderTree, curr, keyPath)}>
							<label className="st-vm-objects-options-folder-type">{folderName}</label>
							{icon}
						</div>
					);
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
						<ul key={"objects-folder-list-" + uuid.v4()}
							className="st-vm-objects-options-folder-list">
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

		const searchClassNames = classNames({
			"st-vm-objects-search": true,
			"collapsed": !this.state.search.isSearching
		});


		let headerContent;
		if (this.state.search.isSearching) {
			headerContent =
				<div className="st-vm-objects-options-header">
					<div className={searchClassNames}>
						<i className="st-vm-objects-icon st-icon-search"></i>
						<input type="text" placeholder="Search Objects..."
							value={this.state.search.searchInput}
							onChange={this.setSearchInput.bind(this)}></input>
						<i className="st-vm-objects-icon st-icon-close"
							onClick={this.stopSearching.bind(this)}></i>
					</div>
				</div>;
		}
		else {
			headerContent =
				<div className="st-vm-objects-options-header">
					<i className="st-vm-objects-icon st-icon-arrow-left"
						onClick={this.props.close}></i>
					<label>Objects</label>
					<div className={searchClassNames}>
						<i className="st-vm-objects-icon st-icon-search"
						onClick={this.startSearching.bind(this)}></i>
					</div>
				</div>;
		}

		return (
			<div key="st-vm-objects-options" className="st-vm-objects-options">
				{headerContent}
				{displayFolders}
			</div>
		);
	}
}
