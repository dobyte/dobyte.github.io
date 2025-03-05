import{_ as l,C as p,c as o,o as e,a as n,q as t,b as c,m as r}from"./chunks/framework.BSdOUgs7.js";const m=JSON.parse('{"title":"测试客户端","description":"","frontmatter":{},"headers":[{"level":2,"title":"基础介绍","slug":"client-introduction","link":"#client-introduction","children":[]},{"level":2,"title":"示例代码","slug":"client-example","link":"#client-example","children":[]},{"level":2,"title":"启动服务","slug":"client-start","link":"#client-start","children":[]},{"level":2,"title":"启动配置","slug":"client-etc","link":"#client-etc","children":[]}],"relativePath":"guide/client.md","filePath":"guide/client.md"}'),E={name:"guide/client.md"};function y(F,s,i,B,u,C){const a=p("TextAd");return e(),o("div",null,[s[0]||(s[0]=n("h1",{id:"client",tabindex:"-1"},[r("测试客户端 "),n("a",{class:"header-anchor",href:"#client","aria-label":'Permalink to "测试客户端 {#client}"'},"​")],-1)),t(a),s[1]||(s[1]=c(`<h2 id="client-introduction" tabindex="-1">基础介绍 <a class="header-anchor" href="#client-introduction" aria-label="Permalink to &quot;基础介绍 {#client-introduction}&quot;">​</a></h2><p>测试客户端（client）作为日常开发调试的一种重要工具，为游戏开发者提供了非常便捷的接口方案。开发者可以借助flag包来接收不同的输入参数从而控制不同的客户端行为。同时，框架提供的测试客户端（client）也具备非常出色的性能，可作为压测客户端提供性能压测支持。</p><h2 id="client-example" tabindex="-1">示例代码 <a class="header-anchor" href="#client-example" aria-label="Permalink to &quot;示例代码 {#client-example}&quot;">​</a></h2><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#B392F0;"> main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">fmt</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/eventbus/nats/v2</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/network/ws/v2</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2/cluster</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2/cluster/client</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2/eventbus</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2/log</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2/utils/xtime</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">time</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 路由号</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#79B8FF;"> greet</span><span style="color:#F97583;"> =</span><span style="color:#79B8FF;"> 1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#6A737D;">	// 创建容器</span></span>
<span class="line"><span style="color:#E1E4E8;">	container </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> due.</span><span style="color:#B392F0;">NewContainer</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#6A737D;">	// 创建客户端组件</span></span>
<span class="line"><span style="color:#E1E4E8;">	component </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> client.</span><span style="color:#B392F0;">NewClient</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">		client.</span><span style="color:#B392F0;">WithClient</span><span style="color:#E1E4E8;">(ws.</span><span style="color:#B392F0;">NewClient</span><span style="color:#E1E4E8;">()),</span></span>
<span class="line"><span style="color:#E1E4E8;">	)</span></span>
<span class="line"><span style="color:#6A737D;">	// 初始化监听</span></span>
<span class="line"><span style="color:#B392F0;">	initListen</span><span style="color:#E1E4E8;">(component.</span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#6A737D;">	// 添加客户端组件</span></span>
<span class="line"><span style="color:#E1E4E8;">	container.</span><span style="color:#B392F0;">Add</span><span style="color:#E1E4E8;">(component)</span></span>
<span class="line"><span style="color:#6A737D;">	// 启动容器</span></span>
<span class="line"><span style="color:#E1E4E8;">	container.</span><span style="color:#B392F0;">Serve</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> initListen</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">proxy</span><span style="color:#F97583;"> *</span><span style="color:#B392F0;">client</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#6A737D;">	// 监听组件启动</span></span>
<span class="line"><span style="color:#E1E4E8;">	proxy.</span><span style="color:#B392F0;">AddHookListener</span><span style="color:#E1E4E8;">(cluster.Start, startHandler)</span></span>
<span class="line"><span style="color:#6A737D;">	// 监听连接建立</span></span>
<span class="line"><span style="color:#E1E4E8;">	proxy.</span><span style="color:#B392F0;">AddEventListener</span><span style="color:#E1E4E8;">(cluster.Connect, connectHandler)</span></span>
<span class="line"><span style="color:#6A737D;">	// 监听消息回复</span></span>
<span class="line"><span style="color:#E1E4E8;">	proxy.</span><span style="color:#B392F0;">AddRouteHandler</span><span style="color:#E1E4E8;">(greet, greetHandler)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 组件启动处理器</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> startHandler</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">proxy</span><span style="color:#F97583;"> *</span><span style="color:#B392F0;">client</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#F97583;">	if</span><span style="color:#E1E4E8;"> _, err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> proxy.</span><span style="color:#B392F0;">Dial</span><span style="color:#E1E4E8;">(); err </span><span style="color:#F97583;">!=</span><span style="color:#79B8FF;"> nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		log.</span><span style="color:#B392F0;">Errorf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;connect server failed: </span><span style="color:#79B8FF;">%v</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, err)</span></span>
<span class="line"><span style="color:#F97583;">		return</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 连接建立处理器</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> connectHandler</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">conn</span><span style="color:#F97583;"> *</span><span style="color:#B392F0;">client</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Conn</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#B392F0;">	pushMessage</span><span style="color:#E1E4E8;">(conn)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 消息回复处理器</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> greetHandler</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">ctx</span><span style="color:#F97583;"> *</span><span style="color:#B392F0;">client</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Context</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	res </span><span style="color:#F97583;">:=</span><span style="color:#F97583;"> &amp;</span><span style="color:#B392F0;">greetRes</span><span style="color:#E1E4E8;">{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">	if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> ctx.</span><span style="color:#B392F0;">Parse</span><span style="color:#E1E4E8;">(res); err </span><span style="color:#F97583;">!=</span><span style="color:#79B8FF;"> nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		log.</span><span style="color:#B392F0;">Errorf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;invalid response message, err: </span><span style="color:#79B8FF;">%v</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, err)</span></span>
<span class="line"><span style="color:#F97583;">		return</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">	if</span><span style="color:#E1E4E8;"> res.Code </span><span style="color:#F97583;">!=</span><span style="color:#79B8FF;"> 0</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		log.</span><span style="color:#B392F0;">Errorf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;node response failed, code: </span><span style="color:#79B8FF;">%d</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, res.Code)</span></span>
<span class="line"><span style="color:#F97583;">		return</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	log.</span><span style="color:#B392F0;">Info</span><span style="color:#E1E4E8;">(res.Message)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	time.</span><span style="color:#B392F0;">AfterFunc</span><span style="color:#E1E4E8;">(time.Second, </span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#B392F0;">		pushMessage</span><span style="color:#E1E4E8;">(ctx.</span><span style="color:#B392F0;">Conn</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#E1E4E8;">	})</span></span>
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
<span class="line"><span style="color:#6A737D;">// 推送消息</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> pushMessage</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">conn</span><span style="color:#F97583;"> *</span><span style="color:#B392F0;">client</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Conn</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> conn.</span><span style="color:#B392F0;">Push</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">&amp;</span><span style="color:#B392F0;">cluster</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Message</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">		Route: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">		Data: </span><span style="color:#F97583;">&amp;</span><span style="color:#B392F0;">greetReq</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">			Message: fmt.</span><span style="color:#B392F0;">Sprintf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;I&#39;m client, and the current time is: </span><span style="color:#79B8FF;">%s</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, xtime.</span><span style="color:#B392F0;">Now</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">Format</span><span style="color:#E1E4E8;">(xtime.DateTime)),</span></span>
<span class="line"><span style="color:#E1E4E8;">		},</span></span>
<span class="line"><span style="color:#E1E4E8;">	})</span></span>
<span class="line"><span style="color:#F97583;">	if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#79B8FF;"> nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		log.</span><span style="color:#B392F0;">Errorf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;push message failed: </span><span style="color:#79B8FF;">%v</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, err)</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre></div><h2 id="client-start" tabindex="-1">启动服务 <a class="header-anchor" href="#client-start" aria-label="Permalink to &quot;启动服务 {#client-start}&quot;">​</a></h2><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#9ECBFF;"> go</span><span style="color:#9ECBFF;"> run</span><span style="color:#9ECBFF;"> main.go</span></span>
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
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> PID:</span><span style="color:#79B8FF;"> 8576</span><span style="color:#F97583;">                                            |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Mode:</span><span style="color:#9ECBFF;"> debug</span><span style="color:#F97583;">                                          |</span></span>
<span class="line"><span style="color:#B392F0;">└──────────────────────────────────────────────────────┘</span></span>
<span class="line"><span style="color:#B392F0;">┌────────────────────────Client────────────────────────┐</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Name:</span><span style="color:#9ECBFF;"> client</span><span style="color:#F97583;">                                         |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Codec:</span><span style="color:#9ECBFF;"> json</span><span style="color:#F97583;">                                          |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Protocol:</span><span style="color:#9ECBFF;"> ws</span><span style="color:#F97583;">                                         |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Encryptor:</span><span style="color:#9ECBFF;"> -</span><span style="color:#F97583;">                                         |</span></span>
<span class="line"><span style="color:#B392F0;">└──────────────────────────────────────────────────────┘</span></span>
<span class="line"><span style="color:#B392F0;">INFO[2024/11/13</span><span style="color:#9ECBFF;"> 20:08:19.072805]</span><span style="color:#9ECBFF;"> main.go:72</span><span style="color:#E1E4E8;"> [I</span><span style="color:#9ECBFF;">&#39;m server, and the current time is: 2024-11-13 20:08:19]</span></span>
<span class="line"><span style="color:#9ECBFF;">INFO[2024/11/13 20:08:20.079161] main.go:72 [I&#39;</span><span style="color:#E1E4E8;">m </span><span style="color:#9ECBFF;">server,</span><span style="color:#9ECBFF;"> and</span><span style="color:#9ECBFF;"> the</span><span style="color:#9ECBFF;"> current</span><span style="color:#9ECBFF;"> time</span><span style="color:#9ECBFF;"> is:</span><span style="color:#9ECBFF;"> 2024-11-13</span><span style="color:#9ECBFF;"> 20:08:20]</span></span>
<span class="line"><span style="color:#B392F0;">INFO[2024/11/13</span><span style="color:#9ECBFF;"> 20:08:21.088877]</span><span style="color:#9ECBFF;"> main.go:72</span><span style="color:#E1E4E8;"> [I</span><span style="color:#9ECBFF;">&#39;m server, and the current time is: 2024-11-13 20:08:21]</span></span>
<span class="line"><span style="color:#9ECBFF;">INFO[2024/11/13 20:08:22.095964] main.go:72 [I&#39;</span><span style="color:#E1E4E8;">m </span><span style="color:#9ECBFF;">server,</span><span style="color:#9ECBFF;"> and</span><span style="color:#9ECBFF;"> the</span><span style="color:#9ECBFF;"> current</span><span style="color:#9ECBFF;"> time</span><span style="color:#9ECBFF;"> is:</span><span style="color:#9ECBFF;"> 2024-11-13</span><span style="color:#9ECBFF;"> 20:08:22]</span></span>
<span class="line"><span style="color:#B392F0;">INFO[2024/11/13</span><span style="color:#9ECBFF;"> 20:08:23.101359]</span><span style="color:#9ECBFF;"> main.go:72</span><span style="color:#E1E4E8;"> [I</span><span style="color:#9ECBFF;">&#39;m server, and the current time is: 2024-11-13 20:08:23]</span></span>
<span class="line"><span style="color:#9ECBFF;">INFO[2024/11/13 20:08:24.107933] main.go:72 [I&#39;</span><span style="color:#E1E4E8;">m </span><span style="color:#9ECBFF;">server,</span><span style="color:#9ECBFF;"> and</span><span style="color:#9ECBFF;"> the</span><span style="color:#9ECBFF;"> current</span><span style="color:#9ECBFF;"> time</span><span style="color:#9ECBFF;"> is:</span><span style="color:#9ECBFF;"> 2024-11-13</span><span style="color:#9ECBFF;"> 20:08:24]</span></span>
<span class="line"><span style="color:#B392F0;">INFO[2024/11/13</span><span style="color:#9ECBFF;"> 20:08:25.113744]</span><span style="color:#9ECBFF;"> main.go:72</span><span style="color:#E1E4E8;"> [I</span><span style="color:#9ECBFF;">&#39;m server, and the current time is: 2024-11-13 20:08:25]</span></span>
<span class="line"><span style="color:#9ECBFF;">INFO[2024/11/13 20:08:26.124384] main.go:72 [I&#39;</span><span style="color:#E1E4E8;">m </span><span style="color:#9ECBFF;">server,</span><span style="color:#9ECBFF;"> and</span><span style="color:#9ECBFF;"> the</span><span style="color:#9ECBFF;"> current</span><span style="color:#9ECBFF;"> time</span><span style="color:#9ECBFF;"> is:</span><span style="color:#9ECBFF;"> 2024-11-13</span><span style="color:#9ECBFF;"> 20:08:26]</span></span>
<span class="line"><span style="color:#B392F0;">INFO[2024/11/13</span><span style="color:#9ECBFF;"> 20:08:27.133305]</span><span style="color:#9ECBFF;"> main.go:72</span><span style="color:#E1E4E8;"> [I</span><span style="color:#9ECBFF;">&#39;m server, and the current time is: 2024-11-13 20:08:27]</span></span></code></pre></div><h2 id="client-etc" tabindex="-1">启动配置 <a class="header-anchor" href="#client-etc" aria-label="Permalink to &quot;启动配置 {#client-etc}&quot;">​</a></h2><p>这里仅展示测试客户端（client）相关配置参数，如需了解更多模块的参数配置，请查看<a href="/guide/etc.html">启动配置</a></p><div class="language-toml"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#6A737D;"># 进程号</span></span>
<span class="line"><span style="color:#E1E4E8;">pid = </span><span style="color:#9ECBFF;">&quot;./run/client.pid&quot;</span></span>
<span class="line"><span style="color:#6A737D;"># 开发模式。支持模式：debug、test、release（模式优先级：环境变量 &lt; 配置文件 &lt; 运行参数）</span></span>
<span class="line"><span style="color:#E1E4E8;">mode = </span><span style="color:#9ECBFF;">&quot;debug&quot;</span></span>
<span class="line"><span style="color:#6A737D;"># 统一时区设置。项目中的时间获取请使用xtime.Now()</span></span>
<span class="line"><span style="color:#E1E4E8;">timezone = </span><span style="color:#9ECBFF;">&quot;Local&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 集群客户端配置，常用于调试使用</span></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">cluster</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">client</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">    # 实例ID，网关集群中唯一。不填写默认自动生成唯一的实例ID</span></span>
<span class="line"><span style="color:#E1E4E8;">    id = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 实例名称</span></span>
<span class="line"><span style="color:#E1E4E8;">    name = </span><span style="color:#9ECBFF;">&quot;client&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 编解码器。可选：json | proto</span></span>
<span class="line"><span style="color:#E1E4E8;">    codec = </span><span style="color:#9ECBFF;">&quot;json&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">network</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">ws</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">client</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">    # 拨号地址</span></span>
<span class="line"><span style="color:#E1E4E8;">    url = </span><span style="color:#9ECBFF;">&quot;ws://127.0.0.1:3553&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 握手超时时间，支持单位：纳秒（ns）、微秒（us | µs）、毫秒（ms）、秒（s）、分（m）、小时（h）、天（d）。默认为10s</span></span>
<span class="line"><span style="color:#E1E4E8;">    handshakeTimeout = </span><span style="color:#9ECBFF;">&quot;10s&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 心跳间隔时间。设置为0则不启用心跳检测，支持单位：纳秒（ns）、微秒（us | µs）、毫秒（ms）、秒（s）、分（m）、小时（h）、天（d）。默认为10s</span></span>
<span class="line"><span style="color:#E1E4E8;">    heartbeatInterval = </span><span style="color:#9ECBFF;">&quot;10s&quot;</span></span>
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
<span class="line"><span style="color:#E1E4E8;">    callerFullPath = </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#6A737D;">    # 是否启用分级存储</span></span>
<span class="line"><span style="color:#E1E4E8;">    classifiedStorage = </span><span style="color:#79B8FF;">false</span></span></code></pre></div>`,9))])}const g=l(E,[["render",y]]);export{m as __pageData,g as default};
