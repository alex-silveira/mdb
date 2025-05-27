import { useEffect } from 'react';
import { createTable, insertItem } from '@/data/database';
import useSpreadSheet from '@/service/usespreadsheet';

const SincronizarDados = () => {
  const { data } = useSpreadSheet();

  useEffect(() => {
    try {
        if (!data || data.length === 0) {
          console.log('Nenhum dado encontrado na planilha.');
          return;
        }

        createTable();

        data.forEach(item => {
          insertItem(item[0], item[1]);
        });

        console.log('Dados sincronizados com sucesso.');
      } catch (error) {
        console.error('Erro ao sincronizar dados:', error);
      }

      SincronizarDados();
    }, [data]);
};

export default SincronizarDados;
