import request from '@/utils/request'


export function find(params) {
  return request({
    url: '/param/find',
    method: 'get',
    params
  })
}

export function create(data) {
  return request({
    url: '/param/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/param/update',
    method: 'post',
    data
  })
}

export function remove(id) {
  return request({
    url: '/param/remove',
    method: 'post',
	data
  })
}
