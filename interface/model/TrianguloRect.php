<?php
namespace model;
require_once("IFigura.php");
use model\IFigura as IFigura;

class TrianguloRect implements IFigura{

    private float $opuestoL;
    private float $adyacenteL;
    private float $hipotenusa;
    private string $nombreFigura="Triangulo rectangulo";

    public function __construct(float $opuestoL, float $adyacenteL, float $hipotenusa){
        $this->opuestoL=$opuestoL;
        $this->adyacenteL=$adyacenteL;
        $this->hipotenusa=$hipotenusa;
    }
    public function calcularArea(): float{
        return $this->opuestoL * $this->adyacenteL / 2;
    }

    public function calcularPerimetro(): float
    {
        return $this->opuestoL + $this->adyacenteL + $this->hipotenusa;
    }

    public function getNombreFigura(): string{
        return $this->nombreFigura;
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
