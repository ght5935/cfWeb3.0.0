import React from 'react';
import { connect } from 'dva';
import { Input, Button, Icon, Row, Col, Select, Table, TreeSelect, InputNumber, Pagination } from 'antd';
import styles from './Rule.less';
import MayLayout from '../../../components/common/Layout/MayLayout';
import AddRuleModule from './AddRuleModule';
import AddRuleModuleTwo from './AddRuleModuleTwo';
import ComfirmModal from '../../../components/common/ConfirmModal/ConfirmModal';
// import Pagination from '../../../components/common/PaginationView/PaginationView';


const { Option, OptGroup } = Select;
const { Column } = Table;
const { TreeNode } = TreeSelect;

class Rule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orgunitId: null,
      poiGroupId: '',
      modalCss: {
        modalWidth: '500px',
        treeCol: '12',
        moreCol: '0',
        arrowCss: styles.moreOperaBtnRight,

      },
      cgTreeExpandKeys: [],
      pgTreeExpandKeys: []
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'bussiness/getAlarmRuleList'
    });
    this.props.dispatch({
      type: 'bussiness/getOrgCategory'
    });
    this.props.dispatch({
      type: 'bussiness/getOrgPersonGroup'
    });
  }
  componentWillUnmount() {
    const rule = this.props.bussiness.rule;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          getRuleParams: {
            pageSize: 10,
            pageNo: 1,
            name: '',
            orgunitId: '',
            poiGroupId: '',
            groupId: '',
            flag: '',
            alarmType: '',
            configPriority: '',
            alarmIndication: '',
            alarmLevel: '',
          }
        }
      }
    });
  }
  onSearchName = e => {
    const rule = this.props.bussiness.rule;
    const { getRuleParams } = rule;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          getRuleParams: {
            ...getRuleParams,
            pageSize: 10,
            pageNo: 1,
            name: e.target.value
          }
        }
      }
    });
  }
  renderCamera = data => data.map(item => {
    return <TreeNode
      key={`${item.id}-${item.name}`}
      value={`${item.orgunitId}-${item.id}`}
      title={<div><Icon type="team" style={{ paddingRight: 6, color: '#1890ff', fontSize: 18 }} />{item.name}</div>}
    />;
  });
  // 生成树
  renderCameraGroupTree = data => data.map(item => {
    if (item.children) {
      return (
        <TreeNode key={item.id} value={String(item.id)} title={<div><i className={styles.treeNode} />{item.title}</div>} disabled >
          {item.objectList ? this.renderCamera(item.objectList) : ''}
          {this.renderCameraGroupTree(item.children)}
        </TreeNode>
      );
    }
    if (item.objectList) {
      return (
        <TreeNode key={`${item.id}-${item.name}`} title={<div><i className={styles.treeNode} />{item.title}</div>} disabled>
          {this.renderCamera(item.objectList)}
        </TreeNode>
      );
    }
    return <TreeNode
      key={`${item.id}-${item.value}`}
      title={<div>{item.title}</div>}
      value={`${item.id}-${item.value}`}
      disabled
    />;
  });

  onSearchOrgunit = value => {
    const rule = this.props.bussiness.rule;
    const { getRuleParams } = rule;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          getRuleParams: {
            ...getRuleParams,
            pageSize: 10,
            pageNo: 1,
            groupId: value
          }
        }
      }
    });
    this.setState({
      groupIdValue: value,
    })
  };

  renderCameraNode = data => data.map(item => {
    return <TreeNode
      key={`${item.id}-${item.name}`}
      value={`${item.orgunitId}-${item.id}`}
      title={<div><Icon type="team" style={{ paddingRight: 6, color: '#1890ff', fontSize: 18 }} />{item.name}</div>}
    />;
  });
  // 生成树
  renderTreeNode = data => data.map(item => {
    if (item.children) {
      return (
        <TreeNode key={item.id} value={String(item.id)} title={<div><i className={styles.treeNode} />{item.title}</div>} disabled >
          {item.objectList ? this.renderCameraNode(item.objectList) : ''}
          {this.renderTreeNode(item.children)}
        </TreeNode>
      );
    }
    if (item.objectList) {
      return (
        <TreeNode key={`${item.id}-${item.name}`} title={<div><i className={styles.treeNode} />{item.title}</div>} disabled>
          {this.renderCameraNode(item.objectList)}
        </TreeNode>
      );
    }
    return <TreeNode
      key={`${item.id}-${item.value}`}
      title={<div>{item.title}</div>}
      value={`${item.id}-${item.value}`}
      disabled
    />;
  });
  onGroupChange = value => {
    const rule = this.props.bussiness.rule;
    const { getRuleParams } = rule;
      this.props.dispatch({
        type: 'bussiness/success',
        payload: {
          rule: {
            ...rule,
            getRuleParams: {
              ...getRuleParams,
              pageSize: 10,
              pageNo: 1,
              poiGroupId: value
            }
          }
        }
      });
      this.setState({
        poiGroupIdValue: value,
      })
  }
  onStatusChange = value => {
    const rule = this.props.bussiness.rule;
    const { getRuleParams } = rule;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          getRuleParams: {
            ...getRuleParams,
            pageSize: 10,
            pageNo: 1,
            flag: value
          }
        }
      }
    });
  }
  onWarnPriorityChange = value => {
    if (value == null || value == undefined) {
      value = ''
    } else {
      value = Number(value);
    }
    const rule = this.props.bussiness.rule;
    const { getRuleParams } = rule;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          getRuleParams: {
            ...getRuleParams,
            pageSize: 10,
            pageNo: 1,
            configPriority: value
          }
        }
      }
    });
  }
  onWarnChange = value => {
    const rule = this.props.bussiness.rule;
    const { getRuleParams } = rule;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          getRuleParams: {
            ...getRuleParams,
            pageSize: 10,
            pageNo: 1,
            alarmIndication: value
          }
        }
      }
    });
  }
  onTyperChange = value => {
    const rule = this.props.bussiness.rule;
    const { getRuleParams } = rule;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          getRuleParams: {
            ...getRuleParams,
            pageSize: 10,
            pageNo: 1,
            alarmType: value
          }
        }
      }
    });
  }
  onWarnGradeChange = value => {
    const rule = this.props.bussiness.rule;
    const { getRuleParams } = rule;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          getRuleParams: {
            ...getRuleParams,
            pageSize: 10,
            pageNo: 1,
            alarmLevel: value
          }
        }
      }
    });
  }
  onSearchClick = () => {
    this.props.dispatch({
      type: 'bussiness/getAlarmRuleList'
    });
  }

  onAddBtnClick = () => {
    this.setState({
      action: 'newRule',
      modalCss: {
        modalWidth: '500px',
        treeCol: '12',
        moreCol: '0',
        arrowCss: styles.moreOperaBtnRight
      }
    });
    const rule = this.props.bussiness.rule;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          addRuleModule: true
        }
      }
    });
  }
  onAddModalCancel = () => {
    const rule = this.props.bussiness.rule;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          addRuleModule: false,
          modifyRule: {
            id: '',
            flag: 1,
            name: '',
            groupId: '',
            poiGroupId: '',
            configType: 1,
            alarmType: 1,
            alarmIndication: 1,
            alarmLevel: 1,
            configPriority: '0',
            memo: '',
          }
        }
      }
    });
    this.setState({
      modalCss: {
        modalWidth: '500px',
        treeCol: '12',
        moreCol: '0',
        arrowCss: styles.moreOperaBtnRight,

      },
    })
  }
  onAddSubmit = () => {
    switch (this.state.action) {
      case 'newRule':
        this.props.dispatch({
          type: 'bussiness/addAlarmRule'
        });
        break;
      case 'editRule':
        this.props.dispatch({
          type: 'bussiness/modifyAlarmRule'
        });
        break;
      default:
        break;
    }
  }
  onOneDeleteClick = record => {
    const rule = this.props.bussiness.rule;
    const { deleteRule } = rule;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        confirmVisiable: true,
        rule: {
          ...rule,
          deleteRule: {
            ...deleteRule,
            id: record.id
          }
        }
      }
    });
  };
  onEditClick = record => {
    const rule = this.props.bussiness.rule;
    const { modifyRule } = rule;
    this.setState({
      action: 'editRule'
    });
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          addRuleModule: true,
          modifyRule: {
            ...modifyRule,
            id: record.id,
            name: record.name,
            groupId: record.cameraGroupId,
            poiGroupId: record.groupId,
            configType: record.configType,
            alarmType: record.alarmType,
            alarmIndication: record.alarmIndication,
            alarmLevel: record.alarmLevel,
            configPriority: record.configPriority,
            configPriority: record.configPriority,
            memo: record.memo,
            flag: record.flag
          }
        }
      }
    });
    this.props.dispatch({
      type: 'bussiness/getPoiByOrgIdAndGroupId'
    });
  }
  tableOperation = record => (
    <div>
      <span title="编辑规则" onClick={this.onEditClick.bind(this, record)} className={`${styles.tableBtn} ${styles.tableEdit}`} />
      <span title="删除规则" onClick={this.onOneDeleteClick.bind(this, record)} className={`${styles.tableBtn} ${styles.tableDelete}`} />
    </div>
  );
  // pageTranslate = value => {
  //   this.props.dispatch({
  //     type: 'bussiness/rolesListTranslate',
  //     payload: {
  //       pageNo: value.pageNo,
  //       pageSize: value.pageSize
  //     }
  //   });
  // };
  itemRender(current, type, originalElement) {
    if (type === 'prev') {
      return <a style={{ color: '#02abe3' }}>上一页</a>;
    } else if (type === 'next') {
      return <a style={{ color: '#02abe3' }}>下一页</a>;
    }
    return originalElement;
  }
  PaginationChange(page, pageSize) {
    this.props.dispatch({
      type: 'bussiness/rolesListTranslate',
      payload: {
        pageNo: page,
        pageSize: pageSize
      }
    });
  }
  // cameraOrgChange = value => {
  //   const rule = this.props.bussiness.rule;
  //   const { modifyRule } = rule;
  //   this.props.dispatch({
  //     type: 'bussiness/success',
  //     payload: {
  //       rule: {
  //         ...rule,
  //         modifyRule: {
  //           ...modifyRule,
  //           groupId: value
  //         }
  //       }
  //     }
  //   });
  // }
  groupChange = value => {
    const rule = this.props.bussiness.rule;
    const { modifyRule } = rule;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          modifyRule: {
            ...modifyRule,
            poiGroupId: value
          }
        }
      }
    });
  }
  alarmTypeChange = value => {
    const rule = this.props.bussiness.rule;
    const { modifyRule } = rule;
    const name = `${modifyRule.groupName}${modifyRule.poiGroupName !== '' ? '-' + modifyRule.poiGroupName : ''}-${value == 1 ? '不在组内' : '在组内'}`;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          modifyRule: {
            ...modifyRule,
            alarmType: value,
            name
          }
        }
      }
    });
  }
  indicationChange = value => {
    const rule = this.props.bussiness.rule;
    const { modifyRule } = rule;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          modifyRule: {
            ...modifyRule,
            alarmIndication: value
          }
        }
      }
    });
  }
  alarmLevelChange = value => {
    const rule = this.props.bussiness.rule;
    const { modifyRule } = rule;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          modifyRule: {
            ...modifyRule,
            alarmLevel: value
          }
        }
      }
    });
  }
  configPriorityChange = value => {
    const rule = this.props.bussiness.rule;
    const { modifyRule } = rule;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          modifyRule: {
            ...modifyRule,
            configPriority: value
          }
        }
      }
    });
  }
  stateChange = value => {
    const rule = this.props.bussiness.rule;
    const { modifyRule } = rule;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          modifyRule: {
            ...modifyRule,
            flag: value
          }
        }
      }
    });
  }
  nameChange = value => {
    const rule = this.props.bussiness.rule;
    const { modifyRule } = rule;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          modifyRule: {
            ...modifyRule,
            name: value
          }
        }
      }
    });
  }
  memoChange = value => {
    const rule = this.props.bussiness.rule;
    const { modifyRule } = rule;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          modifyRule: {
            ...modifyRule,
            memo: value
          }
        }
      }
    });
  }

  onComfirmSubmit = () => {
    this.props.dispatch({
      type: 'bussiness/deleteRule'
    });
  };
  onComfirmCancel = () => {
    const rule = this.props.bussiness.rule;
    const { deleteRule } = rule;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        confirmVisiable: false,
        rule: {
          ...rule,
          deleteRule: {
            ...deleteRule,
            id: ''
          }
        }
      }
    });
  };
  toggleCss = () => {
    if (this.state.modalCss.modalWidth === '500px') {
      this.setState({
        modalCss: {
          modalWidth: '950px',
          treeCol: '7',
          moreCol: '10',
          arrowCss: styles.moreOperaBtnLeft
        }
      })
    } else {
      this.setState({
        modalCss: {
          modalWidth: '500px',
          treeCol: '12',
          moreCol: '0',
          arrowCss: styles.moreOperaBtnRight
        }
      })
    }

  };
  cgTreeExpand = (expandedKeys) => {
    this.setState({
      cgTreeExpandKeys: expandedKeys
    })
  }
  pgTreeExpand = (expandedKeys) => {
    this.setState({
      pgTreeExpandKeys: expandedKeys
    })
  }
  pgSelect = (selectKeys) => {
    const ids = selectKeys[0].split('|');
    const rule = this.props.bussiness.rule;
    const { modifyRule } = rule;
    const name = `${modifyRule.groupName}-${ids[2]}-${modifyRule.alarmType == 1 ? '不在组内' : '在组内'}`;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          modifyRule: {
            ...modifyRule,
            poiGroupId: ids[0],
            name,
            poiGroupName: ids[2]
          }
        }
      }
    });
  }
  cgSelect = (selectKeys) => {
    const ids = selectKeys[0].split('|');
    const rule = this.props.bussiness.rule;
    const { modifyRule } = rule;
    const name = `${ids[2]}-${modifyRule.alarmType == 1 ? '不在组内' : '在组内'}`;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        rule: {
          ...rule,
          modifyRule: {
            ...modifyRule,
            groupId: ids[0],
            poiGroupId: '',
            name,
            groupName: ids[2],
            poiGroupName: ''
          }
        },
        getPgParam: {
          orgunitId: ids[1]
        }
      }
    });

    this.props.dispatch({
      type: 'bussiness/getOrgPersonGroup'
    });
  }
  render() {
    const rule = this.props.bussiness.rule;
    const { getRuleParams } = rule;
    return (
      <MayLayout location={this.props.location}>
        <div className={styles.title}>
          <div className={styles.searchGroup} >
            <Row>
              <Col span={5} className={styles.condition}>
                <span className={styles.label}>规则名称</span>
                <Input
                  onChange={this.onSearchName}
                  style={{ width: 180 }}
                  placeholder="请选择规则名称"
                />
              </Col>
              <Col span={6} className={styles.condition}>
                <span className={styles.label}>摄像头分组</span>
                <TreeSelect
                  style={{ width: 180, marginRight: '5px', maxHeight: '32px', overflow: 'auto', verticalAlign: 'middle' }}
                  allowClear
                  treeDefaultExpandAll
                  dropdownMatchSelectWidth={false}
                  value={getRuleParams.groupId ? `${this.state.groupIdValue}` : ''}
                  onChange={this.onSearchOrgunit}
                  placeholder="请选择摄像头分组"
                  treeCheckStrictly={true}
                >
                  {this.renderCameraGroupTree(this.props.bussiness && this.props.bussiness.cameraGroupTree ? this.props.bussiness.cameraGroupTree : [])}
                </TreeSelect>
              </Col>

              <Col span={5} className={styles.condition}>
                <span className={styles.label}>目标分组</span>
                <TreeSelect
                  style={{ width: 180, marginRight: '5px', maxHeight: '32px', overflow: 'auto', verticalAlign: 'middle' }}
                  allowClear
                  treeDefaultExpandAll
                  dropdownMatchSelectWidth={false}
                  value={getRuleParams.poiGroupId ? `${this.state.poiGroupIdValue}` : ''}
                  onChange={this.onGroupChange}
                  placeholder="请选择目标分组"
                  treeCheckStrictly={true}
                >
                  {this.renderTreeNode(this.props.bussiness && this.props.bussiness.personGroupTree ? this.props.bussiness.personGroupTree : [])}
                </TreeSelect>
              </Col>
              <Col span={4} className={styles.condition}>
                <span className={styles.label}>规则状态</span>
                <Select
                  style={{ width: 180 }}
                  value={getRuleParams.flag ? `${getRuleParams.flag}` : ''}
                  onChange={this.onStatusChange}
                >
                  <Option value="">全部</Option>
                  <Option value="0">关闭</Option>
                  <Option value="1">开启</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={5} className={styles.condition}>
                <span className={styles.label}>报警方式</span>
                <Select
                  style={{ width: 180 }}
                  value={getRuleParams.alarmType ? `${getRuleParams.alarmType}` : ''}
                  onChange={this.onTyperChange}
                >
                  <Option value="">全部</Option>
                  <Option value="2">在组内</Option>
                  <Option value="1">不在组内</Option>
                </Select>
              </Col>
              <Col span={6} className={styles.condition}>
                <span className={styles.label}>报警优先级</span>
                <InputNumber
                  style={{ width: 180 }}
                  placeholder={"0位最高优先级"}
                  min={0}
                  max={999}
                  onChange={this.onWarnPriorityChange}
                />
              </Col>
              <Col span={5} className={styles.condition}>
                <span className={styles.label}>预警性质</span>
                <Select
                  style={{ width: 180 }}
                  value={getRuleParams.alarmIndication ? `${getRuleParams.alarmIndication}` : ''}
                  onChange={this.onWarnChange}
                >
                  <Option value="">全部</Option>
                  <Option value="1">报警</Option>
                  {/* <Option value="2">VIP</Option> */}
                  <Option value="3">闯入</Option>
                  {/* <Option value="4">新客户</Option> */}
                </Select>
              </Col>
              <Col span={4} className={styles.condition}>
                <span className={styles.label}>报警级别</span>
                <Select
                  style={{ width: 180 }}
                  value={getRuleParams.alarmLevel ? `${getRuleParams.alarmLevel}` : ''}
                  onChange={this.onWarnGradeChange}
                >
                  <Option value="">全部</Option>
                  <Option value="1">一级</Option>
                  <Option value="2">二级</Option>
                  <Option value="3">三级</Option>
                  <Option value="4">四级</Option>
                </Select>
              </Col>
              <Col span={2} className={styles.condition}>
                <span className={styles.label}></span>
                <Button
                  type="primary"
                  onClick={this.onSearchClick}
                >查询</Button>
              </Col>
            </Row>
          </div>
          <div className={styles.btnGroup}>
            <Button
              style={{ width: '125px' }} className={styles.delete} type="primary"
              onClick={this.onAddBtnClick}
            >
              <i className={styles.addIcon} />
              <span>新建规则</span>
            </Button>
          </div>
          <div className={styles.list}>
            <Table
              dataSource={this.props.bussiness.rule && this.props.bussiness.rule.ruleTableList ?
                this.props.bussiness.rule.ruleTableList : []}
              pagination={false}
              bordered
              rowKey={record => record.id}
            >
              <Column
                title="规则名称"
                dataIndex="name"
                key="name" />
              <Column
                title="摄像头分组"
                dataIndex="categoryName"
                key="categoryName" />
              {/* <Column
                title="目标人姓名"
                dataIndex="poiName"
                key="poiName"/> */}
              {/* <Column
                title="目标人身份证号"
                dataIndex="identity_card"
                key="identity_card"/> */}
              <Column
                title="目标分组"
                dataIndex="groupName"
                key="groupName" />
              <Column
                title="报警方式"
                dataIndex="alarmType"
                render={text => text == 1 ? '不在组内' : '在组内'}
                key="alarmType" />
              <Column
                title="预警性质"
                render={(record) => {
                  if (record.alarmIndication) {
                    switch (record.alarmIndication) {
                      case 1:
                        return <div>报警</div>;
                        break;
                      case 2:
                        return <div>VIP</div>;
                        break;
                      case 3:
                        return <div>闯入</div>;
                        break;
                      case 4:
                        return <div>新客户</div>;
                        break;
                      default:
                        return '';
                        break;
                    }
                  }
                }}
                key="q" />
              <Column
                title="报警级别"
                // dataIndex="w"
                render={(record) => {
                  if (record.alarmLevel) {
                    switch (record.alarmLevel) {
                      case 1:
                        return <div>一级报警</div>;
                        break;
                      case 2:
                        return <div>二级报警</div>;
                        break;
                      case 3:
                        return <div>三级报警</div>;
                        break;
                      case 4:
                        return <div>四级报警</div>;
                        break;
                      default:
                        return '';
                        break;
                    }
                  }
                }}
                key="w" />
              <Column
                title="报警优先级"
                dataIndex="configPriority"
                key="configPriority" />
              <Column
                title="备注"
                dataIndex="memo"
                key="memo" />
              <Column
                title="操作"
                render={this.tableOperation}
              />
            </Table>

            {/* <Pagination
              className={styles.pagination}
              page={this.props.bussiness.rule.ruleTablePage}
              pageTranslate={this.pageTranslate ? this.pageTranslate : null}
            /> */}
            <Pagination
              className={styles.pagination}
              current={this.props.bussiness.rule.ruleTablePage.currentPage}
              showQuickJumper
              onChange={this.PaginationChange.bind(this)}
              defaultPageSize={10}
              itemRender={this.itemRender}
              showTotal={total => `共 ${total} 条`}
              total={this.props.bussiness.rule.ruleTablePage.total}
            />
          </div>
        </div>
        {/* <AddRuleModule
          visiable={this.props.bussiness.rule.addRuleModule}***
          dataSource={this.props.bussiness.rule.modifyRule}***
          categoryTree={this.props.bussiness && this.props.bussiness.categoryTree ?
            this.props.bussiness.categoryTree : []}
          targetGroupList={this.props.bussiness && this.props.bussiness.poiGroup.allGroups ?
            this.props.bussiness.poiGroup.allGroups : []}
          onAddModalCancel={this.onAddModalCancel}***
          cameraOrgChange={this.cameraOrgChange}
          stateChange={this.stateChange}***
          nameChange={this.nameChange}***
          groupChange={this.groupChange}***
          indicationChange={this.indicationChange}***
          alarmTypeChange={this.alarmTypeChange}***
          alarmLevelChange={this.alarmLevelChange}***
          configPriorityChange={this.configPriorityChange}***
          memoChange={this.memoChange}***
          onSubmit={this.onAddSubmit}***
        /> */}
        <AddRuleModuleTwo
          visiable={this.props.bussiness.rule.addRuleModule}
          dataSource={this.props.bussiness.rule.modifyRule}
          cameraGroupTree={this.props.bussiness.cameraGroupTree}
          personGroupTree={this.props.bussiness.personGroupTree}
          cgTreeExpandKeys={this.state.cgTreeExpandKeys}
          pgTreeExpandKeys={this.state.pgTreeExpandKeys}
          cgTreeExpand={this.cgTreeExpand}
          pgTreeExpand={this.pgTreeExpand}
          cgSelect={this.cgSelect}
          pgSelect={this.pgSelect}
          toggleCss={this.toggleCss}
          modalCss={this.state.modalCss}
          onAddModalCancel={this.onAddModalCancel}
          stateChange={this.stateChange}
          nameChange={this.nameChange}
          groupChange={this.groupChange}
          indicationChange={this.indicationChange}
          alarmTypeChange={this.alarmTypeChange}
          alarmLevelChange={this.alarmLevelChange}
          configPriorityChange={this.configPriorityChange}
          memoChange={this.memoChange}
          onSubmit={this.onAddSubmit}
        />
        <ComfirmModal
          visiable={this.props.bussiness.confirmVisiable}
          onSubmit={this.onComfirmSubmit}
          onCancel={this.onComfirmCancel}
        />
      </MayLayout>
    );
  }
}

function mapStateToProps({ bussiness, basic }) {
  return { bussiness, basic };
}

export default connect(mapStateToProps)(Rule);
