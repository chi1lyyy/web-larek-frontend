// Интерфейс для данных о товарах, приходящих от API
interface IAPIProducts {
    total: number;
    products: IProduct[]
}

interface ApiService {
    getProducts(): Promise<IAPIProducts>;
    getProductItem(id: string): Promise<IProduct>;
    submitOrder(orderData: IOrderData): Promise<void>
}

//Интерфейс товара
interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null; //для бесценного товара.
}

interface ICart {
    items: IProduct[];
    total: number;

    addItem(product: IProduct): void;
    removeItem(id: string): void;
    getItems(): IProduct[];
    clearCart(): void;
    countTotal(): number;
}

type PaymemtMathod = 'cash' | 'card';

// Интерфейс для данных заказа (для отправки на сервер)
interface IOrderData {
    payment: PaymemtMathod;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}

// Интерфейс для презентера
interface App {
    //

}


//Интерфейс для настройки отображения каталога карточек
interface ICatalogView {
    gallery: HTMLElement;
    cardTemplate: HTMLTemplateElement;

    createCard(product: IProduct) : HTMLElement;
    render(products: IProduct[]): void
}

//
interface IModalWindow {
    modalElement: HTMLElement;
    closeButton: HTMLButtonElement;
    content: HTMLElement;

    open(): void;
    close(): void;
    handleClose(event: MouseEvent): void;
    render(content: HTMLElement): void
}

interface IProductView {
    cardImage: string;
    cardCategory: HTMLElement;
    cardTitle: HTMLElement;
    cardText: HTMLElement;
    cardPrice: HTMLElement;
    cardButton: HTMLButtonElement;

    render(product: IProduct): void;
    changeButton(): void
}

interface ICartView {
    basketList: HTMLElement;
    totalPrice: HTMLElement;
    orderButton: HTMLButtonElement;

    render(items: IProduct[]): void;
    createCartItem(item: IProduct): HTMLElement
}


  

 
//константы-настройки???

/*Компоненты модели данных.
Класс Product реализует основные функции, совершаемые с карточками 
оформите по такому плану: 
Описание компонентов, их функций и связей с другими компонентами.При описании классов, компонентов и функций подумайте об ответах на такие вопросы: 
Из каких основных частей состоит архитектура проекта? Это могут быть данные, отображения, экраны и так далее.
Зачем нужны эти части, какие функции они выполняют?
Как части взаимодействуют?
Какие данные используются в приложении? Можете записать конкретные типы данных или интерфейсов, пояснив их функции.
Из каких компонентов состоит приложение?
Как реализованы процессы в приложении? Через события или как-то иначе, например с помощью контроллера или представителя.
*/


//работа с событиями реализована через брокер событий в классической реализации.
//Класс EventEmmiter позволяет установить/снять обработчик на событие, инициировать
//класс имеет свойство events, которое хранит объект, ключами которого являются названия событий, а значениями этих ключей являются функции - коллбэки подписчиков событий
//конструктор не принимает никаких значений и инициализирует свойство events как пустой объект
//методы класса:
// on/off привязывает/удаляет коллбэк функцию, которая будет выполнена для события. методы принимают название события и функцию-коллбэк
//  emit принимает название события в качестве параметров и вызывает выполнение зарегистрированных коллбэков для события

