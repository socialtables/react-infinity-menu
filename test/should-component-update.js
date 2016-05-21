import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import InfinityMenu from "../src/infinity-menu";
import should from "should";
import sinon from "sinon";
import "should-sinon";

describe("shouldComponentUpdate prop", function() {
	const shouldComponentUpdate = sinon.stub();
	let component;
	let dom;

	afterEach(function() {
		ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(dom).parentNode);
	});

	it("should call the custom shouldComponentUpdate function", function () {
		const tree = [
			{
				name: "menu1",
				id: 1,
				isOpen: true,
				children: [
					{
						name: "submenu1",
						id: 1,
						isOpen: true,
						children: [
							{
								name: "item1-1",
								id: 1
							},
							{
								name: "item1-2",
								id: 2
							}
						]
					}
				]
			}
		];
		component = (
		<InfinityMenu
			tree={tree}
			shouldComponentUpdate={shouldComponentUpdate}
		/>);
		dom = TestUtils.renderIntoDocument(component);

		var searchInputNode = ReactDOM.findDOMNode(
			TestUtils.scryRenderedDOMComponentsWithClass(
				dom,
				"react-infinity-menu-default-search-input"
			)[0]
		);
		shouldComponentUpdate.should.have.callCount(0);
		TestUtils.Simulate.click(searchInputNode);
		shouldComponentUpdate.should.have.callCount(1);
	});
});
