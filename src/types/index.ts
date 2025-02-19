// Интерфейс для данных о товарах, приходящих от API
interface IAPIProducts {
    total: number;
    products: IProduct[]
}

interface IApiService {
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

interface IProductModel {
    products: IProduct;

    setProducts(): Promise<IProduct[]>;
    getProductById(id: string): Promise<IProduct>;
}

interface ICart {
    items: IProduct[];

    addItem(product: IProduct): void;
    removeItem(id: string): void;
    getItems(): IProduct[];
    clearCart(): void;
    countProducts(): number;
    countTotalPrice(): number;
    isInCart(id: string): boolean
}

type PaymemtMethod = 'cash' | 'card';

// Интерфейс для данных заказа (для отправки на сервер)
interface IOrderData {
    payment: PaymemtMethod;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}


interface IOrder {
    setPayment(payment: PaymemtMethod): void;
    setEmail(email: string): void;
    setPhone(phone: string): void;
    setAddress(address: string): void;
    validate(): boolean;
    returnOrder(): IOrderData
}


//Интерфейс для настройки отображения каталога карточек
interface IPage {
    _wrapper: HTMLElement, 
    _catalog: HTMLElement, 
    _counter: HTMLElement, 
    _basket: HTMLElement;
    
    set counter(value: number);
    set catalog(items: HTMLElement[]);
    set locked(value: boolean)

}
  
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
    _cardImage: HTMLElement;
    _cardCategory: HTMLElement;
    _cardTitle: HTMLElement;
    _cardPrice: HTMLElement;
    
    set cardImage(value: string);
    set cardCategory(value: string);
    set cardTitle(value: string);
    set cardPrice(value: number)
}
interface IDetailedProductView {
    _cardDescription: HTMLElement;
    _cardButton: HTMLButtonElement;

    setButtonText (value: string): void;

    set cardDescription(value: string);
}


interface ICartView {
    _basketList: HTMLElement;
    _basketItemDeleteButton: HTMLButtonElement;
    _totalPrice: HTMLElement;
    _orderButton: HTMLButtonElement;

    set basketList(items: HTMLElement[]);
    set totalPrice(total: number)
}

interface IOrderView {
    paymentButtons: NodeListOf<HTMLButtonElement>;
    addressInput: HTMLInputElement;
    nextButton: HTMLButtonElement;
}

interface IClientView {
    emailInput: HTMLInputElement;
    phoneInput: HTMLInputElement;
    payButton: HTMLButtonElement;

    handleInputs(event: Event): void
}

interface ISuccessView {
    totalPrice: number;
    closeButton: HTMLButtonElement
}
