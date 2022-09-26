<?php
namespace model;
require_once("Figura.php");
use model\Figura as Figura;
class Rectangulo extends Figura{

    private float $altura;
    private float $base;

    public function __construct($altura, $base)
    {
        parent::__construct($this);
        $this->altura=$altura;
        $this->base=$base;
    }

    public function calcularArea(Figura $figura): float{
        return $figura->altura * $figura->base;   
    }

    public function __get($property)
    {
        if(property_exists($this,$property)){
            return $this->$property;
        }
    }

    public function __Set($property,$value){

        if(property_exists($this,$property)){
            $this->$property=$value;
        }
    }
}
