<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\WeatherData;

class HistoryController extends AbstractController
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
     * @Route("/api/getHistoryData/{page}", name="getHistoryData", methods={"GET"}, defaults={"page": null})
     */
    public function getHistoryData(Request $request, $page): JsonResponse
    {
        $limit = 10;
        $start = $page ? $page * $limit : 0;

        $repositiory = $this->entityManager->getRepository(WeatherData::class);

        $rows = $repositiory->getByRange($start, $limit);
        $totalRows = $repositiory->getTotalRows();

        return new JsonResponse(
             [
                 'rows' => $rows,
                 'totalRows' => $totalRows,
             ],
             JsonResponse::HTTP_CREATED
         );
    }

    /**
     * @Route("/api/getStatisticsData", name="getStatisticsData", methods={"GET"})
     */
    public function getStatisticsData(): JsonResponse
    {
        $repositiory = $this->entityManager->getRepository(WeatherData::class);
        $stats = $repositiory->getStatistics();

        return new JsonResponse(
             [
                 'stats' => $stats
             ],
             JsonResponse::HTTP_CREATED
         );
    }

}
