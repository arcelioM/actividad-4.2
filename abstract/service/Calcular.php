<?php
require_once("../model/Circulo.php");
require_once("../model/Rectangulo.php");
use model\Circulo;
use model\Rectangulo;

if($_SERVER["REQUEST_METHOD"]==="POST"){

    if(!empty($_POST["figura"])){

        $figura=null;
        $area=null;
        if($_POST["figura"]==="1"){
            $radio=floatval($_POST["radio"]);
            $figura=new Circulo($radio);
        }else if($_POST["figura"]==="2"){
            $altura=floatval($_POST["altura"]);
            $base=floatval($_POST["base"]);
            $figura=new Rectangulo($altura,$base);
        }

        if($figura!=null){
            $area=$figura->calcularArea($figura);
        }

        if($area!=null){
            $area=number_format($area,2);
            echo json_encode($area);
        }else{
            echo json_encode("error");
        }
    }else{
        echo json_encode("ERROR");
    }
}
?>