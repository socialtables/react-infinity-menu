import "./objects-options.less";
import Immutable from "immutable";
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
			floorElementsByFolder: Immutable.fromJS({
				"Tables & Seating": {
					isOpen: false,
					floorElements: [
						{
							name: "Round",
							icon: "st-icon-circle-table",
							config: function(){
								return getFloorElementConfig("circle-table");
							}
						},
						{
							name: "Rectangle",
							icon: "st-icon-rect-table",
							config: function(){
								return getFloorElementConfig("rectangle-table");
							}
						},
						{
							name: "Square",
							icon: "st-icon-square-table",
							config: function(){
								return getFloorElementConfig("square-table");
							}
						},
						{
							name: "Crescent",
							icon: "st-icon-crescent-table",
							config: function(){
								return getFloorElementConfig("crescent-table");
							}
						},
						{
							name: "Oval",
							icon: "st-icon-oval-table",
							config: function(){
								return getFloorElementConfig("oval-table");
							}
						},
						{
							name: "Serpentine",
							icon: "st-icon-serp",
							config: function(){
								return getFloorElementConfig("serpentine-table");
							}
						},
						{
							name: "High Boy",
							icon: "st-icon-high-boy",
							config: function(){
								return getFloorElementConfig("high-boy");
							}
						},
						{
							name: "Theatre",
							icon: "st-icon-theatre",
							config: function(){
								return getFloorElementConfig("theatre");
							}
						},
						{
							name: "Chair",
							icon: "st-icon-chair-single",
							config: function(){
								return getFloorElementConfig("chair");
							}
						},
						{
							name: "Half Moon",
							icon: "st-icon-half-circle-table",
							config: function() {
								return getFloorElementConfig("half-circle-table");
							}
						},
						{
							name: "Bench",
							icon: "st-icon-bench",
							config: function() {
								return getFloorElementConfig("bench");
							}
						},
						{
							name: "Ottoman",
							icon: "st-icon-ottoman",
							config: function() {
								return getFloorElementConfig("ottoman");
							}
						},
						{
							name: "Bar Stool",
							icon: "st-icon-bar-stool",
							config: function() {
								return getFloorElementConfig("bar-stool");
							}
						}
					]
				},
				"Trade Show": {
					isOpen: false,
					floorElements: [
						{
							name: "Booth",
							icon: "st-icon-tradeshow",
							config: function(){
								return getFloorElementConfig("booth");
							}
						}
					]
				},
				"Entertainment": {
					isOpen: false,
					floorElements: [
						{
							name: "Dance Floor",
							icon: "st-icon-dancefloor",
							config: function(){
								return getFloorElementConfig("dance-floor");
							}
						},
						{
							name: "Piano",
							icon: "st-icon-piano",
							config: function(){
								return getFloorElementConfig("piano");
							}
						},
						{
							name: "Photo Booth",
							icon: "st-icon-photo-booth",
							config: function(){
								return getFloorElementConfig("photoBooth");
							}
						},
						{
							name: "DJ/Band",
							icon: "st-icon-dj-band",
							config: function(){
								return getFloorElementConfig("dj");
							}
						}
					]
				},
				"Food & Beverage": {
					isOpen: false,
					floorElements: [
						{
							name: "Bar",
							icon: "st-icon-bar",
							config: function(){
								return getFloorElementConfig("bar");
							}
						},
						{
							name: "Buffet",
							icon: "st-icon-buffet",
							config: function(){
								return getFloorElementConfig("buffet");
							}
						},
						{
							name: "Dessert Table",
							icon: "st-icon-dessert-table",
							config: function(){
								return getFloorElementConfig("dessert-table");
							}
						},
						{
							name: "Cake Table",
							icon: "st-icon-cake",
							config: function(){
								return getFloorElementConfig("cake-table");
							}
						},
						{
							name: "Coffee Table",
							icon: "st-icon-coffee-table",
							config: function(){
								return getFloorElementConfig("coffee-table");
							}
						},
						{
							name: "Beverage Station",
							icon: "st-icon-beverage-station",
							config: function(){
								return getFloorElementConfig("beverage-station");
							}
						}
					]
				},
				"Furniture": {
					isOpen: false,
					floorElements: [
						{
							name: "Love Seat",
							icon: "st-icon-love-seat",
							config: function(){
								return getFloorElementConfig("love-seat");
							}
						},
						{
							name: "Sofa",
							icon: "st-icon-sofa",
							config: function(){
								return getFloorElementConfig("sofa");
							}
						},
						{
							name: "Coat Rack",
							icon: "st-icon-coat-rack",
							config: function(){
								return getFloorElementConfig("coat-rack");
							}
						}
					]
				},
				"Text": {
					isOpen: false,
					floorElements: [
						{
							name: "Text",
							icon: "st-icon-text",
							config: function(){
								return getFloorElementConfig("text");
							}
						}
					]
				},
				"Fire & Safety": {
					isOpen: false,
					floorElements: [
						{
							name: "Fire Extinguisher",
							icon: "st-icon-fire-extinguisher",
							config: function(){
								return getFloorElementConfig("fireExtinguisher");
							}
						},
						{
							name: "Sprinkler",
							icon: "st-icon-sprinkler",
							config: function(){
								return getFloorElementConfig("sprinkler");
							}
						},
						{
							name: "Firehose",
							icon: "st-icon-firehose",
							config: function(){
								return getFloorElementConfig("fireHose");
							}
						},
						{
							name: "Pyrotechnic",
							icon: "st-icon-pyro",
							config: function(){
								return getFloorElementConfig("pyrotechnic");
							}
						},
						{
							name: "Exit",
							icon: "st-icon-exit",
							config: function(){
								return getFloorElementConfig("exit");
							}
						}
					]
				},
				"Obstructions & Drapery": {
					isOpen: false,
					floorElements: [
						{
							name: "Circle Column",
							icon: "st-icon-circular-column",
							config: function () {
								return getFloorElementConfig("circle-column");
							}
						},
						{
							name: "Rectangle Column",
							icon: "st-icon-rectangle-column",
							config: function () {
								return getFloorElementConfig("rectangle-column");
							}
						},
						{
							name: "Rope",
							icon: "st-icon-rope-stanchion",
							config: function () {
								return getFloorElementConfig("rope");
							}
						}
					]
				},
				"Doors & Stairs": {
					isOpen: false,
					floorElements: [
						{
							name: "Stairs",
							icon: "st-icon-stairs",
							config: function(){
								return getFloorElementConfig("stairs");
							}
						}
					]
				},
				"Staging": {
					isOpen: false,
					floorElements: [
						{
							name: "Stage",
							icon: "st-icon-stage",
							config: function(){
								return getFloorElementConfig("stage");
							}
						},
						{
							name: "Podium",
							icon: "st-icon-podium",
							config: function(){
								return getFloorElementConfig("podium");
							}
						},
						{
							name: "Riser",
							icon: "st-icon-riser",
							config: function(){
								return getFloorElementConfig("riser");
							}
						},
						{
							name: "Standing Mic",
							icon: "st-icon-mic",
							config: function(){
								return getFloorElementConfig("microphone");
							}
						}
					]
				},
				"Custom": {
					isOpen: false,
					floorElements: [
						{
							name: "Circle",
							icon: "st-icon-circular-shape",
							config: function(){
								return getFloorElementConfig("empty-circle");
							}
						},
						{
							name: "Rectangle",
							icon: "st-icon-rectangular-shape",
							config: function(){
								return getFloorElementConfig("empty-rectangle");
							}
						}
					]
				},
				"Audio & Visual": {
					isOpen: false,
					floorElements: [
						{
							name: "Screen + Projector",
							icon: "st-icon-projector",
							config: function(){
								return getFloorElementConfig("projector");
							}
						},
						{
							name: "A/V Cart",
							icon: "st-icon-av-cart",
							config: function(){
								return getFloorElementConfig("av-cart");
							}
						},
						{
							name: "Speaker",
							icon: "st-icon-speaker",
							config: function(){
								return getFloorElementConfig("speaker");
							}
						},
						{
							name: "Electric",
							icon: "st-icon-electric",
							config: function(){
								return getFloorElementConfig("electric");
							}
						},
						{
							name: "Television",
							icon: "st-icon-tv",
							config: function(){
								return getFloorElementConfig("tv");
							}
						}
					]
				},
				"Plants": {
					isOpen: false,
					floorElements: [
						{
							name: "Cactus",
							icon: "st-icon-cactus",
							config: function(){
								return getFloorElementConfig("cactus");
							}
						},
						{
							name: "Banana Palm",
							icon: "st-icon-banana-palm",
							config: function(){
								return getFloorElementConfig("banana-palm");
							}
						},
						{
							name: "Fan Palm",
							icon: "st-icon-fan-palm",
							config: function(){
								return getFloorElementConfig("fan-palm");
							}
						},
						{
							name: "Fern",
							icon: "st-icon-fern",
							config: function(){
								return getFloorElementConfig("fern");
							}
						},
						{
							name: "Coral",
							icon: "st-icon-coral",
							config: function(){
								return getFloorElementConfig("coral");
							}
						}
					]
				},
				"Admin & Business": {
					isOpen: false,
					floorElements: [
						{
							name: "Flip Chart",
							icon: "st-icon-flipchart",
							config: function() {
								return getFloorElementConfig("flip-chart");
							}
						},
						{
							name: "Easel",
							icon: "st-icon-easel",
							config: function(){
								return getFloorElementConfig("easel");
							}
						},
						{
							name: "Check-in",
							icon: "st-icon-checkin",
							config: function(){
								return getFloorElementConfig("checkin");
							}
						},
						{
							name: "Card Table",
							icon: "st-icon-card-table",
							config: function(){
								return getFloorElementConfig("cardTable");
							}
						}
					]
				},
				"Outdoors": {
					isOpen: false,
					floorElements: [
						{
							name: "Heat Lamp",
							icon: "st-icon-heatlamp",
							config: function() {
								return getFloorElementConfig("heat-lamp");
							}
						}
					]
				},
				"Trash Cans": {
					isOpen: false,
					floorElements: [
						{
							name: "Rectangle Trash Can",
							icon: "st-icon-rect-trash",
							config: function() {
								return getFloorElementConfig("rectangle-trash-can");
							}
						},
						{
							name: "Circle Trash Can",
							icon: "st-icon-circle-trash",
							config: function() {
								return getFloorElementConfig("circle-trash-can");
							}
						}
					]
				},
				"Staff": {
					isOpen: false,
					floorElements: [
						{
							name: "Staff",
							icon: "st-icon-supportstaff",
							config: function() {
								return getFloorElementConfig("staff");
							}
						}
					]
				}
			})
		};
	}
	/*
	 *	@function folderClicked
	 *	@description forceUpdate the open/close state of chevron folder when clicked
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
