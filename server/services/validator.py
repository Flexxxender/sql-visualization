from sqlglot import parse, expressions as exp
from sqlglot.errors import ParseError
from typing import Optional


class Validator:
    def validate(self, sql_code: str) -> str | None:
        """Проверяет SQL на валидность. Возвращает ошибку."""
        try:
            statements = parse(sql_code)
        except ParseError as e:
            return f"SQL syntax error: {e}"
        except Exception as e:
            return f"Unexpected error: {e}"

        # Ищем все GRANT statements
        grant_tables_cnt = self.__check_grant_tables_cnt(statements)
        if grant_tables_cnt != 1:
            return f"ETL-process must have only 1 result table. You have {grant_tables_cnt} tables. \nUse grants on result table."

        return None

    @staticmethod
    def __check_grant_tables_cnt(statements: Optional[exp]) -> int:
        """ Ищет все GRANT выражения """
        cnt = 0
        for stmt in statements:
            if isinstance(stmt, exp.Grant):
                for node in stmt.walk():
                    if isinstance(node, exp.Table):
                        cnt += 1
        return cnt