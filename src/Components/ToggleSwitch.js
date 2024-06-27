import React, { useState } from 'react';
import { View, Switch, StyleSheet, Text } from 'react-native';

const ToggleSwitch = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  return (
    <View style={styles.container}>
      
      <Switch
        trackColor={{ false: "#767577", true:'#00A978'}}
        thumbColor={isEnabled ? "white" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height:18,
    marginTop:10
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
  },
  statusText: {
    fontSize: 24,
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default ToggleSwitch;