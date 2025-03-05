import{_ as l,C as p,c as o,o as e,a as n,q as t,b as c,m as r}from"./chunks/framework.BSdOUgs7.js";const C=JSON.parse('{"title":"网关服务器","description":"","frontmatter":{},"headers":[{"level":2,"title":"基础介绍","slug":"gate-introduction","link":"#gate-introduction","children":[]},{"level":2,"title":"示例代码","slug":"gate-example","link":"#gate-example","children":[]},{"level":2,"title":"启动服务","slug":"gate-start","link":"#gate-start","children":[]},{"level":2,"title":"启动配置","slug":"gate-etc","link":"#gate-etc","children":[]}],"relativePath":"guide/gate.md","filePath":"guide/gate.md"}'),E={name:"guide/gate.md"};function y(i,s,F,u,B,d){const a=p("TextAd");return e(),o("div",null,[s[0]||(s[0]=n("h1",{id:"gate",tabindex:"-1"},[r("网关服务器 "),n("a",{class:"header-anchor",href:"#gate","aria-label":'Permalink to "网关服务器 {#gate}"'},"​")],-1)),t(a),s[1]||(s[1]=c(`<h2 id="gate-introduction" tabindex="-1">基础介绍 <a class="header-anchor" href="#gate-introduction" aria-label="Permalink to &quot;基础介绍 {#gate-introduction}&quot;">​</a></h2><p>网关服务器作为所有客户端的入口，通常具备以下功能：</p><ul><li>为客户端提供连接支持</li><li>管理并维持客户端连接</li><li>转发客户端消息到目标节点服务器</li><li>下发后端服务器消息到指定客户端</li></ul><p>在 <a href="https://github.com/dobyte/due" target="_blank" rel="noreferrer">due</a> 框架中，网关服（gate）采用模块化的架构思路，开发者可以根据自身的业务情况任意搭配模块化组件。</p><h2 id="gate-example" tabindex="-1">示例代码 <a class="header-anchor" href="#gate-example" aria-label="Permalink to &quot;示例代码 {#gate-example}&quot;">​</a></h2><p>以下完整示例详见：<a href="https://github.com/dobyte/due-examples/tree/master/cluster/simple/gate" target="_blank" rel="noreferrer">gate</a></p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#B392F0;"> main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/locate/redis/v2</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/network/ws/v2</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/registry/consul/v2</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2/cluster/gate</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#6A737D;">	// 创建容器</span></span>
<span class="line"><span style="color:#E1E4E8;">	container </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> due.</span><span style="color:#B392F0;">NewContainer</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#6A737D;">	// 创建服务器</span></span>
<span class="line"><span style="color:#E1E4E8;">	server </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> ws.</span><span style="color:#B392F0;">NewServer</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#6A737D;">	// 创建用户定位器</span></span>
<span class="line"><span style="color:#E1E4E8;">	locator </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> redis.</span><span style="color:#B392F0;">NewLocator</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#6A737D;">	// 创建服务发现</span></span>
<span class="line"><span style="color:#E1E4E8;">	registry </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> consul.</span><span style="color:#B392F0;">NewRegistry</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#6A737D;">	// 创建网关组件</span></span>
<span class="line"><span style="color:#E1E4E8;">	component </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> gate.</span><span style="color:#B392F0;">NewGate</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">		gate.</span><span style="color:#B392F0;">WithServer</span><span style="color:#E1E4E8;">(server),</span></span>
<span class="line"><span style="color:#E1E4E8;">		gate.</span><span style="color:#B392F0;">WithLocator</span><span style="color:#E1E4E8;">(locator),</span></span>
<span class="line"><span style="color:#E1E4E8;">		gate.</span><span style="color:#B392F0;">WithRegistry</span><span style="color:#E1E4E8;">(registry),</span></span>
<span class="line"><span style="color:#E1E4E8;">	)</span></span>
<span class="line"><span style="color:#6A737D;">	// 添加网关组件</span></span>
<span class="line"><span style="color:#E1E4E8;">	container.</span><span style="color:#B392F0;">Add</span><span style="color:#E1E4E8;">(component)</span></span>
<span class="line"><span style="color:#6A737D;">	// 启动容器</span></span>
<span class="line"><span style="color:#E1E4E8;">	container.</span><span style="color:#B392F0;">Serve</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre></div><h2 id="gate-start" tabindex="-1">启动服务 <a class="header-anchor" href="#gate-start" aria-label="Permalink to &quot;启动服务 {#gate-start}&quot;">​</a></h2><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#9ECBFF;"> go</span><span style="color:#9ECBFF;"> run</span><span style="color:#9ECBFF;"> main.go</span></span>
<span class="line"><span style="color:#B392F0;">                    ____</span><span style="color:#9ECBFF;">  __</span><span style="color:#9ECBFF;">  ________</span></span>
<span class="line"><span style="color:#B392F0;">                   /</span><span style="color:#9ECBFF;"> __</span><span style="color:#79B8FF;"> \\/</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> ____/</span></span>
<span class="line"><span style="color:#B392F0;">                  /</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> __/</span></span>
<span class="line"><span style="color:#B392F0;">                 /</span><span style="color:#9ECBFF;"> /_/</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /_/</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /___</span></span>
<span class="line"><span style="color:#B392F0;">                /_____/\\____/_____/</span></span>
<span class="line"><span style="color:#B392F0;">┌──────────────────────────────────────────────────────┐</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> [Website] </span><span style="color:#B392F0;">https://github.com/dobyte/due</span><span style="color:#F97583;">              |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> [Version] </span><span style="color:#B392F0;">v2.2.1</span><span style="color:#F97583;">                                     |</span></span>
<span class="line"><span style="color:#B392F0;">└──────────────────────────────────────────────────────┘</span></span>
<span class="line"><span style="color:#B392F0;">┌────────────────────────Global────────────────────────┐</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> PID:</span><span style="color:#79B8FF;"> 27159</span><span style="color:#F97583;">                                           |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Mode:</span><span style="color:#9ECBFF;"> debug</span><span style="color:#F97583;">                                          |</span></span>
<span class="line"><span style="color:#B392F0;">└──────────────────────────────────────────────────────┘</span></span>
<span class="line"><span style="color:#B392F0;">┌─────────────────────────Gate─────────────────────────┐</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Name:</span><span style="color:#9ECBFF;"> gate</span><span style="color:#F97583;">                                           |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Link:</span><span style="color:#9ECBFF;"> 172.22.243.151:46545</span><span style="color:#F97583;">                           |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Server:</span><span style="color:#E1E4E8;"> [ws] 0.0.0.0:3553                            </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Locator:</span><span style="color:#9ECBFF;"> redis</span><span style="color:#F97583;">                                       |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Registry:</span><span style="color:#9ECBFF;"> consul</span><span style="color:#F97583;">                                     |</span></span>
<span class="line"><span style="color:#B392F0;">└──────────────────────────────────────────────────────┘</span></span></code></pre></div><h2 id="gate-etc" tabindex="-1">启动配置 <a class="header-anchor" href="#gate-etc" aria-label="Permalink to &quot;启动配置 {#gate-etc}&quot;">​</a></h2><p>这里仅展示网关服（gate）相关配置参数，如需了解更多模块的参数配置，请查看<a href="/guide/etc.html">启动配置</a></p><div class="language-toml"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#6A737D;"># 进程号</span></span>
<span class="line"><span style="color:#E1E4E8;">pid = </span><span style="color:#9ECBFF;">&quot;./run/gate.pid&quot;</span></span>
<span class="line"><span style="color:#6A737D;"># 开发模式。支持模式：debug、test、release（设置优先级：配置文件 &lt; 环境变量 &lt; 运行参数 &lt; mode.SetMode()）</span></span>
<span class="line"><span style="color:#E1E4E8;">mode = </span><span style="color:#9ECBFF;">&quot;debug&quot;</span></span>
<span class="line"><span style="color:#6A737D;"># 统一时区设置。项目中的时间获取请使用xtime.Now()</span></span>
<span class="line"><span style="color:#E1E4E8;">timezone = </span><span style="color:#9ECBFF;">&quot;Local&quot;</span></span>
<span class="line"><span style="color:#6A737D;"># 容器关闭最大等待时间。支持单位：纳秒（ns）、微秒（us | µs）、毫秒（ms）、秒（s）、分（m）、小时（h）、天（d）。默认为0</span></span>
<span class="line"><span style="color:#E1E4E8;">shutdownMaxWaitTime = </span><span style="color:#9ECBFF;">&quot;0s&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">cluster</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">gate</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">    # 实例ID，网关集群中唯一。不填写默认自动生成唯一的实例ID</span></span>
<span class="line"><span style="color:#E1E4E8;">    id = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 实例名称</span></span>
<span class="line"><span style="color:#E1E4E8;">    name = </span><span style="color:#9ECBFF;">&quot;gate&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 内建RPC服务器监听地址。不填写默认随机监听</span></span>
<span class="line"><span style="color:#E1E4E8;">    addr = </span><span style="color:#9ECBFF;">&quot;:0&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # RPC调用超时时间</span></span>
<span class="line"><span style="color:#E1E4E8;">    timeout = </span><span style="color:#9ECBFF;">&quot;1s&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">locate</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">redis</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">    # 客户端连接地址</span></span>
<span class="line"><span style="color:#E1E4E8;">    addrs = [</span><span style="color:#9ECBFF;">&quot;127.0.0.1:6379&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">    # 数据库号</span></span>
<span class="line"><span style="color:#E1E4E8;">    db = </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#6A737D;">    # 用户名</span></span>
<span class="line"><span style="color:#E1E4E8;">    username = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 密码</span></span>
<span class="line"><span style="color:#E1E4E8;">    password = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 最大重试次数</span></span>
<span class="line"><span style="color:#E1E4E8;">    maxRetries = </span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#6A737D;">    # key前缀</span></span>
<span class="line"><span style="color:#E1E4E8;">    prefix = </span><span style="color:#9ECBFF;">&quot;due&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">registry</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">consul</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">    # 客户端连接地址，默认为127.0.0.1:8500</span></span>
<span class="line"><span style="color:#E1E4E8;">    addr = </span><span style="color:#9ECBFF;">&quot;127.0.0.1:8500&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 是否启用健康检查，默认为true</span></span>
<span class="line"><span style="color:#E1E4E8;">    healthCheck = </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#6A737D;">    # 健康检查时间间隔（秒），仅在启用健康检查后生效，默认为10</span></span>
<span class="line"><span style="color:#E1E4E8;">    healthCheckInterval = </span><span style="color:#79B8FF;">10</span></span>
<span class="line"><span style="color:#6A737D;">    # 健康检查超时时间（秒），仅在启用健康检查后生效，默认为5</span></span>
<span class="line"><span style="color:#E1E4E8;">    healthCheckTimeout = </span><span style="color:#79B8FF;">5</span></span>
<span class="line"><span style="color:#6A737D;">    # 是否启用心跳检查，默认为true</span></span>
<span class="line"><span style="color:#E1E4E8;">    heartbeatCheck = </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#6A737D;">    # 心跳检查时间间隔（秒），仅在启用心跳检查后生效，默认为10</span></span>
<span class="line"><span style="color:#E1E4E8;">    heartbeatCheckInterval = </span><span style="color:#79B8FF;">10</span></span>
<span class="line"><span style="color:#6A737D;">    # 健康检测失败后自动注销服务时间（秒），默认为30</span></span>
<span class="line"><span style="color:#E1E4E8;">    deregisterCriticalServiceAfter = </span><span style="color:#79B8FF;">30</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">network</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">ws</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">    # 服务器监听地址</span></span>
<span class="line"><span style="color:#E1E4E8;">    addr = </span><span style="color:#9ECBFF;">&quot;:3553&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 客户端连接路径</span></span>
<span class="line"><span style="color:#E1E4E8;">    path = </span><span style="color:#9ECBFF;">&quot;/&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 服务器最大连接数</span></span>
<span class="line"><span style="color:#E1E4E8;">    maxConnNum = </span><span style="color:#79B8FF;">5000</span></span>
<span class="line"><span style="color:#6A737D;">    # 秘钥文件</span></span>
<span class="line"><span style="color:#E1E4E8;">    keyFile = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 证书文件</span></span>
<span class="line"><span style="color:#E1E4E8;">    certFile = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 跨域检测，空数组时不允许任何连接升级成websocket，未设置此参数时允许所有的链接升级成websocket</span></span>
<span class="line"><span style="color:#E1E4E8;">    origins = [</span><span style="color:#9ECBFF;">&quot;*&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">    # 握手超时时间，支持单位：纳秒（ns）、微秒（us | µs）、毫秒（ms）、秒（s）、分（m）、小时（h）、天（d）。默认为10s</span></span>
<span class="line"><span style="color:#E1E4E8;">    handshakeTimeout = </span><span style="color:#9ECBFF;">&quot;10s&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 心跳检测间隔时间。设置为0则不启用心跳检测，支持单位：纳秒（ns）、微秒（us | µs）、毫秒（ms）、秒（s）、分（m）、小时（h）、天（d）。默认为10s</span></span>
<span class="line"><span style="color:#E1E4E8;">    heartbeatInterval = </span><span style="color:#9ECBFF;">&quot;10s&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 心跳机制，默认为resp响应式心跳。可选：resp 响应式心跳 | tick 定时主推心跳</span></span>
<span class="line"><span style="color:#E1E4E8;">    heartbeatMechanism = </span><span style="color:#9ECBFF;">&quot;resp&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 下行心跳是否携带服务器时间，默认为true</span></span>
<span class="line"><span style="color:#E1E4E8;">    heartbeatWithServerTime = </span><span style="color:#79B8FF;">true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">packet</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">    # 字节序，默认为big。可选：little | big</span></span>
<span class="line"><span style="color:#E1E4E8;">    byteOrder = </span><span style="color:#9ECBFF;">&quot;big&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 路由字节数，默认为2字节</span></span>
<span class="line"><span style="color:#E1E4E8;">    routeBytes = </span><span style="color:#79B8FF;">4</span></span>
<span class="line"><span style="color:#6A737D;">    # 序列号字节数，默认为2字节</span></span>
<span class="line"><span style="color:#E1E4E8;">    seqBytes = </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#6A737D;">    # 消息字节数，默认为5000字节</span></span>
<span class="line"><span style="color:#E1E4E8;">    bufferBytes = </span><span style="color:#79B8FF;">100000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">    # 日志输出文件</span></span>
<span class="line"><span style="color:#E1E4E8;">    file = </span><span style="color:#9ECBFF;">&quot;./log/due.log&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 日志输出级别，可选：debug | info | warn | error | fatal | panic</span></span>
<span class="line"><span style="color:#E1E4E8;">    level = </span><span style="color:#9ECBFF;">&quot;debug&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 日志输出格式，可选：text | json</span></span>
<span class="line"><span style="color:#E1E4E8;">    format = </span><span style="color:#9ECBFF;">&quot;text&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 是否输出到终端</span></span>
<span class="line"><span style="color:#E1E4E8;">    stdout = </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#6A737D;">    # 时间格式，标准库时间格式</span></span>
<span class="line"><span style="color:#E1E4E8;">    timeFormat = </span><span style="color:#9ECBFF;">&quot;2006/01/02 15:04:05.000000&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 堆栈的最低输出级别，可选：debug | info | warn | error | fatal | panic</span></span>
<span class="line"><span style="color:#E1E4E8;">    stackLevel = </span><span style="color:#9ECBFF;">&quot;error&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 文件最大留存时间，d:天、h:时、m:分、s:秒</span></span>
<span class="line"><span style="color:#E1E4E8;">    fileMaxAge = </span><span style="color:#9ECBFF;">&quot;7d&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 文件最大尺寸限制，单位（MB）</span></span>
<span class="line"><span style="color:#E1E4E8;">    fileMaxSize = </span><span style="color:#79B8FF;">100</span></span>
<span class="line"><span style="color:#6A737D;">    # 文件切割方式</span></span>
<span class="line"><span style="color:#E1E4E8;">    fileCutRule = </span><span style="color:#9ECBFF;">&quot;day&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 是否启用调用文件全路径</span></span>
<span class="line"><span style="color:#E1E4E8;">    callerFullPath = </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#6A737D;">    # 是否启用分级存储</span></span>
<span class="line"><span style="color:#E1E4E8;">    classifiedStorage = </span><span style="color:#79B8FF;">false</span></span></code></pre></div>`,12))])}const h=l(E,[["render",y]]);export{C as __pageData,h as default};
