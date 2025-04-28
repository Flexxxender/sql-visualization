from typing import List, Optional


class Attribute:
    def __init__(self, name: str):
        self.name = name


class Table:
    def __init__(self, name: str, was_deleted: bool = False, attributes: Optional[List[Attribute]] = None):
        self.name = name
        self.attributes = attributes or []
        self.was_deleted = was_deleted
