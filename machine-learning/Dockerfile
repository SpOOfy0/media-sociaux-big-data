# Docker Hub Python image official Dockerfile

# This Docker image installs all dependencies
# and runs on latest Python possible.

FROM huggingface/transformers-torch-light:latest

WORKDIR /app

# Installer les dépendances
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Télécharger le modèle
RUN python -c "from transformers import pipeline; pipeline('text-generation', model='gpt2-large')"

# Installer les dépendances nécessaires por le LLM
RUN pip install --no-cache-dir bottle langchain_huggingface

# Copier le code source
COPY . .

EXPOSE ${MACHINE_LEARNING_PORT}

CMD [ "python", "src/app.py" ]
