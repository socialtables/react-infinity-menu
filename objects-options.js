import "./objects-options.less";
import floorElementsByFolder from "./floor-elements-by-folder";
import uuid from "uuid";
import classNames from "classnames";

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
		let getFloorElementConfig = this.props.getFloorElementConfig;
		this.state = {
			search: {
				isSearching: false,
				searchInput: ""
			},
			floorElementsByFolder: floorElementsByFolder
		};
	}
	/*
	 *	@function folderClicked
	 *	@description open or close folder
	 *
	 *	@param {string} folder - key name of folder object
	 */
	folderClicked(folderName) {
		let floorElementsByFolder = this.state.floorElementsByFolder.toJS();
		let folder = floorElementsByFolder[folderName];
		folder.isOpen = !folder.isOpen;
		this.setState({ floorElementsByFolder: Immutable.fromJS(floorElementsByFolder) });
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

		let maxLayer = this.props.getMinFloorElementLayer();
		let fe = feClicked.config().withMutations((el) => {
			el.set("pos_x", 0);
			el.set("pos_y", 0);
			el.set("layer", maxLayer + 1);
		});
		let newFEs = Immutable.OrderedMap();

		this.props.updateActiveTool("selector");
		this.props.updateMetadata(Immutable.Map({
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
		this.props.updateMetadata(Immutable.Map({
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
	/*
	 *  @function render
	 *  @description React render method for creating objects menu drawer content
	 */
	render() {
		let folderTypes = this.state.floorElementsByFolder.keySeq().toJS();
		let chevronFolders = [];
		let filteredFolders = {};
		let headerContent = [];

		if (this.state.search.isSearching && this.state.search.searchInput.length) {

			folderTypes.forEach((folderName) => {
				this.state.floorElementsByFolder.get(folderName).toJS().floorElements.forEach((fe) => {
					if (fe.name.toLowerCase().includes(this.state.search.searchInput.toLowerCase())) {
						if (!filteredFolders.folderName) {
							filteredFolders[folderName] = {
								isOpen: true,
								floorElements: [
									fe
								]
							};
						}
						else {
							filteredFolders.folderName.floorElements.push(fe);
						}
					}
				});
			});

			let filteredFolderKeys = Object.keys(filteredFolders);

			filteredFolderKeys.forEach((folderName) => {
				let key = "object-options-folder-" + uuid.v4();

				chevronFolders.push(
					<div key={key} className="st-vm-objects-options-folder"
						onClick={this.folderClicked.bind(this, folderName)}>

						<label className="st-vm-objects-options-folder-type">{folderName}</label>
					</div>
				);

				let floorElementsLIs = [];
				filteredFolders[folderName].floorElements.forEach((fe) => {
					key = "objects-options-item-" + uuid.v4();

					floorElementsLIs.push(
						<li key={key} className="st-vm-objects-options-folder-item"
							onMouseDown={this.onMouseDown.bind(this, fe)}
							onMouseUp={this.onMouseUp.bind(this)}>

							<span className="st-vm-objects-options-folder-item-name">{fe.name}</span>
							<i className={"st-vm-floor-element-icon " + fe.icon}></i>
						</li>
					);
				});
				chevronFolders.push(
					<ul key={"objects-folder-list-" + uuid.v4()}
						className="st-vm-objects-options-folder-list">

						{floorElementsLIs}
					</ul>
				);
			});
		}
		else {
			folderTypes.forEach((folderName) => {
				let key = "object-options-folder-" + uuid.v4();
				let folder = this.state.floorElementsByFolder.get(folderName).toJS();

				if (!folder.isOpen) {
					chevronFolders.push(
						<div key={key} className="st-vm-objects-options-folder"
							onClick={this.folderClicked.bind(this, folderName)}>

							<label className="st-vm-objects-options-folder-type">{folderName}</label>
							<i className="st-icon st-icon-right"></i>
						</div>
					);
				}
				else {
					chevronFolders.push(
						<div key={key} className="st-vm-objects-options-folder"
							onClick={this.folderClicked.bind(this, folderName)}>

							<label className="st-vm-objects-options-folder-type">{folderName}</label>
							<i className="st-icon st-icon-down"></i>
						</div>
					);

					let floorElementsLIs = [];
					folder.floorElements.forEach((fe) => {
						key = "objects-folder-item-" + uuid.v4();

						floorElementsLIs.push(
							<li key={key} className="st-vm-objects-options-folder-item"
								onMouseDown={this.onMouseDown.bind(this, fe)}
								onMouseUp={this.onMouseUp.bind(this)}>

								<span className="st-vm-objects-options-folder-item-name">{fe.name}</span>
								<i className={"st-vm-floor-element-icon " + fe.icon}></i>
							</li>
						);
					});
					chevronFolders.push(
						<ul key={"objects-folder-list-" + uuid.v4()}
							className="st-vm-objects-options-folder-list">

							{floorElementsLIs}
						</ul>
					);
				}
			});
		}

		if (this.state.search.isSearching) {
			let searchClassNames = classNames({
				"st-vm-objects-search": true,
				"collapsed": false
			});
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
			let searchClassNames = classNames({
				"st-vm-objects-search": true,
				"collapsed": true
			});
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
				{chevronFolders}
			</div>
		);
	}
}
