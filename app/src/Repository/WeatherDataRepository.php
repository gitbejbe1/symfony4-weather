<?php

namespace App\Repository;

use App\Entity\WeatherData;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

class WeatherDataRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, WeatherData::class);
    }

    public function getTotalRows()
    {
        return $this->createQueryBuilder('d')
            ->select("count(d.id)")
            ->getQuery()
            ->getSingleScalarResult()
        ;
    }

    public function getByRange($start, $limit)
    {
        return $this->createQueryBuilder('d')
            ->select('d')
            ->setFirstResult($start)
            ->setMaxResults($limit)
            ->orderBy('d.time', 'DESC')
            ->getQuery()
            ->getArrayResult()
        ;
    }


    public function getStatistics()
    {
        $entityManager = $this->getEntityManager();

        $query1 = $this->createQueryBuilder('d')
            ->select('
                MIN(d.temp) as minTemp,
                MAX(d.temp) as maxTemp,
                AVG(d.temp) as avgTemp,
                COUNT(d.id) as totalRows
            ')
            ->setMaxResults(1)
            ->getQuery()
            ->getSingleResult()
        ;

        $query2 = $this->createQueryBuilder('d')
            ->select('d.location as commonLocation')
            ->groupBy('d.location')
            ->orderBY('COUNT(d.location)', 'DESC')
            ->setMaxResults(1)
            ->getQuery()
            ->getSingleResult()
        ;

        return array_merge($query1, $query2);
    }
}
