FROM node:22-alpine

WORKDIR /app

COPY entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]

# The default command to run after the entrypoint finishes.
CMD ["npm", "run", "dev"]