<?php

namespace model;

 abstract class Figura{

    protected $figura;

    protected function __construct(Figura $figura)
    {
        $this->figura=$figura;
    }

    abstract public function calcularArea(Figura $figura):float;
}
