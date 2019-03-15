import window from 'global/window';

export const API_PREFIX = window.CF_API_PREFIX;
// websocket 请求地址
export const WEBSOCKET_URL = window.CF_WEBSOCKET;
// export const WEBSOCKET_URL = 'http://192.168.1.71:9192/ftmsg';
// export const WEBSOCKET_URL = 'http://10.1.205.169:9192/ftmsg';

// 版本号
export const BASE_VERSION = DF_VERSION;
export const API_VERSION = CF_API_VERSION;
export const WEB_VERSION = CF_WEB_VERSION;

// 分页数量（pageSize）
export const ROLE_CONFIG_PAGE_SIZE = 12;
export const POI_PERSON_PAGE_SIZE = 6;
export const POI_GROUP_PAGE_SIZE = 10;
// 分组类型
export const GROUP_TYPE = ['默认', '白名单', '黑名单'];
// 标签颜色
// #35aae3 业主 #68c05a 访客 #e06356 黑名单 #e9a011 工作人员 #b56ecf 其他人员
export const GROUP_LABEL_COLOR = ['#fded3d', '#765547', '#637c8b', '#9ea025', '#33399f', '#5f00e7'];

// 匹配过滤阈值
export const MATCH_THRESHOLD = 0.35;

// 摄像头参数
export const CAMERA_CONFIG_258 = '{\n' +
  '    "FaceMethods": {\n' +
  '        "detector": "4", \n' +
  '        "detectorCheck": "4", \n' +
  '        "alignment": "0", \n' +
  '        "tracker": "1"\n' +
  '    }, \n' +
  '    "PykoParam": {\n' +
  '        "scalefactor": 1.08, \n' +
  '        "stridefactor": 0.1, \n' +
  '        "qthreshold": 0\n' +
  '    }, \n' +
  '    "ThetaParam": {\n' +
  '        "scalefactor": 0.75, \n' +
  '        "xstep": 0.0125, \n' +
  '        "ystep": 0.0125\n' +
  '    }, \n' +
  '    "IntraParam": {\n' +
  '        "threshold": 0.75\n' +
  '    }, \n' +
  '    "FaceFeatureParam": {\n' +
  '        "gpu_threads": 1, \n' +
  '        "gpudevice": 0\n' +
  '    }, \n' +
  '    "FaceTrackParam": {\n' +
  '        "face_minsize": 0.05, \n' +
  '        "face_maxsize": 0.8, \n' +
  '        "track_facenum": 30, \n' +
  '        "gap": 3, \n' +
  '        "detect_gap": 5, \n' +
  '        "track_gap": 1, \n' +
  '        "margin": 0.5, \n' +
  '        "edge_remove": true, \n' +
  '        "minsize": 50, \n' +
  '        "duration_unvalid": 1.5, \n' +
  '        "duration_valid": 3.5, \n' +
  '        "freq_threshold": 0.35, \n' +
  '        "update_valid_times": 6, \n' +
  '        "face2face_threshold": 0.55, \n' +
  '        "bufferframes": 100, \n' +
  '        "second_removed_live": 2, \n' +
  '        "second_live": 5, \n' +
  '        "faces_live": 15\n' +
  '    }, \n' +
  '    "VideoParam": {\n' +
  '        "area_left": 0.05, \n' +
  '        "area_top": 0.05, \n' +
  '        "area_width": 0.9, \n' +
  '        "area_height": 0.9, \n' +
  '        "det_only": true, \n' +
  '        "track_size_w": 500, \n' +
  '        "det_size_w": 400, \n' +
  '        "orig_size_w": 0, \n' +
  '        "orig_aspect": -1.3333, \n' +
  '        "rotate_angle": 0, \n' +
  '        "check_frontface": true\n' +
  '    }, \n' +
  '    "BgParam": {\n' +
  '        "width": 400, \n' +
  '        "height": 226, \n' +
  '        "submitted": true, \n' +
  '        "submit_orig": true, \n' +
  '        "width_orig": 400, \n' +
  '        "count_orig": 4\n' +
  '    }, \n' +
  '    "IPCameraParam": {\n' +
  '        "dynamic_background": false, \n' +
  '        "vlc_option": "net-caching=300", \n' +
  '        "video_player": 0, \n' +
  '        "live_port": 8554, \n' +
  '        "live_width": 480, \n' +
  '        "live_buffer": 10\n' +
  '    }\n' +
  '}';
