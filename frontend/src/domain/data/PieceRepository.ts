import { Piece } from "../entities/Piece";
import { PieceCategory } from "../entities/PieceCategory";

export interface PieceDataSource {
  list(): Promise<Piece[] | null>;
  listCategories(): Promise<PieceCategory[] | null>;
  add(piece: AddPieceParams): Promise<Piece | Error>;
}

export interface AddPieceParams {
  name: string;
  category: string;
  price: number;
  supplier: string;
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

  async add(piece: AddPieceParams): Promise<Piece | Error> {
    const isValidPiece =
      piece.name.length >= 3 &&
      piece.category.length >= 3 &&
      piece.price > 0 &&
      piece.supplier.length >= 2;

    if (!isValidPiece) return Error("The piece is invalid");

    const registeredPiece = await this.mock.add(piece);

    if (registeredPiece instanceof Error) return registeredPiece;

    return registeredPiece;
  }
}
