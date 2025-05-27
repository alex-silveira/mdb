import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert, StyleSheet, Text } from 'react-native';
import usePlanilha from '@/service/usespreadsheet';
import { createTable, selectItems, insertItem } from '@/data/database';
import { Item } from '@/models/Item';
import DataList from '@/components/dataList';
import { Button } from '@/components/button';

const Home: React.FC = () => {
  const { data, loading: loadingPlanilha } = usePlanilha();
  const [itens, setItens] = useState<Item[]>([]);
  const [loadingDB, setLoadingDB] = useState<boolean>(false);

  const carregarDadosDB = async () => {
    setLoadingDB(true);
    try {
      const resultado = await selectItems();
      setItens(resultado);
    } catch (error) {
      Alert.alert('Erro ao carregar dados do banco');
    } finally {
      setLoadingDB(false);
    }
  };

  const sincronizarDados = () => {
    if (data.length === 0) {
      Alert.alert('Nenhum dado na planilha para sincronizar');
      return;
    }

    createTable();

    data.forEach(item => {
      const name = item[0] || 'Sem Nome';
      const description = item[1] || 'Sem Descrição';
      insertItem(name, description);
    });

    Alert.alert('Dados sincronizados com sucesso');
    carregarDadosDB();
  };

  useEffect(() => {
    createTable();
    carregarDadosDB();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Sincronizar Menu" onPress={sincronizarDados} />

      {(loadingDB || loadingPlanilha) && <ActivityIndicator size="large" color="#0000ff" />}

      {itens.length === 0 && !loadingDB && (
        <Text style={styles.text}>Nenhum item no banco</Text>
      )}

      <DataList items={itens} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,

  },
  text: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});
