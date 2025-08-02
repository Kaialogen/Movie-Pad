#!/bin/bash
mongoimport --db MoviesDB --collection movies --file /docker-entrypoint-initdb.d/data.json --jsonArray
