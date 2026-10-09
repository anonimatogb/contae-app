import { Text, View, StyleSheet } from "react-native";
import {Link} from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Hello World!!</Text>
      <Link href="sobre" style={styles.button}>Sobre</Link>
      <Link href="dashboard" style={styles.button}>Dashboard</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#a50000",
  },
  button: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});
