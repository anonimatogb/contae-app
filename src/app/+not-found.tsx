import { Text, View, StyleSheet } from "react-native";
import {Link, Stack} from "expo-router";

export default function NotFound() {
  return (
    <>
    <Stack.Screen options={{ title: "Página não encontrada" }} />
      <View style={styles.container}>
        <Text>Você está perdido?</Text>
        <Link href="/" style={styles.button}>clique aqui</Link>
      </View>
    </>
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
