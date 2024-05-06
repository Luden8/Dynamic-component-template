FROM node:18-slim
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR .
COPY package*.json ./
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
EXPOSE 3000
CMD [ "node", "index.js" ]

#docker run --name=apis -p 3000:3000  --rm --detach apis