import { OuterComponent } from "common";
import { InnerComponent } from "common/inner/InnerComponent";
import * as React from "react";

export function Test() {
  return <div>
    <OuterComponent />
    <InnerComponent />
  </div>
}

console.log(Test());
