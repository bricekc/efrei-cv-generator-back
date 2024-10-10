# Utilise l'image officielle de MongoDB
FROM mongo:latest

# Répertoire de travail à l'intérieur du container
WORKDIR /data/db

# Ajout de variables d'environnement pour la configuration de MongoDB
# Vous pouvez personnaliser ces valeurs en fonction de vos besoins
ENV MONGO_INITDB_ROOT_USERNAME=admin \
    MONGO_INITDB_ROOT_PASSWORD=adminpassword \
    MONGO_INITDB_DATABASE=mydatabase

# Expose le port par défaut de MongoDB
EXPOSE 27017

# Commande par défaut pour démarrer MongoDB
CMD ["mongod"]
