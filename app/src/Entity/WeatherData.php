<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\WeatherDataRepository")
 */
class WeatherData
{
  /**
   * @ORM\Id()
   * @ORM\GeneratedValue()
   * @ORM\Column(type="integer")
   */
  private $id;

  /**
   * @ORM\Column(type="decimal", precision=9, scale=6)
   */
  private $lat;

  /**
   * @ORM\Column(type="decimal", precision=9, scale=6)
   */
  private $lng;

  /**
   * @ORM\Column(type="string", length=65)
   */
  private $location;

  /**
   * @ORM\Column(type="string", length=45)
   */
  private $description;

  /**
   * @ORM\Column(type="string", length=45)
   */
  private $icon;

  /**
   * @ORM\Column(type="integer")
   */
  private $temp;

  /**
   * @ORM\Column(type="integer")
   */
  private $pressure;

  /**
   * @ORM\Column(type="integer")
   */
  private $humidity;

  /**
   * @ORM\Column(type="integer")
   */
  private $wind;

  /**
   * @ORM\Column(type="datetime")
   */
  private $time;

  public function getId(): ?int
  {
      return $this->id;
  }


  /**
   * @return decimal
   */
  public function getLat(): ?deciaml
  {
      return $this->lat;
  }

  /**
   * @param deciaml $lat
   * @return WeatherData
   */
  public function setLat($lat): WeatherData
  {
      $this->lat = $lat;
      return $this;
  }

  /**
   * @return decimal
   */
  public function getLng(): ?deciaml
  {
      return $this->lng;
  }

  /**
   * @param deciaml $lng
   * @return WeatherData
   */
  public function setLng($lng): WeatherData
  {
      $this->lng = $lng;
      return $this;
  }

  /**
   * @return string
   */
  public function getLocation(): ?string
  {
      return $this->location;
  }
  /**
   * @param string $location
   * @return WeatherData
   */
  public function setLocation($location): WeatherData
  {
      $this->location = $location;
      return $this;
  }

  /**
   * @return string
   */
  public function getDescription(): ?string
  {
      return $this->description;
  }
  /**
   * @param string $description
   * @return WeatherData
   */
  public function setDescription($description): WeatherData
  {
      $this->description = $description;
      return $this;
  }

  /**
   * @return string
   */
  public function getIcon(): ?string
  {
      return $this->icon;
  }
  /**
   * @param string $location
   * @return WeatherData
   */
  public function setIcon($icon): WeatherData
  {
      $this->icon = $icon;
      return $this;
  }

  /**
   * @return int
   */
  public function getTemp(): ?int
  {
      return $this->temp;
  }

  /**
   * @param integer $temp
   * @return WeatherData
   */
  public function setTemp($temp): WeatherData
  {
      $this->temp = $temp;
      return $this;
  }

  /**
   * @return int
   */
  public function getPressure(): ?int
  {
      return $this->pressure;
  }

  /**
   * @param integer $pressure
   * @return WeatherData
   */
  public function setPressure($pressure): WeatherData
  {
      $this->pressure = $pressure;
      return $this;
  }

  /**
   * @return int
   */
  public function getHumidity(): ?int
  {
      return $this->humidity;
  }

  /**
   * @param integer $humidity
   * @return WeatherData
   */
  public function setHumidity($humidity): WeatherData
  {
      $this->humidity = $humidity;
      return $this;
  }

  /**
   * @return int
   */
  public function getWind(): ?int
  {
      return $this->wind;
  }

  /**
   * @param integer $wind
   * @return WeatherData
   */
  public function setWind($wind): WeatherData
  {
      $this->wind = $wind;
      return $this;
  }

  /**
   * @return \DateTime|null
   */
  public function getTime(): ?\DateTime
  {
      return $this->time;
  }

  /**
   * @param \DateTime $time
   * @return WeatherData
   */
  public function setTime($time): WeatherData
  {
      $this->time = $time;
      return $this;
  }
}
