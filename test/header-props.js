import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
let shallowRenderer = TestUtils.createRenderer();
import InfinityMenu from "../src/infinity-menu";
import should from "should";
import "should-sinon";

describe("Header props", function() {
	it("should render correctly pass headerProps to the headerContent", function () {
		// Setup
		const Doge = ({ breed }) => {
			<div>{breed}</div>;
		};
		const component = <InfinityMenu
			headerProps={{breed: "shiba"}}
			headerContent={Doge}
		/>;

		// Render
		shallowRenderer.render(component);
		const result = shallowRenderer.getRenderOutput();

		// Assert
		result.props.children[0].props.breed.should.equal("shiba");
	});

	it("it should only display default header content ", function() {
		const component = <InfinityMenu/>;
		const dom = TestUtils.renderIntoDocument(component);

		should.doesNotThrow(() => {
			TestUtils.findRenderedDOMComponentWithClass(
				dom,
				"react-infinity-menu-default-search-input"
			);
		});
	});

	it("it should not display default header content ", function() {
		const component = <InfinityMenu
			disableDefaultHeaderContent={true}
		/>;
		const dom = TestUtils.renderIntoDocument(component);

		should.throws(() => {
			TestUtils.findRenderedDOMComponentWithClass(
				dom,
				"react-infinity-menu-default-search-input"
			);
		});
	});

});
