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

    /**
    * @return WeatherData[] Returns an array of WeatherData objects
    */
    public function getByRange($start, $limit)
    {
        return $this->createQueryBuilder('d')
            ->select('d')
            ->setFirstResult($start)
            ->setMaxResults($limit)
            ->orderBy('d.time', 'ASC')
            ->getQuery()
            ->getArrayResult()
        ;
    }



    // /**
    //  * @return WeatherData[] Returns an array of WeatherData objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('w.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?WeatherData
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
