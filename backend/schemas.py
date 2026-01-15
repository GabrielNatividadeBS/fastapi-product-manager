from pydantic import BaseModel, ConfigDict
from models import CategoryGroup

class ProductCreate(BaseModel):
    """
    Schema para criação de produtos (entrada de dados na criação).
    """
    name: str
    category: str
    description: str | None = None
    price: float
    stock: bool = False


class ProductUpdate(BaseModel):
    """
    Schema para atualização parcial de produtos (campos opcionais).
    """
    name: str | None = None
    category: str | None = None
    description: str | None = None
    price: float | None = None
    stock: bool | None = None


class ProductRead(BaseModel):
    """
    Schema de saída para leitura de produtos (resposta da API).
    """
    id: int
    name: str
    category: str
    category_group: CategoryGroup
    description: str | None
    price: float
    stock: bool

    model_config = ConfigDict(from_attributes = True)


