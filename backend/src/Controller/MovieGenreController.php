<?php

namespace App\Controller;

use App\Repository\MovieGenreRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class MovieGenreController extends AbstractController
{
    public function __construct(private MovieGenreRepository $movieGenreRepository) {}

    #[Route('/movie-genres', methods: ['GET'])]
    public function listGenres(): JsonResponse
    {
        $movieGenres = $this->movieGenreRepository->findAll();

        $data = [];
        foreach ($movieGenres as $movieGenre) {
            $data[] = [
                'id' => $movieGenre->getId(),
                'movie_id' => $movieGenre->getMovie()->getId(),
                'genre_id' => $movieGenre->getGenre()->getId(),
            ];
        }

        return new JsonResponse($data, 200);
    }
}
