from __future__ import annotations
from .table import Table
from enum import Enum
from typing import Dict


class NodeType(Enum):
    TEMP = "temp"  # временная
    EXCESS = "excess"  # лишняя
    RESULT = "result"  # результирующая
    ORIGIN = "origin"  # исходная


class EdgeType(Enum):
    NEEDED = "needed"  # временная
    EXCESS = "excess"  # лишняя


class Node:
    def __init__(self, table: Table, node_type: NodeType):
        self.table = table
        self.type = node_type

    def to_dict(self) -> Dict:
        return {
            "name": self.table.name,
            "was_deleted": self.table.was_deleted,
            "type": self.type.value
        }


class Edge:
    type = EdgeType.NEEDED

    def __init__(self, source: Node, target: Node):
        self.source = source
        self.target = target

    def to_dict(self) -> Dict:
        return {
            "source": {
                "name": self.source.table.name,
                "was_deleted": self.source.table.was_deleted,
                "type": self.source.type.value
            },
            "target": {
                "name": self.target.table.name,
                "was_deleted": self.target.table.was_deleted,
                "type": self.target.type.value
            },
            "type": self.type.value
        }
