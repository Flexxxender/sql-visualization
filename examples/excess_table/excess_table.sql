drop table if exists table1;
create table table1 as

    select
        entity_id,
        calendar_dt,
        importance_flg
    from prod_v_dds.entity_table1

    union all

    select
        entity_id,
        calendar_dt,
        importance_flg
    from prod_v_dds.entity_table2
;


drop table if exists table2;
create table table2 as

    with table1_filtered as (
        select
            entity_id,
            calendar_dt
        from table1
        where importance_flg = 1
    )

    select
        t1.entity_id,
        t1.calendar_dt,
        t2.cost
    from table1_filtered t1
    join prod_v_ods.costs t2
        on t1.entity_id = t2.entity_id
;


drop table if exists excess_table;
create table excess_table as

    select
        entity_id,
        cost
    from table2
;


drop table if exists table3;
create table table3 as

    select
        t1.entity_id,
        t1.calendar_dt,
        t1.cost,
        t2.quantity
    from table2 t1
    join prod_v_stg.quantities t2
        on t1.entity_id = t2.entity_id
;


drop table if exists res_table;
create table res_table as

    select
        entity_id,
        sum(cost*quantity) as cost_overall
    from table3
    where calendar_dt = current_date - interval '1 day'
    group by entity_id
;

grant select on res_table to public;

drop table if exists table1;
drop table if exists table2;
drop table if exists excess_table;
drop table if exists table3;