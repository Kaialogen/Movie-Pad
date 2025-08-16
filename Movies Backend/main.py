from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient

app = FastAPI()

# Allow CORS for all origins
app.add_middleware(CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/movies")
async def get_movies():
    client = MongoClient("mongodb://localhost:27017/")
    db = client["MoviesDB"]
    movies_collection = db["movies"]
    
    # Sort by 'id' in ascending order
    movies = list(movies_collection.find({}).sort("id", 1))
    
    # Convert ObjectId to string for JSON serialisation
    for movie in movies:
        movie["_id"] = str(movie["_id"])
    
    return movies

@app.get("/api/movies/{movie_id}")
async def get_movie(movie_id: str):
    client = MongoClient("mongodb://localhost:27017/")
    db = client["MoviesDB"]
    movies_collection = db["movies"]

    try:
        movie_id_int = int(movie_id)
    except ValueError:
        return {"error": "Invalid movie id"}, 400

    movie = movies_collection.find_one({"id": movie_id_int})

    if movie:
        movie["_id"] = str(movie["_id"])
        return movie
    else:
        return {"error": "Movie not found"}, 404