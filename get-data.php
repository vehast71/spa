<?
$user = 'root';
$pass = '';
$arr = [];

try {
    $dbh = new PDO('mysql:host=localhost;dbname=test_spa', $user, $pass);
    foreach($dbh->query('SELECT date_format(date,"%d.%m.%Y") as date,name,count,r from mytable',PDO::FETCH_ASSOC) as $row) {
        array_push($arr,array('date'=>$row['date'],'name'=>$row['name'],'count'=>intval($row['count']),'r'=>floatval($row['r']))); 
    }
    echo json_encode($arr);
    $dbh = null;
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}