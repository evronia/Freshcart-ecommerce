export async function getProducts(query: string ="") {

    const result = await fetch(`https://ecommerce.routemisr.com/api/v1/products${query}`  , {
        method: 'Get',
    }
    )
    const data = await result.json()
    const productsData = data.data



    return productsData









}   