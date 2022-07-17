import request from '@/utils/request'

const api_name = '/admin/hosp/hospitalSet'

export default {
    //带分页带条件查询医院设置
    pageQuery(page, limit, searchObj) {
        return request({
            url: `${api_name}/pageQuery/${page}/${limit}`,
            method: 'post',
            data: searchObj //使用JSON方式
        })
    },
    //医院设置删除
    removeById(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'delete'
        })
    },
    //新增医院设置
    save(hospitalSet) {
        return request({
            url: `${api_name}/save`,
            method: 'post',
            data: hospitalSet //使用JSON方式
        })
    },
    //根据id查询医院设置
    getById(id) {
        return request({
            url: `${api_name}/getById/${id}`,
            method: 'get'
        })
    },
    //修改医院设置
    update(hospitalSet) {
        return request({
            url: `${api_name}/update`,
            method: 'post',
            data: hospitalSet //使用JSON方式
        })
    },
    //批量医院设置删除
    batchRemove(idList) {
        return request({
            url: `${api_name}/batchRemove`,
            method: 'delete',
            data: idList
        })
    },
    //医院设置锁定和解锁
    lockHospitalSet(id, status) {
        return request({
            url: `${api_name}/lockHospitalSet/${id}/${status}`,
            method: 'put'
        })
    }
}