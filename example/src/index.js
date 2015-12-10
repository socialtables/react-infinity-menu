import React from "react";
import ReactDOM from "react-dom";
import "../../src/infinity-menu.css";
import InfinityMenu from "../../src/infinity-menu";

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
						children: [
							{
								name: "Sub-SubMenu1-1",
								id: 0
							},
							{
								name: "Sub-SubMenu1-2",
								id: 1
							},
							{
								name: "Sub-SubMenu1-3",
								id: 2
							}
						]
					},
					{
						name: "SubMenu2-1",
						id: 1,
						children: [
							{
								name: "Sub-SubMenu2-1",
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

	render() {
		return (
			<InfinityMenu
				tree={this.state.tree}
				onNodeMouseClick={this.onNodeMouseClick.bind(this)}
			/>
		);
	}
}
ReactDOM.render(<App />, document.getElementById("example"));
