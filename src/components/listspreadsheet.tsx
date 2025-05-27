import React, { useEffect, useState} from 'react';
import { FlatList, Text, ActivityIndicator, View, StyleSheet, TextInput } from 'react-native';
import useSpreadSheet, { LineSpreadSheet } from '@/service/usespreadsheet';
import { formatCurrencyBRL } from '@/utils/formatcurrency';
import SearchFilter from '@/components/filter/searchFilter';

const ListaPlanilha = () => {
  const { data, loading } = useSpreadSheet();
  const [search, setSearch] = useState('');

  // 🔍 Filtra os dados conforme o texto digitado
  const dataFilter = data.filter(item =>
    item[0]?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!data.length) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Nenhum dado encontrado.</Text>
      </View>
    );
  }

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerDescricao}>Descrição</Text>
      <Text style={styles.headerPreco}>Preço</Text>
    </View>
  );

  const renderItem = ({ item }: { item: LineSpreadSheet }) => (
    <View style={styles.itemContainer}>
      <View style={styles.columnDescription}>
        <Text style={styles.text}>{item[0]}</Text>
      </View>

      <View style={styles.columnPrice}>
        <Text style={styles.text}>{formatCurrencyBRL(Number(item[1]))}</Text>
      </View>
    </View>
  );

  return (
 <View style={{ flex: 1, padding: 10 }}>
    <SearchFilter
      placeholder="Buscar descrição..."
      value={search}
      onChangeText={setSearch}
    />

    <FlatList
      data={dataFilter}
      keyExtractor={(_, index) => index.toString()}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  columnDescription: {
    flex: 1, // Ocupa 50% da largura
    justifyContent: 'center',
  },
  columnPrice: {
    flex: 1, // Ocupa 50% da largura
    justifyContent: 'center',
    marginLeft: 70,
    paddingHorizontal: 5,
    
  },
  text: {
    fontSize: 16,
    color: '#333',
    flexWrap: 'wrap'
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#eaeaea',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  headerDescricao: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'left',
    paddingHorizontal: 5,
  },
  headerPreco: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 70,
 
  },

  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default ListaPlanilha;
