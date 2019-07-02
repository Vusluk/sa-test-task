# Test task

## Запуск dev сервера
  
  ```
  yarn install
  yarn dev
  ```

## Сборка

    Следующая комманда соберет бандл в `./build`. Генерация `index.html` не предусмотрена, имя бандла не хэшируется, frontend сервер отсутсвует т.к. задание тестовое.

  ```
  yarn build
  ```

## Про архитектуру

    В этом задании реализована модульная архитектура. Каждый модуль инкапулирует функционал определенного бизнес-домена. Системный модуль `Core` выполняет функцию системного модуля, а также содержит общие компоненты.
    
    Внутри каждого модуля Реакт-компоненты разбиты на атомы, молекулы, организмы и страницы, это разделение основано на http://bradfrost.com/blog/post/atomic-web-design и адаптировано для Реакта. Страницы могут содержать несколько шаблонов, например для отображения на разных устройствах. 
    
    Виджеты это специальные компоненты(как правило уровня Организма) предназначенные для встраивания в страницы других модулей. Такие спец. компоненты нужны для того, чтобы не использовать "чужие" сторы в модулях.
    
    В данной реализации фактический используется один redux store для всего приложения. Однако на больших проектах обычно используются несколько сторов, по одному на каждый модуль.
    
    Некоторые компоненты в Core модуле представлены только для демонстрации концепции. Роутинг включен для демонстрации навыков.

    ```
    ./src--
          |-- Core
          |-- BuisnessModule_1
          |-- BuisnessModule_N
            |-- Atoms
            |-- Molecules
            |-- Organisms
            |-- Pages
            |-- Widgets
            |-- reducer.js
            |-- actions.js
            |-- index.js   // Интерфейс к внешнему миру
    ```
    
## Про синхронизацию текста с аудио

    Синхронизация производится путем ручного периодического опроса аудио элемента на предмет текущего времени воспроизведения. Использование специального события, предназначенного для получения времени, не дает нужной дискретизации и периода срабатывания. Однако даже ручной опрос не даст гарантии стабильности синхронизации, если стэк вызовов будет забит. При текущей реализации нужно тщательно следить за наполнением стэка. В качестве альтернативной иди в голове возникает использование web workers, но эта идея требует R&D и явно выходит за рамки тестового задания. 


## Про систему сборки

    В основе системы сборки используется webpack, однако конфиг упрощен в сравнении с production вариантом т.к. задание тестовое, а полная настройка требует немало времени. Генерация `index.html` не предусмотрена, имя бандла не хэшируется, frontend сервер отсутсвует, точка входа одна. Однако если вам важно посмортеть на production вариант, могу донастроить конфиг. Но в целях экономии времени лучше поговорить об этом на интервью.
    
    ESLint запускается на pre-commit хуке т.к. я считаю, что линтер не должен "выдергивать" разработчика из контекста задачи своими постоянными поправками. Обычно я использую StyleLint, но тут его нет, опять же с целью экономии времени.
    
    Все конфиги собраны в package.json, чтобы не "гадить" файлами в корне проекта.

## Про библиотеки
    
    В сущности используются только необходимые зависимости за исключением `classnames`. Эта либа позволяет избавиться от "некрасивого" кода при назначении css-классов на элементы. Последнее время я подготавливаю ей замену на основе форка bem-css-modules, это позволит более полно и семантично назначать классы при использовании css-modules.
        
