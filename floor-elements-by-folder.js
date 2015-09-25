import fromJSOrdered from "./from-js-ordered-map";

export default function floorElementsByFolder(getFloorElementConfig) {
	return ( fromJSOrdered({
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
				},
				{
					name: "Uplight",
					icon: "st-icon-uplight",
					config: function(){
						return getFloorElementConfig("uplight");
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
	}));
}
