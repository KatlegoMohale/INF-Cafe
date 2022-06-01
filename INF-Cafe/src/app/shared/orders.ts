export interface OrderLine {
    productId : number
    productName : string
    productPrice : number
    quantity : number
}

export interface Order{
    orderId : number
    orderDate : Date
}