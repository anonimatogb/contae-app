import CardSaldo from "@/app/components/CardSaldo";
import {useEffect, useState} from "react";
import{ActivityIndicator, ScrollView, StyleSheet, Text, View} from "react-native";

interface Transacao {

    id: number;
    descricao: string;
    valor: string | number;
    tipo: "receita" | "despesa";  
    categoria: string;
    data: string;
}

export default function App() {
    const [transacoes, setTransacoes] = useState<Transacao[]>([]);
    const [carregando, setCarregando] = useState<boolean>(true);
    const [saldo, setSaldo] = useState<number>(0);
    const [receitas, setReceitas] = useState<number>(0);
    const [despesas, setDespesas] = useState<number>(0);
 
const API_URL = 'http://10.141.249.81:8000/api/transacoes';

 function calcularTotais(dados: Transacao[]): void {
 let totalReceitas = 0;
 let totalDespesas = 0;
 dados.forEach((item) =>{
    const valorNumerico = typeof item.valor === 'number'? item.valor : parseFloat(item.valor);
    if(item.tipo === 'receita'){
        totalReceitas += valorNumerico;
    }else{
        totalDespesas += valorNumerico;
    }
 });
 setReceitas(totalReceitas);
 setDespesas(totalDespesas);
 setSaldo(totalReceitas - totalDespesas);
 }

async function carregarTransacoes(): Promise<void> {
    try{
        setCarregando(true);
        const resposta = await fetch(API_URL);
        const dados: Transacao[] = await resposta.json();
        setTransacoes(dados);
        calcularTotais(dados);

}catch (error) {
    console.log("Erro ao carregar lançamentos:", error);

}
}
}