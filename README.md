
# Laboratório de Extensão - Programação Para Dispositivos Móveis em Android

Projeto de menu para distribuidora de bebidas.

## Instalação

```bash
Instalar o node
Opcional: instalar e configurar o android studio
Instalar o app Expo Go no celular
```
## Api do google sheet:

```bash
Crie um projeto do Google Cloud para seu app, extensão ou integração do Google Workspace.

Ative a API do Google Sheet.

Adicionar a planilha no https://docs.google.com/spreadsheets/

Adicionar acesso geral para qualquer pessoa com o link
```

## Executar os comandos:

```bash
npm i
npx expo start --tunnel
```

## Arquivo de configuração:

```bash
Adicionar a pasta config na pasta **src** e adicionar o arquivo de configuração **configspreadsheets.json**

Adicione o json abaixo no arquivo **configspreadsheets.json**

{
  "chaveApi": "SUACHAVE",
  "idPlanilha": "ID DA PLANILHA",
  "nomeAba": "ESTOQUE",
  "range": "A2:B1000"
}


```
    
## Funcionalidades

- Busca de dados em planilha do google sheet api
- Cadastro de todos os dados no banco de dados sqlite 
- Sincronização dos dados da planilha com o banco de dados sqlite 
- Listagem dos dados 
- Filtro de busca do itens cadastrados 

## Stack utilizada

**Front-end:** React native, typescript, Css

**Banco de dados:** Expo sqlite


## Screenshots

![App Screenshot](https://github.com/alex-silveira/mdb/blob/main/screenshots/menudistribuidoradebebidas.jpg?raw=true)
