import { Button, Text } from 'react-native';

import { Stack } from 'expo-router';
import { useState } from 'react';


export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => <Button onPress={() => setCount(c => c + 1)} title="Update count" />,
        }}
      />
      <Text>Welcome to Master Bots</Text>
      <Text>Count: {count}</Text>
    </>
  );
}
