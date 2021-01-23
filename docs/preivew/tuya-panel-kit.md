---
title: 'tuya-panel-kit'
hide: true
---

```tsx
import React, { Component } from 'react';
import { View } from 'react-native';
import { Dialog, Button } from 'tuya-panel-kit';
import TuyaWrapper from '../../components/TuyaWrapper';

export default () => {
  return (
    <TuyaWrapper>
      <Button
        text="点我弹窗"
        onPress={() => {
          Dialog.alert({
            title: '标题',
            subTitle: '副标题',
            confirmText: '确认',
            onConfirm: (data, { close }) => {
              close();
            },
          });
          Dialog.alert({
            title: '标题1',
            subTitle: '副标题1',
            confirmText: '确认1',
            onConfirm: (data, { close }) => {
              close();
            },
          });
        }}
      />
    </TuyaWrapper>
  );
};
```
