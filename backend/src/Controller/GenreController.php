<?php

namespace App\Controller;

use App\Repository\GenreRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class GenreController extends AbstractController
{
    public function __construct(private GenreRepository $genreRepository) {}

    #[Route('/genres', methods: ['GET'])]
    public function listGenres(): JsonResponse
    {
        $genres = $this->genreRepository->findAll();

        $data = [];
        foreach ($genres as $genre) {
            $data[] = [
                'id' => $genre->getId(),
                'name' => $genre->getName()
            ];
        }

        return new JsonResponse($data, 200);
    }
}
