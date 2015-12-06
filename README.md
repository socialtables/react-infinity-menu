# react-infinity-menu

[![Circle CI](https://circleci.com/gh/socialtables/react-infinity-menu.svg?style=svg&circle-token=230aaa396d006f1dc8d875b340834234c4937bbc)](https://circleci.com/gh/socialtables/react-infinity-menu)

* An unlimited deep side menu
* [Live Demo](http://socialtables.github.io/react-infinity-menu/)

# Demo
![Awesome demo](/demo.gif)

# Installation
``` npm install react-infinity-menu```


# How to use

```js
import InfinityMenu from "react-infinity-menu";
import "react-infinity-menu/src/infinity-menu.css";

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
			<InfinityMenu
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


#### tree(Array)

A tree to represent the folder structure.
Here is the example data you could pass into the tree props.
```
[
	{
		name: "menu1", /*require*/
		id: 1, /*require*/
		isOpen: true, /*require*/
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
		name: "menu2", /*require*/
		id: 2, /*require*/
		isOpen: true, /*require*/
		customComponent: YOUR_OWN_COMPONENT_FOR_MENU,
		children: [
			{
				name: "item3-1",
				id: 1
			}
		]
	}
];
```

#### headerContent(component) subcomponent rendered above the tree

`headerContent` is passed in to `InfinityMenu`. It is rendered above the tree subcomponent.

#### headerProps(object) additional props for headerContent

`headerProps` is an optional prop of InfinityMenu. The props in this object are passed as props to a `headerContent` component. This is useful when extending InfinityMenu.

Passing the following into InfinityMenu as the `headerProps` prop sets the `title` prop on the headerContent component.
```
{
	title: "my great title"
}
```

#### customComponent is a React component the user can pass in.
  * As the `customComponent` at the node level, you will receive props `key`,  `onClick`, `name`, `isOpen`, `data` and `isSearching`.
  * As the `customComponent` at the leaf level, you will receive props `key`, `onMouseDown`, `onMouseUp`, `onClick`, `name`, `icon` and `data`.



#### onNodeMouseClick(function)[event, tree, node, level]
This function will get call when user click on the folder(node).
The function arguments include ```event```, ```tree```, ```node``` and ```level```.
```event``` is the mouse click event.
```tree``` is the updated tree, you should update your own tree accordingly.
```node``` is the folder(node) the user clicked on. Including the id, name, isOpen and children.
```level``` is the distance from the root.


#### onLeafMouseClick(function)[event, leaf]
Bind to the onClick on the leaf.
This function will get call when user click on the item(leaf).
The function arguments include ```event```, ```leaf```.
```event``` is the click event.
```leaf``` is the item user clicked on. Includes name, id and all data the user inputs when they pass in the tree.


#### onLeafMouseDown(function)[event, leaf]
Bind to the onMouseDown on the leaf.
This function will get call when user mouse down on the item(leaf).
The function arguments include ```event```, ```leaf```.
```event``` is the click event.
```leaf``` is the item user clicked on. Includes name, id and all data the user inputs when they pass in the tree.


#### onLeafMouseUp(function)[event, leaf]
Bind to the onMouseUp on the leaf.
This function will get call when user mouse up on the item(leaf).
The function arguments include ```event```, ```leaf```.
```event``` is the click event.
```leaf``` is the item user clicked on. Includes name, id and all data the user inputs when they pass in the tree.

# Styles
There is a default style sheet you can use if you so desire.
`/src/infinity-menu.css`

# License

Copyright (C) 2015 Social Tables, Inc. (https://www.socialtables.com) All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
