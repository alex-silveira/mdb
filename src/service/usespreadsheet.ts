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


  const getData = async (): Promise<LineSpreadSheet[]> => {
    setLoading(true);
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.idPlanilha}/values/${config.nomeAba}!${config.range}?key=${config.chaveApi}`;
      const response = await fetch(url);
      const json: SpreedSheetResponse = await response.json();
      const lines = json.values || [];
      setDados(lines);
      return lines;
    } catch (error) {
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, loading, refetch: getData };
};

export default usePlanilha;
