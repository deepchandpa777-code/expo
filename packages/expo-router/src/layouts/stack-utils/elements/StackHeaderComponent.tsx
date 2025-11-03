import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Children, isValidElement } from 'react';
import { StyleSheet } from 'react-native';

import { StackHeaderBackButton } from './StackHeaderBackButton';
import { StackHeaderLeft } from './StackHeaderLeft';
import { StackHeaderRight } from './StackHeaderRight';
import { StackHeaderSearchBar } from './StackHeaderSearchBar';
import { StackHeaderTitle } from './StackHeaderTitle';
import type { StackHeaderProps } from '../types';

export function StackHeaderComponent(props: StackHeaderProps) {
  return null;
}

export function appendStackHeaderPropsToOptions(
  options: NativeStackNavigationOptions,
  props: StackHeaderProps
): NativeStackNavigationOptions {
  const flattenedStyle = StyleSheet.flatten(props.style);
  const flattenedLargeStyle = StyleSheet.flatten(props.largeStyle);

  if (props.hidden) {
    return { ...options, headerShown: false };
  }

  if (props.asChild) {
    return { ...options, header: () => props.children };
  }

  let updatedOptions: NativeStackNavigationOptions = {
    ...options,
    headerShown: !props.hidden,
    headerBlurEffect: props.blurEffect,
    headerStyle: {
      backgroundColor: flattenedStyle?.backgroundColor as string | undefined,
    },
    headerLargeStyle: {
      backgroundColor: flattenedLargeStyle?.backgroundColor as string | undefined,
    },
    headerShadowVisible: flattenedStyle?.shadowColor !== 'transparent',
    headerLargeTitleShadowVisible: flattenedLargeStyle?.shadowColor !== 'transparent',
  };

  function appendChildOptions(child: React.ReactElement, options: NativeStackNavigationOptions) {
    if (child.type === StackHeaderTitle) {
      const { appendStackHeaderTitlePropsToOptions } = require('./StackHeaderTitle');
      updatedOptions = appendStackHeaderTitlePropsToOptions(updatedOptions, child.props);
    } else if (child.type === StackHeaderLeft) {
      const { appendStackHeaderLeftPropsToOptions } = require('./StackHeaderLeft');
      updatedOptions = appendStackHeaderLeftPropsToOptions(updatedOptions, child.props);
    } else if (child.type === StackHeaderRight) {
      const { appendStackHeaderRightPropsToOptions } = require('./StackHeaderRight');
      updatedOptions = appendStackHeaderRightPropsToOptions(updatedOptions, child.props);
    } else if (child.type === StackHeaderBackButton) {
      const { appendStackHeaderBackButtonPropsToOptions } = require('./StackHeaderBackButton');
      updatedOptions = appendStackHeaderBackButtonPropsToOptions(updatedOptions, child.props);
    } else if (child.type === StackHeaderSearchBar) {
      const { appendStackHeaderSearchBarPropsToOptions } = require('./StackHeaderSearchBar');
      updatedOptions = appendStackHeaderSearchBarPropsToOptions(updatedOptions, child.props);
    } else {
      console.warn(
        `Warning: Unknown child element passed to Stack.Header: ${(child.type as { name: string }).name ?? child.type}`
      );
    }
    return updatedOptions;
  }

  Children.forEach(props.children, (child) => {
    if (isValidElement(child)) {
      updatedOptions = appendChildOptions(child, updatedOptions);
    }
  });

  return updatedOptions;
}
