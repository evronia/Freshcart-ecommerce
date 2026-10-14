export async function getCategories() {
    const result = await fetch('https://ecommerce.routemisr.com/api/v1/categories', {
        method: 'Get',
    }
    )
    const data = await result.json()
    const categoriesData = data.data



    return categoriesData




}