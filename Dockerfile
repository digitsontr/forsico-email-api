FROM mcr.microsoft.com/appsvc/node:10-lts

ENV HOST 0.0.0.0
ENV PORT 8082
EXPOSE 8082

ENTRYPOINT ["pm2", "start", "--no-daemon", "server.js"]