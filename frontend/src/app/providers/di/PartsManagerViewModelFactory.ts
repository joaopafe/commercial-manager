// Use cases:
import { GetParts } from "../../../domain/useCases/GetParts";
import { GetPieceCategories } from "../../../domain/useCases/GetPieceCategories";
import { CreatePiece } from "../../../domain/useCases/CreatePiece";
import { EditPiece } from "../../../domain/useCases/EditPiece";
import { RemovePiece } from "../../../domain/useCases/RemovePiece";
import { GetSuppliers } from "../../../domain/useCases/GetSuppliers";

// Repositories implementations:
import { PieceRepositoryImpl } from "../../../data/repositories/PieceRepositoryImpl";
import { SupplierRepositoryImpl } from "../../../data/repositories/SupplierRepositoryImpl";

// Data sources:
import { PieceDataSource } from "../../../data/repositories/PieceRepositoryImpl";
import { SupplierDataSource } from "../../../data/repositories/SupplierRepositoryImpl";

// Data source implementations:
import { PieceMockDataSource } from "../../../data/dataSources/PieceMockDataSource";
import { SupplierMockDataSource } from "../../../data/dataSources/SuppilerMockDataSource";

// ViewModel:
import { PartsManagerViewModel } from "../../../presentation/viewModels/PartsManagerViewModel";

export class PartsManagerViewModelFactory {
  private _pieceDataSource: PieceDataSource;
  private _supplierDataSource: SupplierDataSource;

  private _pieceRepository: PieceRepositoryImpl;
  private _supplierRepository: SupplierRepositoryImpl;

  constructor() {
    this._pieceDataSource = new PieceMockDataSource();
    this._supplierDataSource = new SupplierMockDataSource();

    this._pieceRepository = new PieceRepositoryImpl(this._pieceDataSource);
    this._supplierRepository = new SupplierRepositoryImpl(
      this._supplierDataSource
    );
  }

  makePartsManagerViewModel() {
    const getParts = new GetParts(this._pieceRepository);
    const getPieceCategories = new GetPieceCategories(this._pieceRepository);
    const createPiece = new CreatePiece(this._pieceRepository);
    const editPiece = new EditPiece(this._pieceRepository);
    const removePiece = new RemovePiece(this._pieceRepository);
    const getSuppliers = new GetSuppliers(this._supplierRepository);

    return new PartsManagerViewModel(
      getParts,
      getPieceCategories,
      createPiece,
      editPiece,
      removePiece,
      getSuppliers
    );
  }
}
