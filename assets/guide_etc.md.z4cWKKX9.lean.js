import{_ as l,C as p,c as o,o as e,a as n,q as t,b as c,m as r}from"./chunks/framework.BSdOUgs7.js";const d=JSON.parse('{"title":"启动配置","description":"","frontmatter":{},"headers":[{"level":2,"title":"基本介绍","slug":"etc-introduction","link":"#etc-introduction","children":[]},{"level":2,"title":"指定目录","slug":"etc-specify-directory","link":"#etc-specify-directory","children":[]},{"level":2,"title":"支持格式","slug":"etc-format","link":"#etc-format","children":[]},{"level":2,"title":"读写规则","slug":"etc-read-rule","link":"#etc-read-rule","children":[]},{"level":2,"title":"读取接口","slug":"etc-interface","link":"#etc-interface","children":[]},{"level":2,"title":"示例代码","slug":"etc-example","link":"#etc-example","children":[]},{"level":2,"title":"全部配置","slug":"etc-all-config","link":"#etc-all-config","children":[]}],"relativePath":"guide/etc.md","filePath":"guide/etc.md"}'),E={name:"guide/etc.md"};function y(i,s,F,u,q,B){const a=p("TextAd");return e(),o("div",null,[s[0]||(s[0]=n("h1",{id:"etc",tabindex:"-1"},[r("启动配置 "),n("a",{class:"header-anchor",href:"#etc","aria-label":'Permalink to "启动配置 {#etc}"'},"​")],-1)),t(a),s[1]||(s[1]=c(`<h2 id="etc-introduction" tabindex="-1">基本介绍 <a class="header-anchor" href="#etc-introduction" aria-label="Permalink to &quot;基本介绍 {#etc-introduction}&quot;">​</a></h2><p>启动配置（etc）主要用于引导程序启动的配置，默认启动配置文件为./etc/etc.toml。当然你也可以在配置目录添加自己额外的业务配置并进行读取（不推荐）。启动配置支持热更，但这仅限于通过<a href="#读取接口-etc-interface">接口</a>读取的形式。服务器组件一旦启动后，即便启动配置发生了变更，服务器组件也不再进行更新。</p><h2 id="etc-specify-directory" tabindex="-1">指定目录 <a class="header-anchor" href="#etc-specify-directory" aria-label="Permalink to &quot;指定目录 {#etc-specify-directory}&quot;">​</a></h2><p>你可以通过以下方式来指定指定配置目录：</p><ol><li>通过环境变量指定 DUE_ETC=/run/etc</li><li>通过启动参数指定 --etc=./etc</li></ol><p>设置优先级：环境变量 &lt; 运行参数</p><blockquote><p>注：无论你如何指定启动配置目录，etc.[toml|yaml|yml|json|xml]作为框架集群唯一的启动文件，一定不能修改，修改后会导致配置不生效或不可预期的后果。</p></blockquote><h2 id="etc-format" tabindex="-1">支持格式 <a class="header-anchor" href="#etc-format" aria-label="Permalink to &quot;支持格式 {#etc-format}&quot;">​</a></h2><p>启动配置默认支持 <a href="https://toml.io/" target="_blank" rel="noreferrer">toml</a>、<a href="https://yaml.org/" target="_blank" rel="noreferrer">yaml</a>、<a href="https://www.json.org/" target="_blank" rel="noreferrer">json</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/XML/XML_introduction" target="_blank" rel="noreferrer">xml</a> 等多种文件格式。你可以根据自身喜好自由选择文件格式。</p><blockquote><p>注：yaml格式的配置支持.yaml和.yml两种后缀名</p></blockquote><h2 id="etc-read-rule" tabindex="-1">读写规则 <a class="header-anchor" href="#etc-read-rule" aria-label="Permalink to &quot;读写规则 {#etc-read-rule}&quot;">​</a></h2><p>框架中的配置文件均是以 <strong>文件名[.参数名1[.参数名2...[.参数名n]]]</strong> 的方式进行读写的。</p><blockquote><p>注：例如a.b.c.d.toml这样的配置文件同样也是被支持的。读写时你只需要将a.b.c.d看成一个完整的文件名即可。</p></blockquote><h2 id="etc-interface" tabindex="-1">读取接口 <a class="header-anchor" href="#etc-interface" aria-label="Permalink to &quot;读取接口 {#etc-interface}&quot;">​</a></h2><p>启动配置（etc）不单单可以作为引导程序启动的配置存在，你也可以通过以下接口读取在配置目录中添加的额外配置文件参数。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#B392F0;">github.com/dobyte/due/v2/etc</span></span></code></pre></div><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#6A737D;">// Has 是否存在配置</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> Has</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">pattern</span><span style="color:#F97583;"> string</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">bool</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Get 获取配置值</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> Get</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">pattern</span><span style="color:#F97583;"> string</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">def</span><span style="color:#F97583;"> ...interface</span><span style="color:#E1E4E8;">{}) </span><span style="color:#B392F0;">value</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Value</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Set 设置配置值</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> Set</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">pattern</span><span style="color:#F97583;"> string</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">value</span><span style="color:#F97583;"> interface</span><span style="color:#E1E4E8;">{}) </span><span style="color:#F97583;">error</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Match 匹配多个规则</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> Match</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">patterns</span><span style="color:#F97583;"> ...</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">) </span><span style="color:#B392F0;">config</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Matcher</span></span></code></pre></div><h2 id="etc-example" tabindex="-1">示例代码 <a class="header-anchor" href="#etc-example" aria-label="Permalink to &quot;示例代码 {#etc-example}&quot;">​</a></h2><p>以下完整示例详见：<a href="https://github.com/dobyte/due-examples/tree/master/etc" target="_blank" rel="noreferrer">etc</a></p><p>编写配置文件</p><div class="language-toml"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">mysql</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">    # dsn连接信息</span></span>
<span class="line"><span style="color:#E1E4E8;">    dsn = </span><span style="color:#9ECBFF;">&quot;root:123456@tcp(127.0.0.1:3306)/game?charset=utf8mb4&amp;parseTime=True&amp;loc=Local&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 日志级别; silent | error | warn | info</span></span>
<span class="line"><span style="color:#E1E4E8;">    logLevel = </span><span style="color:#9ECBFF;">&quot;error&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 慢日志阈值;ms</span></span>
<span class="line"><span style="color:#E1E4E8;">    slowThreshold = </span><span style="color:#79B8FF;">2000</span></span>
<span class="line"><span style="color:#6A737D;">    # 最大空闲连接数</span></span>
<span class="line"><span style="color:#E1E4E8;">    maxIdleConns = </span><span style="color:#79B8FF;">50</span></span>
<span class="line"><span style="color:#6A737D;">    # 最大打开连接数</span></span>
<span class="line"><span style="color:#E1E4E8;">    maxOpenConns = </span><span style="color:#79B8FF;">50</span></span>
<span class="line"><span style="color:#6A737D;">    # 连接最大存活时间</span></span>
<span class="line"><span style="color:#E1E4E8;">    connMaxLifetime = </span><span style="color:#79B8FF;">3600</span></span></code></pre></div><p>编写读取示例</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#B392F0;"> main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">fmt</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2/etc</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2/log</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">type</span><span style="color:#B392F0;"> config</span><span style="color:#F97583;"> struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	DSN             </span><span style="color:#F97583;">string</span><span style="color:#9ECBFF;"> \`json:&quot;dsn&quot;\`</span></span>
<span class="line"><span style="color:#E1E4E8;">	LogLevel        </span><span style="color:#F97583;">string</span><span style="color:#9ECBFF;"> \`json:&quot;logLevel&quot;\`</span></span>
<span class="line"><span style="color:#E1E4E8;">	SlowThreshold   </span><span style="color:#F97583;">int</span><span style="color:#9ECBFF;">    \`json:&quot;slowThreshold&quot;\`</span></span>
<span class="line"><span style="color:#E1E4E8;">	MaxIdleConns    </span><span style="color:#F97583;">int</span><span style="color:#9ECBFF;">    \`json:&quot;maxIdleConns&quot;\`</span></span>
<span class="line"><span style="color:#E1E4E8;">	MaxOpenConns    </span><span style="color:#F97583;">int</span><span style="color:#9ECBFF;">    \`json:&quot;maxOpenConns&quot;\`</span></span>
<span class="line"><span style="color:#E1E4E8;">	ConnMaxLifetime </span><span style="color:#F97583;">int</span><span style="color:#9ECBFF;">    \`json:&quot;connMaxLifetime&quot;\`</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#6A737D;">	// 读取单个配置参数</span></span>
<span class="line"><span style="color:#E1E4E8;">	logLevel </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> etc.</span><span style="color:#B392F0;">Get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;db.mysql.logLevel&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#B392F0;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;mysql log-level: </span><span style="color:#79B8FF;">%s\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, logLevel)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">	// 读取多个配置参数</span></span>
<span class="line"><span style="color:#E1E4E8;">	conf </span><span style="color:#F97583;">:=</span><span style="color:#F97583;"> &amp;</span><span style="color:#B392F0;">config</span><span style="color:#E1E4E8;">{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">	if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> etc.</span><span style="color:#B392F0;">Get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;db.mysql&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">Scan</span><span style="color:#E1E4E8;">(conf); err </span><span style="color:#F97583;">!=</span><span style="color:#79B8FF;"> nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		log.</span><span style="color:#B392F0;">Errorf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;get mysql error: </span><span style="color:#79B8FF;">%s</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, err)</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#B392F0;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;mysql config: </span><span style="color:#79B8FF;">%+v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, conf)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">	// 修改配置参数</span></span>
<span class="line"><span style="color:#F97583;">	if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> etc.</span><span style="color:#B392F0;">Set</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;db.mysql.logLevel&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;info&quot;</span><span style="color:#E1E4E8;">); err </span><span style="color:#F97583;">!=</span><span style="color:#79B8FF;"> nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		log.</span><span style="color:#B392F0;">Errorf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;set mysql log-level error: </span><span style="color:#79B8FF;">%s</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, err)</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">	// 读取单个配置参数</span></span>
<span class="line"><span style="color:#E1E4E8;">	logLevel </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> etc.</span><span style="color:#B392F0;">Get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;db.mysql.logLevel&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#B392F0;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;mysql log-level: </span><span style="color:#79B8FF;">%s\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, logLevel)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre></div><p>运行示例</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#9ECBFF;"> go</span><span style="color:#9ECBFF;"> run</span><span style="color:#9ECBFF;"> main.go</span></span>
<span class="line"><span style="color:#B392F0;">mysql</span><span style="color:#9ECBFF;"> log-level:</span><span style="color:#9ECBFF;"> error</span></span>
<span class="line"><span style="color:#B392F0;">mysql</span><span style="color:#9ECBFF;"> config:</span><span style="color:#E1E4E8;"> &amp;{DSN:root:123456@tcp(127.0.0.1:3306)/game?charset=utf8mb4&amp;parseTime=True&amp;loc=Local LogLevel:error SlowThreshold:2000 MaxIdleConns:50 MaxOpenConns:50 ConnMaxLifetime:3600}</span></span>
<span class="line"><span style="color:#B392F0;">mysql</span><span style="color:#9ECBFF;"> log-level:</span><span style="color:#9ECBFF;"> info</span></span></code></pre></div><h2 id="etc-all-config" tabindex="-1">全部配置 <a class="header-anchor" href="#etc-all-config" aria-label="Permalink to &quot;全部配置 {#etc-all-config}&quot;">​</a></h2><p>以下配置示例详见：<a href="https://github.com/dobyte/due/blob/main/testdata/etc/etc.toml" target="_blank" rel="noreferrer">etc.toml</a></p><div class="language-toml"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#6A737D;"># 进程号</span></span>
<span class="line"><span style="color:#E1E4E8;">pid = </span><span style="color:#9ECBFF;">&quot;./run/cluster.pid&quot;</span></span>
<span class="line"><span style="color:#6A737D;"># 开发模式。支持模式：debug、test、release（设置优先级：配置文件 &lt; 环境变量 &lt; 运行参数 &lt; mode.SetMode()）</span></span>
<span class="line"><span style="color:#E1E4E8;">mode = </span><span style="color:#9ECBFF;">&quot;debug&quot;</span></span>
<span class="line"><span style="color:#6A737D;"># 统一时区设置。项目中的时间获取请使用xtime.Now()</span></span>
<span class="line"><span style="color:#E1E4E8;">timezone = </span><span style="color:#9ECBFF;">&quot;Local&quot;</span></span>
<span class="line"><span style="color:#6A737D;"># 容器关闭最大等待时间。支持单位：纳秒（ns）、微秒（us | µs）、毫秒（ms）、秒（s）、分（m）、小时（h）、天（d）。默认为0</span></span>
<span class="line"><span style="color:#E1E4E8;">shutdownMaxWaitTime = </span><span style="color:#9ECBFF;">&quot;0s&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 任务池</span></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">task</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">    # 任务池大小(goroutine)</span></span>
<span class="line"><span style="color:#E1E4E8;">    size = </span><span style="color:#79B8FF;">100000</span></span>
<span class="line"><span style="color:#6A737D;">    # 是否非阻塞</span></span>
<span class="line"><span style="color:#E1E4E8;">    nonblocking = </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#6A737D;">    # 是否禁用清除。</span></span>
<span class="line"><span style="color:#E1E4E8;">    disablePurge = </span><span style="color:#79B8FF;">true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 配置中心</span></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">config</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">    # 文件配置</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#B392F0;">config</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">file</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">        # 配置文件或配置目录路径</span></span>
<span class="line"><span style="color:#E1E4E8;">        path = </span><span style="color:#9ECBFF;">&quot;./config&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 读写模式。可选：read-only | write-only | read-write，默认为read-only</span></span>
<span class="line"><span style="color:#E1E4E8;">        mode = </span><span style="color:#9ECBFF;">&quot;read-only&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # etcd配置中心</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#B392F0;">config</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">etcd</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">        # 客户端连接地址，默认为[&quot;127.0.0.1:2379&quot;]</span></span>
<span class="line"><span style="color:#E1E4E8;">        addrs = [</span><span style="color:#9ECBFF;">&quot;127.0.0.1:2379&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">        # 客户端拨号超时时间，支持单位：纳秒（ns）、微秒（us | µs）、毫秒（ms）、秒（s）、分（m）、小时（h）、天（d）。默认为5s</span></span>
<span class="line"><span style="color:#E1E4E8;">        dialTimeout = </span><span style="color:#9ECBFF;">&quot;5s&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 路径。默认为/config</span></span>
<span class="line"><span style="color:#E1E4E8;">        path = </span><span style="color:#9ECBFF;">&quot;/config&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 读写模式。可选：read-only | write-only | read-write，默认为read-only</span></span>
<span class="line"><span style="color:#E1E4E8;">        mode = </span><span style="color:#9ECBFF;">&quot;read-only&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # consul配置中心</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#B392F0;">config</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">consul</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">        # 客户端连接地址</span></span>
<span class="line"><span style="color:#E1E4E8;">        addr = </span><span style="color:#9ECBFF;">&quot;127.0.0.1:8500&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 路径。默认为config</span></span>
<span class="line"><span style="color:#E1E4E8;">        path = </span><span style="color:#9ECBFF;">&quot;config&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 读写模式。可选：read-only | write-only | read-write，默认为read-only</span></span>
<span class="line"><span style="color:#E1E4E8;">        mode = </span><span style="color:#9ECBFF;">&quot;read-only&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # nacos配置中心</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#B392F0;">config</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">nacos</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">        # 读写模式。可选：read-only | write-only | read-write，默认为read-only</span></span>
<span class="line"><span style="color:#E1E4E8;">        mode = </span><span style="color:#9ECBFF;">&quot;read-only&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 服务器地址 [scheme://]ip:port[/nacos]。默认为[&quot;http://127.0.0.1:8848/nacos&quot;]</span></span>
<span class="line"><span style="color:#E1E4E8;">        urls = [</span><span style="color:#9ECBFF;">&quot;http://127.0.0.1:8848/nacos&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">        # 集群名称。默认为DEFAULT</span></span>
<span class="line"><span style="color:#E1E4E8;">        clusterName = </span><span style="color:#9ECBFF;">&quot;DEFAULT&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 群组名称。默认为DEFAULT_GROUP</span></span>
<span class="line"><span style="color:#E1E4E8;">        groupName = </span><span style="color:#9ECBFF;">&quot;DEFAULT_GROUP&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 请求Nacos服务端超时时间，支持单位：纳秒（ns）、微秒（us | µs）、毫秒（ms）、秒（s）、分（m）、小时（h）、天（d）。默认为3秒</span></span>
<span class="line"><span style="color:#E1E4E8;">        timeout = </span><span style="color:#9ECBFF;">&quot;3s&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # ACM的命名空间Id。默认为空</span></span>
<span class="line"><span style="color:#E1E4E8;">        namespaceId = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 当使用ACM时，需要该配置，默认为空。详见：https://help.aliyun.com/document_detail/130146.html</span></span>
<span class="line"><span style="color:#E1E4E8;">        endpoint = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # ACM&amp;KMS的regionId，用于配置中心的鉴权。默认为空</span></span>
<span class="line"><span style="color:#E1E4E8;">        regionId = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # ACM&amp;KMS的AccessKey，用于配置中心的鉴权。默认为空</span></span>
<span class="line"><span style="color:#E1E4E8;">        accessKey = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # ACM&amp;KMS的SecretKey，用于配置中心的鉴权。默认为空</span></span>
<span class="line"><span style="color:#E1E4E8;">        secretKey = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 是否开启kms，同时DataId必须以&quot;cipher-&quot;作为前缀才会启动加解密逻辑。kms可以参考文档：https://help.aliyun.com/product/28933.html</span></span>
<span class="line"><span style="color:#E1E4E8;">        openKMS = </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#6A737D;">        # 缓存service信息的目录。默认为./run/nacos/naming/cache</span></span>
<span class="line"><span style="color:#E1E4E8;">        cacheDir = </span><span style="color:#9ECBFF;">&quot;./run/nacos/config/cache&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # Nacos服务端的API鉴权Username。默认为空</span></span>
<span class="line"><span style="color:#E1E4E8;">        username = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # Nacos服务端的API鉴权Password。默认为空</span></span>
<span class="line"><span style="color:#E1E4E8;">        password = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 日志存储路径。默认为./run/nacos/naming/log</span></span>
<span class="line"><span style="color:#E1E4E8;">        logDir = </span><span style="color:#9ECBFF;">&quot;./run/nacos/config/log&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 日志输出级别，可选：debug、info、warn、error。默认为info</span></span>
<span class="line"><span style="color:#E1E4E8;">        logLevel = </span><span style="color:#9ECBFF;">&quot;info&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">cluster</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">    # 集群网关配置</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#B392F0;">cluster</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">gate</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">        # 实例ID，网关集群中唯一。不填写默认自动生成唯一的实例ID</span></span>
<span class="line"><span style="color:#E1E4E8;">        id = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 实例名称</span></span>
<span class="line"><span style="color:#E1E4E8;">        name = </span><span style="color:#9ECBFF;">&quot;gate&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 内建RPC服务器监听地址。不填写默认随机监听</span></span>
<span class="line"><span style="color:#E1E4E8;">        addr = </span><span style="color:#9ECBFF;">&quot;:0&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # RPC调用超时时间，支持单位：纳秒（ns）、微秒（us | µs）、毫秒（ms）、秒（s）、分（m）、小时（h）、天（d）。默认为3s</span></span>
<span class="line"><span style="color:#E1E4E8;">        timeout = </span><span style="color:#9ECBFF;">&quot;3s&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 集群节点配置</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#B392F0;">cluster</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">node</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">        # 实例ID，节点集群中唯一。不填写默认自动生成唯一的实例ID</span></span>
<span class="line"><span style="color:#E1E4E8;">        id = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 实例名称</span></span>
<span class="line"><span style="color:#E1E4E8;">        name = </span><span style="color:#9ECBFF;">&quot;node&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 内建RPC服务器监听地址。不填写默认随机监听</span></span>
<span class="line"><span style="color:#E1E4E8;">        addr = </span><span style="color:#9ECBFF;">&quot;:0&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 编解码器。可选：json | proto。默认为proto</span></span>
<span class="line"><span style="color:#E1E4E8;">        codec = </span><span style="color:#9ECBFF;">&quot;proto&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # RPC调用超时时间，支持单位：纳秒（ns）、微秒（us | µs）、毫秒（ms）、秒（s）、分（m）、小时（h）、天（d）。默认为3s</span></span>
<span class="line"><span style="color:#E1E4E8;">        timeout = </span><span style="color:#9ECBFF;">&quot;3s&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 集群管理节点配置</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#B392F0;">cluster</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">master</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">        # 实例ID，网关集群中唯一。不填写默认自动生成唯一的实例ID</span></span>
<span class="line"><span style="color:#E1E4E8;">        id = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 实例名称</span></span>
<span class="line"><span style="color:#E1E4E8;">        name = </span><span style="color:#9ECBFF;">&quot;master&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 编解码器。可选：json | proto。默认为proto</span></span>
<span class="line"><span style="color:#E1E4E8;">        codec = </span><span style="color:#9ECBFF;">&quot;proto&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 加密器。可选：rsa | ecc</span></span>
<span class="line"><span style="color:#E1E4E8;">        encryptor = </span><span style="color:#9ECBFF;">&quot;ecc&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 解密器。可选：rsa | ecc</span></span>
<span class="line"><span style="color:#E1E4E8;">        decryptor = </span><span style="color:#9ECBFF;">&quot;ecc&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 集群网格配置</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#B392F0;">cluster</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">mesh</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">        # 实例名称</span></span>
<span class="line"><span style="color:#E1E4E8;">        name = </span><span style="color:#9ECBFF;">&quot;mesh&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 编解码器。可选：json | proto。默认为proto</span></span>
<span class="line"><span style="color:#E1E4E8;">        codec = </span><span style="color:#9ECBFF;">&quot;proto&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 集群客户端配置，常用于调试使用</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#B392F0;">cluster</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">client</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">        # 实例ID，网关集群中唯一。不填写默认自动生成唯一的实例ID</span></span>
<span class="line"><span style="color:#E1E4E8;">        id = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 实例名称</span></span>
<span class="line"><span style="color:#E1E4E8;">        name = </span><span style="color:#9ECBFF;">&quot;client&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 编解码器。可选：json | proto。默认为proto</span></span>
<span class="line"><span style="color:#E1E4E8;">        codec = </span><span style="color:#9ECBFF;">&quot;proto&quot;</span></span>
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
<span class="line"><span style="color:#E1E4E8;">        enable = </span><span style="color:#79B8FF;">false</span></span>
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
<span class="line"><span style="color:#6A737D;">    # swagger文档配置</span></span>
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
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">transport</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">    # GRPC相关配置</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#B392F0;">transport</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">grpc</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">        # GRPC服务器相关配置</span></span>
<span class="line"><span style="color:#E1E4E8;">        [</span><span style="color:#B392F0;">transport</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">grpc</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">            # 服务器监听地址。空或:0时系统将会随机端口号</span></span>
<span class="line"><span style="color:#E1E4E8;">            addr = </span><span style="color:#9ECBFF;">&quot;:0&quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 秘钥文件</span></span>
<span class="line"><span style="color:#E1E4E8;">            keyFile = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 证书文件</span></span>
<span class="line"><span style="color:#E1E4E8;">            certFile = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # GRPC客户端相关配置</span></span>
<span class="line"><span style="color:#E1E4E8;">        [</span><span style="color:#B392F0;">transport</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">grpc</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">client</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">            # 证书文件</span></span>
<span class="line"><span style="color:#E1E4E8;">            certFile = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 证书域名</span></span>
<span class="line"><span style="color:#E1E4E8;">            serverName = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # RPCX相关配置</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#B392F0;">transport</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">rpcx</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">        # RPCX服务器相关配置</span></span>
<span class="line"><span style="color:#E1E4E8;">        [</span><span style="color:#B392F0;">transport</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">rpcx</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">            # 服务器监听地址。空或:0时系统将会随机端口号</span></span>
<span class="line"><span style="color:#E1E4E8;">            addr = </span><span style="color:#9ECBFF;">&quot;:0&quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 秘钥文件</span></span>
<span class="line"><span style="color:#E1E4E8;">            keyFile = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 证书文件</span></span>
<span class="line"><span style="color:#E1E4E8;">            certFile = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # RPCX客户端相关配置</span></span>
<span class="line"><span style="color:#E1E4E8;">        [</span><span style="color:#B392F0;">transport</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">rpcx</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">client</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">            # 证书文件</span></span>
<span class="line"><span style="color:#E1E4E8;">            certFile = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 证书域名</span></span>
<span class="line"><span style="color:#E1E4E8;">            serverName = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 连接池大小，默认为10</span></span>
<span class="line"><span style="color:#E1E4E8;">            poolSize = </span><span style="color:#79B8FF;">10</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 框架默认打包器统一采用以下的打包格式，自定义打包器可自行定义打包规则</span></span>
<span class="line"><span style="color:#6A737D;"># -------------------------</span></span>
<span class="line"><span style="color:#6A737D;"># | route | seq | message |</span></span>
<span class="line"><span style="color:#6A737D;"># -------------------------</span></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">packet</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">    # 字节序，默认为big。可选：little | big</span></span>
<span class="line"><span style="color:#E1E4E8;">    byteOrder = </span><span style="color:#9ECBFF;">&quot;big&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 路由字节数，默认为2字节</span></span>
<span class="line"><span style="color:#E1E4E8;">    routeBytes = </span><span style="color:#79B8FF;">2</span></span>
<span class="line"><span style="color:#6A737D;">    # 序列号字节数，默认为2字节</span></span>
<span class="line"><span style="color:#E1E4E8;">    seqBytes = </span><span style="color:#79B8FF;">2</span></span>
<span class="line"><span style="color:#6A737D;">    # 消息字节数，默认为5000字节</span></span>
<span class="line"><span style="color:#E1E4E8;">    bufferBytes = </span><span style="color:#79B8FF;">5000</span></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">    # 日志输出文件</span></span>
<span class="line"><span style="color:#E1E4E8;">    file = </span><span style="color:#9ECBFF;">&quot;../../testdata/log/due.log&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 日志输出级别，可选：debug | info | warn | error | fatal | panic</span></span>
<span class="line"><span style="color:#E1E4E8;">    level = </span><span style="color:#9ECBFF;">&quot;info&quot;</span></span>
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
<span class="line"><span style="color:#E1E4E8;">    classifiedStorage = </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#6A737D;">    # 阿里云SLS日志服务。以下配置项如果不存在，则会使用log域中的默认配置项；如果都未配置，则会使用系统默认配置</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">aliyun</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">        # 服务域名，公网使用公网域名，内网使用私网域名</span></span>
<span class="line"><span style="color:#E1E4E8;">        endpoint = </span><span style="color:#9ECBFF;">&quot;cn-chengdu.log.aliyuncs.com&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 访问密钥ID</span></span>
<span class="line"><span style="color:#E1E4E8;">        accessKeyID = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 访问密钥密码</span></span>
<span class="line"><span style="color:#E1E4E8;">        accessKeySecret = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 项目名称</span></span>
<span class="line"><span style="color:#E1E4E8;">        project = </span><span style="color:#9ECBFF;">&quot;due-test&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 日志存储</span></span>
<span class="line"><span style="color:#E1E4E8;">        logstore = </span><span style="color:#9ECBFF;">&quot;app&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 主题标签，默认为空</span></span>
<span class="line"><span style="color:#E1E4E8;">        topic = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 来源标签，默认为空</span></span>
<span class="line"><span style="color:#E1E4E8;">        source = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 日志输出级别，可选：debug | info | warn | error | fatal | panic</span></span>
<span class="line"><span style="color:#E1E4E8;">        level = </span><span style="color:#9ECBFF;">&quot;info&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 是否输出到终端</span></span>
<span class="line"><span style="color:#E1E4E8;">        stdout = </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#6A737D;">        # 是否同步输出到远端</span></span>
<span class="line"><span style="color:#E1E4E8;">        syncout = </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#6A737D;">        # 时间格式，标准库时间格式</span></span>
<span class="line"><span style="color:#E1E4E8;">        timeFormat = </span><span style="color:#9ECBFF;">&quot;2006/01/02 15:04:05.000000&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 堆栈的最低输出级别，可选：debug | info | warn | error | fatal | panic</span></span>
<span class="line"><span style="color:#E1E4E8;">        stackLevel = </span><span style="color:#9ECBFF;">&quot;error&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 是否启用调用文件全路径</span></span>
<span class="line"><span style="color:#E1E4E8;">        callerFullPath = </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#6A737D;">    # logrus日志组件。以下配置项如果不存在，则会使用log域中的默认配置项；如果均未配置，则会使用系统默认配置</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">logrus</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">        # 日志输出文件</span></span>
<span class="line"><span style="color:#E1E4E8;">        file = </span><span style="color:#9ECBFF;">&quot;../../testdata/log/due.log&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 日志输出级别，可选：debug | info | warn | error | fatal | panic</span></span>
<span class="line"><span style="color:#E1E4E8;">        level = </span><span style="color:#9ECBFF;">&quot;info&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 日志输出格式，可选：text | json</span></span>
<span class="line"><span style="color:#E1E4E8;">        format = </span><span style="color:#9ECBFF;">&quot;text&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 是否输出到终端</span></span>
<span class="line"><span style="color:#E1E4E8;">        stdout = </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#6A737D;">        # 时间格式，标准库时间格式</span></span>
<span class="line"><span style="color:#E1E4E8;">        timeFormat = </span><span style="color:#9ECBFF;">&quot;2006/01/02 15:04:05.000000&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 堆栈的最低输出级别，可选：debug | info | warn | error | fatal | panic</span></span>
<span class="line"><span style="color:#E1E4E8;">        stackLevel = </span><span style="color:#9ECBFF;">&quot;error&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 文件最大留存时间，d:天、h:时、m:分、s:秒</span></span>
<span class="line"><span style="color:#E1E4E8;">        fileMaxAge = </span><span style="color:#9ECBFF;">&quot;7d&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 文件最大尺寸限制，单位（MB）</span></span>
<span class="line"><span style="color:#E1E4E8;">        fileMaxSize = </span><span style="color:#79B8FF;">100</span></span>
<span class="line"><span style="color:#6A737D;">        # 文件切割方式</span></span>
<span class="line"><span style="color:#E1E4E8;">        fileCutRule = </span><span style="color:#9ECBFF;">&quot;day&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 是否启用调用文件全路径</span></span>
<span class="line"><span style="color:#E1E4E8;">        callerFullPath = </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#6A737D;">        # 是否启用分级存储</span></span>
<span class="line"><span style="color:#E1E4E8;">        classifiedStorage = </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#6A737D;">    # 腾讯云云CLS日志服务。以下配置项如果不存在，则会使用log域中的默认配置项；如果都未配置，则会使用系统默认配置</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">tencent</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">        # 服务域名，公网使用公网域名，内网使用私网域名</span></span>
<span class="line"><span style="color:#E1E4E8;">        endpoint = </span><span style="color:#9ECBFF;">&quot;ap-guangzhou.cls.tencentcs.com&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 访问密钥ID</span></span>
<span class="line"><span style="color:#E1E4E8;">        accessKeyID = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 访问密钥密码</span></span>
<span class="line"><span style="color:#E1E4E8;">        accessKeySecret = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 主题ID</span></span>
<span class="line"><span style="color:#E1E4E8;">        topicID = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 日志输出级别，可选：debug | info | warn | error | fatal | panic</span></span>
<span class="line"><span style="color:#E1E4E8;">        level = </span><span style="color:#9ECBFF;">&quot;info&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 是否输出到终端</span></span>
<span class="line"><span style="color:#E1E4E8;">        stdout = </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#6A737D;">        # 是否同步输出到远端</span></span>
<span class="line"><span style="color:#E1E4E8;">        syncout = </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#6A737D;">        # 时间格式，标准库时间格式</span></span>
<span class="line"><span style="color:#E1E4E8;">        timeFormat = </span><span style="color:#9ECBFF;">&quot;2006/01/02 15:04:05.000000&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 堆栈的最低输出级别，可选：debug | info | warn | error | fatal | panic</span></span>
<span class="line"><span style="color:#E1E4E8;">        stackLevel = </span><span style="color:#9ECBFF;">&quot;error&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 是否启用调用文件全路径</span></span>
<span class="line"><span style="color:#E1E4E8;">        callerFullPath = </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#6A737D;">    # zap日志组件。以下配置项如果不存在，则会使用log域中的默认配置项；如果均未配置，则会使用系统默认配置</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">zap</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">        # 日志输出文件</span></span>
<span class="line"><span style="color:#E1E4E8;">        file = </span><span style="color:#9ECBFF;">&quot;../../testdata/log/due.log&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 日志输出级别，可选：debug | info | warn | error | fatal | panic</span></span>
<span class="line"><span style="color:#E1E4E8;">        level = </span><span style="color:#9ECBFF;">&quot;info&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 日志输出格式，可选：text | json</span></span>
<span class="line"><span style="color:#E1E4E8;">        format = </span><span style="color:#9ECBFF;">&quot;text&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 是否输出到终端</span></span>
<span class="line"><span style="color:#E1E4E8;">        stdout = </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#6A737D;">        # 时间格式，标准库时间格式</span></span>
<span class="line"><span style="color:#E1E4E8;">        timeFormat = </span><span style="color:#9ECBFF;">&quot;2006/01/02 15:04:05.000000&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 堆栈的最低输出级别，可选：debug | info | warn | error | fatal | panic</span></span>
<span class="line"><span style="color:#E1E4E8;">        stackLevel = </span><span style="color:#9ECBFF;">&quot;error&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 文件最大留存时间，d:天、h:时、m:分、s:秒</span></span>
<span class="line"><span style="color:#E1E4E8;">        fileMaxAge = </span><span style="color:#9ECBFF;">&quot;7d&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 文件最大尺寸限制，单位（MB）</span></span>
<span class="line"><span style="color:#E1E4E8;">        fileMaxSize = </span><span style="color:#79B8FF;">100</span></span>
<span class="line"><span style="color:#6A737D;">        # 文件切割方式</span></span>
<span class="line"><span style="color:#E1E4E8;">        fileCutRule = </span><span style="color:#9ECBFF;">&quot;day&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 是否启用调用文件全路径</span></span>
<span class="line"><span style="color:#E1E4E8;">        callerFullPath = </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#6A737D;">        # 是否启用分级存储</span></span>
<span class="line"><span style="color:#E1E4E8;">        classifiedStorage = </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">registry</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#B392F0;">registry</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">etcd</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">        # 客户端连接地址，默认为[&quot;127.0.0.1:2379&quot;]</span></span>
<span class="line"><span style="color:#E1E4E8;">        addrs = [</span><span style="color:#9ECBFF;">&quot;127.0.0.1:2379&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">        # 客户端拨号超时时间，支持单位：纳秒（ns）、微秒（us | µs）、毫秒（ms）、秒（s）、分（m）、小时（h）、天（d）。默认为5s</span></span>
<span class="line"><span style="color:#E1E4E8;">        dialTimeout = </span><span style="color:#9ECBFF;">&quot;5s&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 命名空间，默认为services</span></span>
<span class="line"><span style="color:#E1E4E8;">        namespace = </span><span style="color:#9ECBFF;">&quot;services&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 超时时间，支持单位：纳秒（ns）、微秒（us | µs）、毫秒（ms）、秒（s）、分（m）、小时（h）、天（d）。默认为3s</span></span>
<span class="line"><span style="color:#E1E4E8;">        timeout = </span><span style="color:#9ECBFF;">&quot;3s&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 心跳重试次数，默认为3</span></span>
<span class="line"><span style="color:#E1E4E8;">        retryTimes = </span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#6A737D;">        # 心跳重试间隔，支持单位：纳秒（ns）、微秒（us | µs）、毫秒（ms）、秒（s）、分（m）、小时（h）、天（d）。默认为10s</span></span>
<span class="line"><span style="color:#E1E4E8;">        retryInterval = </span><span style="color:#9ECBFF;">&quot;10s&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#B392F0;">registry</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">consul</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">        # 客户端连接地址，默认为127.0.0.1:8500</span></span>
<span class="line"><span style="color:#E1E4E8;">        addr = </span><span style="color:#9ECBFF;">&quot;127.0.0.1:8500&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 是否启用健康检查，默认为true</span></span>
<span class="line"><span style="color:#E1E4E8;">        healthCheck = </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#6A737D;">        # 健康检查时间间隔（秒），仅在启用健康检查后生效，默认为10</span></span>
<span class="line"><span style="color:#E1E4E8;">        healthCheckInterval = </span><span style="color:#79B8FF;">10</span></span>
<span class="line"><span style="color:#6A737D;">        # 健康检查超时时间（秒），仅在启用健康检查后生效，默认为5</span></span>
<span class="line"><span style="color:#E1E4E8;">        healthCheckTimeout = </span><span style="color:#79B8FF;">5</span></span>
<span class="line"><span style="color:#6A737D;">        # 是否启用心跳检查，默认为true</span></span>
<span class="line"><span style="color:#E1E4E8;">        heartbeatCheck = </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#6A737D;">        # 心跳检查时间间隔（秒），仅在启用心跳检查后生效，默认为10</span></span>
<span class="line"><span style="color:#E1E4E8;">        heartbeatCheckInterval = </span><span style="color:#79B8FF;">10</span></span>
<span class="line"><span style="color:#6A737D;">        # 健康检测失败后自动注销服务时间（秒），默认为30</span></span>
<span class="line"><span style="color:#E1E4E8;">        deregisterCriticalServiceAfter = </span><span style="color:#79B8FF;">30</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#B392F0;">registry</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">nacos</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">        # 服务器地址 [scheme://]ip:port[/nacos]。默认为[&quot;http://127.0.0.1:8848/nacos&quot;]</span></span>
<span class="line"><span style="color:#E1E4E8;">        urls = [</span><span style="color:#9ECBFF;">&quot;http://127.0.0.1:8848/nacos&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">        # 集群名称。默认为DEFAULT</span></span>
<span class="line"><span style="color:#E1E4E8;">        clusterName = </span><span style="color:#9ECBFF;">&quot;DEFAULT&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 群组名称。默认为DEFAULT_GROUP</span></span>
<span class="line"><span style="color:#E1E4E8;">        groupName = </span><span style="color:#9ECBFF;">&quot;DEFAULT_GROUP&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 请求Nacos服务端超时时间，支持单位：纳秒（ns）、微秒（us | µs）、毫秒（ms）、秒（s）、分（m）、小时（h）、天（d）。默认为3秒</span></span>
<span class="line"><span style="color:#E1E4E8;">        timeout = </span><span style="color:#9ECBFF;">&quot;3s&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # ACM的命名空间Id。默认为空</span></span>
<span class="line"><span style="color:#E1E4E8;">        namespaceId = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 当使用ACM时，需要该配置，默认为空。详见：https://help.aliyun.com/document_detail/130146.html</span></span>
<span class="line"><span style="color:#E1E4E8;">        endpoint = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # ACM&amp;KMS的regionId，用于配置中心的鉴权。默认为空</span></span>
<span class="line"><span style="color:#E1E4E8;">        regionId = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # ACM&amp;KMS的AccessKey，用于配置中心的鉴权。默认为空</span></span>
<span class="line"><span style="color:#E1E4E8;">        accessKey = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # ACM&amp;KMS的SecretKey，用于配置中心的鉴权。默认为空</span></span>
<span class="line"><span style="color:#E1E4E8;">        secretKey = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 是否开启kms，同时DataId必须以&quot;cipher-&quot;作为前缀才会启动加解密逻辑。kms可以参考文档：https://help.aliyun.com/product/28933.html</span></span>
<span class="line"><span style="color:#E1E4E8;">        openKMS = </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#6A737D;">        # 缓存service信息的目录。默认为./run/nacos/naming/cache</span></span>
<span class="line"><span style="color:#E1E4E8;">        cacheDir = </span><span style="color:#9ECBFF;">&quot;./run/nacos/naming/cache&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # Nacos服务端的API鉴权Username。默认为空</span></span>
<span class="line"><span style="color:#E1E4E8;">        username = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # Nacos服务端的API鉴权Password。默认为空</span></span>
<span class="line"><span style="color:#E1E4E8;">        password = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 日志存储路径。默认为./run/nacos/naming/log</span></span>
<span class="line"><span style="color:#E1E4E8;">        logDir = </span><span style="color:#9ECBFF;">&quot;./run/nacos/naming/log&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 日志输出级别，可选：debug、info、warn、error。默认为info</span></span>
<span class="line"><span style="color:#E1E4E8;">        logLevel = </span><span style="color:#9ECBFF;">&quot;info&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">network</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#B392F0;">network</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">ws</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">        [</span><span style="color:#B392F0;">network</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">ws</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">            # 服务器监听地址</span></span>
<span class="line"><span style="color:#E1E4E8;">            addr = </span><span style="color:#9ECBFF;">&quot;:3553&quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 客户端连接路径</span></span>
<span class="line"><span style="color:#E1E4E8;">            path = </span><span style="color:#9ECBFF;">&quot;/&quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 服务器最大连接数</span></span>
<span class="line"><span style="color:#E1E4E8;">            maxConnNum = </span><span style="color:#79B8FF;">5000</span></span>
<span class="line"><span style="color:#6A737D;">            # 秘钥文件</span></span>
<span class="line"><span style="color:#E1E4E8;">            keyFile = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 证书文件</span></span>
<span class="line"><span style="color:#E1E4E8;">            certFile = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 跨域检测，空数组时不允许任何连接升级成websocket，未设置此参数时允许所有的链接升级成websocket</span></span>
<span class="line"><span style="color:#E1E4E8;">            origins = [</span><span style="color:#9ECBFF;">&quot;*&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">            # 握手超时时间，支持单位：纳秒（ns）、微秒（us | µs）、毫秒（ms）、秒（s）、分（m）、小时（h）、天（d）。默认为10s</span></span>
<span class="line"><span style="color:#E1E4E8;">            handshakeTimeout = </span><span style="color:#9ECBFF;">&quot;10s&quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 心跳检测间隔时间。设置为0则不启用心跳检测，支持单位：纳秒（ns）、微秒（us | µs）、毫秒（ms）、秒（s）、分（m）、小时（h）、天（d）。默认为10s</span></span>
<span class="line"><span style="color:#E1E4E8;">            heartbeatInterval = </span><span style="color:#9ECBFF;">&quot;10s&quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 心跳机制，默认为resp响应式心跳。可选：resp 响应式心跳 | tick 定时主推心跳</span></span>
<span class="line"><span style="color:#E1E4E8;">            heartbeatMechanism = </span><span style="color:#9ECBFF;">&quot;resp&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        [</span><span style="color:#B392F0;">network</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">ws</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">client</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">            # 拨号地址</span></span>
<span class="line"><span style="color:#E1E4E8;">            url = </span><span style="color:#9ECBFF;">&quot;ws://127.0.0.1:3553&quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 握手超时时间，支持单位：纳秒（ns）、微秒（us | µs）、毫秒（ms）、秒（s）、分（m）、小时（h）、天（d）。默认为10s</span></span>
<span class="line"><span style="color:#E1E4E8;">            handshakeTimeout = </span><span style="color:#9ECBFF;">&quot;10s&quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 心跳间隔时间。设置为0则不启用心跳检测，支持单位：纳秒（ns）、微秒（us | µs）、毫秒（ms）、秒（s）、分（m）、小时（h）、天（d）。默认为10s</span></span>
<span class="line"><span style="color:#E1E4E8;">            heartbeatInterval = </span><span style="color:#9ECBFF;">&quot;10s&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#B392F0;">network</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">tcp</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">        [</span><span style="color:#B392F0;">network</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">tcp</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">            # 服务器监听地址</span></span>
<span class="line"><span style="color:#E1E4E8;">            addr = </span><span style="color:#9ECBFF;">&quot;:3553&quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 服务器最大连接数</span></span>
<span class="line"><span style="color:#E1E4E8;">            maxConnNum = </span><span style="color:#79B8FF;">5000</span></span>
<span class="line"><span style="color:#6A737D;">            # 心跳检测间隔时间（秒），默认为10秒。设置为0则不启用心跳检测</span></span>
<span class="line"><span style="color:#E1E4E8;">            heartbeatInterval = </span><span style="color:#79B8FF;">10</span></span>
<span class="line"><span style="color:#6A737D;">            # 心跳机制，默认resp</span></span>
<span class="line"><span style="color:#E1E4E8;">            heartbeatMechanism = </span><span style="color:#9ECBFF;">&quot;resp&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        [</span><span style="color:#B392F0;">network</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">tcp</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">client</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">            # 拨号地址</span></span>
<span class="line"><span style="color:#E1E4E8;">            addr = </span><span style="color:#9ECBFF;">&quot;127.0.0.1:3553&quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 拨号超时时间，默认5s</span></span>
<span class="line"><span style="color:#E1E4E8;">            timeout = </span><span style="color:#9ECBFF;">&quot;5s&quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 心跳间隔时间（秒），默认为10秒。设置为0则不启用心跳检测</span></span>
<span class="line"><span style="color:#E1E4E8;">            heartbeatInterval = </span><span style="color:#79B8FF;">10</span></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">locate</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#B392F0;">locate</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">redis</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">        # 客户端连接地址</span></span>
<span class="line"><span style="color:#E1E4E8;">        addrs = [</span><span style="color:#9ECBFF;">&quot;127.0.0.1:6379&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">        # 数据库号</span></span>
<span class="line"><span style="color:#E1E4E8;">        db = </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#6A737D;">        # 用户名</span></span>
<span class="line"><span style="color:#E1E4E8;">        username = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 密码</span></span>
<span class="line"><span style="color:#E1E4E8;">        password = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 最大重试次数</span></span>
<span class="line"><span style="color:#E1E4E8;">        maxRetries = </span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#6A737D;">        # key前缀</span></span>
<span class="line"><span style="color:#E1E4E8;">        prefix = </span><span style="color:#9ECBFF;">&quot;due&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">cache</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#B392F0;">cache</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">redis</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">        # 客户端连接地址</span></span>
<span class="line"><span style="color:#E1E4E8;">        addrs = [</span><span style="color:#9ECBFF;">&quot;127.0.0.1:6379&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">        # 数据库号</span></span>
<span class="line"><span style="color:#E1E4E8;">        db = </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#6A737D;">        # 用户名</span></span>
<span class="line"><span style="color:#E1E4E8;">        username = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 密码</span></span>
<span class="line"><span style="color:#E1E4E8;">        password = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 最大重试次数</span></span>
<span class="line"><span style="color:#E1E4E8;">        maxRetries = </span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#6A737D;">        # key前缀，默认为cache</span></span>
<span class="line"><span style="color:#E1E4E8;">        prefix = </span><span style="color:#9ECBFF;">&quot;cache&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 空值，默认为cache@nil</span></span>
<span class="line"><span style="color:#E1E4E8;">        nilValue = </span><span style="color:#9ECBFF;">&quot;cache@nil&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 空值过期时间，默认为10s</span></span>
<span class="line"><span style="color:#E1E4E8;">        nilExpiration = </span><span style="color:#9ECBFF;">&quot;10s&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 最小过期时间，默认为1h</span></span>
<span class="line"><span style="color:#E1E4E8;">        minExpiration = </span><span style="color:#9ECBFF;">&quot;1h&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 最大过期时间，默认为24h</span></span>
<span class="line"><span style="color:#E1E4E8;">        maxExpiration = </span><span style="color:#9ECBFF;">&quot;24h&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">crypto</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">    # RSA设置</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#B392F0;">crypto</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">rsa</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">        [</span><span style="color:#B392F0;">crypto</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">rsa</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">encryptor</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">            # hash算法，不区分大小写。可选：SHA1 | SHA224 | SHA256 | SHA384 | SHA512</span></span>
<span class="line"><span style="color:#E1E4E8;">            hash = </span><span style="color:#9ECBFF;">&quot;SHA256&quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 填充规则，不区分大小写。可选：NORMAL | OAEP</span></span>
<span class="line"><span style="color:#E1E4E8;">            padding = </span><span style="color:#9ECBFF;">&quot;NORMAL&quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 标签，加解密时必需一致</span></span>
<span class="line"><span style="color:#E1E4E8;">            label = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 加密数据块大小，单位字节。由于加密数据长度限制，需要对加密数据进行分块儿加密</span></span>
<span class="line"><span style="color:#E1E4E8;">            blockSize = </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#6A737D;">            # 公钥，可设置文件路径或公钥串</span></span>
<span class="line"><span style="color:#E1E4E8;">            publicKey = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        [</span><span style="color:#B392F0;">crypto</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">rsa</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">decryptor</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">            # hash算法，不区分大小写。可选：SHA1 | SHA224 | SHA256 | SHA384 | SHA512</span></span>
<span class="line"><span style="color:#E1E4E8;">            hash = </span><span style="color:#9ECBFF;">&quot;SHA256&quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 填充规则，不区分大小写。可选：NORMAL | OAEP</span></span>
<span class="line"><span style="color:#E1E4E8;">            padding = </span><span style="color:#9ECBFF;">&quot;NORMAL&quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 标签。加解密时必需一致</span></span>
<span class="line"><span style="color:#E1E4E8;">            label = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 私钥。可设置文件路径或私钥串</span></span>
<span class="line"><span style="color:#E1E4E8;">            privateKey = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        [</span><span style="color:#B392F0;">crypto</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">rsa</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">signer</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">            # hash算法，不区分大小写。可选：SHA1 | SHA224 | SHA256 | SHA384 | SHA512</span></span>
<span class="line"><span style="color:#E1E4E8;">            hash = </span><span style="color:#9ECBFF;">&quot;SHA256&quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 填充规则，不区分大小写。可选：PKCS | PSS</span></span>
<span class="line"><span style="color:#E1E4E8;">            padding = </span><span style="color:#9ECBFF;">&quot;PSS&quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 私钥。可设置文件路径或私钥串</span></span>
<span class="line"><span style="color:#E1E4E8;">            privateKey = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        [</span><span style="color:#B392F0;">crypto</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">rsa</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">verifier</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">            # hash算法，不区分大小写。可选：SHA1 | SHA224 | SHA256 | SHA384 | SHA512</span></span>
<span class="line"><span style="color:#E1E4E8;">            hash = </span><span style="color:#9ECBFF;">&quot;SHA256&quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 填充规则，不区分大小写。可选：PKCS | PSS</span></span>
<span class="line"><span style="color:#E1E4E8;">            padding = </span><span style="color:#9ECBFF;">&quot;PSS&quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 公钥，可设置文件路径或公钥串</span></span>
<span class="line"><span style="color:#E1E4E8;">            publicKey = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # ECC设置</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#B392F0;">crypto</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">ecc</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">        [</span><span style="color:#B392F0;">crypto</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">ecc</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">encryptor</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">            # 共享信息。加解密时必需一致</span></span>
<span class="line"><span style="color:#E1E4E8;">            s1 = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 共享信息。加解密时必需一致</span></span>
<span class="line"><span style="color:#E1E4E8;">            s2 = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 公钥，可设置文件路径或公钥串</span></span>
<span class="line"><span style="color:#E1E4E8;">            publicKey = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        [</span><span style="color:#B392F0;">crypto</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">ecc</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">decryptor</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">            # 共享信息。加解密时必需一致</span></span>
<span class="line"><span style="color:#E1E4E8;">            s1 = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 共享信息。加解密时必需一致</span></span>
<span class="line"><span style="color:#E1E4E8;">            s2 = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 私钥。可设置文件路径或私钥串</span></span>
<span class="line"><span style="color:#E1E4E8;">            privateKey = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        [</span><span style="color:#B392F0;">crypto</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">ecc</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">signer</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">            # hash算法，不区分大小写。可选：SHA1 | SHA224 | SHA256 | SHA384 | SHA512</span></span>
<span class="line"><span style="color:#E1E4E8;">            hash = </span><span style="color:#9ECBFF;">&quot;SHA256&quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 签名分隔符。由于ECDSA签名算法会产生两段签名串，因此需要通过分隔符将其拼接为一个签名</span></span>
<span class="line"><span style="color:#E1E4E8;">            delimiter = </span><span style="color:#9ECBFF;">&quot; &quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 私钥。可设置文件路径或私钥串</span></span>
<span class="line"><span style="color:#E1E4E8;">            privateKey = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        [</span><span style="color:#B392F0;">crypto</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">ecc</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">verifier</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">            # hash算法，不区分大小写。可选：SHA1 | SHA224 | SHA256 | SHA384 | SHA512</span></span>
<span class="line"><span style="color:#E1E4E8;">            hash = </span><span style="color:#9ECBFF;">&quot;SHA256&quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 签名分隔符。由于ECDSA签名算法会产生两段签名串，因此需要通过分隔符将其拼接为一个签名</span></span>
<span class="line"><span style="color:#E1E4E8;">            delimiter = </span><span style="color:#9ECBFF;">&quot; &quot;</span></span>
<span class="line"><span style="color:#6A737D;">            # 公钥，可设置文件路径或公钥串</span></span>
<span class="line"><span style="color:#E1E4E8;">            publicKey = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">eventbus</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#B392F0;">eventbus</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">nats</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">        # 客户端连接地址，默认为nats://127.0.0.1:4222</span></span>
<span class="line"><span style="color:#E1E4E8;">        url = </span><span style="color:#9ECBFF;">&quot;nats://127.0.0.1:4222&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 客户端连接超时时间，支持单位：纳秒（ns）、微秒（us | µs）、毫秒（ms）、秒（s）、分（m）、小时（h）、天（d）。默认为2s</span></span>
<span class="line"><span style="color:#E1E4E8;">        timeout = </span><span style="color:#9ECBFF;">&quot;2s&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#B392F0;">eventbus</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">redis</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">        # 客户端连接地址</span></span>
<span class="line"><span style="color:#E1E4E8;">        addrs = [</span><span style="color:#9ECBFF;">&quot;127.0.0.1:6379&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">        # 数据库号</span></span>
<span class="line"><span style="color:#E1E4E8;">        db = </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#6A737D;">        # 用户名</span></span>
<span class="line"><span style="color:#E1E4E8;">        username = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 密码</span></span>
<span class="line"><span style="color:#E1E4E8;">        password = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">        # 最大重试次数</span></span>
<span class="line"><span style="color:#E1E4E8;">        maxRetries = </span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#6A737D;">        # key前缀</span></span>
<span class="line"><span style="color:#E1E4E8;">        prefix = </span><span style="color:#9ECBFF;">&quot;due&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#B392F0;">eventbus</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">kafka</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">        # 客户端连接地址</span></span>
<span class="line"><span style="color:#E1E4E8;">        addrs = [</span><span style="color:#9ECBFF;">&quot;127.0.0.1:9092&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">        # Kafka版本，默认为无版本</span></span>
<span class="line"><span style="color:#E1E4E8;">        version = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span></code></pre></div>`,28))])}const D=l(E,[["render",y]]);export{d as __pageData,D as default};
