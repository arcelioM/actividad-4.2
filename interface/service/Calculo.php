<?php 
require_once("../model/RectanguloImpl.php");
require_once("../model/TrianguloRect.php");

use model\RectanguloImpl as Rectangulo;
use model\TrianguloRect as TrianguloRect;
    if($_SERVER["REQUEST_METHOD"]==="POST"){

        if(!empty($_POST["figura"])){

            $figura=null;
            $calculos=null;

            /**
             * SE ASIGNA LOS VALORES ENVIADO A LA FIGURA CORRESPONDIENTE
             */
            if($_POST["figura"]==="1"){
                $lOpuesto=floatval($_POST["opuesto"]);
                $lAdyacente=floatval($_POST["adyacente"]);
                $hipotenusa=floatval($_POST["hipotenusa"]);
                $figura=new TrianguloRect($lOpuesto,$lAdyacente,$hipotenusa);
            }else if($_POST["figura"]==="2"){
                $altura=floatval($_POST["altura"]);
                $base=floatval($_POST["base"]);
                $figura=new Rectangulo($altura,$base);
            }

            /**
             * SE CALCULA AREA Y PERIMETRO
             */
            if($figura!=null){
                $area=$figura->calcularArea();
                $area=number_format($area,2);

                $perimetro=$figura->calcularPerimetro();
                $perimetro=number_format($perimetro,2);

                $calculos=array(
                    'nombreFig'=>$figura->getNombreFigura(),
                    'area'=>$area,
                    'perimetro'=>$perimetro
                );
            }

            /**SE ENVIA LOS RESULTADOS */
            if($calculos!=null){
                echo json_encode($calculos);
            }else{
                echo json_encode("ERROR");
            }
        }else{
            echo json_encode("ERROR");
        }
    }
?>