# Estágio de Build
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Executa os testes automatizados. Se falhar, o build é cancelado.
# A variável CI=true garante que o Jest/Vitest rode apenas uma vez (sem watch mode).
RUN CI=true npm run test

RUN npm run build

# Estágio de Produção
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY maintenance.html /usr/share/nginx/html/maintenance.html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]