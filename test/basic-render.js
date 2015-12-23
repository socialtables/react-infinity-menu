import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
let shallowRenderer = TestUtils.createRenderer();
import InfinityMenu from "../src/infinity-menu";
import sinon from "sinon";
import "should-sinon";

describe("Basic render test", function() {

	let component;
	let dom;
	let onNodeMouseClickStub, onLeafMouseClickStub, onLeafMouseDownStub, onLeafMouseUpStub;

	before(function() {
		const tree =
		[
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
					},
					{
						name: "submenu2",
						id: 2,
						isOpen: true,
						children: [
							{
								name: "item2-1",
								id: 1
							}
						]
					}
				]
			},
			{
				name: "menu2",
				id: 2,
				isOpen: true,
				children: [
					{
						name: "item3-1",
						id: 1
					}
				]
			}
		];
		component = <InfinityMenu tree={tree} />;
	});

	it("should render correctly with folder tree", function () {
		shallowRenderer.render(component);
		var result = shallowRenderer.getRenderOutput();
		result.props.className.should.equal("infinity-menu-container");
	});
});