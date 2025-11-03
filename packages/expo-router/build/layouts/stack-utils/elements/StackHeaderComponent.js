"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StackHeaderComponent = StackHeaderComponent;
exports.appendStackHeaderPropsToOptions = appendStackHeaderPropsToOptions;
const react_1 = require("react");
const react_native_1 = require("react-native");
const StackHeaderBackButton_1 = require("./StackHeaderBackButton");
const StackHeaderLeft_1 = require("./StackHeaderLeft");
const StackHeaderRight_1 = require("./StackHeaderRight");
const StackHeaderSearchBar_1 = require("./StackHeaderSearchBar");
const StackHeaderTitle_1 = require("./StackHeaderTitle");
function StackHeaderComponent(props) {
    return null;
}
function appendStackHeaderPropsToOptions(options, props) {
    const flattenedStyle = react_native_1.StyleSheet.flatten(props.style);
    const flattenedLargeStyle = react_native_1.StyleSheet.flatten(props.largeStyle);
    if (props.hidden) {
        return { ...options, headerShown: false };
    }
    if (props.asChild) {
        return { ...options, header: () => props.children };
    }
    let updatedOptions = {
        ...options,
        headerShown: !props.hidden,
        headerBlurEffect: props.blurEffect,
        headerStyle: {
            backgroundColor: flattenedStyle?.backgroundColor,
        },
        headerLargeStyle: {
            backgroundColor: flattenedLargeStyle?.backgroundColor,
        },
        headerShadowVisible: flattenedStyle?.shadowColor !== 'transparent',
        headerLargeTitleShadowVisible: flattenedLargeStyle?.shadowColor !== 'transparent',
    };
    function appendChildOptions(child, options) {
        if (child.type === StackHeaderTitle_1.StackHeaderTitle) {
            const { appendStackHeaderTitlePropsToOptions } = require('./StackHeaderTitle');
            updatedOptions = appendStackHeaderTitlePropsToOptions(updatedOptions, child.props);
        }
        else if (child.type === StackHeaderLeft_1.StackHeaderLeft) {
            const { appendStackHeaderLeftPropsToOptions } = require('./StackHeaderLeft');
            updatedOptions = appendStackHeaderLeftPropsToOptions(updatedOptions, child.props);
        }
        else if (child.type === StackHeaderRight_1.StackHeaderRight) {
            const { appendStackHeaderRightPropsToOptions } = require('./StackHeaderRight');
            updatedOptions = appendStackHeaderRightPropsToOptions(updatedOptions, child.props);
        }
        else if (child.type === StackHeaderBackButton_1.StackHeaderBackButton) {
            const { appendStackHeaderBackButtonPropsToOptions } = require('./StackHeaderBackButton');
            updatedOptions = appendStackHeaderBackButtonPropsToOptions(updatedOptions, child.props);
        }
        else if (child.type === StackHeaderSearchBar_1.StackHeaderSearchBar) {
            const { appendStackHeaderSearchBarPropsToOptions } = require('./StackHeaderSearchBar');
            updatedOptions = appendStackHeaderSearchBarPropsToOptions(updatedOptions, child.props);
        }
        else {
            console.warn(`Warning: Unknown child element passed to Stack.Header: ${child.type.name ?? child.type}`);
        }
        return updatedOptions;
    }
    react_1.Children.forEach(props.children, (child) => {
        if ((0, react_1.isValidElement)(child)) {
            updatedOptions = appendChildOptions(child, updatedOptions);
        }
    });
    return updatedOptions;
}
//# sourceMappingURL=StackHeaderComponent.js.map