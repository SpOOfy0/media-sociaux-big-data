# Docker Hub Python image official Dockerfile

# This Docker image installs all dependencies
# and runs on latest Python possible.

FROM python:latest

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 13001

CMD [ "python", "src/app.py" ]