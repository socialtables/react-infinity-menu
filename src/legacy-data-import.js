import fromJSOrdered from "./lib/from-js-ordered-map";

/*Legacy Data*/
export default function legacyDataImport(getFloorElementConfig, floorElementUIConfig, nextFolderTree) {
	if (!floorElementUIConfig) {
		return [];
	}

	const feByFloders = Object.keys(floorElementUIConfig).reduce((pre, curr) => {
		const fe = floorElementUIConfig[curr];
		const category = fe.category;
		let catalog = fe.catalog;
		if (!catalog) {
			catalog = "";
		}

		if (category === "DONT_SHOW_IN_MENU") {
			return pre;
		}

		/*Inital catalog*/
		if (pre[catalog] === undefined) {
			let isOpen = catalog === "" ? true : false;
			pre[catalog] = {
				name: catalog,
				isOpen: isOpen,
				id: fe.catalogId,
				children: {}
			};
		}

		/*Inital category*/
		if (pre[catalog].children[category] === undefined) {
			let isOpen = false;
			if (nextFolderTree) {
				const nextCategory = nextFolderTree.getIn([catalog, "children", category]);
				if (nextCategory) {
					isOpen = nextCategory.get("isOpen");
				}
			}
			pre[catalog].children[category] = {
				children: {},
				id: fe.categoryId,
				isOpen: isOpen,
				name: category
			};
		}

		/*Add Type*/
		if (fe.name || fe.icon) {
			pre[catalog].children[category].children[fe.name] = {
				name: fe.name,
				icon: fe.icon,
				id: fe.typeId,
				config: function() {
					return getFloorElementConfig(curr);
				}
			};
		}
		return pre;
	}, {});
	return fromJSOrdered(feByFloders);
}
