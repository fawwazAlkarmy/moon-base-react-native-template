import { cssInterop } from "nativewind";
import Svg from "react-native-svg";

export * from "./screen";
export * from "./text";
export * from "./button";
export * from "./input";
export * from "./checkbox";
export { default as colors } from "./colors";
export * from "./icons";

//Apply cssInterop to Svg to resolve className string into style
cssInterop(Svg, {
  className: {
    target: "style",
  },
});
