# Визуализация SQL-кода.

### Сценарии исполоьзования программы
Пользователь вводит SQL-код ETL-процесса и получает диаграмму, по которой можно понять следующие вещи:

* <details>
  <summary>Неиспользуемая таблица - пользователь создал, но не использовал таблицу для построения результирующей.</summary>
  <img src="examples/excess_table/excess_table.png" alt="Неиспользуемая таблица" width="400">
</details>

* <details>
  <summary>Не удаленная временная таблица - пользователь создал, но забыл удалить таблицу в ETL-процессе.</summary>
  <img src="examples/not_deleted_temp_table/not_deleted_temp_table.png" alt="Не удаленная временная таблица" width="400">
</details>

* <details>
  <summary>Неиспользуемая ветка - аналогичная история, как в первом пункте, только несколько связанных друг с другом таблиц.</summary>
  <img src="examples/excess_branch/excess_branch.png" alt="Неиспользуемая ветка" width="400">
</details>

* <details>
  <summary>Циклическая зависимость - возникает в случае создания нескольких таблиц с аналогичным названием.</summary>
  <img src="examples/cyclic_dependence/cyclic_dependence.png" alt="Циклическая зависимость" width="400">
</details>