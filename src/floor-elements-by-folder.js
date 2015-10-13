import fromJSOrdered from "./lib/from-js-ordered-map";

export default function floorElementsByFolder(getFloorElementConfig, floorElementUIConfig, preFeFolder) {
	if (!floorElementUIConfig) {
		return [];
	}

	const feByFloders = Object.keys(floorElementUIConfig).reduce((pre, curr) => {
		const fe = floorElementUIConfig[curr];
		const category = fe.category;
		if (category === "DONT_SHOW_IN_MENU") {
			return pre;
		}

		/*Inital category*/
		if (pre[category] === undefined) {
			let isOpen = false;
			if (preFeFolder && preFeFolder.get(category)) {
				isOpen = preFeFolder.get(category).get("isOpen");
			}
			pre[category] = {
				floorElements: [],
				id: fe.categoryId,
				isOpen: isOpen
			};
		}

		if (fe.name || fe.icon) {
			pre[category].floorElements.push({
				name: fe.name,
				icon: fe.icon,
				id: fe.typeId,
				config: function() {
					return getFloorElementConfig(curr);
				}
			});
		}
		return pre;
	}, {});
	return fromJSOrdered(feByFloders);
}
