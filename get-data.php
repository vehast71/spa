<?
$user = 'root';
$pass = '';
$arr = [];
$arr_ = [];

try {
    $dbh = new PDO('mysql:host=localhost;dbname=test_spa', $user, $pass);
    foreach($dbh->query('SELECT date_format(date,"%d.%m.%Y") as date,name,count,r from mytable',PDO::FETCH_ASSOC) as $row) {
    // foreach($dbh->query("SELECT date_format(date,'%d.%m.%Y') as date,name,CAST(count as UNSIGNED INTEGER) as count,CAST(r as DECIMAL(10,2)) as r from mytable",PDO::FETCH_ASSOC) as $row) {
    // foreach($dbh->query('SELECT * from mytable',PDO::FETCH_ASSOC) as $row) {
        // print_r($row);

        // array_push($arr,[{"date":'.$row['date'].',"name":"'.$row['name'].'","count":'.intval($row['count']).',"r":'.number_format((float)$row['r'], 2, '.', '').'}]);
        array_push($arr,array('date'=>$row['date'],'name'=>$row['name'],'count'=>intval($row['count']),'r'=>floatval($row['r']))); 
        // array_push($arr_,$row['name']); 
        // array_push($arr_,intval($row['count'])); 
        // array_push($arr_,floatval($row['r'])); 
        // array_push($arr,$arr_);
        // array_push($arr,$row);
        // number_format($number, 2, ',', ' ')
    }
    echo json_encode($arr);
    // echo '[{"dat":"23.12.2020","name":"name1","count":30,"r":100},{"dat":"23.12.2020","name":"name2","count":20,"r":300},{"dat":"23.12.2020","name":"name3","count":10,"r":200}]';
    $dbh = null;
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}