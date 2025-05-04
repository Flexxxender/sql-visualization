from typing import Set, Optional


class Attribute:
    def __init__(self, name: str):
        self.name = name


class Table:
    def __init__(self, name: str, was_deleted: bool = False, attributes: Optional[Set[Attribute]] = None):
        self.name = name
        self.attributes = attributes or set()
        self.was_deleted = was_deleted
