<?php
switch (strtolower($operation['method'])) {
    case 'save':
        // die( 'hi');
        $where = $this->getWhere($operation);
        $fieldsonly = isset($operation['fieldsonly']) ? $operation['fieldsonly'] : false;
        if ($fieldsonly) {
            echo  json_encode(['name', 'id']);
            //die();
        } else {
            $sql = " SELECT COUNT(id)  FROM `orders` as o $where";

            $count=$this->doQueryret($sql);
            die($count);
            if($count<$operation['body']['maxapps']){
                $obj->body=$operation['body'];
                $obj->method='post';
                $obj->table='orders';
                $this->doOperation($obj,false);
            }
            else{
                array_push($this->res, 0);
                return;
            }
          
        }
        break;
    case 'groupservices':
        $where = $this->getWhere($operation);

        $sql =
            "
            SELECT COUNT(id) as count,id,locationsid,(SELECT name FROM services WHERE id=o.servicesid) as servicename ,
            (SELECT maxapps FROM services WHERE id=o.servicesid) as maxapps
            FROM `orders` as o $where
             GROUP by servicesid";
        $this->doQuery($sql);
        break;
    case 'applicants':
        $sql =
        "
            SELECT count(id)
            FROM applications ";
    $this->doQuery($sql);
    break;
    case 'fix_warehouse_items':
        $sql = "SELECT id,unitprice, cost,usdrate,expirydate 
                    ,(SELECT name from lookups where id=main.storesid ) as storesid
                    ,(SELECT name from items where id=main.itemsid ) as itemsid
                    FROM warehouse main";
        $this->doQuery($sql);
        break;
    case 'search':
        $fieldsonly = isset($operation['fieldsonly']) ? $operation['fieldsonly'] : false;
        if ($fieldsonly) {
            echo  json_encode(['id', 'date', 'debit', 'credit', 'pursalesid', 'oldbalance', 'newbalance', 'suppcusid', 'usersid']);
            die();
        } else {
            $where = $this->getWhere($operation);
            $sql = "SELECT `id`,`passportno`,`fullname`
            ,(select name from cities WHERE id =app.residency) as residency,
            (select country_code from cities WHERE id =app.residency) as country,
            (select name from cities WHERE id =app.goingto) as goingto,`phone`, 
            (select name from status WHERE id =app.status) as status,
            `comments`,`applicationdate`,`confirmationdate`,`ticketno` ,
            (select depature from flights WHERE id =app.flight) as depature,
            (select landing from flights WHERE id =app.flight) as arrival,
            (select flightno from flights WHERE id =app.flight) as flight 
            ,`goingto` as goingtoid,`residency` as resid ,`status` as statusid from applications as app 
            $where ";
            // die($sql);

            $this->doQuery($sql);
        }
        break;
    case 'suppcus':
        $fieldsonly = isset($operation['fieldsonly']) ? $operation['fieldsonly'] : false;
        if ($fieldsonly) {
            echo  json_encode(['id', 'name', 'type', 'balance']);
            die();
        } else {
            $where = $this->getWhere($operation);
            $sql = "SELECT id,name,UPPER(type) as type, balance FROM suppcus sd $where";
            $this->doQuery($sql);
        }
        break;
    case 'storetostoredata':
        $arrall = (object) array();
        $stsid = $operation['stsid'];
        $sql = "select * from storetostore where id=$stsid";
        $arrall->Storetostore = $this->getQueryArray($sql);
        $sql = "select * from storetostoreitems where storetostoreid=$stsid";
        $arrall->Items = $this->getQueryArray($sql);

        $sql = "select * from warehouse where 
        storesid = (select fromstore from storetostore where id=$stsid) 
        and itemsid in (select itemsid from storetostoreitems where storetostoreid=$stsid)";
        $arrall->Fromstore = $this->getQueryArray($sql);

        $sql = "select * from warehouse where 
        storesid = (select tostore from storetostore where id=$stsid) 
        and itemsid in (select itemsid from storetostoreitems where storetostoreid=$stsid)";
        $arrall->Tostore = $this->getQueryArray($sql);

        array_push($this->res, $arrall);
        break;


    case 'pursales':
        $fieldsonly = isset($operation['fieldsonly']) ? $operation['fieldsonly'] : false;
        if ($fieldsonly) {
            echo  json_encode(['id', 'date', 'shipno', 'amount', 'discount', 'usersid', 'suppcusid', 'notes', 'complete']);
            die();
        } else {
            $where = $this->getWhere($operation);
            $sql =
                "
                        SELECT id,date,amount,discount,shipno,complete
                        ,(select name from users u where u.id=main.usersid) as usersid
                        ,(select name from suppcus where id= main.suppcusid) as suppcusid
                        FROM pursales main 
                        $where
                    ";
            $this->doQuery($sql);
        }
        break;
    case 'warehouse':
        $fieldsonly = isset($operation['fieldsonly']) ? $operation['fieldsonly'] : false;
        if ($fieldsonly) {
            echo  json_encode(['id', 'storesid', 'itemsid', 'avb', 'rsv', 'com', 'unitprice', 'cost','totalamount']);
            die();
        } else {
            $where = $this->getWhere($operation);
            $sql = "SELECT id,avb,rsv,com,unitprice,cost,avb*cost as totalamount
                    ,(select name from items where id=main.itemsid) as itemsid
                    ,(select name from lookups where id= main.storesid) as storesid
                    FROM warehouse main $where";
            $this->doQuery($sql);
        }
        break;
    case 'pursalesitems':
        $fieldsonly = isset($operation['fieldsonly']) ? $operation['fieldsonly'] : false;
        if ($fieldsonly) {
            echo  json_encode(['id', 'type', 'date', 'name', 'user', 'store', 'qty', 'dlv',  'unitprice', 'cost', 'totalamount']);
            die();
        } else {
            $having = $this->getHaving($operation);
            $sql = "SELECT m.id,m.itemsid,m.name,m.storesid,m.unitprice,m.cost,m.expirydate
                    ,m.qty,m.dlv,m.qtyret,m.dlvret, p.type, p.date,p.usersid, m.qty*m.unitprice as totalamount
                    ,(select name from lookups where id=m.storesid) as store
                    ,(select name from users where id=p.usersid) as user
                    FROM pursalesitems  m inner join  pursales p on m.pursalesid=p.id $having";
            // die($sql);
            $this->doQuery($sql);
        }
        break;

    case 'startingqtyitems':
        $fieldsonly = isset($operation['fieldsonly']) ? $operation['fieldsonly'] : false;
        if ($fieldsonly) {
            echo  json_encode(['id', 'startingqtyid', 'reason', 'date', 'usersid', 'storesid', 'name', 'itemsid', 'oldavb', 'avb', 'oldrsv', 'rsv', 'oldcom', 'com']);
            die();
        } else {
            $where = $this->getHaving($operation);
            $sql =
                "
                SELECT id,startingqtyid,avb,rsv,com,oldavb,oldrsv,oldcom
                ,(select date from startingqty s where s.id=main.startingqtyid) as date
                ,(select reason from startingqty s where s.id=main.startingqtyid) as reason
                ,(select name from users u where u.id=(select usersid from startingqty where id=main.startingqtyid)) as usersid
                ,(select name from lookups l where l.id= (select storesid from startingqty where id=main.startingqtyid)) as name
                ,(select id from lookups l where l.id= (select storesid from startingqty where id=main.startingqtyid)) as storesid
                ,(select name from items i where i.id=main.itemsid) as itemsid
                FROM startingqtyitems main   $where
                    ";
            // die($sql);
            $this->doQuery($sql);
        }
        break;
    case 'pursalesret':
        $fieldsonly = isset($operation['fieldsonly']) ? $operation['fieldsonly'] : false;
        if ($fieldsonly) {
            echo  json_encode(['id', 'type', 'date', 'itemsid', 'name', 'storesid', 'pursalesid', 'qty', 'dlv', 'qtyret', 'dlvret', 'unitprice', 'usersid', 'suppcusid']);
            die();
        } else {
            $where = $this->getWhere($operation);
            $sql = "SELECT main.id, type, date, itemsid,name,qty,dlv,qtyret,dlvret,unitprice
                ,(select name from users where id=usersid) as usersid
                ,(select name from suppcus where id=suppcusid) as suppcusid
                ,(select name from lookups where id=storesid) as storesid
                FROM pursales main inner join pursalesitems itms on qtyret>0 and main.id=itms.pursalesid
                $where";
            // die($sql);
            $this->doQuery($sql);
        }
        break;
    case 'expenses':
        $fieldsonly = isset($operation['fieldsonly']) ? $operation['fieldsonly'] : false;
        if ($fieldsonly) {
            echo  json_encode(['id', 'date', 'lookupsid', 'amount', 'usersid', 'notes', 'acced']);
            die();
        } else {
            $where = $this->getWhere($operation);
            $sql = "select id,date,amount,note,acced
            ,(select name from users where id=ex.usersid) as usersid
            ,(select name from lookups where id=ex.lookupsid) as lookupsid
            from expenses  ex $where";
            // die($sql);
            $this->doQuery($sql);
        }
        break;
    case 'cashflow':
        $fieldsonly = isset($operation['fieldsonly']) ? $operation['fieldsonly'] : false;
        if ($fieldsonly) {
            echo  json_encode(['id', 'date', 'lookupsid', 'amount', 'usersid', 'oldbalance', 'newbalance', 'checksid', 'paymentsid', 'note']);
            die();
        } else {
            $where = $this->getWhere($operation);
            $sql = "select id,amount,date,oldbalance,newbalance,checksid,paymentsid,note
                ,(select name from lookups where id=main.lookupsid) as lookupsid
                ,(select name from users where id=main.usersid) as usersid
                from cashflow main $where";
            $this->doQuery($sql);
        }
        break;
    case 'storetostore':
        $fieldsonly = isset($operation['fieldsonly']) ? $operation['fieldsonly'] : false;
        if ($fieldsonly) {
            echo  json_encode(['date', 'storetostoreid', 'fromstore', 'tostore', 'name', 'qty', 'fdlv', 'tdlv', 'usersid', 'complete']);
            die();
        } else {
            $where = $this->getWhere($operation);
            $sql =
                "
                SELECT stsi.storetostoreid,sts.date,sts.id,sts.complete
                ,stsi.name,stsi.qty,stsi.fdlv,stsi.tdlv
                ,(select name from lookups where id=sts.fromstore) as fromstore
                ,(select name from lookups where id=sts.tostore) as tostore
                ,(select name from users where id=sts.usersid) as usersid
                FROM storetostoreitems stsi inner join storetostore sts
                ON sts.id=stsi.storetostoreid $where
                    ";
            $this->doQuery($sql);
        }
        break;
    case 'getitemsinstore':
        $storesid = $operation["storesid"];
        $sql = "SELECT w.*,i.raw,i.name, CONCAT(i.name,' - EXP: ', w.expirydate,', AVB: ',w.avb-w.rsv) as details 
        FROM warehouse w inner join  items i   on w.itemsid=i.id 
        HAVING storesid=$storesid
        ORDER BY raw desc";
        // die($sql);
        $this->doQuery($sql);
        break;
    case 'ret':
        $ares = (object) array();
        $id = $operation["pursalesid"];
        $ares->items = $this->getQueryArray("SELECT itemsid, name, qty, dlv,qtyret,dlvret FROM pursalesitems WHERE pursalesid=$id");
        $ares->payment = $this->getQueryArray("SELECT pursalesretid,oldbalance,newbalance,debit,credit FROM `payments` WHERE pursalesretid=$id");
        $ares->warhouses = $this->getQueryArray("SELECT storesid,itemsid,avb,rsv,com FROM warehouse WHERE storesid in (SELECT storesid from pursalesitems WHERE pursalesid=$id) and itemsid in (SELECT itemsid FROM pursalesitems WHERE pursalesid=$id)");
        $ares->suppcus = $this->getQueryArray("SELECT id,name,balance FROM suppcus WHERE id = (SELECT suppcusid from pursales WHERE id=$id)");
        $this->res = $ares;
        break;
    case 'delputlookups':
        $id = $operation["lookupsid"];
        $count = 0;
        $count += count($this->getQueryArray("SELECT * FROM `cashflow` where lookupsid=$id"));
        $count += count($this->getQueryArray("SELECT * FROM `expenses` where lookupsid=$id"));
        $count += count($this->getQueryArray("SELECT * FROM `warehouse` where storesid=$id"));
        $count += count($this->getQueryArray("SELECT * FROM `items` where parent=$id"));
        $count += count($this->getQueryArray("SELECT * FROM `pursalesitems` where storesid=$id"));
        $count += count($this->getQueryArray("SELECT * FROM `production` where storesid=$id"));
        $count += count($this->getQueryArray("SELECT * FROM `startingqty` where storesid=$id"));
        $count += count($this->getQueryArray("SELECT * FROM `storetostore` where fromstore=$id or tostore=$id"));

        array_push($this->res, $count);
        break;
    case 'delputitems':
        $id = $operation["itemsid"];
        $count = 0;
        $count += count($this->getQueryArray("SELECT * FROM `warehouse` where itemsid=$id"));
        $count += count($this->getQueryArray("SELECT * FROM `pursalesitems` where itemsid=$id"));
        $count += count($this->getQueryArray("SELECT * FROM `productionitems` where itemsid=$id"));
        $count += count($this->getQueryArray("SELECT * FROM `startingqtyitems` where itemsid=$id"));
        $count += count($this->getQueryArray("SELECT * FROM `storetostoreitems` where itemsid=$id"));
        array_push($this->res, $count);
        break;
    case 'reset_ret':
        $id = $operation["pursalesid"];
        $this->do("UPDATE pursalesitems set qtyret=0,dlvret=0 WHERE pursalesid=$id;");
        $this->do("DELETE FROM payments WHERE pursalesretid=$id;");
        $this->do("UPDATE warehouse set com=0, rsv=0 WHERE storesid in (SELECT storesid from pursalesitems WHERE pursalesid=$id) and itemsid in (SELECT itemsid FROM pursalesitems WHERE pursalesid=$id);");
        $this->do("UPDATE suppcus set balance=200 WHERE id = (SELECT suppcusid from pursales WHERE id=$id);");
        break;

    case 'payments_details':
        $fieldsonly = isset($operation['fieldsonly']) ? $operation['fieldsonly'] : false;
        if ($fieldsonly) {
            echo  json_encode(['date', 'pursalesid', 'paymentmethod', 'debit', 'credit', 'oldbalance', 'newbalance','notes', 'suppcusid', 'type','usersid']);
            die();
        } else {
            $where = $this->getWhere($operation);
            $sql = "
                SELECT date,debit,credit,pursalesid,paymentmethod,oldbalance,newbalance,notes
                ,(SELECT name from suppcus sc where sd.suppcusid=sc.id ) as suppcusid
                ,UPPER((SELECT type from suppcus sc where sd.suppcusid=sc.id)) as type
                ,(SELECT name from users  where sd.usersid=`users`.id) as usersid

                FROM payments sd $where
                ";
            // die($sql);
            $this->doQuery($sql);
        }

        break;
    case 'payments_dr':
        $fieldsonly = isset($operation['fieldsonly']) ? $operation['fieldsonly'] : false;
        if ($fieldsonly) {
            echo  json_encode(['debit', 'credit', 'suppcusid', 'type']);
            die();
        } else {
            $sql = "
                    SELECT sum(debit) as debit, sum(credit) as credit
                    ,(SELECT name from suppcus sc where sd.suppcusid=sc.id ) as suppcusid
                    ,UPPER((SELECT type from suppcus sc where sd.suppcusid=sc.id)) as type
                    FROM payments sd group by suppcusid having debit>credit
                    ";
            // die($sql);
            $this->doQuery($sql);
        }

        break;
    case 'payments_cr':


        $fieldsonly = isset($operation['fieldsonly']) ? $operation['fieldsonly'] : false;
        if ($fieldsonly) {
            echo  json_encode(['debit', 'credit',  'suppcusid', 'type']);
            die();
        } else {
            $sql = "
                SELECT sum(debit) as debit, sum(credit) as credit
                ,(SELECT name from suppcus sc where sd.suppcusid=sc.id ) as suppcusid
                ,UPPER((SELECT type from suppcus sc where sd.suppcusid=sc.id)) as type
                FROM payments sd group by suppcusid having debit<credit
                ";
            // die($sql);
            $this->doQuery($sql);
        }

        break;
    case 'avbitems':
        $storesid = $operation["storesid"];
        $fieldsonly = isset($operation['fieldsonly']) ? $operation['fieldsonly'] : false;
        if ($fieldsonly) {
            echo  json_encode(['id', 'avb', 'rsv', 'com', 'storesid', 'itemsid', 'expirydate', 'parent']);
            die();
        } else {
            $sql = "SELECT wh.id,wh.storesid,wh.itemsid,wh.avb,wh.rsv,wh.com,wh.expirydate,
            it.name,it.parent,wh.unitprice,it.picture,wh.cost 
            FROM `warehouse` wh inner  JOIN `items` it ON wh.itemsid=it.id
            WHERE wh.storesid=$storesid and wh.avb>0";
            $this->doQuery($sql);
        }
        break;
    case 'pursales_sales_suppcusid':
        $sql = "SELECT b.name as lbl, count(a.id) as val from `pursales` a inner join `suppcus` b" .
            " on a.suppcusid=b.id AND a.type='s' AND NOT suppcusid=132 group by a.suppcusid order by val desc limit 10";
        $this->doQuery($sql);
        break;
    case 'pursales_sales_qty':
        $sql = "SELECT name as lbl, sum(qty) as val from `pursalesitems`
        where pursalesid in (select id from pursales where type='s')
        group by itemsid order by val desc limit 10";
        $this->doQuery($sql);
        break;
    case 'pursales_sales_amount':
        $sql = "SELECT name as lbl, sum(totalprice) as val from `pursalesitems`
        where pursalesid in (select id from pursales where type='s')
        group by itemsid order by val desc limit 10";
        $this->doQuery($sql);
        break;
    case 'pursales_purchase_qty':
        $sql = "SELECT name as lbl, sum(qty) as val from `pursalesitems`
            where pursalesid in (select id from pursales where type='p')
            group by itemsid order by val desc limit 10";
        $this->doQuery($sql);
        break;
    case 'pursales_purchase_amount':
        $sql = "SELECT name as lbl, sum(totalprice) as val from `pursalesitems`
            where pursalesid in (select id from pursales where type='p')
            group by itemsid order by val desc limit 10";
        $this->doQuery($sql);
        break;
    case 'warehouse_avb_least':
        $sql = "
            SELECT b.name as lbl, sum(a.avb) as val from `warehouse` a inner join `items` b
             on a.itemsid=b.id group by a.itemsid order by val asc limit 10
            ";
        $this->doQuery($sql);
        break;
    case 'warehouse_avb_rsv_com':
        $sql = "SELECT sum(avb) as AVB,sum(rsv) as RSV,sum(com) as COM from `warehouse`";
        $this->doQuery($sql);
        break;
    case 'users_activity':
        $sql = "
            SELECT count(a.usersid) as val,b.name as lbl from `pursales` a inner join `users` b 
            on a.usersid = b.id group by a.usersid
            ";
        $this->doQuery($sql);
        break;
    case 'checks_status':
        $sql = "SELECT distinct status as lbl , count(*) as val from `checks` group by status";
        $this->doQuery($sql);
        break;
    case 'mig_pursales':
        $sql = "SELECT data,id FROM pursales";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();
        while ($r = $result->fetch_assoc()) {
            $pursalesitem;
            $items = json_decode($r['data'])->items;
            $pursalesitem->pursalesid = $r["id"];
            foreach ($items as $item) {
                $pursalesitem->itemsid = $item->id;
                $pursalesitem->unitprice = $item->price;
                $pursalesitem->qty = $item->qty;
                $pursalesitem->dlv = $item->dlv;
                $pursalesitem->storesid = $item->store;
                $pursalesitem->name = $item->name;
                $pursalesitem->totalprice = $item->totalprice;
                $operation;
                $operation['method'] = "post";
                $operation['table'] = "pursalesitems";
                $operation['body'] = $pursalesitem;
                $this->doOperation($operation, true);
            }
        }
        break;
    case 'mig_pursalesret':
        $sql = "SELECT data,id FROM pursales";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();
        while ($r = $result->fetch_assoc()) {
            $pursalesitem;
            $items = json_decode($r['data']);
            $pursalesitem->pursalesid = $r["id"];
            foreach ($items as $item) {
                $pursalesitem->itemsid = $item->id;
                $pursalesitem->unitprice = $item->price;
                $pursalesitem->qty = $item->qty;
                $pursalesitem->dlv = $item->dlv;
                $pursalesitem->storesid = $item->store;
                $pursalesitem->name = $item->name;
                $pursalesitem->totalprice = $item->totalprice;
                $operation;
                $operation['method'] = "post";
                $operation['table'] = "pursalesretitems";
                $operation['body'] = $pursalesitem;
                $this->doOperation($operation, true);
            }
        }
        break;
    case 'mig_payments':
        $sql = "SELECT * FROM payments";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();
        while ($r = $result->fetch_assoc()) {
            $payment;
            $items = json_decode($r['data']);
            $payment->pursalesid = $r["pursalesid"];
            $payment->suppcusid = $r["suppcusid"];
            $payment->suppcustype = $r["suppcustype"];
            $payment->pursalesretid = $r["pursalesretid"];
            $payment->comment = $r["comment"];
            $payment->usersid = $r["usersid"];
            $payment->pursalesid = $r["pursalesid"];
            $payment->date = $r["date"];
            foreach ($items as $item) {
                $payment->paymentmethod = $item->paymentmethod;
                if ($r["source"] == "in") {
                    $payment->dept = $item->amount;
                } else {
                    $payment->credit = $item->amount;
                }

                $operation;
                $operation['method'] = "post";
                $operation['table'] = "payments";
                $operation['body'] = $payment;
                $this->doOperation($operation, true);
            }
        }
        break;
}
