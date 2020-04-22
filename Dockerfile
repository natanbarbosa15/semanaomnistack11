FROM node:12.16-buster

# Debian non interactive mode
ARG DEBIAN_FRONTEND=noninteractive
# Timezone
ENV TZ=America/Sao_Paulo
ENV NODE_ENV production

# Basic Timezone, Locale config and make app dir
RUN apt-get update && apt-get install -yq --no-install-recommends locales \
   && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone \
   && dpkg-reconfigure --frontend=noninteractive tzdata \
   && sed -i -e 's/# pt_BR.UTF-8 UTF-8/pt_BR.UTF-8 UTF-8/' /etc/locale.gen \
   && dpkg-reconfigure --frontend=noninteractive locales \
   && update-locale LANG=pt_BR.UTF-8 \
   && mkdir -p /usr/src/app \
   && apt-get autoremove -y && apt-get clean -y \
   && rm -rf /var/lib/apt/lists/*

# Locale
ENV LANG pt_BR.UTF-8
ENV LC_ALL pt_BR.UTF-8

# NodeJS folder and packages installation
WORKDIR /usr/src/app
COPY . .
RUN yarn global add @adonisjs/cli && yarn install
EXPOSE 80
CMD ["yarn", "start"]