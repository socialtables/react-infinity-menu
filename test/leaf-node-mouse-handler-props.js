import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
let shallowRenderer = TestUtils.createRenderer();
import InfinityMenu from "../src/infinity-menu";
import sinon from "sinon";
import "should-sinon";

describe("Leaf/Node Mouse Handlers", function() {
	let component;
	let dom;
	let onNodeMouseClickStub, onLeafMouseClickStub, onLeafMouseDownStub, onLeafMouseUpStub;

	before(function() {
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
		onNodeMouseClickStub = sinon.stub();
		onLeafMouseClickStub = sinon.stub();
		onLeafMouseUpStub = sinon.stub();
		onLeafMouseDownStub = sinon.stub();
		component = <InfinityMenu
			tree={tree}
			onNodeMouseClick={onNodeMouseClickStub}
			onLeafMouseClick={onLeafMouseClickStub}
			onLeafMouseUp={onLeafMouseUpStub}
			onLeafMouseDown={onLeafMouseDownStub}
			/>;
		dom = TestUtils.renderIntoDocument(component);
	});

	after(function() {
		ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(dom).parentNode);
	});

	it("should call onNodeMouseClick function", function () {
		var folderNode = ReactDOM.findDOMNode(
			TestUtils.scryRenderedDOMComponentsWithClass(
				dom,
				"infinity-menu-node-container"
			)[0]
		);
		onNodeMouseClickStub.should.have.callCount(0);
		TestUtils.Simulate.click(folderNode);
		onNodeMouseClickStub.should.have.callCount(1);
	});

	it("should call onLeafMouseClick function", function () {
		var leaf = ReactDOM.findDOMNode(
			TestUtils.scryRenderedDOMComponentsWithClass(
				dom,
				"infinity-menu-leaf-container"
			)[0]
		);
		onLeafMouseClickStub.should.have.callCount(0);
		TestUtils.Simulate.click(leaf);
		onLeafMouseClickStub.should.have.callCount(1);
	});

	it("should call onLeafMouseDown function", function () {
		var leaf = ReactDOM.findDOMNode(
			TestUtils.scryRenderedDOMComponentsWithClass(
				dom,
				"infinity-menu-leaf-container"
			)[0]
		);
		onLeafMouseDownStub.should.have.callCount(0);
		TestUtils.Simulate.mouseDown(leaf);
		onLeafMouseDownStub.should.have.callCount(1);
	});

	it("should call onLeafMouseUp function", function () {
		var leaf = ReactDOM.findDOMNode(
			TestUtils.scryRenderedDOMComponentsWithClass(
				dom,
				"infinity-menu-leaf-container"
			)[0]
		);
		onLeafMouseUpStub.should.have.callCount(0);
		TestUtils.Simulate.mouseUp(leaf);
		onLeafMouseUpStub.should.have.callCount(1);
	});

});