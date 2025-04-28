from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.validator import Validator
from services.parser import Parser

router = APIRouter(prefix="/sql", tags=["SQL Processing"])


class SQLRequest(BaseModel):
    sql: str


class SQLResponse(BaseModel):
    edges: list[dict]
    errors: list[str] = []


@router.post("/parse")
async def parse_sql(request: SQLRequest):
    validator = Validator()
    parser = Parser()

    # Валидация
    if error := validator.validate(request.sql):
        raise HTTPException(
            status_code=400,
            detail={"errors": [error]}
        )

    # Парсинг
    try:
        edges = parser.parse(request.sql)
        return {
            "edges": edges,
            "errors": []
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail={"errors": [f"Parsing failed: {str(e)}"]}
        )
