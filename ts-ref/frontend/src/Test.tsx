import { OuterComponent } from "common/OuterComponent";
import * as React from "react";

export function Test() {
  return <div>
    <OuterComponent />
  </div>
}

console.log(Test());
