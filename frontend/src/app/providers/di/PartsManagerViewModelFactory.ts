// Repositories:
import { PieceRepository } from "../../../domain/data/PieceRepository";

// Data sources:
import { PieceDataSource } from "../../../domain/data/PieceRepository";

// Data source implementations:
import { PieceMockDataSource } from "../../../data/PieceMockDataSource";

// ViewModel:
import { PartsManagerViewModel } from "../../../presentation/viewModels/PartsManagerViewModel";

export class PartsManagerViewModelFactory {
  private _pieceDataSource: PieceDataSource;

  private _pieceRepository: PieceRepository;

  constructor() {
    this._pieceDataSource = new PieceMockDataSource();

    this._pieceRepository = new PieceRepository(this._pieceDataSource);
  }

  makePartsManagerViewModel() {
    return new PartsManagerViewModel(this._pieceRepository);
  }
}
