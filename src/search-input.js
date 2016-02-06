import React from "react";

export default class SearchInput extends React.Component {
	render() {
		return <input onClick={this.props.startSearching} value={this.props.searchInput} onChange={this.props.setSearchInput}/>;
	}
}
