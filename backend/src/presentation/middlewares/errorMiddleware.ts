import { Request, Response, NextFunction } from "express";
import { CelebrateError } from "celebrate";

import {
  DomainError,
  DomainErrorCode,
} from "../../domain/entities/errors/DomainError";
import {
  CategoryError,
  CategoryErrorCode,
} from "../../domain/entities/errors/CategoryError";
import {
  CustomerError,
  CustomerErrorCode,
} from "../../domain/entities/errors/CustomerError";
import {
  ItemError,
  ItemErrorCode,
} from "../../domain/entities/errors/ItemError";
import {
  ProductPurchaseError,
  ProductPurchaseErrorCode,
} from "../../domain/entities/errors/ProductPurchaseError";
import {
  ProductSaleError,
  ProductSaleErrorCode,
} from "../../domain/entities/errors/ProductSaleError";
import {
  ServicePurchaseError,
  ServicePurchaseErrorCode,
} from "../../domain/entities/errors/ServicePurchaseError";
import {
  ServiceSaleError,
  ServiceSaleErrorCode,
} from "../../domain/entities/errors/ServiceSaleError";
import {
  StockError,
  StockErrorCode,
} from "../../domain/entities/errors/StockError";
import {
  SupplierError,
  SupplierErrorCode,
} from "../../domain/entities/errors/SupplierError";

interface ApiErrorResponse {
  status: number;
  content: {
    code: string;
    message: string;
  };
}

export const errorMiddleware = (
  error: any,
  _: Request,
  res: Response,
  __: NextFunction
): void => {
  let response: ApiErrorResponse;

  if (error instanceof DomainError) {
    response = DomainErrorHandler.formatResponse(error);
  } else if (error instanceof CelebrateError) {
    response = CelebrateErrorHandler.formatResponse(error);
  } else if (error instanceof CategoryError) {
    response = CategoryErrorHandler.formatResponse(error);
  } else if (error instanceof CustomerError) {
    response = CustomerErrorHandler.formatResponse(error);
  } else if (error instanceof ItemError) {
    response = ItemErrorHandler.formatResponse(error);
  } else if (error instanceof ProductPurchaseError) {
    response = ProductPurchaseErrorHandler.formatResponse(error);
  } else if (error instanceof StockError) {
    response = StockErrorErrorHandler.formatResponse(error);
  } else if (error instanceof SupplierError) {
    response = SupplierErrorHandler.formatResponse(error);
  } else {
    response = ServerErrorHandler.formatResponse(error);
    console.error(response.content, error);
  }

  res.status(response.status).json(response.content);
};

class DomainErrorHandler {
  private static statusMapper: Record<DomainErrorCode, number> = {
    invalid_value: 400,
    unknown: 500,
  };

  static formatResponse(error: DomainError): ApiErrorResponse {
    const status = DomainErrorHandler.statusMapper[error.code];

    const content = {
      code: error.code,
      message: error.message,
    };

    return { status, content };
  }
}

class CelebrateErrorHandler {
  static formatResponse(error: CelebrateError): ApiErrorResponse {
    const status = 400;

    let segment = "";
    for (const entry of error.details.entries()) {
      segment = entry[0];
      break;
    }

    const message = error.details.get(segment)?.message ?? "";

    const content = {
      code: "validation_error",
      message,
    };

    return { status, content };
  }
}

class CategoryErrorHandler {
  private static statusMapper: Record<CategoryErrorCode, number> = {
    internal_server_error: 500,
    category_not_found: 404,
    id_is_invalid: 400,
    name_is_invalid: 400,
  };

  static formatResponse(error: CategoryError): ApiErrorResponse {
    const status = CategoryErrorHandler.statusMapper[error.code];

    const content = {
      code: error.code,
      message: error.message,
    };

    return { status, content };
  }
}

class CustomerErrorHandler {
  private static statusMapper: Record<CustomerErrorCode, number> = {
    internal_server_error: 500,
    customer_not_found: 404,
    id_is_invalid: 400,
    cpf_is_invalid: 400,
    name_is_invalid: 400,
    email_is_invalid: 400,
    phone_is_invalid: 400,
  };

  static formatResponse(error: CustomerError): ApiErrorResponse {
    const status = CustomerErrorHandler.statusMapper[error.code];

    const content = {
      code: error.code,
      message: error.message,
    };

    return { status, content };
  }
}

