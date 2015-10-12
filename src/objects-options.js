import FloorElementsByFolder from "./floor-elements-by-folder";
import uuid from "uuid";
import classNames from "classnames";
import { Map, OrderedMap, List } from "immutable";
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
			},
			floorElementsByFolder: FloorElementsByFolder(this.props.getFloorElementConfig, this.props.floorElementUIConfig)
		};
	}
	/*
	 *	@function folderClicked
	 *	@description open or close folder
	 *
	 *	@param {string} folder - key name of folder object
	 */
	folderClicked(folderName) {
		if (!this.state.search.isSearching || !this.state.search.searchInput.length) {
			const folder = this.state.floorElementsByFolder.get(folderName);
			const newFolder = folder.set("isOpen", !folder.get("isOpen"));
			const newFolders = this.state.floorElementsByFolder.set(folderName, newFolder);
			this.setState({ floorElementsByFolder: newFolders});
		}
	}
	/*
	 *	@function onMouseUp
	 *	@description when fe from list is clicked
	 *
	 *	@param {object} feClicked - reference to the fe object
	 *	@param {object} event - React Synthetic Event
	 */
	onMouseDown(feClicked, event){
		event.preventDefault();
		const maxLayer = this.props.getMinFloorElementLayer();
		const fe = feClicked.get("config")().withMutations((el) => {
			el.set("pos_x", 0);
			el.set("pos_y", 0);
			el.set("layer", maxLayer + 1);
		});
		const newFEs = OrderedMap();

		this.props.updateActiveTool("selector");
		this.props.updateMetadata(Map({
			dragX: 0,
			dragY: 0,
			isDragging: true,
			floorElementTypeMenu: newFEs.set(uuid.v4(), fe)
		}));
	}
	/*
	 *	@function onMouseUp
	 *	@description when fe from list is dragged and the mouse click is released
	 *
	 *	@param {object} event - React Synthetic Event
	 */
	onMouseUp(event) {
		event.preventDefault();

		this.props.updateActiveTool("selector");
		this.props.updateMetadata(Map({
			dragX: null,
			dragY: null,
			isDragging: false,
			floorElementTypeMenu: null
		}));
	};
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
		if (this.props.getFloorElementConfig !== nextProps.getFloorElementConfig || this.props.floorElementUIConfig !== nextProps.floorElementUIConfig) {
			this.setState({
				floorElementsByFolder: FloorElementsByFolder(nextProps.getFloorElementConfig, nextProps.floorElementUIConfig)
			});
			return true;
		}

		if (this.state.search.isSearching &&
			this.state.search.isSearching === nextState.search.isSearching &&
			this.state.search.searchInput === nextState.search.searchInput &&
			this.state.floorElementsByFolder === nextState.floorElementsByFolder) {

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
	/*
	 *  @function render
	 *  @description React render method for creating objects menu drawer content
	 */
	render() {
		const floorElementsByFolder = this.state.floorElementsByFolder;
		const filteredFolders = floorElementsByFolder.reduce((folders, folder, key) => {
			const searchMatches = folder.get("floorElements").reduce((fes, fe) => {
				if (fe.get("name").toLowerCase().includes(this.state.search.searchInput.toLowerCase())) {
					return fes.push(fe);
				}
				else {
					return fes;
				}
			}, List());
			if (searchMatches.size) {
				const isOpen = this.state.search.isSearching && this.state.search.searchInput.length || folder.get("isOpen");
				const newFolder = folder.withMutations((updatedFolder) => updatedFolder.set("isOpen", isOpen).set("floorElements", searchMatches));
				const newFolders = folders.set(key, newFolder);
				return newFolders;
			}
			else {
				return folders;
			}
		}, OrderedMap());

		const displayFolders = filteredFolders.reduce((folders, folder, folderName) => {
			const key = "object-options-folder-" + uuid.v4();
			if (!folder.get("isOpen")) {
				folders.push(
					<div key={key} className="st-vm-objects-options-folder"
						onClick={this.folderClicked.bind(this, folderName)}>

						<label className="st-vm-objects-options-folder-type">{folderName}</label>
						<i className="st-icon st-icon-right"></i>
					</div>
				);
				return folders;
			}
			else {
				let chevronFolders = [];
				const isSearching = this.state.search.isSearching && this.state.search.searchInput.length;
				const icon = isSearching ? "" : <i className="st-icon st-icon-down"></i>;
				chevronFolders.push(
					<div key={key} className="st-vm-objects-options-folder"
						onClick={this.folderClicked.bind(this, folderName)}>

						<label className="st-vm-objects-options-folder-type">{folderName}</label>
						{icon}
					</div>
				);
				const floorElementsLIs = folder.get("floorElements").map((fe) => {
					const itemKey = "objects-folder-item-" + uuid.v4();
					return (
						<li key={itemKey} className="st-vm-objects-options-folder-item"
							onMouseDown={(e) => this.props.onCategoryTypeMouseDown(e, fe)}
							onMouseUp={(e) => this.props.onCategoryTypeMouseUp(e, fe)}>

							<span className="st-vm-objects-options-folder-item-name">{fe.get("name")}</span>
							<i className={"st-vm-floor-element-icon " + fe.get("icon")}></i>
						</li>
					);
				});
				chevronFolders.push(
					<ul key={"objects-folder-list-" + uuid.v4()}
						className="st-vm-objects-options-folder-list">
						{floorElementsLIs}
					</ul>
				);
				folders.push(chevronFolders);
				return folders;
			}
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
