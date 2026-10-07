import{Text, View, StyleSheet} from "react-native";
import {Link} from "expo-router";

interface CardSaldoProps {
    titulo:string;
    valor: string|number;
    corFundo: string;
}

export default function CardSaldo({titulo, valor, corFundo}:CardSaldoProps){
    return(
        <View style={[styles.card, {backgroundColor: corFundo}]}>
            <Text style={styles.label}>{titulo}</Text>
            <Text style={styles.valor}>{valor}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    card:{
        width: 150,
        height: 100,
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
    label:{
        fontSize: 16,
        fontWeight: "bold",
    },
    valor:{
        fontSize: 20,
        fontWeight: "bold",
    }
});