import React from "react";
import ReactDOM from "react-dom";
import "../../src/infinity-menu.css";
import InfinityMenu from "../../src/infinity-menu";

function myComp (props) {
	return (
		<div onClick={(e) => props.onClick(e, props)}>
			{props.name}
		</div>
	);
}

class App extends React.Component {

	componentWillMount() {
		const tree = [
			{
				name: "Menu1",
				id: 0,
				isOpen: false,
				children: [
					{
						name: "SubMenu1-1",
						id: 0,
						isOpen: false,
						customComponent: myComp,
						children: [
							{
								name: "Sub-SubMenu1-1",
								customComponent: myComp,
								id: 0
							},
							{
								name: "Sub-SubMenu1-2",
								customComponent: myComp,
								id: 1
							},
							{
								name: "Sub-SubMenu1-3",
								customComponent: myComp,
								id: 2
							}
						]
					},
					{
						name: "SubMenu2-1",
						id: 1,
						customComponent: myComp,
						children: [
							{
								name: "Sub-SubMenu2-1",
								customComponent: myComp,
								id: 0
							}
						]
					}
				]
			},
			{
				name: "Menu2",
				id: 1,
				isOpen: false,
				children: [
					{
						name: "SubMenu2-1",
						id: 0
					},
					{
						name: "SubMenu2-2",
						id: 1
					},
					{
						name: "SubMenu2-3",
						id: 2
					}
				]
			},
			{
				name: "Menu3",
				id: 2,
				isOpen: false,
				children: [
					{
						name: "SubMenu3-1",
						id: 0
					},
					{
						name: "SubMenu3-2",
						id: 1
					}
				]
			}
		];
		this.setState({
			tree: tree
		});
	}

	onNodeMouseClick(event, tree) {
		this.setState({
			tree: tree
		});
	}

	onLeafMouseClick(event, leaf) {
		const keyPath = leaf.data.keyPath.split(".");
		const real = this.state.tree[keyPath[0]][keyPath[1]][keyPath[2]][keyPath[3]][keyPath[4]];
		real.name = "YOU CLICK ME";
		this.state.tree[keyPath[0]][keyPath[1]][keyPath[2]][keyPath[3]][keyPath[4]] = real;
		this.setState({
			tree: this.state.tree
		});
	}

	render() {
		return (
			<InfinityMenu
				tree={this.state.tree}
				onNodeMouseClick={this.onNodeMouseClick.bind(this)}
				onLeafMouseClick={(e, leaf) => this.onLeafMouseClick(e, leaf)}
			/>
		);
	}
}
ReactDOM.render(<App />, document.getElementById("example"));
