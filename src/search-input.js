import React from "react";

export default class SearchInput extends React.Component {
	render() {
		return <input
		className="react-infinity-menu-default-search-input"
		onClick={this.props.startSearching} value={this.props.searchInput} onChange={this.props.setSearchInput}/>;
	}
}
