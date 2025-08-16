# Use official Python image
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Install uv
RUN pip install --no-cache-dir uv

# Copy dependency files first (for caching)
COPY pyproject.toml uv.lock ./

# Generate requirements from pyproject.toml and install with uv
RUN uv pip compile --generate-hashes pyproject.toml -o requirements.txt \
    && uv pip install --system --no-cache --require-hashes -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Start FastAPI server with uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
