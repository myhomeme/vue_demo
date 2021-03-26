import request from '@/utils/request'

export default {
  // 获取参数列表
  getUserInfo(inParam) {
    return request({
      url: 'http://localhost:8083/bcoc/ability/menu',
      method: 'get',
      params: inParam
    })
  },
  // 获取能力信息
  getAbilityInfo(inParam) {
    return request({
      url: 'http://localhost:8083/bcoc/ability/list',
      method: 'get',
      params: inParam
    })
  },
  // 获取能力信息
  getSceneInfo(inParam) {
    return request({
      url: 'http://localhost:8083/scene/save',
      method: 'post',
      params: inParam
    })
  },
}
