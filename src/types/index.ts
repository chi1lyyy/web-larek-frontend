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
    countProducts(): number;
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


interface IOrder {
    setPayment(payment: PaymemtMathod): void;
    setEmail(email: string): void;
    setPhone(phone: string): void;
    setAddress(address: string): void;
    setCartData(cart: ICart): void;
    validate(): boolean
}


//Интерфейс для настройки отображения каталога карточек
interface ICatalogView {
    gallery: HTMLElement;
    cardTemplate: HTMLTemplateElement;

    createCard(product: IProduct): HTMLElement;
    render(products: IProduct[]): void
}

interface ICartCounter {
    cartCounter: HTMLElement;

    updateCartAmount(amount: number): void;
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

interface IOrderView {
    paymentButtons: NodeListOf<HTMLButtonElement>;
    addressInput: HTMLInputElement;
    nextButton: HTMLButtonElement;

    handlePaymentSelection(event: MouseEvent): void;
    handleAddressInput(event: Event): void;
    toggleNextButton(): void
}

interface IClientView {
    emailInput: HTMLInputElement;
    phoneInput: HTMLInputElement;
    payButton: HTMLButtonElement;

    handleInputs(event: Event): void;
    render(): void;
    togglePayButton(): void
}

interface ISuccessView {
    totalPrice: number;
    closeButton: HTMLButtonElement
}

interface App {
    apiService: ApiService;
    cart: ICart;
    order: IOrder;
    catalogView: ICatalogView;
    cartView: ICartView;
    orderView: IOrderView;
    clientView: IClientView;
    successModalView: ISuccessView;
    cartCounter: ICartCounter;


    setCatalog(items: IProduct): void;
    openProductView(): void;
    addToCart(product: string): void;
    removeFromCart(productId: string): void;
    updateCart(): void;
    openOrderView(): void;
    setPaymentMethod(paymemtMathod: PaymemtMathod): void;
    setDeliveryAddress(address: string): void;
    openClientView(): void;
    setEmail(email: string): void;
    setPhone(phone: string): void;
    showSuccessModal(): void;
    openCartView(): void;
    submitOrder(): void;
}