export const CAMERA_CONFIG = '{\n' +
  '    "FaceMethods": {\n' +
  '        "detector": "4", \n' +
  '        "detectorCheck": "4", \n' +
  '        "alignment": "0", \n' +
  '        "tracker": "1"\n' +
  '    }, \n' +
  '    "PykoParam": {\n' +
  '        "scalefactor": 1.08, \n' +
  '        "stridefactor": 0.1, \n' +
  '        "qthreshold": 0\n' +
  '    }, \n' +
  '    "ThetaParam": {\n' +
  '        "scalefactor": 0.75, \n' +
  '        "xstep": 0.0125, \n' +
  '        "ystep": 0.0125\n' +
  '    }, \n' +
  '    "IntraParam": {\n' +
  '        "threshold": 0.75\n' +
  '    }, \n' +
  '    "FaceFeatureParam": {\n' +
  '        "gpu_threads": 1, \n' +
  '        "gpudevice": 0\n' +
  '    }, \n' +
  '    "FaceTrackParam": {\n' +
  '        "face_minsize": 0.05, \n' +
  '        "face_maxsize": 0.8, \n' +
  '        "track_facenum": 30, \n' +
  '        "gap": 3, \n' +
  '        "detect_gap": 5, \n' +
  '        "track_gap": 1, \n' +
  '        "margin": 0.5, \n' +
  '        "edge_remove": true, \n' +
  '        "minsize": 50, \n' +
  '        "bufferframes": 100, \n' +
  '        "second_removed_live": 1, \n' +
  '        "second_live": 10, \n' +
  '        "faces_live": 20, \n' +
  '        "enable_openmp": false, \n' +
  '        "merge_threshold": 0.7, \n' +
  '        "second_merge": 5\n' +
  '    }, \n' +
  '    "VideoParam": {\n' +
  '        "area_left": 0.05, \n' +
  '        "area_top": 0.05, \n' +
  '        "area_width": 0.9, \n' +
  '        "area_height": 0.9, \n' +
  '        "det_only": true, \n' +
  '        "track_size_w": 500, \n' +
  '        "det_size_w": 400, \n' +
  '        "orig_size_w": 0, \n' +
  '        "orig_aspect": -1.3333, \n' +
  '        "rotate_angle": 0\n' +
  '    }, \n' +
  '    "BgParam": {\n' +
  '        "width": 400, \n' +
  '        "height": 226, \n' +
  '        "submitted": true, \n' +
  '        "submit_orig": true, \n' +
  '        "width_orig": 400, \n' +
  '        "count_orig": 4\n' +
  '    }, \n' +
  '    "IPCameraParam": {\n' +
  '        "url": "rtsp://admin:admin123@192.168.1.14", \n' +
  '        "dynamic_background": false, \n' +
  '        "vlc_option": "net-caching=300", \n' +
  '        "video_player": 0, \n' +
  '        "live_port": 8554, \n' +
  '        "live_width": 480, \n' +
  '        "live_buffer": 10, \n' +
  '        "video_type": 0, \n' +
  '        "hik_ip": "192.168.43.168", \n' +
  '        "hik_port": 8000, \n' +
  '        "hik_name": "admin", \n' +
  '        "hik_pwd": "abcd1234", \n' +
  '        "hik_autogain": false, \n' +
  '        "hik_gain_low": 100, \n' +
  '        "hik_gain_high": 180\n' +
  '    }\n' +
  '}';

