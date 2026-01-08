#!/bin/bash

# Define o diretório e arquivos dos certificados
CERT_DIR="./certs"
KEY_FILE="$CERT_DIR/server.key"
CRT_FILE="$CERT_DIR/server.crt"

# Verifica se os certificados já existem
if [ -f "$KEY_FILE" ] && [ -f "$CRT_FILE" ]; then
    echo "✅ Certificados SSL encontrados em $CERT_DIR."
else
    echo "⚠️  Certificados não encontrados. Gerando novos certificados autoassinados..."
    
    # Cria o diretório se não existir
    mkdir -p "$CERT_DIR"
    
    # Gera os certificados (usando // no subject para compatibilidade com Git Bash no Windows)
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout "$KEY_FILE" -out "$CRT_FILE" \
        -subj "//C=BR/ST=Estado/L=Cidade/O=Empresa/OU=TI/CN=localhost"
    echo "✅ Certificados gerados com sucesso!"
fi

echo "🚀 Subindo os containers Docker..."
docker-compose up -d --build