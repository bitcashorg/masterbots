import { Stack } from "expo-router/stack";
import { SafeAreaView, StyleSheet, View } from "react-native";

import { Drawer } from 'expo-router/drawer';

const RouterStrategy = () => {
  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Home',
          title: 'overview',
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: 'Profile',
          title: 'overview',
        }}
      />
    </Drawer>
  );
}

export default function Layout() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <RouterStrategy />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 0,
    alignItems: "center",
  },
  content: {
    flex: 1,
    width: "100%",
    maxWidth: 550,
  },
});
