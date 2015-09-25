import { Seq } from "immutable";

export default function fromJSOrdered(js) {
	if (typeof js !== "object" || js === null) {
		return js;
	}
	else {
		if (Array.isArray(js)) {
			return Seq(js).map(fromJSOrdered).toList();
		}
		else {
			return Seq(js).map(fromJSOrdered).toOrderedMap();
		}
	}
}
