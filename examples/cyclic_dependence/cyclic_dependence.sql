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

distributed by (order_id, calendar_dt);


drop table if exists table2;
create table table2 as 

    select 
        order_id,
        product_id,
        calendar_dt,
        quantity,
        cost
    from table1 t1
    join prod_v_dds.schedule t2
        on t1.calendar_dt = t2.calendar_dt
        and t2.day_desc != 'Выходной'

distributed by (order_id, calendar_dt);


drop table if exists table1;
create table table1 as 

    select 
        order_id,
        product_id,
        calendar_dt,
        quantity,
        cost
    from table2
    where calendar_dt >= '2025-01-01'::date

distributed by (order_id, calendar_dt);


drop table if exists res_table;
create table res_table as

    select
        calendar_dt,
        sum(quantity*cost) as daily_revenue
    from table1
    group by calendar_dt
    having daily_cost > 1000

distributed by (calendar_dt);

grant select on res_table to public;

drop table if exists table1;
drop table if exists table2;