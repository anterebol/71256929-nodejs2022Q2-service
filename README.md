# Home Library Service часть 2

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Загрузка

```
git clone {repository URL}
```

## Установка NPM modules

```
npm install
```

## Запуск приложения

```
docker compose up
```

После запуска приложения можно с запросами обращаться, согласно дефолтному значению, по адресу localhost:4000 

## Тестирование

После запуска приложения откройте новый терминал и запустите команду

```
npm run test
```
Для сканирования уязвимостей, вам также понадобиться уже готовый образ (первым делом запустите сборку docker compose up), далее с помощью скриптов: npm run exam-app и npm run exam-db вы сможете просканировать образы(однако прошу заметить перед этим вам придется пройти регистрацию на сайте https://hub.docker.com/ и залогиниться локально с помощью  docker login -u <username> -p <password>, а также пройти аутентификацию здесь https://app.snyk.io/)

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Ссылки на образ в DockerHub
https://hub.docker.com/repository/docker/anterebol/71256929-nodejs2022q2-service_db
https://hub.docker.com/repository/docker/anterebol/71256929-nodejs2022q2-service_backend
