import pool from "../db/pool";

interface IProduct {
  id: number;
  name: string;
  expiration_date: Date;
  batch: number;
}
