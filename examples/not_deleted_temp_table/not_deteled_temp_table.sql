drop table if exists table1;
create table table1 as

    select 
        order_id,
        product_id,
        calendar_dt,
        quantity,
        cost
    from prod_v_dds.order
    where canceled_flg != 1
;


drop table if exists table2;
create table table2 as 

    select 
        t1.order_id,
        t1.product_id,
        t1.calendar_dt,
        t1.quantity,
        t1.cost
    from table1 t1
    join prod_v_dds.schedule t2
        on t1.calendar_dt = t2.calendar_dt
        and t2.day_desc != 'Выходной'
    where t1.calendar_dt >= '2025-01-01'::date
;


drop table if exists res_table;
create table res_table as

    select
        calendar_dt,
        sum(quantity * cost) as daily_revenue
    from table2
    group by calendar_dt
    having daily_cost > 1000
;

grant select on res_table to public;

drop table if exists table1;