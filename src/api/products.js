import request from '@/utils/request'

export async function products(){
    return await request({
        url:'/products',
        method: 'get'
    })
}

export async function productShow(id){
    return await request({
        url:`/products/${id}`,
        method:'get'
    })
}

export function productCreate(data){
    return request({
        url:`/products`,
        method: 'post',
        params:data
    })
}

export function productUpdate(id){
    return request({
        url: `/products/${id}`,
        method: 'put',
        params:data
    })
}

export function productDelete(id){
    return request({
        url:`/products/${id}`,
        method:'delete'
    })
}

export async function getProductsByCategory(id){
    return await request({
        url: `/products/category/${id}`,
        method: 'get'
    })
}

export async function getProductsByBrand(id){
    return await request({
        url: `/products/brand/${id}`,
        method: 'get'
    })
}