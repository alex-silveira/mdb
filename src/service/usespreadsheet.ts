import { useEffect, useState } from 'react';
import config from '@/config/configspreadsheets.json'; 

export interface LineSpreadSheet {
  [index: number]: string;
}

interface SpreedSheetResponse {
  values: LineSpreadSheet[];
}

const usePlanilha = () => {
  const [data, setDados] = useState<LineSpreadSheet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


  const getData = async () => {
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.idPlanilha}/values/${config.nomeAba}!${config.range}?key=${config.chaveApi}`;
      const response = await fetch(url);
      const json: SpreedSheetResponse = await response.json();
      const linhas = json.values || [];
      setDados(linhas);
    } catch (error) {
      console.error('Erro ao buscar dados da planilha:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, loading };
};

export default usePlanilha;
