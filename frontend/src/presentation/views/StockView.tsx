import React, { useEffect, useMemo, useState } from "react";

import { StockViewModelFactory } from "../../app/providers/di/StockViewModelFactory";

import { StockSection } from "../components/StockSection";
import { Loader } from "../components/Loader";

interface StockViewProps {
  stockViewModelFactory: StockViewModelFactory;
}

export const StockView: React.FC<StockViewProps> = ({
  stockViewModelFactory,
}) => {
  const stockViewModel = useMemo(
    () => stockViewModelFactory.makeStockViewModel(),
    []
  );

  const [state, setState] = useState(stockViewModel.state);

  useEffect(() => {
    stockViewModel.stateListener = setState;

    return () => {
      stockViewModel.stateListener = null;
    };
  }, []);

  useEffect(() => {
    stockViewModel.getStock();
    stockViewModel.getSuppliers();
  }, []);

  const stockSections = state.isSearching ? (
    <Loader />
  ) : state.partsStockCategories === null ? (
    <div className="information-value">Peças não encontradas</div>
  ) : (
    state.partsStockCategories.map((partsStockCategory, index) => {
      return (
        <StockSection
          category={partsStockCategory.category}
          items={partsStockCategory.partsStock}
          suppliers={state.suppliers ? state.suppliers : []}
          openModal={(isEntryStockModal) =>
            stockViewModel.openModal(isEntryStockModal)
          }
          changePieceCode={(pieceCode) =>
            stockViewModel.changePieceCode(pieceCode)
          }
          changeTotalQuantity={(totalQuantity) =>
            stockViewModel.changeTotalQuantity(totalQuantity)
          }
          key={index}
        />
      );
    })
  );

  return (
    <div className="stock">
      <div className="header">
        <div className="message">Gerenciamento de Estoque</div>
      </div>

      <div className="stock-sections">{stockSections}</div>

      <div
        className="stock-modal"
        style={{
          display: stockViewModel.state.showEntryStockModal ? "flex" : "none",
        }}
      >
        <div className="stock-modal-title">Entrada de Estoque</div>

        <form className="stock-modal-form">
          <label className="quantity-label" htmlFor="">
            Quantidade a adicionar:
          </label>
          <input
            className="quantity-input"
            type="number"
            value={state.insertionField}
            onChange={(e) =>
              stockViewModel.changeInsertionField(parseInt(e.target.value))
            }
          />
        </form>

        <div className="modal-buttons">
          <button
            type="submit"
            className="confirm-register"
            disabled={!state.insertionAllowed}
            onClick={() =>
              stockViewModel.insertStock(state.pieceCode, state.insertionField)
            }
          >
            Confirmar
          </button>
          <button
            type="submit"
            className="cancel-register"
            onClick={() => stockViewModel.closeModal()}
          >
            Cancelar
          </button>
        </div>
      </div>

      <div
        className="stock-modal"
        style={{
          display: stockViewModel.state.showOutputStockModal ? "flex" : "none",
        }}
      >
        <div className="stock-modal-title">Saída de Estoque</div>

        <form className="stock-modal-form">
          <label className="quantity-label" htmlFor="">
            Quantidade a remover:
          </label>
          <input
            className="quantity-input"
            type="number"
            value={state.remotionField}
            onChange={(e) =>
              stockViewModel.changeRemotionField(
                parseInt(e.target.value),
                state.totalQuantity
              )
            }
          />
        </form>

        <div className="modal-buttons">
          <button
            type="submit"
            className="confirm-register"
            disabled={!state.remotionAllowed}
            onClick={() =>
              stockViewModel.remotionStock(state.pieceCode, state.remotionField)
            }
          >
            Confirmar
          </button>
          <button
            type="submit"
            className="cancel-register"
            onClick={() => stockViewModel.closeModal()}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