class ItemErrorHandler {
  private static statusMapper: Record<ItemErrorCode, number> = {
    internal_server_error: 500,
    item_not_found: 404,
    id_is_invalid: 400,
    name_is_invalid: 400,
    category_id_is_invalid: 400,
    price_is_invalid: 400,
    supplier_id_is_invalid: 400,
    stock_quantity_is_invalid: 400,
  };

  static formatResponse(error: ItemError): ApiErrorResponse {
    const status = ItemErrorHandler.statusMapper[error.code];

    const content = {
      code: error.code,
      message: error.message,
    };

    return { status, content };
  }
}

class ProductPurchaseErrorHandler {
  private static statusMapper: Record<ProductPurchaseErrorCode, number> = {
    internal_server_error: 500,
    product_purchase_not_found: 404,
    id_is_invalid: 400,
    supplier_id_is_invalid: 400,
    item_id_is_invalid: 400,
    quantity_is_invalid: 400,
    value_is_invalid: 400,
    date_is_invalid: 400,
  };

  static formatResponse(error: ProductPurchaseError): ApiErrorResponse {
    const status = ProductPurchaseErrorHandler.statusMapper[error.code];

    const content = {
      code: error.code,
      message: error.message,
    };

    return { status, content };
  }
}

class ProductSaleErrorHandler {
  private static statusMapper: Record<ProductSaleErrorCode, number> = {
    internal_server_error: 500,
    product_sale_not_found: 404,
    id_is_invalid: 400,
    customer_id_is_invalid: 400,
    item_id_is_invalid: 400,
    quantity_is_invalid: 400,
    value_is_invalid: 400,
    date_is_invalid: 400,
  };

  static formatResponse(error: ProductSaleError): ApiErrorResponse {
    const status = ProductSaleErrorHandler.statusMapper[error.code];

    const content = {
      code: error.code,
      message: error.message,
    };

    return { status, content };
  }
}

class ServicePurchaseErrorHandler {
  private static statusMapper: Record<ServicePurchaseErrorCode, number> = {
    internal_server_error: 500,
    service_purchase_not_found: 404,
    id_is_invalid: 400,
    supplier_id_is_invalid: 400,
    name_is_invalid: 400,
    value_is_invalid: 400,
    date_is_invalid: 400,
  };

  static formatResponse(error: ServicePurchaseError): ApiErrorResponse {
    const status = ServicePurchaseErrorHandler.statusMapper[error.code];

    const content = {
      code: error.code,
      message: error.message,
    };

    return { status, content };
  }
}

class ServiceSaleErrorHandler {
  private static statusMapper: Record<ServiceSaleErrorCode, number> = {
    internal_server_error: 500,
    service_sale_not_found: 404,
    id_is_invalid: 400,
    customer_id_is_invalid: 400,
    name_is_invalid: 400,
    value_is_invalid: 400,
    date_is_invalid: 400,
  };

  static formatResponse(error: ServiceSaleError): ApiErrorResponse {
    const status = ServiceSaleErrorHandler.statusMapper[error.code];

    const content = {
      code: error.code,
      message: error.message,
    };

    return { status, content };
  }
}

class StockErrorErrorHandler {
  private static statusMapper: Record<StockErrorCode, number> = {
    internal_server_error: 500,
    stock_item_not_found: 404,
    id_is_invalid: 400,
    quantity_invalid: 400,
  };

  static formatResponse(error: StockError): ApiErrorResponse {
    const status = StockErrorErrorHandler.statusMapper[error.code];

    const content = {
      code: error.code,
      message: error.message,
    };

    return { status, content };
  }
}

class SupplierErrorHandler {
  private static statusMapper: Record<SupplierErrorCode, number> = {
    internal_server_error: 500,
    supplier_not_found: 404,
    id_is_invalid: 400,
    cnpj_is_invalid: 400,
    name_is_invalid: 400,
    phone_is_invalid: 400,
  };

  static formatResponse(error: SupplierError): ApiErrorResponse {
    const status = SupplierErrorHandler.statusMapper[error.code];

    const content = {
      code: error.code,
      message: error.message,
    };

    return { status, content };
  }
}

class ServerErrorHandler {
  static formatResponse(error: any): ApiErrorResponse {
    const status = 500;

    const message = error instanceof Error ? error.message : String(error);

    const content = {
      code: "internal_server_error",
      message,
    };

    return { status, content };
  }
}
