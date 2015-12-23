import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import InfinityMenu from "../src/infinity-menu";
import sinon from "sinon";
import should from "should";
import "should-sinon";
let shallowRenderer = TestUtils.createRenderer();

describe("Empty List Component props", function() {
	it("should render `emptyTreeComponent` prop if `tree` prop is empty Array", function() {
		// Setup
		const DummyEmptyTreeComponent = () => {
			return <div className="dummy-empty-tree-component">Component Content</div>;
		};
		// Render
		const menuComponent = <InfinityMenu
			tree={[]}
			emptyTreeComponent={DummyEmptyTreeComponent}
		/>;
		const dom = TestUtils.renderIntoDocument(menuComponent);

		// Assert
		should.doesNotThrow(() => {
			TestUtils.findRenderedDOMComponentWithClass(
				dom,
				"dummy-empty-tree-component"
			)
		});
	});

	it("should render `emptyTreeComponent` prop with `emptyTreeComponentProps` props if `tree` prop is empty Array", function() {
		// Setup
		const DummyEmptyTreeComponent = ({name}) => {
			return <div className="dummy-empty-tree-component">{name}</div>;
		};
		const dummyEmptyTreeComponentProps = {
			name: "Test Name"
		};
		const menuComponent = <InfinityMenu
			tree={[]}
			emptyTreeComponent={DummyEmptyTreeComponent}
			emptyTreeComponentProps={dummyEmptyTreeComponentProps}
		/>;

		// Render
		const dom = TestUtils.renderIntoDocument(menuComponent);
		const emptyTreeComponent = TestUtils.findRenderedDOMComponentWithClass(dom, "dummy-empty-tree-component");
		const emptyTreeDOMElement = ReactDOM.findDOMNode(emptyTreeComponent);

		// Assert
		emptyTreeDOMElement.textContent.should.equal(dummyEmptyTreeComponentProps.name);
	});
});