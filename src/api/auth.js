import request from '@/utils/request'

export function register(data){
    return request({
        url:'/auth/register',
        method:"post",
        data
    })
}

export function login(data){
    return request({
        url:"/auth/login",
        method:"post",
        data
    })
}

export function logout(data) {
    return request({
      url: '/auth/logout',
      method: 'get',
      params: data
    })
  }

  export function me() {
    return request ({
        url: "auth/me",
        method:"get",
    })
  }