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

distributed by (order_id, calendar_dt);


drop table if exists table3;
create table table3 as

    select 
        product_id,
        cost
    from prod_v_dds.product
    where valid_to_dttm = '5999-01-01 00:00:00'

distributed by (product_id);


drop table if exists table4;
create table table4 as 

    select 
        t1.product_id,
        t2.shop_id,
        t1.cost,
    from table1 t1
    join prod_v_dds.shop t2
        on t1.product_id = t2.product_id_id

distributed by (product_id, shop_id);


drop table if exists res_table;
create table res_table as

    select
        calendar_dt,
        sum(quantity * cost) as daily_revenue
    from table2
    group by calendar_dt
    having daily_cost > 1000

distributed by (calendar_dt);

grant select on res_table to public;

drop table if exists table1;
drop table if exists table2;
drop table if exists table3;
drop table if exists table4;