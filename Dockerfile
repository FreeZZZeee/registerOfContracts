FROM node:20.11.1-alpine
WORKDIR /opt/app

ADD package.json package.json
RUN npm cache clear --force
RUN npm install
ADD . .
RUN npm run build
RUN npm prune --production
RUN npx prisma generate
ENTRYPOINT [ "npm", "run" ]

# FROM node:20.11.1-alpine as dependencies


# # set working directory
# WORKDIR /usr/src/app

# # Copy package and lockfile
# COPY package.json ./
# COPY prisma ./prisma/

# # install dependencies
# RUN npm install

# COPY . .

# # ---- Build ----
# FROM dependencies as build
# # install all dependencies

# # build project
# RUN npm run build

# # ---- Release ----
# FROM dependencies as release
# # copy build
# COPY --from=build /usr/src/app/.next ./.next
# COPY --from=build /usr/src/app/public ./public

# # dont run as root
# USER node

# # expose and set port number to 3000
# EXPOSE 3000
# ENV PORT 3000

# # start app
# ENTRYPOINT [ "npm", "run" ]