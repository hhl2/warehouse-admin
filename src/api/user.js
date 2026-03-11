import request from '@/utils/request';


//人员监测指标接口

export const getSignInRecordInfo = (data) =>
  request({
    url: '/api/qydigital-park-service/signInRecord/getSignInRecordInfo',
    method: 'post',
    data,
    skipGlobalParams: true
  });
//设备管理(获取安防设备列表)
export const getVideoPointList = (data) =>
  request({
    url: '/api/qydigital-park-service/deviceStatistics/getVideoPointList',
    method: 'post',
    data,
    skipGlobalParams: true
  });
//设备管理(获取环境设备列表)
export const getParkWeatherStationList = (data) =>
  request({
    url: '/api/qydigital-park-service/deviceStatistics/getParkWeatherStationList',
    method: 'post',
    data,
    skipGlobalParams: true
  });





//设备管理(获取功器具设备列表)
export const getIntelligentToolList = (data) =>
  request({
    url: '/api/qydigital-park-service/deviceStatistics/getIntelligentToolList',
    method: 'post',
    data,
    skipGlobalParams: true
  });
//设备管理(获取建筑设备列表)
export const getBuildingDeviceList = (data) =>
  request({
    url: '/api/qydigital-park-service/deviceStatistics/getBuildingDeviceList',
    method: 'post',
    data,
    skipGlobalParams: true
  });
//设备管理(获取智能设备列表)
export const getDisplayDeviceList = (data) =>
  request({
    url: '/api/qydigital-park-service/deviceStatistics/getDisplayDeviceList',
    method: 'post',
    data,
    skipGlobalParams: true
  });

//设备管理(获取能耗设备列表)
export const getEnergyDeviceList = (data) =>
  request({
    url: '/api/qydigital-park-service/deviceStatistics/getEnergyDeviceList',
    method: 'post',
    data,
    skipGlobalParams: true
  });


//设备管理(统计在线数和总数接口)
export const getCountOnlinSum = (data) =>
  request({
    url: '/api/qydigital-park-service/deviceStatistics/getCountOnlinSum',
    method: 'post',
    data,
    skipGlobalParams: true
  });



export const queryParkReservationListPagination = (data) =>
  request({
    url: '/api/qydigital-park-service/qyQueryPersonInfo/queryParkReservationListPagination',
    method: 'post',
    data,
    skipGlobalParams: true
  });

export const queryMonitoringPointListPagination = (data) =>
  request({
    url: '/api/qydigital-park-service/qyMonitoringPoint/queryMonitoringPointListPagination',
    method: 'post',
    data,
    skipGlobalParams: true
  });
//安防警告接口
export const querySecurityAlarmListPagination = (data) =>
  request({
    url: '/api/qydigital-park-service/qyMonitoringPoint/querySecurityAlarmListPagination',
    method: 'post',
    data,
    skipGlobalParams: true
  });








// 告警管理统计
export const querySecurityAlarmCount = (data) =>
  request({
    url: '/api/qydigital-park-service/qyQueryDeviceInfo/querySecurityAlarmCount',
    method: 'post',
    data,
    skipGlobalParams: true
  });

// 环境监测详情接口
// export const queryParkWeatherListPagination = (data) =>
//   request({
//     url: '/api/qydigital-park-service/qyQueryDeviceInfo/queryParkWeatherListPagination',
//     method: 'post',
//     data,
//     skipGlobalParams: true
//   });

// 消防监测指标接口  建筑设备系统(水浸，火灾)
export const queryEnvironmentCount = (data) =>
  request({
    url: '/api/qydigital-park-service/qyMonitoringPoint/queryEnvironmentCount',
    method: 'post',
    data,
    skipGlobalParams: true
  });

// 安防监测指标接口  摄像头数据
export const queryMonitoringCount = (data) =>
  request({
    url: '/api/qydigital-park-service/qyMonitoringPoint/queryMonitoringCount',
    method: 'post',
    data,
    skipGlobalParams: true
  });
// 管理列表接口
export const getDeviceList = (data) =>
  request({
    url: '/api/qydigital-park-service/deviceStatistics/getDeviceList',
    method: 'post',
    data,
    skipGlobalParams: true
  });


// 管理列表接口2
export const queryMaintainDataList = (data) =>
  request({
    url: '/api/qydigital-park-service/syncWcs/queryMaintainDataList',
    method: 'post',
    data,
    skipGlobalParams: true
  });

// 管理列表接口
export const queryManageList = (data) =>
  request({
    url: '/api/qydigital-park-service/syncWcs/queryManageList',
    method: 'post',
    data,
    skipGlobalParams: true
  });

// 重点设备维护
export const queryAlarmCurrent = (data) =>
  request({
    url: '/api/qydigital-park-service/syncWcs/queryAlarmCurrent',
    method: 'post',
    data,
    skipGlobalParams: true
  });
//能源监测详情
export const queryEnergyDeviceListPagination = (data) =>
  request({
    url: '/api/qydigital-park-service/qyQueryDeviceInfo/queryEnergyDeviceListPagination',
    method: 'post',
    data,
    skipGlobalParams: true
  });

queryEnergyDeviceListPagination

// 能源监测
export const queryEnergyNumCount = (data) =>
  request({
    url: '/api/qydigital-park-service/qyQueryDeviceInfo/queryEnergyNumCount',
    method: 'post',
    data,
    skipGlobalParams: true
  });
