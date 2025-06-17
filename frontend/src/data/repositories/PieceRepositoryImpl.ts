import { Piece } from "../../domain/entities/Piece";
import { PieceCategory } from "../../domain/entities/PieceCategory";

import { PieceRepository } from "../../domain/repositories/PieceRepository";

import { AddPieceParams } from "../../domain/useCases/CreatePiece";

export interface PieceDataSource {
  list(): Promise<Piece[] | null>;
  listCategories(): Promise<PieceCategory[] | null>;
  add(piece: AddPieceParams): Promise<Piece | Error>;
  edit(piece: Piece): Promise<Piece | Error>;
  remove(pieceCode: number): Promise<Piece | Error>;
}

export class PieceRepositoryImpl implements PieceRepository {
  constructor(private dataSource: PieceDataSource) {}

  async listPieces(): Promise<Piece[] | null> {
    const parts = await this.dataSource.list();

    return parts;
  }

  async listCategories(): Promise<PieceCategory[] | null> {
    const pieceCategories = await this.dataSource.listCategories();

    return pieceCategories;
  }

  async addPiece(piece: AddPieceParams): Promise<Piece | Error> {
    const registeredPiece = await this.dataSource.add(piece);

    return registeredPiece;
  }

  async editPiece(piece: Piece): Promise<Piece | Error> {
    const editedPiece = await this.dataSource.edit(piece);

    return editedPiece;
  }

  async removePiece(pieceCode: number): Promise<Piece | Error> {
    const removedPiece = await this.dataSource.remove(pieceCode);

    return removedPiece;
  }
}
