import React, { useState } from 'react';
import { FlatList, Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { Item } from '@/models/Item';
import SearchFilter from '@/components/filter/searchFilter';
import { formatCurrencyBRL } from '@/utils/formatcurrency';
interface Props {
  items: Item[];
}

const DataList: React.FC<Props> = ({ items }) => {

 const [search, setSearch] = useState<string>(''); // Para armazenar o texto digitado no campo de busca

 // Função para filtrar os itens com base no nome
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <SearchFilter
        placeholder="Digita o nome do produto aqui..."
        value={search}
        onChangeText={setSearch}
      />
      {/* Cabeçalho */}
      <View style={[styles.row, styles.header]}>
        <Text style={[styles.cell, styles.headerText]}>Nome</Text>
        <Text style={[styles.cell, styles.headerText]}>Preço</Text>
      </View>

      {/* Lista */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{formatCurrencyBRL(Number(item.price))}</Text>

          </View>
        )}
      />
    </View>
    </SafeAreaView>
  );
};

export default DataList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 2,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
  },
});
