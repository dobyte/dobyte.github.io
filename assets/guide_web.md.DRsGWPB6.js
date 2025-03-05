import{_ as l,C as p,c as e,o,a,q as t,b as r,m as c}from"./chunks/framework.B2ptOLFE.js";const B=JSON.parse('{"title":"Web服务器","description":"","frontmatter":{},"headers":[{"level":2,"title":"基础介绍","slug":"web-introduction","link":"#web-introduction","children":[]},{"level":2,"title":"跨域支持","slug":"web-cors","link":"#web-cors","children":[]},{"level":2,"title":"Swagger支持","slug":"web-swagger","link":"#web-swagger","children":[]},{"level":2,"title":"全局中间件","slug":"web-middleware","link":"#web-middleware","children":[]},{"level":2,"title":"示例代码","slug":"web-example","link":"#web-example","children":[]},{"level":2,"title":"生成文档","slug":"web-swagger-init","link":"#web-swagger-init","children":[]},{"level":2,"title":"启动服务","slug":"web-start","link":"#web-start","children":[]},{"level":2,"title":"启动配置","slug":"web-etc","link":"#web-etc","children":[]},{"level":2,"title":"更多文档","slug":"web-more","link":"#web-more","children":[]}],"relativePath":"guide/web.md","filePath":"guide/web.md"}'),i={name:"guide/web.md"};function y(E,s,F,u,d,b){const n=p("TextAd");return o(),e("div",null,[s[0]||(s[0]=a("h1",{id:"web",tabindex:"-1"},[c("Web服务器 "),a("a",{class:"header-anchor",href:"#web","aria-label":'Permalink to "Web服务器 {#web}"'},"​")],-1)),t(n),s[1]||(s[1]=r(`<h2 id="web-introduction" tabindex="-1">基础介绍 <a class="header-anchor" href="#web-introduction" aria-label="Permalink to &quot;基础介绍 {#web-introduction}&quot;">​</a></h2><p>在<a href="https://github.com/dobyte/due" target="_blank" rel="noreferrer">due</a>框架中，Web服务器是基于<a href="https://github.com/gofiber/fiber" target="_blank" rel="noreferrer">fiber</a>框架的二次封装。在继承<a href="https://github.com/gofiber/fiber" target="_blank" rel="noreferrer">fiber</a>框架的所有优点的同时，还提供了符合<a href="https://github.com/dobyte/due" target="_blank" rel="noreferrer">due</a>框架的调用接口，为游戏开发中的Web场景提供完善的解决方案。</p><h2 id="web-cors" tabindex="-1">跨域支持 <a class="header-anchor" href="#web-cors" aria-label="Permalink to &quot;跨域支持 {#web-cors}&quot;">​</a></h2><p>框架原生支持跨域，你只需要在启动配置里设置<a href="#启动配置-web-etc">跨域配置</a>即可开启跨域</p><h2 id="web-swagger" tabindex="-1">Swagger支持 <a class="header-anchor" href="#web-swagger" aria-label="Permalink to &quot;Swagger支持 {#web-swagger}&quot;">​</a></h2><p>为了为广大开发者提供较好的开发体验，Web服务器已原生支持了Swagger的组件。使用方法也非常简单，只需要通过配置项开启即可打开swagger访问支持。</p><ul><li>安装<a href="https://github.com/swaggo/swag" target="_blank" rel="noreferrer">swag</a></li></ul><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#9ECBFF;"> go</span><span style="color:#9ECBFF;"> install</span><span style="color:#9ECBFF;"> github.com/swaggo/swag/cmd/swag@latest</span></span></code></pre></div><h2 id="web-middleware" tabindex="-1">全局中间件 <a class="header-anchor" href="#web-middleware" aria-label="Permalink to &quot;全局中间件 {#web-middleware}&quot;">​</a></h2><p>你可以在创建Web服务器的时候使用<a href="https://github.com/dobyte/due/blob/main/component/http/options.go" target="_blank" rel="noreferrer">http.WithMiddlewares()</a>来设置全局中间件。中间件支持<a href="https://github.com/dobyte/due/blob/main/component/http/router.go" target="_blank" rel="noreferrer">http.Handler</a>和<a href="https://github.com/gofiber/fiber/blob/main/app.go" target="_blank" rel="noreferrer">fiber.Handler</a>两种类型的中间件</p><h2 id="web-example" tabindex="-1">示例代码 <a class="header-anchor" href="#web-example" aria-label="Permalink to &quot;示例代码 {#web-example}&quot;">​</a></h2><p>以下完整示例详见：<a href="https://github.com/dobyte/due-examples/tree/master/cluster/web" target="_blank" rel="noreferrer">web</a></p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#B392F0;"> main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">fmt</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/component/http/v2</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2/codes</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2/log</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2/utils/xtime</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// @title API文档</span></span>
<span class="line"><span style="color:#6A737D;">// @version 1.0</span></span>
<span class="line"><span style="color:#6A737D;">// @host localhost:8080</span></span>
<span class="line"><span style="color:#6A737D;">// @BasePath /</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#6A737D;">	// 创建容器</span></span>
<span class="line"><span style="color:#E1E4E8;">	container </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> due.</span><span style="color:#B392F0;">NewContainer</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#6A737D;">	// 创建HTTP组件</span></span>
<span class="line"><span style="color:#E1E4E8;">	component </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> http.</span><span style="color:#B392F0;">NewServer</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#6A737D;">	// 初始化应用</span></span>
<span class="line"><span style="color:#B392F0;">	initApp</span><span style="color:#E1E4E8;">(component.</span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#6A737D;">	// 添加网格组件</span></span>
<span class="line"><span style="color:#E1E4E8;">	container.</span><span style="color:#B392F0;">Add</span><span style="color:#E1E4E8;">(component)</span></span>
<span class="line"><span style="color:#6A737D;">	// 启动容器</span></span>
<span class="line"><span style="color:#E1E4E8;">	container.</span><span style="color:#B392F0;">Serve</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 初始化应用</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> initApp</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">proxy</span><span style="color:#F97583;"> *</span><span style="color:#B392F0;">http</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#6A737D;">	// 路由器</span></span>
<span class="line"><span style="color:#E1E4E8;">	router </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> proxy.</span><span style="color:#B392F0;">Router</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#6A737D;">	// 注册路由</span></span>
<span class="line"><span style="color:#E1E4E8;">	router.</span><span style="color:#B392F0;">Get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/greet&quot;</span><span style="color:#E1E4E8;">, greetHandler)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 请求</span></span>
<span class="line"><span style="color:#F97583;">type</span><span style="color:#B392F0;"> greetReq</span><span style="color:#F97583;"> struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	Message </span><span style="color:#F97583;">string</span><span style="color:#9ECBFF;"> \`json:&quot;message&quot;\`</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 响应</span></span>
<span class="line"><span style="color:#F97583;">type</span><span style="color:#B392F0;"> greetRes</span><span style="color:#F97583;"> struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	Message </span><span style="color:#F97583;">string</span><span style="color:#9ECBFF;"> \`json:&quot;message&quot;\`</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 路由处理器</span></span>
<span class="line"><span style="color:#6A737D;">// @Summary 测试接口</span></span>
<span class="line"><span style="color:#6A737D;">// @Tags 测试</span></span>
<span class="line"><span style="color:#6A737D;">// @Schemes</span></span>
<span class="line"><span style="color:#6A737D;">// @Accept json</span></span>
<span class="line"><span style="color:#6A737D;">// @Produce json</span></span>
<span class="line"><span style="color:#6A737D;">// @Param request body greetReq true &quot;请求参数&quot;</span></span>
<span class="line"><span style="color:#6A737D;">// @Response 200 {object} http.Resp{Data=greetRes} &quot;响应参数&quot;</span></span>
<span class="line"><span style="color:#6A737D;">// @Router /greet [get]</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> greetHandler</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">ctx</span><span style="color:#B392F0;"> http</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Context</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	req </span><span style="color:#F97583;">:=</span><span style="color:#F97583;"> &amp;</span><span style="color:#B392F0;">greetReq</span><span style="color:#E1E4E8;">{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">	if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> ctx.</span><span style="color:#B392F0;">Bind</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">JSON</span><span style="color:#E1E4E8;">(req); err </span><span style="color:#F97583;">!=</span><span style="color:#79B8FF;"> nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#F97583;">		return</span><span style="color:#E1E4E8;"> ctx.</span><span style="color:#B392F0;">Failure</span><span style="color:#E1E4E8;">(codes.InvalidArgument)</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	log.</span><span style="color:#B392F0;">Info</span><span style="color:#E1E4E8;">(req.Message)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">	return</span><span style="color:#E1E4E8;"> ctx.</span><span style="color:#B392F0;">Success</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">&amp;</span><span style="color:#B392F0;">greetRes</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">		Message: fmt.</span><span style="color:#B392F0;">Sprintf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;I&#39;m server, and the current time is: </span><span style="color:#79B8FF;">%s</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, xtime.</span><span style="color:#B392F0;">Now</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">Format</span><span style="color:#E1E4E8;">(xtime.DateTime)),</span></span>
<span class="line"><span style="color:#E1E4E8;">	})</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre></div><h2 id="web-swagger-init" tabindex="-1">生成文档 <a class="header-anchor" href="#web-swagger-init" aria-label="Permalink to &quot;生成文档 {#web-swagger-init}&quot;">​</a></h2><ul><li>生成swagger文件</li></ul><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#9ECBFF;"> swag</span><span style="color:#9ECBFF;"> init</span><span style="color:#79B8FF;"> --parseDependency</span></span></code></pre></div><ul><li>删除无用的docs.go文件</li></ul><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#9ECBFF;"> rm</span><span style="color:#79B8FF;"> -rf</span><span style="color:#9ECBFF;"> ./docs/docs.go</span></span></code></pre></div><h2 id="web-start" tabindex="-1">启动服务 <a class="header-anchor" href="#web-start" aria-label="Permalink to &quot;启动服务 {#web-start}&quot;">​</a></h2><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#9ECBFF;"> go</span><span style="color:#9ECBFF;"> run</span><span style="color:#9ECBFF;"> main.go</span></span>
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
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> PID:</span><span style="color:#79B8FF;"> 40628</span><span style="color:#F97583;">                                           |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Mode:</span><span style="color:#9ECBFF;"> debug</span><span style="color:#F97583;">                                          |</span></span>
<span class="line"><span style="color:#B392F0;">└──────────────────────────────────────────────────────┘</span></span>
<span class="line"><span style="color:#B392F0;">┌─────────────────────────Http─────────────────────────┐</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Name:</span><span style="color:#9ECBFF;"> http</span><span style="color:#F97583;">                                           |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Url:</span><span style="color:#9ECBFF;"> http://192.168.2.202:8080</span><span style="color:#F97583;">                       |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Swagger:</span><span style="color:#9ECBFF;"> http://192.168.2.202:8080/swagger</span><span style="color:#F97583;">           |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Registry:</span><span style="color:#9ECBFF;"> -</span><span style="color:#F97583;">                                          |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Transporter:</span><span style="color:#9ECBFF;"> -</span><span style="color:#F97583;">                                       |</span></span>
<span class="line"><span style="color:#B392F0;">└──────────────────────────────────────────────────────┘</span></span></code></pre></div><h2 id="web-etc" tabindex="-1">启动配置 <a class="header-anchor" href="#web-etc" aria-label="Permalink to &quot;启动配置 {#web-etc}&quot;">​</a></h2><p>这里仅展示Web服务器（Http）相关配置参数，如需了解更多模块的参数配置，请查看<a href="/guide/etc.html">启动配置</a></p><div class="language-toml"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#6A737D;"># 进程号</span></span>
<span class="line"><span style="color:#E1E4E8;">pid = </span><span style="color:#9ECBFF;">&quot;./run/web.pid&quot;</span></span>
<span class="line"><span style="color:#6A737D;"># 开发模式。支持模式：debug、test、release（设置优先级：配置文件 &lt; 环境变量 &lt; 运行参数 &lt; mode.SetMode()）</span></span>
<span class="line"><span style="color:#E1E4E8;">mode = </span><span style="color:#9ECBFF;">&quot;debug&quot;</span></span>
<span class="line"><span style="color:#6A737D;"># 统一时区设置。项目中的时间获取请使用xtime.Now()</span></span>
<span class="line"><span style="color:#E1E4E8;">timezone = </span><span style="color:#9ECBFF;">&quot;Local&quot;</span></span>
<span class="line"><span style="color:#6A737D;"># 容器关闭最大等待时间。支持单位：纳秒（ns）、微秒（us | µs）、毫秒（ms）、秒（s）、分（m）、小时（h）、天（d）。默认为0</span></span>
<span class="line"><span style="color:#E1E4E8;">shutdownMaxWaitTime = </span><span style="color:#9ECBFF;">&quot;0s&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># http服务器配置</span></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">http</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">    # 服务器名称</span></span>
<span class="line"><span style="color:#E1E4E8;">    name = </span><span style="color:#9ECBFF;">&quot;http&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 服务器监听地址，默认为:8080</span></span>
<span class="line"><span style="color:#E1E4E8;">    addr = </span><span style="color:#9ECBFF;">&quot;:8080&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 秘钥文件</span></span>
<span class="line"><span style="color:#E1E4E8;">    keyFile = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 证书文件</span></span>
<span class="line"><span style="color:#E1E4E8;">    certFile = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 跨域配置</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#B392F0;">http</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">cors</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">        # 是否启用跨域</span></span>
<span class="line"><span style="color:#E1E4E8;">        enable = </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#6A737D;">        # 允许跨域的请求源。默认为[]，即为允许所有请求源</span></span>
<span class="line"><span style="color:#E1E4E8;">        allowOrigins = []</span></span>
<span class="line"><span style="color:#6A737D;">        # 允许跨域的请求方法。默认为[&quot;GET&quot;, &quot;POST&quot;, &quot;HEAD&quot;, &quot;PUT&quot;, &quot;DELETE&quot;, &quot;PATCH&quot;]</span></span>
<span class="line"><span style="color:#E1E4E8;">        allowMethods = []</span></span>
<span class="line"><span style="color:#6A737D;">        # 允许跨域的请求头部。默认为[]，即为允许所有请求头部</span></span>
<span class="line"><span style="color:#E1E4E8;">        allowHeaders = []</span></span>
<span class="line"><span style="color:#6A737D;">        # 当允许所有源时，根据CORS规范不允许携带凭据。默认为false</span></span>
<span class="line"><span style="color:#E1E4E8;">        allowCredentials = </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#6A737D;">        # 允许暴露给客户端的头部。默认为[]，即为允许暴露所有头部</span></span>
<span class="line"><span style="color:#E1E4E8;">        exposeHeaders = []</span></span>
<span class="line"><span style="color:#6A737D;">        # 浏览器缓存预检请求结果的时间。默认为0</span></span>
<span class="line"><span style="color:#E1E4E8;">        maxAge = </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#6A737D;">        # 是否允许来自私有网络的请求。设置为true时，响应头Access-Control-Allow-Private-Network会被设置为true。默认为false</span></span>
<span class="line"><span style="color:#E1E4E8;">        allowPrivateNetwork = </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#6A737D;">    # swagger配置</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#B392F0;">http</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">swagger</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">        # 是否启用文档</span></span>
<span class="line"><span style="color:#E1E4E8;">        enable = </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#6A737D;">        # API文档标题</span></span>
<span class="line"><span style="color:#E1E4E8;">        title = </span><span style="color:#9ECBFF;">&quot;API文档&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # URL访问基础路径</span></span>
<span class="line"><span style="color:#E1E4E8;">        basePath = </span><span style="color:#9ECBFF;">&quot;/swagger&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # swagger文件路径</span></span>
<span class="line"><span style="color:#E1E4E8;">        filePath = </span><span style="color:#9ECBFF;">&quot;./docs/swagger.json&quot;</span></span>
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
<span class="line"><span style="color:#E1E4E8;">    classifiedStorage = </span><span style="color:#79B8FF;">false</span></span></code></pre></div><h2 id="web-more" tabindex="-1">更多文档 <a class="header-anchor" href="#web-more" aria-label="Permalink to &quot;更多文档 {#web-more}&quot;">​</a></h2><p><a href="https://github.com/dobyte/due" target="_blank" rel="noreferrer">due</a> 框架的Web服务器严格遵循<a href="https://github.com/gofiber/fiber" target="_blank" rel="noreferrer">fiber</a>框架的开发规范，如需了解更多的开发问题请移步<a href="https://github.com/gofiber/fiber" target="_blank" rel="noreferrer">fiber开发文档</a></p>`,25))])}const h=l(i,[["render",y]]);export{B as __pageData,h as default};
