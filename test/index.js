var React = require("react/addons");
var TestUtils = React.addons.TestUtils;
var shallowRenderer = TestUtils.createRenderer();
var ObjectsOptions = require("../dist/objects-options.js");
var assert = require('assert');

describe("Test for ObjectsOptions", function() {
	it('should render correctly', function () {
		var component = React.createElement(ObjectsOptions);
		shallowRenderer.render(component);
		var result = shallowRenderer.getRenderOutput();
		assert.equal(result.props.className, "st-vm-objects-options");
	});

	it('should render correctly with folder tree', function () {
		var component = React.createElement(ObjectsOptions, {tree:
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
			]
		});
		shallowRenderer.render(component);
		var result = shallowRenderer.getRenderOutput();
		assert.equal(result.props.className, "st-vm-objects-options");
	});
});
