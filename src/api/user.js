import request from '@/utils/request';



//获取库存照片接口
export const queryDistributionPicture = (data) =>
  request({
    url: '/api/qydigital-park-service/queryLargeWarehouse/queryDistributionPicture',
    method: 'post',
    data
  });


// /api/qydigital-park-service/queryLargeWarehouse/queryDistributionPicture

//实时库存数据接口
export const queryDistributionInfoPagination = (data) =>
  request({
    url: '/api/qydigital-park-service/queryLargeWarehouse/queryDistributionInfoPagination',
    method: 'post',
    data
  });

//仓库呆滞率
export const queryInventoryRateInfo = (data) =>
  request({
    url: '/api/qydigital-park-service/queryLargeWarehouse/queryInventoryRateInfo',
    method: 'post',
    data
  });




//安全库存预警

export const querySafeDistributionInfo = (data) =>
  request({
    url: '/api/qydigital-park-service/queryLargeWarehouse/querySafeDistributionInfo',
    method: 'post',
    data
  });



//生产效率
export const queryProductionInfo = (data) =>
  request({
    url: '/api/qydigital-park-service/queryLargeWarehouse/queryProductionInfo',
    method: 'post',
    data
  });



//平均库存下降率
export const queryAvgDisDeclineRateInfo = (data) =>
  request({
    url: '/api/qydigital-park-service/queryLargeWarehouse/queryAvgDisDeclineRateInfo',
    method: 'post',
    data
  });

// 

//库存周转率统计

export const queryTurnoverInfo = (data) =>
  request({
    url: '/api/qydigital-park-service/queryLargeWarehouse/queryTurnoverInfo',
    method: 'post',
    data
  });

// 



//仓库吞吐量统计


export const queryWarehouseThroughputStatistic = (data) =>
  request({
    url: '/api/qydigital-park-service/queryLargeWarehouse/queryWarehouseThroughputStatistic',
    method: 'post',
    data
  });




//堆场作业详情
export const queryYardWarehouseInfo = (data) =>
  request({
    url: '/api/qydigital-park-service/queryLargeWarehouse/queryYardWarehouseInfo',
    method: 'post',
    data
  });

//堆场指标
export const queryYardWarehouseRate = (data) =>
  request({
    url: '/api/qydigital-park-service/queryLargeWarehouse/queryYardWarehouseRate',
    method: 'post',
    data
  });







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