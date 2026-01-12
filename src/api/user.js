import request from '@/utils/request';

// 获取检测工位-工位信息
export const queryDetectStationInfo = (data) =>
  request({
    url: '/gmp/mm/qcdataanalysis/thirdPartyDigitalTwin/queryDetectStationInfo',
    method: 'post',
    data
  });
//检测任务列表
export const queryDetectTaskListPage = (data) =>
  request({
    url: '/gmp/mm/qcdataanalysis/thirdPartyDigitalTwin/queryDetectTaskListPage',
    method: 'post',
    data
  });

//检测查询检测详情
export const queryDetectPlanInfoListPage = (data) =>
  request({
    url: '/gmp/mm/qcdataanalysis/thirdPartyDigitalTwin/queryDetectPlanInfoListPage',
    method: 'post',
    data
  });


//告警统计
export const queryAlarmInfoStatistics = (data) =>
  request({
    url: '/gmp/mm/qcdataanalysis/thirdPartyDigitalTwin/queryAlarmInfoStatistics',
    method: 'post',
    data
  });
//告警列表（详情从列表中获取）
export const queryAlarmInfoListPage = (data) =>
  request({
    url: '/gmp/mm/qcdataanalysis/thirdPartyDigitalTwin/queryAlarmInfoListPage',
    method: 'post',
    data
  });
//设备统计
export const queryEquipmentStatistics = (data) =>
  request({
    url: '/gmp/mm/qcdataanalysis/thirdPartyDigitalTwin/queryEquipmentStatistics',
    method: 'post',
    data
  });
//查询设备列表

export const queryEquipmentListPage = (data) =>
  request({
    url: '/gmp/mm/qcdataanalysis/thirdPartyDigitalTwin/queryEquipmentListPage',
    method: 'post',
    data
  });


//分页查询送检信息
export const queryEquipmentDeliveryListPage = (data) =>
  request({
    url: '/gmp/mm/qcdataanalysis/thirdPartyDigitalTwin/queryEquipmentDeliveryListPage',
    method: 'post',
    data
  });


//查询设备详情
export const queryEquipmentDetail = (data) =>
  request({
    url: '/gmp/mm/qcdataanalysis/thirdPartyDigitalTwin/queryEquipmentDetail',
    method: 'post',
    data
  });


//查询维修信息
export const queryEquipmentMaintenanceListPage = (data) =>
  request({
    url: '/gmp/mm/qcdataanalysis/thirdPartyDigitalTwin/queryEquipmentMaintenanceListPage',
    method: 'post',
    data
  });







// 获取用户列表（带查询参数）
export const getUserList = (params) =>
  request({
    url: '/data.Info/photovoltaicsInfo',
    method: 'get',
    params  // GET参数通过params传递
  });

// 创建用户
export const createUser = (data) =>
  request({
    url: '/api/users',
    method: 'post',
    data  // POST参数通过data传递
  });

// 更新用户信息
export const updateUser = (id, data) =>
  request({
    url: `/api/users/${id}`,
    method: 'put',
    data
  });

// 删除用户
export const deleteUser = (id) =>
  request({
    url: `/api/users/${id}`,
    method: 'delete'
  });


//全市道路排名
export const get_road_rank = (data) => {

  return request({
    url: '/dljcboot/3d/disastersCount/countBy?countType=road&xzq=510100&years=',
    method: 'get',
    data
  })
}