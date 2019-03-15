/**
 * Created by Jason on 2018/1/10.
 */
const qs = require('qs');
const mockjs = require('mockjs');

const Random = mockjs.Random;

var data ;

module.exports = {
    //post请求  /api/users/ 是拦截的地址   方法内部接受 request response对象
    'GET /users' (req, res) {
        data = mockjs.mock({

            'data|100': [{
                'id|+1': 1,
                'name': () => {
                    return Random.cname();
                },
                'mobile': /1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\d{8}/,
                'avatar': () => {
                    return Random.image('125x125');
                },
                'status|1-2': 1,
                'email': () => {
                    return Random.email('visiondk.com');
                },
                'isadmin|0-1': 1,
                'created_at': () => {
                    return Random.datetime('yyyy-MM-dd HH:mm:ss');
                },
                'updated_at': () => {
                    return Random.datetime('yyyy-MM-dd HH:mm:ss');
                },
            }],
            "page": {
                total: 100,
                current: 1,
            },

        });


        setTimeout(() => {
            res.json({      //将请求json格式返回
                success: true,
                data
            });
        }, 200);
    },
    'GET /navigation' (req, res) {
        data = mockjs.mock({
                'message': '操作成功',
                'status' : 0,
                'result': {
                    'nav|4': [
                        {
                            'id|+1': 0,
                            'name': () => {
                                return Random.cname();
                            },
                            'list|5':[
                                    {
                                    'id|+1': 0,
                                        'name': () => {
                                            return Random.cname();
                                        },
                                        'memo|10': '备注',
                                        'route': 'testRoute',
                                        'assets': () => {
                                            return Random.image('80x80');
                                        }
                                    }
                            ]

                        }
                    ]
                }
        });

        setTimeout(() => {
            res.json({      //将请求json格式返回
                success: true,
                data
            });
        }, 200);
    },



}