export async function getBrands() {

    const result = await fetch('https://ecommerce.routemisr.com/api/v1/brands', {
        method: 'Get',
    }
    )
    const data = await result.json()
    const brandsData = data.data



    return brandsData









}   