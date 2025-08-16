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
    
    # Convert ObjectId to string for JSON serialization
    for movie in movies:
        movie["_id"] = str(movie["_id"])
    
    return movies
