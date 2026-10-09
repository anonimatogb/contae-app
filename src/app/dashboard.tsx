import CardSaldo from "@/app/components/CardSaldo";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import { Link } from "expo-router";

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

  const API_URL = "http://10.141.249.81:8000/api/transacoes";

  function calcularTotais(dados: Transacao[]): void {
    let totalReceitas = 0;
    let totalDespesas = 0;
    dados.forEach((item) => {
      const valorNumerico =
        typeof item.valor === "number" ? item.valor : parseFloat(item.valor);
      if (item.tipo === "receita") {
        totalReceitas += valorNumerico;
      } else {
        totalDespesas += valorNumerico;
      }
    });
    setReceitas(totalReceitas);
    setDespesas(totalDespesas);
    setSaldo(totalReceitas - totalDespesas);
  }

  async function carregarTransacoes(): Promise<void> {
    try {
      setCarregando(true);
      const resposta = await fetch(API_URL);
      const dados: Transacao[] = await resposta.json();
      setTransacoes(dados);
      calcularTotais(dados);
    } catch (error) {
      console.log("Erro ao carregar lançamentos:", error);
    }
  }
  useEffect(() => {
    carregarTransacoes();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.cardsSaldo}>
        <Text style={styles.labelSaldo}>Saldo Total</Text>
        <Text style={styles.valorSaldo}>R$ {saldo.toFixed(2)}</Text>
      </View>

      <View style={styles.row}>
        <CardSaldo
          titulo="Receitas"
          valor={`R$ ${receitas.toFixed(2)}`}
          corFundo="#1b5e1d"
        />
        <CardSaldo
          titulo="Despesas"
          valor={`R$ ${despesas.toFixed(2)}`}
          corFundo="#F44336"
        />
      </View>
      <Text style={styles.tituloExtrato}>Extrato Financeiro</Text>
      {carregando ? (
        <ActivityIndicator size="large" color="#b016f7" />
      ) : (
        <FlatList
          data={transacoes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemCard}>
              <View>
                <Text style={styles.itemDescricao}>{item.descricao}</Text>
                <Text style={styles.categoria}>
                  {item.categoria} - {item.data}
                </Text>
              </View>
              <Text
                style={
                  item.tipo === "receita"
                    ? styles.itemValorReceita
                    : styles.itemValorDespesa
                }
              >
                {item.tipo === "receita" ? "+" : "-"} R${" "}
                {typeof item.valor === "number"
                  ? item.valor.toFixed(2)
                  : parseFloat(item.valor).toFixed(2)}
              </Text>
            </View>
          )}
        />
      )}
      <Link href="/" style={styles.button}>Voltar</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 16,
    paddingTop: 50,
  },

  cardsSaldo: {
    backgroundColor: "#1E293B",
    padding: 20,
    borderRadius: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#334155",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },

  labelSaldo: {
    fontSize: 15,
    color: "#94A3B8",
    marginBottom: 6,
    fontWeight: "500",
  },

  valorSaldo: {
    fontSize: 30,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 24,
  },

  tituloExtrato: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 12,
  },

  itemCard: {
    backgroundColor: "#1E293B",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#334155",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },

  itemDescricao: {
    fontSize: 16,
    fontWeight: "700",
    color: "#F8FAFC",
    marginBottom: 5,
  },

  itemValorReceita: {
    fontSize: 15,
    fontWeight: "800",
    color: "#22C55E",
    marginLeft: "auto",
  },

  itemValorDespesa: {
    fontSize: 15,
    fontWeight: "800",
    color: "#EF4444",
    marginLeft: "auto",
  },

  categoria: {
    fontSize: 13,
    color: "#94A3B8",
    marginTop: 2,
  },
   button: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
  },
});
