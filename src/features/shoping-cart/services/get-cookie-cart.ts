import { getCookie, hasCookie, setCookie } from "cookies-next"


export const getCookieCart = (): {[id: string]: number} => {
    if(hasCookie('cart')){
        const cookieCart = JSON.parse(getCookie('cart') as string ?? '{}')
        return cookieCart
    }
    return {} 
}

export const addProductToCart = (id: string) => {
    const products = getCookieCart() 
    if(products[id]){
        products[id] += 1
    }else{
        products[id] = 1
    }
    setCookie('cart', JSON.stringify(products))
    return products
}

export const removeFromcart = (id: string) => {
    const products = getCookieCart()
    if(!products[id]){
        return
    }
    delete products[id]
    setCookie('cart', JSON.stringify(products))
}