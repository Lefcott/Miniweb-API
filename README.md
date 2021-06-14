# Miniweb - API

## Componentes:
- Redis (con Heroku esto es gratis)
- MongoDB
- Rollbar (con Heroku esto es gratis)
- Moesif (no es necesario, pero es útil para ver las solicitudes http entrantes y salientes)
- Clouodinary (se tiene que crear una cuenta y configurar las credenciales en el documento de **projects** de la base de datos MongoDB)

## Variables de entorno:

ADMIN_SECRET=adfa3c10-97b3-11eb-84d8-eb3b0bc08730

DEBUG=app

DOMAIN_NAME=localhost:4000

MOESIF_APP_ID=**AppId de moesif**

MONGODB_URI=**URI de MongoDB**

NODE_ENV=localhost

REDISCLOUD_URL=**URL de Redis**

ROLLBAR_ACCESS_TOKEN=**Token de Rollbar**

SES_ACCESS_KEY=**AccessKey de AWS SES**

SES_REGION=us-east-1

SES_SECRET_KEY=**Secretkey de AWS SES**

SNS_ACCESS_KEY=**AccessKey de AWS SNS**

SNS_REGION=us-east-1

SNS_SECRET_KEY=**SecretKey de AWS SNS**

URL_PREFIX=http://

WEB_ORIGINS=[]

TOKEN_SECRET=token-secret-d94367cf-dcc3-4679-b79d-3c929fa39a75

## [Colecciones de MongoDB a configurar](/docs/README.md)
