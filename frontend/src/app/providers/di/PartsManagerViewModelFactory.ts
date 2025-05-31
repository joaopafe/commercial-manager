// Repositories:
import { PieceRepository } from "../../../domain/data/PieceRepository";
import { SupplierRepository } from "../../../domain/data/SupplierRepository";

// Data sources:
import { PieceDataSource } from "../../../domain/data/PieceRepository";
import { SupplierDataSource } from "../../../domain/data/SupplierRepository";

// Data source implementations:
import { PieceMockDataSource } from "../../../data/PieceMockDataSource";
import { SupplierMockDataSource } from "../../../data/SuppilerMockDataSource";

// ViewModel:
import { PartsManagerViewModel } from "../../../presentation/viewModels/PartsManagerViewModel";

export class PartsManagerViewModelFactory {
  private _pieceDataSource: PieceDataSource;
  private _supplierDataSource: SupplierDataSource;

  private _pieceRepository: PieceRepository;
  private _supplierRepository: SupplierRepository;

  constructor() {
    this._pieceDataSource = new PieceMockDataSource();
    this._supplierDataSource = new SupplierMockDataSource();

    this._pieceRepository = new PieceRepository(this._pieceDataSource);
    this._supplierRepository = new SupplierRepository(this._supplierDataSource);
  }

  makePartsManagerViewModel() {
    return new PartsManagerViewModel(
      this._pieceRepository,
      this._supplierRepository
    );
  }
}
