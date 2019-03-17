100 => 'Continue',   //继续
101 => 'Switching Protocols',   //交换协议
102 => 'Processing',   //处理         // RFC2518
103 => 'Early Hints',  //提前暗示
200 => 'OK',    
201 => 'Created',
202 => 'Accepted',   //认可的
203 => 'Non-Authoritative Information',   //非授权信息
204 => 'No Content',   //无内容
205 => 'Reset Content',   //重置内容
206 => 'Partial Content',    //部分内容
207 => 'Multi-Status',  //多状态        // RFC4918
208 => 'Already Reported',  //已经播报    // RFC5842
226 => 'IM Used',    //异步使用           // RFC3229
300 => 'Multiple Choices',   //多选
301 => 'Moved Permanently',   //永久移除
302 => 'Found',
303 => 'See Other',
304 => 'Not Modified',
305 => 'Use Proxy',
307 => 'Temporary Redirect',   //临时跳转
308 => 'Permanent Redirect',  //永久跳转    // RFC7238
400 => 'Bad Request',  //无效请求
401 => 'Unauthorized',  //未授权请求
402 => 'Payment Required',   //请求不允许
403 => 'Forbidden',   //请求被禁止
404 => 'Not Found',  //请求对象不存在
405 => 'Method Not Allowed',   //方法不允许
406 => 'Not Acceptable',
407 => 'Proxy Authentication Required',  //需要代理身份验证
408 => 'Request Timeout', //请求超时
409 => 'Conflict',  //冲突
410 => 'Gone',  //请求丢失
411 => 'Length Required', 
412 => 'Precondition Failed',  //先决条件失败
413 => 'Payload Too Large',  //负载太大
414 => 'URI Too Long',  //url太长
415 => 'Unsupported Media Type',  //媒体类型不支持
416 => 'Range Not Satisfiable',  //范围不适合
417 => 'Expectation Failed',   //预期失败
418 => 'I\'m a teapot',                                               // RFC2324
421 => 'Misdirected Request',         //误导请求                                // RFC7540
422 => 'Unprocessable Entity',       //无法处理的实体                                 // RFC4918
423 => 'Locked',                                                      // RFC4918
424 => 'Failed Dependency',                                           // RFC4918
425 => 'Reserved for WebDAV advanced collections expired proposal',   //保留用于WebDAV高级集合过期提案  // RFC2817
426 => 'Upgrade Required',                                            // RFC2817
428 => 'Precondition Required',        //要求先决条件                               // RFC6585
429 => 'Too Many Requests',                                           // RFC6585
431 => 'Request Header Fields Too Large',            //请求头字段太大                 // RFC6585
451 => 'Unavailable For Legal Reasons',         //因法律原因无法获得                      // RFC7725
499 => 'Client has closed connection'  //客户端主动关闭连接
500 => 'Internal Server Error',   //内部服务器错误
501 => 'Not Implemented',  //未实现
502 => 'Bad Gateway',   //无效网关
503 => 'Service Unavailable',  //服务不可用
504 => 'Gateway Timeout',  //网关连接超时
505 => 'HTTP Version Not Supported',   //http 版本不支持
506 => 'Variant Also Negotiates',    //服务器存在内部配置错误                                 // RFC2295
507 => 'Insufficient Storage',        //远程服务器返回错误                                // RFC4918
508 => 'Loop Detected',                                               // RFC5842
510 => 'Not Extended',                                                // RFC2774
511 => 'Network Authentication Required',      //客户端需要进行身份验证以获得网络访问。   



<https://httpstatuses.com/>

**http请求方法：**

```js
 METHODS: 
   [ 'ACL',
     'BIND',
     'CHECKOUT',
     'CONNECT',
     'COPY',
     'DELETE',
     'GET',
     'HEAD',
     'LINK',
     'LOCK',
     'M-SEARCH',
     'MERGE',
     'MKACTIVITY',
     'MKCALENDAR',
     'MKCOL',
     'MOVE',
     'NOTIFY',
     'OPTIONS',
     'PATCH',
     'POST',
     'PROPFIND',
     'PROPPATCH',
     'PURGE',
     'PUT',
     'REBIND',
     'REPORT',
     'SEARCH',
     'SUBSCRIBE',
     'TRACE',
     'UNBIND',
     'UNLINK',
     'UNLOCK',
     'UNSUBSCRIBE'
  ],
```