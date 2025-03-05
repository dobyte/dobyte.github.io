import{_ as l,C as p,c as o,o as e,a as n,q as t,b as c,m as r}from"./chunks/framework.B2ptOLFE.js";const g=JSON.parse('{"title":"节点服务器","description":"","frontmatter":{},"headers":[{"level":2,"title":"基础介绍","slug":"node-introduction","link":"#node-introduction","children":[]},{"level":2,"title":"调度模型","slug":"node-scheduling","link":"#node-scheduling","children":[]},{"level":2,"title":"示例代码","slug":"node-example","link":"#node-example","children":[]},{"level":2,"title":"启动服务","slug":"node-start","link":"#node-start","children":[]},{"level":2,"title":"启动配置","slug":"node-etc","link":"#node-etc","children":[]}],"relativePath":"guide/node.md","filePath":"guide/node.md"}'),E={name:"guide/node.md"};function y(i,s,F,d,u,B){const a=p("TextAd");return e(),o("div",null,[s[0]||(s[0]=n("h1",{id:"node",tabindex:"-1"},[r("节点服务器 "),n("a",{class:"header-anchor",href:"#node","aria-label":'Permalink to "节点服务器 {#node}"'},"​")],-1)),t(a),s[1]||(s[1]=c(`<h2 id="node-introduction" tabindex="-1">基础介绍 <a class="header-anchor" href="#node-introduction" aria-label="Permalink to &quot;基础介绍 {#node-introduction}&quot;">​</a></h2><p>节点服（node）作为游戏业务开发的核心模块，通常具备以下功能：</p><ul><li>处理经由网关服（gate）转发的来自客户端（client）的路由消息</li><li>通过网关服（gate）下发消息到指定客户端（client）</li><li>为其他后端服务器提供完善的调用接口</li></ul><p>在 <a href="https://github.com/dobyte/due" target="_blank" rel="noreferrer">due</a> 框架中，节点服（node）采用模块化的架构思路，开发者可以根据自身的业务情况任意搭配模块化组件。</p><h2 id="node-scheduling" tabindex="-1">调度模型 <a class="header-anchor" href="#node-scheduling" aria-label="Permalink to &quot;调度模型 {#node-scheduling}&quot;">​</a></h2><p>在 <a href="https://github.com/dobyte/due" target="_blank" rel="noreferrer">due</a> 框架中，节点服（node）处理路由消息统一采用单线程调度。开发者可以根据自身业务需要对调度模型进行动态改变。</p><ul><li>单线程：在AddRouteHandler()注册的路由处理器下直接处理消息，此时调度模型就是单线程。</li><li>多协程：在AddRouteHandler()注册的路由处理器下调用ctx.Task()将消息投递到协程池（goroutine pool）中进行处理，此时调度模型就从单线程转变为多协程。</li><li>Actor: 在AddRouteHandler()注册的路由处理器下调用ctx.Next()或ctx.Actor()将消息投递到actor中进行处理，此时调度模型就从单线程转变为Actor模型。</li></ul><h2 id="node-example" tabindex="-1">示例代码 <a class="header-anchor" href="#node-example" aria-label="Permalink to &quot;示例代码 {#node-example}&quot;">​</a></h2><p>以下完整示例详见：<a href="https://github.com/dobyte/due-examples/tree/master/cluster/simple/node" target="_blank" rel="noreferrer">node</a></p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#B392F0;"> main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">fmt</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/locate/redis/v2</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/registry/consul/v2</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2/cluster/node</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2/codes</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2/log</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2/utils/xtime</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 路由号</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#79B8FF;"> greet</span><span style="color:#F97583;"> =</span><span style="color:#79B8FF;"> 1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#6A737D;">	// 创建容器</span></span>
<span class="line"><span style="color:#E1E4E8;">	container </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> due.</span><span style="color:#B392F0;">NewContainer</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#6A737D;">	// 创建用户定位器</span></span>
<span class="line"><span style="color:#E1E4E8;">	locator </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> redis.</span><span style="color:#B392F0;">NewLocator</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#6A737D;">	// 创建服务发现</span></span>
<span class="line"><span style="color:#E1E4E8;">	registry </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> consul.</span><span style="color:#B392F0;">NewRegistry</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#6A737D;">	// 创建节点组件</span></span>
<span class="line"><span style="color:#E1E4E8;">	component </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> node.</span><span style="color:#B392F0;">NewNode</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">		node.</span><span style="color:#B392F0;">WithLocator</span><span style="color:#E1E4E8;">(locator),</span></span>
<span class="line"><span style="color:#E1E4E8;">		node.</span><span style="color:#B392F0;">WithRegistry</span><span style="color:#E1E4E8;">(registry),</span></span>
<span class="line"><span style="color:#E1E4E8;">	)</span></span>
<span class="line"><span style="color:#6A737D;">	// 初始化应用</span></span>
<span class="line"><span style="color:#B392F0;">	initApp</span><span style="color:#E1E4E8;">(component.</span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#6A737D;">	// 添加节点组件</span></span>
<span class="line"><span style="color:#E1E4E8;">	container.</span><span style="color:#B392F0;">Add</span><span style="color:#E1E4E8;">(component)</span></span>
<span class="line"><span style="color:#6A737D;">	// 启动容器</span></span>
<span class="line"><span style="color:#E1E4E8;">	container.</span><span style="color:#B392F0;">Serve</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 初始化应用</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> initApp</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">proxy</span><span style="color:#F97583;"> *</span><span style="color:#B392F0;">node</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	proxy.</span><span style="color:#B392F0;">Router</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">AddRouteHandler</span><span style="color:#E1E4E8;">(greet, </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">, greetHandler)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 请求</span></span>
<span class="line"><span style="color:#F97583;">type</span><span style="color:#B392F0;"> greetReq</span><span style="color:#F97583;"> struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	Message </span><span style="color:#F97583;">string</span><span style="color:#9ECBFF;"> \`json:&quot;message&quot;\`</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 响应</span></span>
<span class="line"><span style="color:#F97583;">type</span><span style="color:#B392F0;"> greetRes</span><span style="color:#F97583;"> struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	Code    </span><span style="color:#F97583;">int</span><span style="color:#9ECBFF;">    \`json:&quot;code&quot;\`</span></span>
<span class="line"><span style="color:#E1E4E8;">	Message </span><span style="color:#F97583;">string</span><span style="color:#9ECBFF;"> \`json:&quot;message&quot;\`</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 路由处理器</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> greetHandler</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">ctx</span><span style="color:#B392F0;"> node</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Context</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	req </span><span style="color:#F97583;">:=</span><span style="color:#F97583;"> &amp;</span><span style="color:#B392F0;">greetReq</span><span style="color:#E1E4E8;">{}</span></span>
<span class="line"><span style="color:#E1E4E8;">	res </span><span style="color:#F97583;">:=</span><span style="color:#F97583;"> &amp;</span><span style="color:#B392F0;">greetRes</span><span style="color:#E1E4E8;">{}</span></span>
<span class="line"><span style="color:#F97583;">	defer</span><span style="color:#F97583;"> func</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#F97583;">		if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> ctx.</span><span style="color:#B392F0;">Response</span><span style="color:#E1E4E8;">(res); err </span><span style="color:#F97583;">!=</span><span style="color:#79B8FF;"> nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			log.</span><span style="color:#B392F0;">Errorf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;response message failed: </span><span style="color:#79B8FF;">%v</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, err)</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">	}()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">	if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> ctx.</span><span style="color:#B392F0;">Parse</span><span style="color:#E1E4E8;">(req); err </span><span style="color:#F97583;">!=</span><span style="color:#79B8FF;"> nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		log.</span><span style="color:#B392F0;">Errorf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;parse request message failed: </span><span style="color:#79B8FF;">%v</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, err)</span></span>
<span class="line"><span style="color:#E1E4E8;">		res.Code </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> codes.InternalError.</span><span style="color:#B392F0;">Code</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#F97583;">		return</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	log.</span><span style="color:#B392F0;">Info</span><span style="color:#E1E4E8;">(req.Message)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	res.Code </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> codes.OK.</span><span style="color:#B392F0;">Code</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">	res.Message </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> fmt.</span><span style="color:#B392F0;">Sprintf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;I&#39;m server, and the current time is: </span><span style="color:#79B8FF;">%s</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, xtime.</span><span style="color:#B392F0;">Now</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">Format</span><span style="color:#E1E4E8;">(xtime.DateTime))</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre></div><h2 id="node-start" tabindex="-1">启动服务 <a class="header-anchor" href="#node-start" aria-label="Permalink to &quot;启动服务 {#node-start}&quot;">​</a></h2><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#9ECBFF;"> go</span><span style="color:#9ECBFF;"> run</span><span style="color:#9ECBFF;"> main.go</span></span>
<span class="line"><span style="color:#B392F0;">                    ____</span><span style="color:#9ECBFF;">  __</span><span style="color:#9ECBFF;">  ________</span></span>
<span class="line"><span style="color:#B392F0;">                   /</span><span style="color:#9ECBFF;"> __</span><span style="color:#79B8FF;"> \\/</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> ____/</span><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#B392F0;">                  /</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> __/</span></span>
<span class="line"><span style="color:#B392F0;">                 /</span><span style="color:#9ECBFF;"> /_/</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /_/</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /___</span></span>
<span class="line"><span style="color:#B392F0;">                /_____/\\____/_____/</span></span>
<span class="line"><span style="color:#B392F0;">┌──────────────────────────────────────────────────────┐</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> [Website] </span><span style="color:#B392F0;">https://github.com/dobyte/due</span><span style="color:#F97583;">              |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> [Version] </span><span style="color:#B392F0;">v2.2.1</span><span style="color:#F97583;">                                     |</span></span>
<span class="line"><span style="color:#B392F0;">└──────────────────────────────────────────────────────┘</span></span>
<span class="line"><span style="color:#B392F0;">┌────────────────────────Global────────────────────────┐</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> PID:</span><span style="color:#79B8FF;"> 35908</span><span style="color:#F97583;">                                           |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Mode:</span><span style="color:#9ECBFF;"> debug</span><span style="color:#F97583;">                                          |</span></span>
<span class="line"><span style="color:#B392F0;">└──────────────────────────────────────────────────────┘</span></span>
<span class="line"><span style="color:#B392F0;">┌─────────────────────────Node─────────────────────────┐</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Name:</span><span style="color:#9ECBFF;"> node</span><span style="color:#F97583;">                                           |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Link:</span><span style="color:#9ECBFF;"> 192.168.2.202:55273</span><span style="color:#F97583;">                            |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Codec:</span><span style="color:#9ECBFF;"> json</span><span style="color:#F97583;">                                          |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Locator:</span><span style="color:#9ECBFF;"> redis</span><span style="color:#F97583;">                                       |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Registry:</span><span style="color:#9ECBFF;"> consul</span><span style="color:#F97583;">                                     |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Encryptor:</span><span style="color:#9ECBFF;"> -</span><span style="color:#F97583;">                                         |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Transporter:</span><span style="color:#9ECBFF;"> -</span><span style="color:#F97583;">                                       |</span></span>
<span class="line"><span style="color:#B392F0;">└──────────────────────────────────────────────────────┘</span></span></code></pre></div><h2 id="node-etc" tabindex="-1">启动配置 <a class="header-anchor" href="#node-etc" aria-label="Permalink to &quot;启动配置 {#node-etc}&quot;">​</a></h2><p>这里仅展示节点服（node）相关配置参数，如需了解更多模块的参数配置，请查看<a href="/guide/etc.html">启动配置</a></p><div class="language-toml"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#6A737D;"># 进程号</span></span>
<span class="line"><span style="color:#E1E4E8;">pid = </span><span style="color:#9ECBFF;">&quot;./run/node.pid&quot;</span></span>
<span class="line"><span style="color:#6A737D;"># 开发模式。支持模式：debug、test、release（设置优先级：配置文件 &lt; 环境变量 &lt; 运行参数 &lt; mode.SetMode()）</span></span>
<span class="line"><span style="color:#E1E4E8;">mode = </span><span style="color:#9ECBFF;">&quot;debug&quot;</span></span>
<span class="line"><span style="color:#6A737D;"># 统一时区设置。项目中的时间获取请使用xtime.Now()</span></span>
<span class="line"><span style="color:#E1E4E8;">timezone = </span><span style="color:#9ECBFF;">&quot;Local&quot;</span></span>
<span class="line"><span style="color:#6A737D;"># 容器关闭最大等待时间。支持单位：纳秒（ns）、微秒（us | µs）、毫秒（ms）、秒（s）、分（m）、小时（h）、天（d）。默认为0</span></span>
<span class="line"><span style="color:#E1E4E8;">shutdownMaxWaitTime = </span><span style="color:#9ECBFF;">&quot;0s&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">cluster</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">node</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">    # 实例ID，网关集群中唯一。不填写默认自动生成唯一的实例ID</span></span>
<span class="line"><span style="color:#E1E4E8;">    id = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 实例名称</span></span>
<span class="line"><span style="color:#E1E4E8;">    name = </span><span style="color:#9ECBFF;">&quot;node&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 内建RPC服务器监听地址。不填写默认随机监听</span></span>
<span class="line"><span style="color:#E1E4E8;">    addr = </span><span style="color:#9ECBFF;">&quot;:0&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 编解码器。可选：json | proto。默认为proto</span></span>
<span class="line"><span style="color:#E1E4E8;">    codec = </span><span style="color:#9ECBFF;">&quot;json&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # RPC调用超时时间，支持单位：纳秒（ns）、微秒（us | µs）、毫秒（ms）、秒（s）、分（m）、小时（h）、天（d）。默认为3s</span></span>
<span class="line"><span style="color:#E1E4E8;">    timeout = </span><span style="color:#9ECBFF;">&quot;3s&quot;</span></span>
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
<span class="line"><span style="color:#E1E4E8;">    classifiedStorage = </span><span style="color:#79B8FF;">false</span></span></code></pre></div>`,15))])}const q=l(E,[["render",y]]);export{g as __pageData,q as default};
