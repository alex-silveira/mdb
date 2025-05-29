import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert, StyleSheet, Text } from 'react-native';
import useSpreadsheet from '@/service/usespreadsheet';
import { createTable, selectItems, replaceAllItems } from '@/data/database';
import { Item } from '@/models/Item';
import DataList from '@/components/dataList';
import { Button } from '@/components/button';

import * as SystemUI from 'expo-system-ui';

SystemUI.setBackgroundColorAsync('#262525'); // Cor da navigation bar

const Home: React.FC = () => {
  const { loading: loadingPlanilha, refetch } = useSpreadsheet();
  const [items, setItems] = useState<Item[]>([]);
  const [loadingDB, setLoadingDB] = useState<boolean>(false);

  const loadDataDB = async () => {
    setLoadingDB(true);
    try {
      const result = await selectItems();
      setItems(result);
    } catch (error) {
      Alert.alert('Erro ao carregar dados do banco');
      console.error(error);
    } finally {
      setLoadingDB(false);
    }
  };

  const syncData = async () => {
    const updatedData = await refetch();
    if (updatedData.length === 0) {
      Alert.alert('Nenhum dado na planilha para sincronizar');
      return;
    }

    try {
      await createTable();

      const dataFormat: [number, string, string][] = updatedData.map(item => [
        Number(item[0]),      // id
        String(item[1]),      // name
        String(item[2]),      // price
      ]);

      await replaceAllItems(dataFormat);

      Alert.alert('Dados sincronizados com sucesso');
      loadDataDB();
    } catch (error) {
      Alert.alert('Erro na sincronização');
      console.error(error);
    }
  };

  useEffect(() => {
    const init = async () => {
      await createTable();
      await loadDataDB();
    };
    init();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Sincronizar Menu" onPress={syncData} />

      {(loadingDB || loadingPlanilha) && <ActivityIndicator size="large" color="#0000ff" />}

      {items.length === 0 && !loadingDB && (
        <Text style={styles.text}>Nenhum item no banco</Text>
      )}

      <DataList items={items} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  text: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});
