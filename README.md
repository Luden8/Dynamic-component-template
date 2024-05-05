# Dynamic template generation

## Требования:
- pnpm >= 6.32.12
- node >= 16.19.0

## Запуск
- Установка зависимостей - `pnpm install`
- Запуск всех сервисов - `pnpm run dev`

## Окружение:
- Client - `http://localhost:8000`
- Admin - `http://localhost:8001`
- API - `http://localhost:3000`

## Комментарии для ревьюера:
Поскольку тестовое задание оказалось очень объемным, времени для того чтобы довести кодовую базу в полный порядок не было.

Тем не менее я хотел бы прокомментировать решение которое было выбрано:

В первую очередь, я задался целью реализовать переиспользуемое решение, с достаточно простым API, которое можно было бы динамически подключать в любой компонент, в котором мы хотим использовать динамический шаблон и стили,
поскольку иметь одноразовый функционал в одном компоненте, по моему мнению было бы достаточно странно.

По той же причине, я вынес передачу шаблона и стилей во внешний код. 

Поэтому я хочу сразу уточнить некоторые допущения, которые были предприняты в пользу скорости завершения тестового задания:
- Отсутствует нормальная обработка ошибок
- Отсутствует какая-либо архитектурная связанность
- Отсутствует TS
- Отсутвтует WYSIWYG
- Отсутствует валидация
- API было написано на скорую руку
- Много дублируемого кода
- Необязательная реактивность некоторых переменных

Заданее было действительно интересным, большое спасибо!

