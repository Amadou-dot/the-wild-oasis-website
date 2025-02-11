import { config } from 'mssql';

const server = process.env.AZURE_SQL_SERVER;
const database = process.env.AZURE_SQL_DATABASE;
const port = process.env.AZURE_SQL_PORT
  ? parseInt(process.env.AZURE_SQL_PORT)
  : 1433;
const user = process.env.AZURE_SQL_USER;
const password = process.env.AZURE_SQL_PASSWORD;

export const passwordConfig: config = {
  server: server || '',
  port,
  database,
  user,
  password,
  options: {
    encrypt: true,
  },
};
