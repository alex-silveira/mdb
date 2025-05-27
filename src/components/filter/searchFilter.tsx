import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

type SearchFilterProps = {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
};

const SearchFilter: React.FC<SearchFilterProps> = ({
  placeholder = 'Buscar...',
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default SearchFilter;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginTop: 10
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
});
