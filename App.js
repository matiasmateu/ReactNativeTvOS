import React from 'react';
import { View, Text, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const Screen1 = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Screen1</Text>
      <Button
        title="Go to Screen2"
        onPress={() => navigation.navigate('Screen2')}
      />
    </View>
  );
};

const Screen2 = () => {
  const navigation = useNavigation();
  React.useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault(); // Prevent default action <- This is what is failing. This is not being prevented. and the hook is called after the screen is removed.
    });
  }, [])
  return (
    <View>
      <Text>Screen2</Text>
      <Button
        title="Go to Screen1"
        onPress={() => navigation.navigate('Screen1')}
      />
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Screen1" component={Screen1} />
        <Stack.Screen name="Screen2" component={Screen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;