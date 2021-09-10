import * as React from 'react';
import {showOptions} from '../components/_partials/toast';

export const toastRef = React.createRef<any>();

export const showToast = (value?: string, options?: showOptions) => {
  toastRef?.current?.show(value, options);
};

export default {
  showToast,
  show: showToast,
};
