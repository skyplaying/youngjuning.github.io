---
title: 'React Native'
nav:
  title: '预览'
---

```jsx
import React, { Component } from 'react';
import { View, Button } from 'react-native';

export default class Demo extends Component {
  render() {
    return (
      <View>
        <Button
          title="点我"
          onPress={() => {
            alert('Hello');
          }}
        />
      </View>
    );
  }
}
```
