import request from '@/utils/request'

const SYSTEM_UPGRADE_LOG_URL = '/v1/sysupgradelog'

export function commonSystemUpgradeLogQuery(SystemUpgradeLogQuery) {
  return request({
    url: SYSTEM_UPGRADE_LOG_URL,
    method: 'get',
    params: SystemUpgradeLogQuery
  })
}

export function systemUpgradeLogQueryById(id) {
  return request({
    url: SYSTEM_UPGRADE_LOG_URL + '/' + id,
    method: 'get'
  })
}

export function latestSystemUpgradeLog(tenantId, subSystemId) {
  return request({
    url: SYSTEM_UPGRADE_LOG_URL + '/latestOne',
    method: 'get',
    params: { tenantId: tenantId, subSystemId: subSystemId }
  })
}

export function addSystemUpgradeLog(systemUpgradeLogDTO) {
  return request({
    url: SYSTEM_UPGRADE_LOG_URL + '/add',
    method: 'post',
    data: systemUpgradeLogDTO
  })
}

export function deleteSystemUpgradeLog(id, version) {
  return request({
    url: SYSTEM_UPGRADE_LOG_URL + '/delete',
    method: 'delete',
    params: { id: id, version: version }
  })
}

export function deleteBatchSystemUpgradeLog(batchIdVersionQuery) {
  return request({
    url: SYSTEM_UPGRADE_LOG_URL + '/deleteBatch',
    method: 'delete',
    data: batchIdVersionQuery
  })
}
