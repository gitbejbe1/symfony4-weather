<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\WeatherData;
use App\Form\WeatherDataType;

class DashboardController extends AbstractController
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @Route("/{reactRouting}", name="index", defaults={"reactRouting": null})
     */
    public function index()
    {
        return $this->render('base.html.twig');
    }

    /**
     * @Route("/api/addToStore", name="addToStore", methods={"POST"})
     */
    public function addToStore(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $form = $this->createForm(WeatherDataType::class, new WeatherData());
        $form->submit($data);

        if (false === $form->isValid()) {

           $errors= array();

           foreach ($form->getErrors() as $key => $error) {
                $errors[$key] = $error->getMessage();
           }

           return new JsonResponse(
                [
                    'status' => 'error',
                    'errors' => $errors,
                ],
                JsonResponse::HTTP_CREATED
            );
        }

        $this->entityManager->persist($form->getData());
        $this->entityManager->flush();

        return new JsonResponse(
            [
                'status' => 'recive',
            ],
            JsonResponse::HTTP_CREATED
        );
    }
}
