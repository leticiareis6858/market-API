import pool from "../db/pool";
import { IProduct } from "./products"; // Import the Product interface or class from the appropriate file

interface IBatch {
  id: number;
  products: IProduct[];
  creation_date: Date;
}