//环境监测
export const queryParkWeatherListPagination = (data) => request({
  url: '/api/qydigital-park-service/qyQueryDeviceInfo/queryParkWeatherListPagination',
  method: 'post',
  data,
  skipGlobalParams: true
});

// 作业指标概况
export const queryWarehouseStatusPagination = (data) =>
  request({
    url: '/api/qydigital-park-service/queryLargeWarehouse/queryWarehouseStatusPagination',
    method: 'post',
    data
  });

// 获取库存照片接口
export const queryDistributionPicture = (data) =>
  request({
    url: '/api/qydigital-park-service/queryLargeWarehouse/queryDistributionPicture',
    method: 'post',
    data
  });

// 实时库存数据接口
export const queryDistributionInfoPagination = (data) =>
  request({
    url: '/api/qydigital-park-service/queryLargeWarehouse/queryDistributionInfoPagination',
    method: 'post',
    data
  });

// 仓库呆滞率
export const queryInventoryRateInfo = (data) =>
  request({
    url: '/api/qydigital-park-service/queryLargeWarehouse/queryInventoryRateInfo',
    method: 'post',
    data
  });

// 安全库存预警
export const querySafeDistributionInfo = (data) =>
  request({
    url: '/api/qydigital-park-service/queryLargeWarehouse/querySafeDistributionInfo',
    method: 'post',
    data
  });

// 生产效率
export const queryProductionInfo = (data) =>
  request({
    url: '/api/qydigital-park-service/queryLargeWarehouse/queryProductionInfo',
    method: 'post',
    data
  });

// 平均库存下降率
export const queryAvgDisDeclineRateInfo = (data) =>
  request({
    url: '/api/qydigital-park-service/queryLargeWarehouse/queryAvgDisDeclineRateInfo',
    method: 'post',
    data
  });

// 库存周转率统计
export const queryTurnoverInfo = (data) =>
  request({
    url: '/api/qydigital-park-service/queryLargeWarehouse/queryTurnoverInfo',
    method: 'post',
    data
  });

// 仓库吞吐量统计
export const queryWarehouseThroughputStatistic = (data) =>
  request({
    url: '/api/qydigital-park-service/queryLargeWarehouse/queryWarehouseThroughputStatistic',
    method: 'post',
    data
  });

// 堆场作业详情
export const queryYardWarehouseInfo = (data) =>
  request({
    url: '/api/qydigital-park-service/queryLargeWarehouse/queryYardWarehouseInfo',
    method: 'post',
    data
  });

// 堆场指标
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

// 检测任务列表
export const queryDetectTaskListPage = (data) =>
  request({
    url: '/gmp/mm/qcdataanalysis/thirdPartyDigitalTwin/queryDetectTaskListPage',
    method: 'post',
    data
  });

// 检测查询检测详情
export const queryDetectPlanInfoListPage = (data) =>
  request({
    url: '/gmp/mm/qcdataanalysis/thirdPartyDigitalTwin/queryDetectPlanInfoListPage',
    method: 'post',
    data
  });

// 告警统计
export const queryAlarmInfoStatistics = (data) =>
  request({
    url: '/gmp/mm/qcdataanalysis/thirdPartyDigitalTwin/queryAlarmInfoStatistics',
    method: 'post',
    data
  });

// 告警列表（详情从列表中获取）
export const queryAlarmInfoListPage = (data) =>
  request({
    url: '/gmp/mm/qcdataanalysis/thirdPartyDigitalTwin/queryAlarmInfoListPage',
    method: 'post',
    data
  });

// 设备统计
export const queryEquipmentStatistics = (data) =>
  request({
    url: '/gmp/mm/qcdataanalysis/thirdPartyDigitalTwin/queryEquipmentStatistics',
    method: 'post',
    data
  });

// 查询设备列表
export const queryEquipmentListPage = (data) =>
  request({
    url: '/gmp/mm/qcdataanalysis/thirdPartyDigitalTwin/queryEquipmentListPage',
    method: 'post',
    data
  });

// 分页查询送检信息
export const queryEquipmentDeliveryListPage = (data) =>
  request({
    url: '/gmp/mm/qcdataanalysis/thirdPartyDigitalTwin/queryEquipmentDeliveryListPage',
    method: 'post',
    data
  });

// 查询设备详情
export const queryEquipmentDetail = (data) =>
  request({
    url: '/gmp/mm/qcdataanalysis/thirdPartyDigitalTwin/queryEquipmentDetail',
    method: 'post',
    data
  });

// 查询维修信息
export const queryEquipmentMaintenanceListPage = (data) =>
  request({
    url: '/gmp/mm/qcdataanalysis/thirdPartyDigitalTwin/queryEquipmentMaintenanceListPage',
    method: 'post',
    data
  });

// 全部配置化（GET 请求示例保持原有风格，因为参数对象不同）
export const getUserList = (params) =>
  request({
    url: '/data.Info/photovoltaicsInfo',
    method: 'get',
    params
  });

export const createUser = (data) =>
  request({
    url: '/api/users',
    method: 'post',
    data
  });

export const updateUser = (id, data) =>
  request({
    url: `/api/users/${id}`,
    method: 'put',
    data
  });

export const deleteUser = (id) =>
  request({
    url: `/api/users/${id}`,
    method: 'delete'
  });

export const get_road_rank = (data) =>
  request({
    url: '/dljcboot/3d/disastersCount/countBy?countType=road&xzq=510100&years=',
    method: 'get',
    data
  });