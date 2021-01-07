---
hide: true
---

```jsx
import React, { Component } from 'react';
import { Alert, Button, View, Platform } from 'react-native';

const alert = Platform.OS === 'web' ? window.alert : Alert.alert;

export default class Demo extends Component {
  render() {
    return (
      <View>
        <Button
          title="Press me"
          onPress={() => alert('Simple Button pressed')}
        />
      </View>
    );
  }
}
```
