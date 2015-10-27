# menu-drawer-objects-options-subcomponent

[![Circle CI](https://circleci.com/gh/socialtables/menu-drawer-objects-options-subcomponent/tree/master.svg?style=svg&circle-token=230aaa396d006f1dc8d875b340834234c4937bbc)](https://circleci.com/gh/socialtables/menu-drawer-objects-options-subcomponent/tree/master)

* An unlimited deep side menu

# Installation
``` npm install menu-drawer-objects-options-subcomponent```


# How to use

```js
import ObjectsOptions from "@socialtables/menu-drawer-objects-options-subcomponent";
import "@socialtables/menu-drawer-objects-options-subcomponent/src/objects-options.less";
class Example extends React.Component {
	onNodeMouseClick(event, tree, node, level) {
		this.setState({
			tree: tree
		});
	}

	onLeafMouseClick(event, leaf) {
		console.log( leaf.id ); // Prints the leaf id
		console.log( leaf.name ); // Prints the leaf name
	}

	onLeafMouseUp(event, leaf) {
		console.log( leaf.id ); // Prints the leaf id
		console.log( leaf.name ); // Prints the leaf name
	}

	onLeafMouseDown(event, leaf) {
		console.log( leaf.id ); // Prints the leaf id
		console.log( leaf.name ); // Prints the leaf name
	}

	render() {
		return (
			<ObjectsOptions
				tree={this.state.tree}
				onNodeMouseClick={this.onNodeMouseClick}
				onLeafMouseClick={this.onLeafMouseClick}/*optional*/
				onLeafMouseDown={this.onLeafMouseDown}/*optional*/
				onLeafMouseUp={this.onLeafMouseUp}/*optional*/
			/>
		);
	}
}
```


# Properties


* #### tree(Array)

A tree to represent the folder structure.
Here is the example data you could pass into the tree props.
```
[
	{
		name: "menu1",
		id: 1,
		isOpen: true,
		customComponent: YOUR_OWN_COMPONENT_FOR_MENU,
		children: [
			{
				name: "submenu1",
				id: 1,
				isOpen: true,
				customComponent: YOUR_OWN_COMPONENT_FOR_SUB_MENU,
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
				customComponent: YOUR_OWN_COMPONENT_FOR_SUB_MENU,
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
		customComponent: YOUR_OWN_COMPONENT_FOR_MENU,
		isOpen: true,
		children: [
			{
				name: "item3-1",
				id: 1
			}
		]
	}
];
```
  * `customComponent` is an react component user can pass in as an highly customizable object.
    * As the `customComponent` at the node level, you will receive props `key`,  `onClick`, `name`, `isOpen` and `isSearching`.
	* As the `customComponent` at the leaf level, you will receive props `key`, `onMouseDown`, `onMouseUp`, `onClick`, `name`, `icon` and `data`.

* #### onNodeMouseClick(function)[event, tree, node, level]
This function will get call when user click on the folder(node).
The function arguments include ```event```, ```tree```, ```node``` and ```level```.
```event``` is the mouse click event.
```tree``` is the updated tree, you should update your own tree accordingly.
```node``` is the folder(node) the user clicked on. Including the id, name, isOpen and children.
```level``` is the distance from the root.


* #### onLeafMouseClick(function)[event, leaf]
Bind to the onClick on the leaf.
This function will get call when user click on the item(leaf).
The function arguments include ```event```, ```leaf```.
```event``` is the click event.
```leaf``` is the item user clicked on. Includes name, id and all data user puts in when they pass in the tree.


* #### onLeafMouseDown(function)[event, leaf]
Bind to the onMouseDown on the leaf.
This function will get call when user mouse down on the item(leaf).
The function arguments include ```event```, ```leaf```.
```event``` is the click event.
```leaf``` is the item user clicked on. Includes name, id and all data user puts in when they pass in the tree.


* #### onLeafMouseUp(function)[event, leaf]
Bind to the onMouseUp on the leaf.
This function will get call when user mouse up on the item(leaf).
The function arguments include ```event```, ```leaf```.
```event``` is the click event.
```leaf``` is the item user clicked on. Includes name, id and all data user puts in when they pass in the tree.

* #### onClose(function)
This function will get call when use click the cross on the menu
