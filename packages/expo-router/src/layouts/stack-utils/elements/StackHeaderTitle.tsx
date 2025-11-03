import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

import type { StackHeaderTitleProps } from '../types';

export function StackHeaderTitle(props: StackHeaderTitleProps) {
  return null;
}

export function appendStackHeaderTitlePropsToOptions(
  options: NativeStackNavigationOptions,
  props: StackHeaderTitleProps
): NativeStackNavigationOptions {
  const flattenedStyle = StyleSheet.flatten(props.style);
  const flattenedLargeStyle = StyleSheet.flatten(props.largeStyle);

  return {
    ...options,
    title: props.children,
    headerLargeTitle: props.large,
    headerTitleAlign: flattenedStyle?.textAlign,
    headerTitleStyle: {
      ...flattenedStyle,
      color: (flattenedStyle?.color as string) ?? undefined,
    },
    headerLargeTitleStyle: {
      ...flattenedLargeStyle,
      fontWeight: flattenedLargeStyle?.fontWeight?.toString(),
      color: (flattenedLargeStyle?.color as string) ?? undefined,
    },
  };
}
