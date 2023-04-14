// these types are required in order for Typescript not to complain when importing
// svg icons like this:
//
// `import { ReactComponent as WhateverIcon } from './icons/WhateverIcon.svg';`
declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
}