export default {
  api: {
    // 首页默认module接口
    getIshomeModuleByRid: `${API_PREFIX}/role/getIshomeModuleByRid.do`,
    // 登陆onLogin
    onLogin: `${API_PREFIX}/logon.do`,
    logout: `${API_PREFIX}/logout.do`,
    getUserName: `${API_PREFIX}/scuser/getUserInfoByLoginName.do`,
    // 导航模块
    navList: `${API_PREFIX}/navigation/getNavigationList.do`,
    getSubModule: `${API_PREFIX}/module/getSubModuleByRlIdAndMdId.do`,
    getRoleByUserName: `${API_PREFIX}/role/getRoleByUserName.do`,
    // 用户模块
    getUserList: `${API_PREFIX}/scuser/list.do`,
    addUser: `${API_PREFIX}/scuser/add.do`,
    editUser: `${API_PREFIX}/scuser/modify.do`,
    deleteUser: `${API_PREFIX}/scuser/delete.do`,
    // 角色配置
    getRoleList: `${API_PREFIX}/role/list.do`,
    getAllRoles: `${API_PREFIX}/role/getRoleByToken.do`,

    addRole: `${API_PREFIX}/role/add.do`,
    editRole: `${API_PREFIX}/role/modify.do`,
    deleteRole: `${API_PREFIX}/role/delete.do`,
    // 权限管理
    getRoleExceptInit: `${API_PREFIX}/role/getRoleExceptInit.do`,
    getAllModule: `${API_PREFIX}/module/getAllModule.do`,
    bindRoleModule: `${API_PREFIX}/module/bindRoleModule.do`,
    searchRolePower: `${API_PREFIX}/module/getModuleByRole.do`,
    // 组织管理
    getGroupTree: `${API_PREFIX}/orgunit/getTreeByUserId.do`,
    getOrgunitById: `${API_PREFIX}/orgunit/getOrgunitById.do`,
    modifyOrgunit: `${API_PREFIX}/orgunit/modifySubOrgunit.do`,
    addSubOrgunit: `${API_PREFIX}/orgunit/addSubOrgunit.do`,
    deleteOrgunit: `${API_PREFIX}/orgunit/deleteOrgunit.do`,
    getParentByOrgId: `${API_PREFIX}/orgunit/getAllParentIdByOrgId.do`,
    // 设备管理
    // getCamreaList: `${API_PREFIX}/camrea/getCameraList.do`,
    getCamreaList: `${API_PREFIX}/camrea/list.do`,
    addCamrea: `${API_PREFIX}/camrea/add.do`,
    // modifyCamrea: `${API_PREFIX}/camrea/modify.do`,
    modifyCamrea: `${API_PREFIX}/camrea/modifyCamera.do`, // 新增修改 categoryId
    deleteCamrea: `${API_PREFIX}/camrea/delete.do`,
    changeCameraStatus: `${API_PREFIX}/camrea/changeCameraStatus.do`,
    getCategoryTree: `${API_PREFIX}/cameraGroup/getCategoryTreeByOrgId.do`,
    getCameraDefaultConfig:`${API_PREFIX}/defalueConfig/getCameraDefaultConfig.do`,

    // 摄像头分组
    addCamreaGroup: `${API_PREFIX}/cameraGroup/add.do`,
    getCameraGroupList: `${API_PREFIX}/cameraGroup/list.do`,
    // deleteCamreaGroup: `${API_PREFIX}/cameraGroup/delete.do`,deleteCameraGroups.do
    deleteCamreaGroup: `${API_PREFIX}/cameraGroup/deleteCameraGroups.do`,
    modifyCamreaGroup: `${API_PREFIX}/cameraGroup/modify.do`,
    getGroupNameTree: `${API_PREFIX}/cameraGroup/getListByOrgunitId.do`,
    modifyGroupNameTree: `${API_PREFIX}/cameraGroup/getListByOrgunitId.do`,  // 设备管理->弹框调用

    // 目标人管理
    getPoiList: `${API_PREFIX}/poi/list.do`,
    uploadFace: `${API_PREFIX}/poi/uploadFace.do`,
    addPoiByUpload: `${API_PREFIX}/poi/addByUpload.do`,
    modifyPoi: `${API_PREFIX}/poi/modify.do`,
    deletePoi: `${API_PREFIX}/poi/deletePersons.do`,

    // 目标分组
    getAllGroups: `${API_PREFIX}/group/listAll.do`, // 无分页
    getGroupsList: `${API_PREFIX}/group/list.do`, // 有分页
    addGroup: `${API_PREFIX}/group/add.do`,
    modifyGroup: `${API_PREFIX}/group/modify.do`,
    deleteGroup: `${API_PREFIX}/group/delete.do`,


    // 规则管理
    alarmRuleList: `${API_PREFIX}/alarmConfig/list.do`,
    addAlarmRule: `${API_PREFIX}/alarmConfig/add.do`,
    modifyAlarmRule: `${API_PREFIX}/alarmConfig/modify.do`,
    deleteAlarmRule: `${API_PREFIX}/alarmConfig/delete.do`,
    getPoiByOrgIdAndGroupId: `${API_PREFIX}/alarmConfig/getPoiByOrgIdAndGroupId.do`,
    getGroupListAll: `${API_PREFIX}/group/listAll.do`,
    // 实时监控
    getMatchpoi: `${API_PREFIX}/facetrackHistory/getMatchpoiByFacetrackId.do`,
    getInitAlarmList: `${API_PREFIX}/alarmHistory/getHomeAlarmList.do`,
    getInitPassList: `${API_PREFIX}/facetrackHistory/getHomePassList.do`,
    // getIntFaceList:`${API_PREFIX}/facetrackHistory/getFaceList.do`,
    getIntFaceList: `${API_PREFIX}/facetrackHistory/getWorkFaceHistoryList.do`,

    // 通过历史
    // historyPassList: `${API_PREFIX}/facetrackHistory/getNoAlarmFaceList.do`,
    historyPassList: `${API_PREFIX}/facetrackHistory/getFaceList.do`,
    gitALLCamreaList: `${API_PREFIX}/camrea/listAll.do`,
    deleteTakeImgs: `${API_PREFIX}/facetrackHistory/removeFaceImg.do`,
    // bindFacetrackApi: `${API_PREFIX}/poi/bindFacetrack.do`,
    addByFacetrack: `${API_PREFIX}/poi/addByFacetrack.do`,
    // 报警历史
    alarmList: `${API_PREFIX}/alarmHistory/getAlarmPageData.do`,

    //  绑定facetrack图片到person
    bindFacetrackApi: `${API_PREFIX}/poi/addImgToPerson.do`,
    // 日志列表
    logList: `${API_PREFIX}/log/list.do`,
    // 服务器管理
    getRecognizeList: `${API_PREFIX}/appnode/list.do`,
    addServer: `${API_PREFIX}/appnode/add.do`,
    modifyServer: `${API_PREFIX}/appnode/modify.do`,
    getAppDefaultConfig: `${API_PREFIX}/defalueConfig/getAppDefaultConfig.do`,
    deleteServer: `${API_PREFIX}/appnode/delete.do`,

    getSrc: `${API_PREFIX}/appnode/getSrc.do`,
    modifyCamera: `${API_PREFIX}/appnode/modifySrc.do `,
    // 服务器管理===采集端
    getAppnodeList: `${API_PREFIX}/appnode/getAppnodeList.do`,
    getCollectList: `${API_PREFIX}/device/list.do`,
    addCollect: `${API_PREFIX}/device/add.do`,
    modifyCollect: `${API_PREFIX}/device/modify.do`,
    deleteCollect: `${API_PREFIX}/device/delete.do`,

    // 图片检索
    createFacetrackByImg: `${API_PREFIX}/facetrackHistory/createFacetrackByImg.do`,
    matchFacetrackToFacetrack: `${API_PREFIX}/facetrackHistory/matchFacetrackToFacetrack.do`,
    getMatchFaceToFaceResult: `${API_PREFIX}/facetrackHistory/getMatchFaceToFaceResult.do`,
    matchFacetrackToPerson: `${API_PREFIX}/poi/matchFacetrack2Person.do`,
    getMatchFaceToPoiResult: `${API_PREFIX}/poi/getMatchFacetrackResult.do`,
    match2images: `${API_PREFIX}/poi/match2images.do`,
    // 统计分析
    // getAlarmTypeData: `${API_PREFIX}/static/getAlarmTypeData.do`,
    // getCultData: `${API_PREFIX}/static/getCultData.do`,
    // getMonthTypeData: `${API_PREFIX}/static/getMonthTypeData.do`,

    getCaptureData: `${API_PREFIX}/static/getCapturePersonGroupData.do`,
    getCameraData: `${API_PREFIX}/static/getCameraCaptureData.do`,
    getTimeTypeCaptureData: `${API_PREFIX}/static/getTimeTypeCaptureData.do`,
    getGroupCaptureDataList: `${API_PREFIX}/alarmHistory/getGroupCaptureDataList.do`,

    //业务配置 -> 目标管理
    deletePicture: `${API_PREFIX}/poi/deleteUploadImg.do`,
    addPicture: `${API_PREFIX}/poi/addUploadImgToPerson.do`,

    //  获取摄像头分组树
    getOrgCategory: `${API_PREFIX}/orgunit/getOrgCategory.do`,
    getOrgPersonGroup: `${API_PREFIX}/orgunit/getOrgPersonGroup.do`,

    /* 2018-11-19 目标管理，关联facetrack新增接口 */
    matchPerson2Facetrack: `${API_PREFIX}/poi/matchPerson2Facetrack.do`,
    getMatchPersonResult: `${API_PREFIX}/poi/getMatchPersonResult.do`,

  }
};
