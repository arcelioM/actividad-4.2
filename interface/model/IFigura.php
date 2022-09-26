<?php

namespace model;

interface IFigura {

    function calcularArea():float;
    function calcularPerimetro():float;
    function getNombreFigura():String;
}
