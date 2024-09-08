export const MASTER_MS_GLOBAL_SETTING_PATTERN = {
  TCP: {
    fetchAllGlobalSetting: {
      role: 'fetchAllGlobalSetting',
      cmd: 'fetch-all-global-setting'
    },
    updateGlobalSetting: {
      role: 'updateGlobalSetting',
      cmd: 'update-global-setting'
    },


  },
  KAFKA: {
    fetchAllGlobalSetting: 'fetchAllGlobalSetting',
    updateGlobalSetting: 'updateGlobalSetting',
  },
  REDIS: [],
  RABBITMQ: [],
};
