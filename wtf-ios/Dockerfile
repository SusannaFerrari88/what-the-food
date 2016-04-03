# DOCKER-VERSION 1.8.2

#
# React Native Webpack Starter Kit Dockerfile
#
# https://github.com/jhabdas/react-native-webpack-starter-kit
#
# Demonstrates use of Starter Kit in a virtualized Linux development environment.
# Enables React Native development for Windows. OS X is supported also, but why would you?
#

# Pull base image
FROM node:argon

# Set environment variables
ENV NODE_ENV development
ENV KIT_VERS v2.22.0
ENV WATCHMAN_VERS v4.5.0

# Fetch and install
RUN \
  cd /tmp && \
  wget https://github.com/jhabdas/react-native-webpack-starter-kit/archive/$KIT_VERS.tar.gz && \
  mkdir -p /app && \
  tar --strip-components=1 -xzf $KIT_VERS.tar.gz -C /app && \
  rm -f $KIT_VERS.tar.gz && \
  cd /app && \
  npm install --$NODE_ENV

# Install watchman from source
RUN \
  apt-get update && apt-get install -y python-dev && \
  mkdir -p /tmp/watchman && \
  wget https://github.com/facebook/watchman/archive/$WATCHMAN_VERS.tar.gz && \
  tar --strip-components=1 -xzf $WATCHMAN_VERS.tar.gz -C /tmp/watchman && \
  cd /tmp/watchman && \
  ./autogen.sh && ./configure && make && make install && \
  rm -f $WATCHMAN_VERS.tar.gz && rm -rf /tmp/watchman

# Mount to local file system
VOLUME /app/src

# Set current working directory
WORKDIR /app

# Run it
CMD ["npm", "start"]

# Expose ports
EXPOSE 8080
EXPOSE 8081
EXPOSE 8082
