import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
let shallowRenderer = TestUtils.createRenderer();
import InfinityMenu from "../src/infinity-menu";
import sinon from "sinon";
import "should-sinon";

describe("Header props", function() {
	it("should render correctly pass headerProps to the headerContent", function () {
		// Setup
		const Doge = ({ breed }) => {
			<div>{breed}</div>
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
});