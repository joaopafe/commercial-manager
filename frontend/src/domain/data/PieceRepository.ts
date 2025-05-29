import { Piece } from "../entities/Piece";
import { PieceCategory } from "../entities/PieceCategory";

export interface PieceDataSource {
  list(): Promise<Piece[] | null>;
  listCategories(): Promise<PieceCategory[] | null>;
}

export class PieceRepository {
  constructor(private mock: PieceDataSource) {}

  async list(): Promise<Piece[] | null> {
    const parts = await this.mock.list();

    if (parts === null) return null;

    return parts;
  }

  async listCategories(): Promise<PieceCategory[] | null> {
    const pieceCategories = await this.mock.listCategories();

    if (pieceCategories === null) return null;

    return pieceCategories;
  }
}
