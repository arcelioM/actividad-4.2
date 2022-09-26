<?php
namespace model;
require_once("Figura.php");
use model\Figura as Figura;
class Circulo extends Figura{

    private float $radio;
    private const PI=3.141592;

    public function __construct(float $radio){
        parent::__construct($this);
        $this->radio=$radio;
    }
    public function calcularArea(Figura $figura): float{
        return $figura->radio * $figura->radio * Circulo::PI;
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
