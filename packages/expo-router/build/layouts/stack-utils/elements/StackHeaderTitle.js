"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StackHeaderTitle = StackHeaderTitle;
exports.appendStackHeaderTitlePropsToOptions = appendStackHeaderTitlePropsToOptions;
const react_native_1 = require("react-native");
function StackHeaderTitle(props) {
    return null;
}
function appendStackHeaderTitlePropsToOptions(options, props) {
    const flattenedStyle = react_native_1.StyleSheet.flatten(props.style);
    const flattenedLargeStyle = react_native_1.StyleSheet.flatten(props.largeStyle);
    return {
        ...options,
        title: props.children,
        headerLargeTitle: props.large,
        headerTitleAlign: flattenedStyle?.textAlign,
        headerTitleStyle: {
            ...flattenedStyle,
            color: flattenedStyle?.color ?? undefined,
        },
        headerLargeTitleStyle: {
            ...flattenedLargeStyle,
            fontWeight: flattenedLargeStyle?.fontWeight?.toString(),
            color: flattenedLargeStyle?.color ?? undefined,
        },
    };
}
//# sourceMappingURL=StackHeaderTitle.js.map