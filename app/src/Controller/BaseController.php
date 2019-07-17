<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class BaseController extends AbstractController
{
    /**
     * @Route("/{reactRouting}/{reactActions}", name="index", defaults={"reactRouting": null, "reactActions": null})
     */
    public function index()
    {
        return $this->render('base.html.twig');
    }
}
