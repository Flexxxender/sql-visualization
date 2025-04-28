from typing import List, Dict, Set
from models.node import Node, NodeType, Edge, EdgeType
from models.table import Table
from sqlglot import parse, expressions as exp


class Parser:
    def __init__(self):
        self.nodes: Dict[str, Node] = {}
        self.edges: List[Edge] = []
        self._created_tables: Set[str] = set()

    def parse(self, sql: str) -> List:
        """Основной метод парсинга SQL"""
        self._reset_state()
        statements = parse(sql)

        for stmt in statements:
            if isinstance(stmt, exp.Create):
                self._process_create(stmt)
            elif isinstance(stmt, exp.Drop):
                self._process_drop(stmt)
            elif isinstance(stmt, exp.Grant):
                self._process_grant(stmt)

        self._find_excess_nodes()
        return self.edges

    def _reset_state(self):
        """Сброс состояния парсера"""
        self.nodes.clear()
        self.edges.clear()
        self._created_tables.clear()

    def _process_create(self, create: exp.Create):
        """Обработка CREATE TABLE"""
        target_table_name = '.'.join(filter(None, [create.this.db, create.this.name])).lower()
        self._created_tables.add(target_table_name)
        self._add_node(target_table_name, NodeType.TEMP)

        # CTE в ноды не берем
        cte_names = {
            cte.alias_or_name.lower()
            for cte in create.find_all(exp.CTE)
            if cte.alias_or_name
        }

        for source_table in create.find_all(exp.Table):
            source_name = '.'.join(filter(None, [source_table.db, source_table.name])).lower()

            if source_name != target_table_name and source_table.name.lower() not in cte_names:
                node_type = NodeType.TEMP if source_name in self._created_tables else NodeType.ORIGIN
                self._add_node(source_name, node_type)
                self._add_edge(self.nodes[source_name], self.nodes[target_table_name])

    def _process_drop(self, drop: exp.Drop):
        """Обработка DROP TABLE"""
        for node in drop.find_all(exp.Table):
            table_name = node.name.lower()
            if table_name in self._created_tables:
                self.nodes[table_name].table.was_deleted = True

    def _process_grant(self, grant: exp.Grant):
        """Обработка GRANT"""
        for node in grant.find_all(exp.Table):
            table_name = node.name.lower()
            if table_name in self.nodes:
                self.nodes[table_name].type = NodeType.RESULT

    def _find_excess_nodes(self):
        """Нахождение лишних нод"""
        result_node = next((node for node in self.nodes.values()
                            if node.type == NodeType.RESULT), None)
        if not result_node:
            return

        reachable = set()
        stack = [result_node]

        while stack:
            current = stack.pop()
            if current.table.name in reachable:
                continue

            reachable.add(current.table.name)

            for edge in self.edges:
                if edge.target.table.name == current.table.name:
                    stack.append(edge.source)

        # Пометка EXCESS
        for node in self.nodes.values():
            name_name = node.table.name.lower()
            if name_name not in reachable:
                node.type = NodeType.EXCESS

        for edge in self.edges:
            if edge.source.type == NodeType.EXCESS or edge.target.type == NodeType.EXCESS:
                edge.type = EdgeType.EXCESS


    def _add_node(self, table_name: str, node_type: NodeType):
        """Добавляет или обновляет ноду"""
        table_name = table_name.lower()
        if table_name in self.nodes:
            self.nodes[table_name].type = node_type
        else:
            self.nodes[table_name] = Node(Table(table_name), node_type)

    def _add_edge(self, source: Node, target: Node):
        """Добавляет связь между таблицами"""
        self.edges.append(Edge(source, target))