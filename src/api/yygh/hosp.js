import request from '@/utils/request'

const api_name = '/admin/hosp/hospital'

export default {
    //获取分页列表
    getPageList(page, limit, searchObj) {
        return request({
            url: `${api_name}/${page}/${limit}`,
            method: 'get',
            params: searchObj
        })
    },
    //上下线
    updateStatus(id, status) {
        return request({
            url: `${api_name}/updateStatus/${id}/${status}`,
            method: 'get'
        })
    },
    //查看医院详情
    getHospitalById(id) {
        return request({
            url: `${api_name}/show/${id}`,
            method: 'get'
        })
    }
}