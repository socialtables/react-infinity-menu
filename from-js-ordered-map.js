import { Seq } from "immutable";

export default function fromJSOrdered(js) {
  return typeof js !== 'object' || js === null ? js :
    Array.isArray(js) ?
      Seq(js).map(fromJSOrdered).toList() :
      Seq(js).map(fromJSOrdered).toOrderedMap();
}
