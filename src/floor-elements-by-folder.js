import fromJSOrdered from "./lib/from-js-ordered-map";

/*Legacy Data Import*/
export default function floorElementsByFolder(getFloorElementConfig, floorElementUIConfig) {
	const feByFloders = Object.keys(floorElementUIConfig).reduce((pre, curr) => {
		const fe = floorElementUIConfig[curr];
		const category = fe.category;
		if (category === "DONT_SHOW_IN_MENU" || !fe.name || !fe.icon) {
			return pre;
		}

		/*Inital category*/
		if (pre[category] === undefined) {
			pre[category] = {
				isOpen: false,
				floorElements: []
			};
		}

		pre[category].floorElements.push({
			name: fe.name,
			icon: fe.icon,
			config: function() {
				return getFloorElementConfig(curr);
			}
		});

		return pre;
	}, {});
	return fromJSOrdered(feByFloders);
}
