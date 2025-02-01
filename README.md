# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Описание проекта
  "Веб-ларек" - это интернет-магазин, в котором пользователи могут оформить покупку товаров с доставкой на дом. Для получения данных о товарах и для передачи данных заказа использовано API.
  
  Интерфейс приложения содержит главную страницу, на которой отображается каталог товаров с помощью компонента ...(**Products/ProductList**). При клике на карточку товара на главной странице открывается модальное окно с детальной информацией о товаре, реализованное компонентом **ProductModal**. На главной странице также присутствует иконка корзины с счетчиком товаров, добавленных туда. При клике на иконку корзины на главной странице открывается модальное окно со списком товаров, добавленных в корзину, реализованное компонентом ...(**CartModal**).

  При открытии модального окна с товаром (**ProductModal**) отображается детальная информация о товаре и появляется возможность добавить товар в корзину нажатием на кнопку "Купить". При добавлении товара в корзину модальное окно закрывается, обновляется счетчик товаров в корзине на главной странице. При открытии карточки товара, уже добавленного в корзину, кнопка "Купить" становится кнопкой "Удалить", при клике на которую товар удаляется из корзины, закрывается модальное окно и обновляется счетччик товаров в корзине на главной странице. 
  
  При открытии корзины (**CartModal**) отображается список товаров, добавленных в корзину. Когда товаров нет в корзине кнопка оформления заказа заблокирована. Когда товары в корзине есть товары, считается их общая стоимость, появляется возможность оформить заказ. 
  
  При нажатии на кнопку "Оформить" в корзине открывается модальное окно заказа (**OrderModal**), в котором можно выбрать способ оплаты и ввести адрес доставки. Поле ввода адреса валидируется: пока оно не заполнено невозможно продолжить оформление заказа (т.е. нажать на кнопку "далее"). При корректном заполнении данных кнопка "далее" разблокируется.
  
  При нажатии на кнопку "далее" в окне заказа открывается модальное окно ввода данных информации о покупателе (**ClientModal**). В этом окне необходимо заполнить поля ввода email и номера телефона. При корректном заполнении данных разблокируется кнопка "оплатить".
  
  При нажатии на кнопку оплаты в модальном окне ввода данных о покупателе открывается модальное окно успешного оформления заказа (**SuccessModal**), сообщающее пользователю об успешном оформлении заказа, корзина очищается.


## Компоненты
Компоненты реализации проекта можно разделить на три слоя:
1. Слой данных. Отвечает за хранение даннымх в приложении. Состоит из классов **Product**, **Cart**, **Order** 
2. Слой отображения. Отвечает за отображение данных. Включает в себя **Products**(?), **BaseModalWindow** (общая структура модальных окон), **ProductModal**, **CartModal**, **OrderModal**, **ClientModal**, **SuccessModal**
3. Слой взаимодействия. Отвечает за взаимодействие между слоями и логику приложения. Включает брокер событий **EventEmitter** и класс всего приложения **App**.

### Слой данных

- Класс **Product** содержит данные/реализует объект данных о товаре/ах(?), полученных из API. Имплиментирует интерфейс **IProduct** (?). Содержит свойства *id, description, image, title, category, price*. Конструктор ... пустой(?). Класс содержит метод getProductById(id), возвращающий информацию о конкретном товаре по его идентификатору. (возвращает промис. запрос в АПИ по {{baseUrl}}/product/${id})

- Класс **Cart** хранит данные о корзине товаров. Имеет свойства items: Product[], total: number, в конструкторе инициализируется пустой массив добавленных в корзину товаров и общая (нулевая) сумма заказа. Методы:
?  addItem(product: Product). Добавляет товар в корзину
  removeItem(productId: string). Удаляет товар из корзины.
  countTotal(). Считает общую сумму товаров в корзине.
? countProducts()?? Считает общее количество товаров в корзине (для счетчика) ??
  
- **Order** реализует заказ товаров, добавленных в корзину для передачи данных на сервер. ?Имплиментирует интерфейс **IOrder** (?). Содержит свойства интерфейса. В конструкторе инициализируется пустой заказ. Методы:
  setPayment, setEmail, setPhone, setAddress, setTotal, setItems - устанавливают данные заказа.
?  validate()

### Слой отображения

Так как модальные окна в проекте однотипные, то их общая логика и структура вынесена в абстрактный класс BaseModalWindow, все модальные окна (ProductModal, CartModal, OrderModal, ClientModal, SuccessModal) наследуются от этого компонента.

- **Products** отвечает за отображение каталога товаров.
  
- **BaseModalWindow** реализует общую логику открытия/закрытия модальных окон на странице.
  Имеет свойства
 
  modalElement: HTMLElement | null: Корневой элемент модального окна в DOM.
  closeButton: HTMLElement | null: Кнопка "Закрыть" внутри модального окна.
  content: HTMLElement | null: Контейнер для контента.
  ? overlay: HTMLElement | null: Оверлей модального окна.
  ? nextButton: HTMLElement | null: Кнопка перехода на следующую страницу (если есть).
  ? isOpen: boolean: Состояние модального окна (открыто/закрыто). По умолчанию: false.

  Конструктор принимает селектор модального окна и инициализирует свойства класса.
  ```typescript
  constructor(modalSelector: string) {
        this.modalElement = document.querySelector(modalSelector);
        this.closeButton = this.modalElement?.querySelector(".close-button") ;
        this.contentElement = this.modalElement?.querySelector(".modal__content") || null;
        ? this.overlay = this.modalElement?.querySelector(".overlay") || null;
        ? this.nextButton = this.modalElement?.querySelector(".next-button") || null;
  }
Имеет методы 
open(), close(). Открывают/закрывают модальные окна, добавляя/удаляя класс '.modal_active'.
render(content). Вставляет в модальное окно переданный контент.
handleClose(event: Event). Обрабатывает клик на кнопку закрытия.
? addEventListeners(): void: Добавляет обработчики событий для кнопки "Закрыть".
? removeEventListeners(): void: Удаляет обработчики событий при закрытии модального окна.

- **ProductModal** наследует класс **BaseModalWindow**. Имеет метод addToCart, который позволяет добавить товар в корзину.
- **CartModal** наследует класс **BaseModalWindow**. 
- **OrderModal** наследует класс **BaseModalWindow**
- **ClientModal** наследует класс **BaseModalWindow**
- **SuccessModal** наследует класс **BaseModalWindow**
