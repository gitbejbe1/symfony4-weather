<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DashboardController extends Controller
{
    /**
     * @Route("/{reactRouting}", name="index", defaults={"reactRouting": null})
     */
    public function index()
    {
        return $this->render('base.html.twig', [
            'controller_name' => 'DashboardController',
        ]);
    }
}
