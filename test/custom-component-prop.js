import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
let shallowRenderer = TestUtils.createRenderer();
import InfinityMenu from "../src/infinity-menu";
import sinon from "sinon";
import should from "should";
import "should-sinon";

describe("Custom Component prop", function() {
	const CustomComponent = () => {
		return <div className="test-custom-component"></div>;
	};
	let component;
	let dom;

	afterEach(function() {
		ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(dom).parentNode);
	});

	it("should render the custom component when given as a constant", function () {
		const tree = [
			{
				name: "menu1",
				id: 1,
				isOpen: true,
				customComponent: CustomComponent,
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
		component = <InfinityMenu tree={tree} />;
		dom = TestUtils.renderIntoDocument(component);
		should.doesNotThrow(() => {
			TestUtils.findRenderedDOMComponentWithClass(
				dom,
				"test-custom-component"
			);
		});
	});

	it("should render the custom component when given as a string with mappings", function () {
			const tree = [
				{
					name: "menu1",
					id: 1,
					isOpen: true,
					customComponent: 'CustomComponent',
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
			component = <InfinityMenu tree={tree} customComponentMappings={{ 'CustomComponent': CustomComponent }}/>;
			dom = TestUtils.renderIntoDocument(component);
			should.doesNotThrow(() => {
				TestUtils.findRenderedDOMComponentWithClass(
					dom,
					"test-custom-component"
				);
			});
		});
});
