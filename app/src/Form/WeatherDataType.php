<?php

namespace App\Form;

use App\Entity\WeatherData;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;

class WeatherDataType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('lat', NumberType::class)
            ->add('lng', NumberType::class)
            ->add('location', TextType::class)
            ->add('description', TextType::class)
            ->add('icon', TextType::class)
            ->add('temp', NumberType::class)
            ->add('pressure', NumberType::class)
            ->add('humidity', NumberType::class)
            ->add('wind', NumberType::class)
            ->add('time', DateTimeType::class, ['widget' => 'single_text'])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => WeatherData::class,
            'csrf_protection' => false,
            //"allow_extra_fields" => true
        ]);
    }
}
