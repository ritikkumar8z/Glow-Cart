import { StyleSheet, Text, View } from "react-native";

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>© 2025 My App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 10,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
  },
  text: {
    color: "#555",
    fontSize: 14,
  },
});
