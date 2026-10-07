import { Text, View, StyleSheet } from "react-native";
import {Link} from "expo-router";

export default function Sobre() {
  return (
    <View style={styles.container}>
      <Text>deu certo!!</Text>
      <Link href="/" style={styles.button}>clique aqui</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4272e2",
  },
  button: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});
