import React from "react/addons";
let TestUtils = React.addons.TestUtils;
let shallowRenderer = TestUtils.createRenderer();
import ObjectsOptions from "../dist/objects-options";
import assert from "assert";
import sinon from "sinon";
import "should-sinon";

describe("Test for ObjectsOptions", function() {

	let component;
	let dom;
	let onNodeMouseClickStub, onLeafMouseClickStub, onLeafMouseDownStub, onLeafMouseUpStub, onCloseStub;
	class TestCustomComponent extends React.Component {
		render() {
			return (<div className="test-custom-component"/>);
		}
	}

	before(function() {
		const tree =
		[
			{
				name: "menu1",
				id: 1,
				isOpen: true,
				customComponent: TestCustomComponent,
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
		onCloseStub = sinon.stub();
		component = <ObjectsOptions
			tree={tree}
			onNodeMouseClick={onNodeMouseClickStub}
			onLeafMouseClick={onLeafMouseClickStub}
			onLeafMouseUp={onLeafMouseUpStub}
			onLeafMouseDown={onLeafMouseDownStub}
			onClose={onCloseStub}
			/>;
		dom = TestUtils.renderIntoDocument(component);
	});

	it("should render correctly with folder tree", function () {
		shallowRenderer.render(component);
		var result = shallowRenderer.getRenderOutput();
		assert.equal(result.props.className, "infinity-menu-container");
	});


	it("should call onNodeMouseClick function", function () {
		var folderNode = React.findDOMNode(
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
		var leaf = React.findDOMNode(
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
		var leaf = React.findDOMNode(
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
		var leaf = React.findDOMNode(
			TestUtils.scryRenderedDOMComponentsWithClass(
				dom,
				"infinity-menu-leaf-container"
			)[0]
		);
		onLeafMouseUpStub.should.have.callCount(0);
		TestUtils.Simulate.mouseUp(leaf);
		onLeafMouseUpStub.should.have.callCount(1);
	});

	it("should have test-custom-component", function () {
		assert.doesNotThrow(() => {
			TestUtils.findRenderedDOMComponentWithClass(
				dom,
				"test-custom-component"
			);
		});
	});
});
