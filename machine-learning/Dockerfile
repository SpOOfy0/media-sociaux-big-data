# Docker Hub Python image official Dockerfile

# This Docker image installs all dependencies
# and runs on latest Python possible.

FROM python:alpine
RUN apk add --no-cache gcc g++ gfortran lapack-dev libffi-dev libressl-dev musl-dev

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE ${MACHINE_LEARNING_PORT}

CMD [ "python", "src/app.py" ]