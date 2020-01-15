import React, { useCallback } from 'react';
import { RangeSlider as RangeSliderField } from '@shopify/polaris';
import {
  RangeSliderProps as PolarisRangeSliderProps,
  RangeSliderValue,
} from '@shopify/polaris/types/components/RangeSlider/types';
import { usePolarisField, UsePolarisFieldProps } from './usePolarisField';
import { Omit } from './types';

type Props<V> = UsePolarisFieldProps<V, string> & PolarisRangeSliderProps;

export type RangeSliderProps<V = any> = Omit<
  Props<V>,
  'id' | 'value' | 'onChange' | 'onBlur' | 'onFocus' | 'error'
>;

function RangeSlider<V = any>(props: RangeSliderProps<V>) {
  const { name, encode, decode, validate, ...polarisProps } = props;

  const {
    value: rawValue,
    isSubmitting,
    handleFocus,
    handleBlur,
    handleChange,
    error,
  } = usePolarisField<V, string>({ name, encode, decode, validate });

  const value = rawValue === undefined ? '' : rawValue;
  if (typeof value !== 'number') {
    throw new Error(
      `[RangeSlider] Found value of type "${typeof value}" for field "${name}". Requires number (after decode)`,
    );
  }

  const handleChangeValue = useCallback(
    (v: RangeSliderValue) => {
      handleChange(v.toString());
    },
    [handleChange],
  );

  return (
    <RangeSliderField
      disabled={isSubmitting}
      {...polarisProps}
      id={name}
      value={value}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChangeValue}
      error={error}
    />
  );
}

export default RangeSlider;
