import{_ as l,C as o,c as p,o as e,a as n,q as t,b as c,m as r}from"./chunks/framework.BSdOUgs7.js";const d=JSON.parse('{"title":"配置中心","description":"","frontmatter":{},"headers":[{"level":2,"title":"基本介绍","slug":"config-introduction","link":"#config-introduction","children":[]},{"level":2,"title":"支持格式","slug":"config-format","link":"#config-format","children":[]},{"level":2,"title":"读写规则","slug":"config-read-write-rule","link":"#config-read-write-rule","children":[]},{"level":2,"title":"相关接口","slug":"config-interface","link":"#config-interface","children":[]},{"level":2,"title":"自定义配置源","slug":"config-custom-source","link":"#config-custom-source","children":[]},{"level":2,"title":"文件配置源示例","slug":"config-file-example","link":"#config-file-example","children":[]},{"level":2,"title":"consul配置源示例","slug":"config-consul-example","link":"#config-consul-example","children":[]},{"level":2,"title":"etcd配置源示例","slug":"config-etcd-example","link":"#config-etcd-example","children":[]},{"level":2,"title":"nacos配置源示例","slug":"config-nacos-example","link":"#config-nacos-example","children":[]},{"level":2,"title":"自定义配置源示例","slug":"config-custom-example","link":"#config-custom-example","children":[]},{"level":2,"title":"启动配置","slug":"config-etc","link":"#config-etc","children":[]}],"relativePath":"guide/config.md","filePath":"guide/config.md"}'),E={name:"guide/config.md"};function y(i,s,F,u,B,g){const a=o("TextAd");return e(),p("div",null,[s[0]||(s[0]=n("h1",{id:"config",tabindex:"-1"},[r("配置中心 "),n("a",{class:"header-anchor",href:"#config","aria-label":'Permalink to "配置中心 {#config}"'},"​")],-1)),t(a),s[1]||(s[1]=c(`<h2 id="config-introduction" tabindex="-1">基本介绍 <a class="header-anchor" href="#config-introduction" aria-label="Permalink to &quot;基本介绍 {#config-introduction}&quot;">​</a></h2><p>配置中心（config）区别于启动配置（etc）主要用于业务逻辑配置的读取、修改和监听。用法和启动配置（etc）完全一致，提供了 <a href="https://github.com/dobyte/due/tree/main/config/file" target="_blank" rel="noreferrer">file</a>、<a href="https://github.com/dobyte/due/tree/main/config/consul" target="_blank" rel="noreferrer">consul</a>、<a href="https://github.com/dobyte/due/tree/main/config/etcd" target="_blank" rel="noreferrer">etcd</a>、<a href="https://github.com/dobyte/due/tree/main/config/nacos" target="_blank" rel="noreferrer">nacos</a> 等多种配置源方案。你可以根据自身业务特点选择不同的配置源，也可以同时组合使用多种配置源来构建自己的配置方案。</p><h2 id="config-format" tabindex="-1">支持格式 <a class="header-anchor" href="#config-format" aria-label="Permalink to &quot;支持格式 {#config-format}&quot;">​</a></h2><p>配置中心默认支持 <a href="https://toml.io/" target="_blank" rel="noreferrer">toml</a>、<a href="https://yaml.org/" target="_blank" rel="noreferrer">yaml</a>、<a href="https://www.json.org/" target="_blank" rel="noreferrer">json</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/XML/XML_introduction" target="_blank" rel="noreferrer">xml</a> 等多种文件格式。你可以根据自身喜好自由选择文件格式。</p><blockquote><p>注：yaml格式的配置支持.yaml和.yml两种后缀名</p></blockquote><h2 id="config-read-write-rule" tabindex="-1">读写规则 <a class="header-anchor" href="#config-read-write-rule" aria-label="Permalink to &quot;读写规则 {#config-read-write-rule}&quot;">​</a></h2><p>框架中的配置文件均是以 <strong>文件名[.参数名1[.参数名2...[.参数名n]]]</strong> 的方式进行读写的。</p><blockquote><p>注：例如a.b.c.d.toml这样的配置文件同样也是被支持的。读写时你只需要将a.b.c.d看成一个完整的文件名即可。</p></blockquote><h2 id="config-interface" tabindex="-1">相关接口 <a class="header-anchor" href="#config-interface" aria-label="Permalink to &quot;相关接口 {#config-interface}&quot;">​</a></h2><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#B392F0;">github.com/dobyte/due/v2/config</span></span></code></pre></div><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#6A737D;">// SetConfigurator 设置配置器</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> SetConfigurator</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">configurator</span><span style="color:#B392F0;"> Configurator</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// GetConfigurator 获取配置器</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> GetConfigurator</span><span style="color:#E1E4E8;">() </span><span style="color:#B392F0;">Configurator</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// SetConfiguratorWithSources 通过设置配置源来设置配置器</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> SetConfiguratorWithSources</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">sources</span><span style="color:#F97583;"> ...</span><span style="color:#B392F0;">Source</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Has 检测多个匹配规则中是否存在配置</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> Has</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">pattern</span><span style="color:#F97583;"> string</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">bool</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Get 获取配置值</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> Get</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">pattern</span><span style="color:#F97583;"> string</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">def</span><span style="color:#F97583;"> ...interface</span><span style="color:#E1E4E8;">{}) </span><span style="color:#B392F0;">value</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Value</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Set 设置配置值</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> Set</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">pattern</span><span style="color:#F97583;"> string</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">value</span><span style="color:#F97583;"> interface</span><span style="color:#E1E4E8;">{}) </span><span style="color:#F97583;">error</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Match 匹配多个规则</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> Match</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">patterns</span><span style="color:#F97583;"> ...</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">) </span><span style="color:#B392F0;">Matcher</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Watch 设置监听回调</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> Watch</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">cb</span><span style="color:#B392F0;"> WatchCallbackFunc</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">names</span><span style="color:#F97583;"> ...</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Load 加载配置项</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> Load</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">ctx</span><span style="color:#B392F0;"> context</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Context</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">source</span><span style="color:#F97583;"> string</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">file</span><span style="color:#F97583;"> ...</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">) ([]</span><span style="color:#F97583;">*</span><span style="color:#B392F0;">Configuration</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Store 保存配置项</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> Store</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">ctx</span><span style="color:#B392F0;"> context</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Context</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">source</span><span style="color:#F97583;"> string</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">file</span><span style="color:#F97583;"> string</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">content</span><span style="color:#F97583;"> interface</span><span style="color:#E1E4E8;">{}, </span><span style="color:#FFAB70;">override</span><span style="color:#F97583;"> ...bool</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">error</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Close 关闭配置监听</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> Close</span><span style="color:#E1E4E8;">()</span></span></code></pre></div><h2 id="config-custom-source" tabindex="-1">自定义配置源 <a class="header-anchor" href="#config-custom-source" aria-label="Permalink to &quot;自定义配置源 {#config-custom-source}&quot;">​</a></h2><p>如果你想使用其他的配置中心，<a href="https://github.com/dobyte/due" target="_blank" rel="noreferrer">due</a> 框架也提供相应的解决方案。你只需要实现以下配置源接口，然后通过config.SetConfigurator()设置一个新的附带自定义配置源的配置器，即可实现使用自定义配置了。</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">type</span><span style="color:#B392F0;"> Source</span><span style="color:#F97583;"> interface</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#6A737D;">	// Name 配置源名称</span></span>
<span class="line"><span style="color:#B392F0;">	Name</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">string</span></span>
<span class="line"><span style="color:#6A737D;">	// Load 加载配置项</span></span>
<span class="line"><span style="color:#B392F0;">	Load</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">ctx</span><span style="color:#B392F0;"> context</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Context</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">file</span><span style="color:#F97583;"> ...</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">) ([]</span><span style="color:#F97583;">*</span><span style="color:#B392F0;">Configuration</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#6A737D;">	// Store 保存配置项</span></span>
<span class="line"><span style="color:#B392F0;">	Store</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">ctx</span><span style="color:#B392F0;"> context</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Context</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">file</span><span style="color:#F97583;"> string</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">content</span><span style="color:#E1E4E8;"> []</span><span style="color:#F97583;">byte</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">error</span></span>
<span class="line"><span style="color:#6A737D;">	// Watch 监听配置项</span></span>
<span class="line"><span style="color:#B392F0;">	Watch</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">ctx</span><span style="color:#B392F0;"> context</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Context</span><span style="color:#E1E4E8;">) (</span><span style="color:#B392F0;">Watcher</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#6A737D;">	// Close 关闭配置源</span></span>
<span class="line"><span style="color:#B392F0;">	Close</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">error</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">type</span><span style="color:#B392F0;"> Watcher</span><span style="color:#F97583;"> interface</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#6A737D;">	// Next 返回配置列表</span></span>
<span class="line"><span style="color:#B392F0;">	Next</span><span style="color:#E1E4E8;">() ([]</span><span style="color:#F97583;">*</span><span style="color:#B392F0;">Configuration</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#6A737D;">	// Stop 停止监听</span></span>
<span class="line"><span style="color:#B392F0;">	Stop</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">error</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre></div><h2 id="config-file-example" tabindex="-1">文件配置源示例 <a class="header-anchor" href="#config-file-example" aria-label="Permalink to &quot;文件配置源示例 {#config-file-example}&quot;">​</a></h2><p>以下完整示例详见：<a href="https://github.com/dobyte/due-examples/tree/master/config/file" target="_blank" rel="noreferrer">file</a></p><p>创建config.toml配置文件</p><div class="language-toml"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#E1E4E8;">timezone = </span><span style="color:#9ECBFF;">&quot;UTC&quot;</span></span></code></pre></div><p>构建配置读写示例</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#B392F0;"> main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">context</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2/config</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2/config/file</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2/log</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">time</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#79B8FF;"> filename</span><span style="color:#F97583;"> =</span><span style="color:#9ECBFF;"> &quot;config.toml&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#6A737D;">	// 设置文件配置中心</span></span>
<span class="line"><span style="color:#E1E4E8;">	config.</span><span style="color:#B392F0;">SetConfigurator</span><span style="color:#E1E4E8;">(config.</span><span style="color:#B392F0;">NewConfigurator</span><span style="color:#E1E4E8;">(config.</span><span style="color:#B392F0;">WithSources</span><span style="color:#E1E4E8;">(file.</span><span style="color:#B392F0;">NewSource</span><span style="color:#E1E4E8;">())))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">	// 更新配置</span></span>
<span class="line"><span style="color:#F97583;">	if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> config.</span><span style="color:#B392F0;">Store</span><span style="color:#E1E4E8;">(context.</span><span style="color:#B392F0;">Background</span><span style="color:#E1E4E8;">(), file.Name, filename, </span><span style="color:#F97583;">map</span><span style="color:#E1E4E8;">[</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">]</span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;">{}{</span></span>
<span class="line"><span style="color:#9ECBFF;">		&quot;timezone&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Local&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	}); err </span><span style="color:#F97583;">!=</span><span style="color:#79B8FF;"> nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		log.</span><span style="color:#B392F0;">Errorf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;store config failed: </span><span style="color:#79B8FF;">%v</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, err)</span></span>
<span class="line"><span style="color:#F97583;">		return</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">	// 读取配置</span></span>
<span class="line"><span style="color:#E1E4E8;">	timezone </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> config.</span><span style="color:#B392F0;">Get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;config.timezone&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;UTC&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">	log.</span><span style="color:#B392F0;">Infof</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;timezone: </span><span style="color:#79B8FF;">%s</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, timezone)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">	// 更新配置</span></span>
<span class="line"><span style="color:#F97583;">	if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> config.</span><span style="color:#B392F0;">Store</span><span style="color:#E1E4E8;">(context.</span><span style="color:#B392F0;">Background</span><span style="color:#E1E4E8;">(), file.Name, filename, </span><span style="color:#F97583;">map</span><span style="color:#E1E4E8;">[</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">]</span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;">{}{</span></span>
<span class="line"><span style="color:#9ECBFF;">		&quot;timezone&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;UTC&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	}); err </span><span style="color:#F97583;">!=</span><span style="color:#79B8FF;"> nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		log.</span><span style="color:#B392F0;">Errorf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;store config failed: </span><span style="color:#79B8FF;">%v</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, err)</span></span>
<span class="line"><span style="color:#F97583;">		return</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">	// 读取配置</span></span>
<span class="line"><span style="color:#E1E4E8;">	timezone </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> config.</span><span style="color:#B392F0;">Get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;config.timezone&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;UTC&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">	log.</span><span style="color:#B392F0;">Infof</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;timezone: </span><span style="color:#79B8FF;">%s</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, timezone)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre></div><h2 id="config-consul-example" tabindex="-1">consul配置源示例 <a class="header-anchor" href="#config-consul-example" aria-label="Permalink to &quot;consul配置源示例 {#config-consul-example}&quot;">​</a></h2><p>以下完整示例详见：<a href="https://github.com/dobyte/due-examples/tree/master/config/consul" target="_blank" rel="noreferrer">consul</a></p><p>构建配置读写示例</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#B392F0;"> main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">context</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/config/consul/v2</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2/config</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2/log</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">time</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#79B8FF;"> filename</span><span style="color:#F97583;"> =</span><span style="color:#9ECBFF;"> &quot;config.toml&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#6A737D;">	// 设置consul配置中心</span></span>
<span class="line"><span style="color:#E1E4E8;">	config.</span><span style="color:#B392F0;">SetConfigurator</span><span style="color:#E1E4E8;">(config.</span><span style="color:#B392F0;">NewConfigurator</span><span style="color:#E1E4E8;">(config.</span><span style="color:#B392F0;">WithSources</span><span style="color:#E1E4E8;">(consul.</span><span style="color:#B392F0;">NewSource</span><span style="color:#E1E4E8;">())))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">	// 更新配置</span></span>
<span class="line"><span style="color:#F97583;">	if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> config.</span><span style="color:#B392F0;">Store</span><span style="color:#E1E4E8;">(context.</span><span style="color:#B392F0;">Background</span><span style="color:#E1E4E8;">(), consul.Name, filename, </span><span style="color:#F97583;">map</span><span style="color:#E1E4E8;">[</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">]</span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;">{}{</span></span>
<span class="line"><span style="color:#9ECBFF;">		&quot;timezone&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Local&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	}); err </span><span style="color:#F97583;">!=</span><span style="color:#79B8FF;"> nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		log.</span><span style="color:#B392F0;">Errorf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;store config failed: </span><span style="color:#79B8FF;">%v</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, err)</span></span>
<span class="line"><span style="color:#F97583;">		return</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">	// 读取配置</span></span>
<span class="line"><span style="color:#E1E4E8;">	timezone </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> config.</span><span style="color:#B392F0;">Get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;config.timezone&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;UTC&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">	log.</span><span style="color:#B392F0;">Infof</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;timezone: </span><span style="color:#79B8FF;">%s</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, timezone)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">	// 更新配置</span></span>
<span class="line"><span style="color:#F97583;">	if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> config.</span><span style="color:#B392F0;">Store</span><span style="color:#E1E4E8;">(context.</span><span style="color:#B392F0;">Background</span><span style="color:#E1E4E8;">(), consul.Name, filename, </span><span style="color:#F97583;">map</span><span style="color:#E1E4E8;">[</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">]</span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;">{}{</span></span>
<span class="line"><span style="color:#9ECBFF;">		&quot;timezone&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;UTC&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	}); err </span><span style="color:#F97583;">!=</span><span style="color:#79B8FF;"> nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		log.</span><span style="color:#B392F0;">Errorf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;store config failed: </span><span style="color:#79B8FF;">%v</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, err)</span></span>
<span class="line"><span style="color:#F97583;">		return</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">	// 读取配置</span></span>
<span class="line"><span style="color:#E1E4E8;">	timezone </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> config.</span><span style="color:#B392F0;">Get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;config.timezone&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;UTC&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">	log.</span><span style="color:#B392F0;">Infof</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;timezone: </span><span style="color:#79B8FF;">%s</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, timezone)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre></div><h2 id="config-etcd-example" tabindex="-1">etcd配置源示例 <a class="header-anchor" href="#config-etcd-example" aria-label="Permalink to &quot;etcd配置源示例 {#config-etcd-example}&quot;">​</a></h2><p>以下完整示例详见：<a href="https://github.com/dobyte/due-examples/tree/master/config/etcd" target="_blank" rel="noreferrer">etcd</a></p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#B392F0;"> main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">context</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/config/etcd/v2</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2/config</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2/log</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">time</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#79B8FF;"> filename</span><span style="color:#F97583;"> =</span><span style="color:#9ECBFF;"> &quot;config.toml&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#6A737D;">	// 设置etcd配置中心</span></span>
<span class="line"><span style="color:#E1E4E8;">	config.</span><span style="color:#B392F0;">SetConfigurator</span><span style="color:#E1E4E8;">(config.</span><span style="color:#B392F0;">NewConfigurator</span><span style="color:#E1E4E8;">(config.</span><span style="color:#B392F0;">WithSources</span><span style="color:#E1E4E8;">(etcd.</span><span style="color:#B392F0;">NewSource</span><span style="color:#E1E4E8;">())))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">	// 更新配置</span></span>
<span class="line"><span style="color:#F97583;">	if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> config.</span><span style="color:#B392F0;">Store</span><span style="color:#E1E4E8;">(context.</span><span style="color:#B392F0;">Background</span><span style="color:#E1E4E8;">(), etcd.Name, filename, </span><span style="color:#F97583;">map</span><span style="color:#E1E4E8;">[</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">]</span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;">{}{</span></span>
<span class="line"><span style="color:#9ECBFF;">		&quot;timezone&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Local&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	}); err </span><span style="color:#F97583;">!=</span><span style="color:#79B8FF;"> nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		log.</span><span style="color:#B392F0;">Errorf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;store config failed: </span><span style="color:#79B8FF;">%v</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, err)</span></span>
<span class="line"><span style="color:#F97583;">		return</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">	// 读取配置</span></span>
<span class="line"><span style="color:#E1E4E8;">	timezone </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> config.</span><span style="color:#B392F0;">Get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;config.timezone&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;UTC&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">	log.</span><span style="color:#B392F0;">Infof</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;timezone: </span><span style="color:#79B8FF;">%s</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, timezone)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">	// 更新配置</span></span>
<span class="line"><span style="color:#F97583;">	if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> config.</span><span style="color:#B392F0;">Store</span><span style="color:#E1E4E8;">(context.</span><span style="color:#B392F0;">Background</span><span style="color:#E1E4E8;">(), etcd.Name, filename, </span><span style="color:#F97583;">map</span><span style="color:#E1E4E8;">[</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">]</span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;">{}{</span></span>
<span class="line"><span style="color:#9ECBFF;">		&quot;timezone&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;UTC&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	}); err </span><span style="color:#F97583;">!=</span><span style="color:#79B8FF;"> nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		log.</span><span style="color:#B392F0;">Errorf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;store config failed: </span><span style="color:#79B8FF;">%v</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, err)</span></span>
<span class="line"><span style="color:#F97583;">		return</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">	// 读取配置</span></span>
<span class="line"><span style="color:#E1E4E8;">	timezone </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> config.</span><span style="color:#B392F0;">Get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;config.timezone&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;UTC&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">	log.</span><span style="color:#B392F0;">Infof</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;timezone: </span><span style="color:#79B8FF;">%s</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, timezone)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre></div><h2 id="config-nacos-example" tabindex="-1">nacos配置源示例 <a class="header-anchor" href="#config-nacos-example" aria-label="Permalink to &quot;nacos配置源示例 {#config-nacos-example}&quot;">​</a></h2><p>以下完整示例详见：<a href="https://github.com/dobyte/due-examples/tree/master/config/nacos" target="_blank" rel="noreferrer">nacos</a></p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#B392F0;"> main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">context</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/config/nacos/v2</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2/config</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2/log</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#79B8FF;"> filename</span><span style="color:#F97583;"> =</span><span style="color:#9ECBFF;"> &quot;config.toml&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#6A737D;">	// 设置文件配置中心</span></span>
<span class="line"><span style="color:#E1E4E8;">	config.</span><span style="color:#B392F0;">SetConfigurator</span><span style="color:#E1E4E8;">(config.</span><span style="color:#B392F0;">NewConfigurator</span><span style="color:#E1E4E8;">(config.</span><span style="color:#B392F0;">WithSources</span><span style="color:#E1E4E8;">(nacos.</span><span style="color:#B392F0;">NewSource</span><span style="color:#E1E4E8;">())))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">	// 更新配置</span></span>
<span class="line"><span style="color:#F97583;">	if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> config.</span><span style="color:#B392F0;">Store</span><span style="color:#E1E4E8;">(context.</span><span style="color:#B392F0;">Background</span><span style="color:#E1E4E8;">(), nacos.Name, filename, </span><span style="color:#F97583;">map</span><span style="color:#E1E4E8;">[</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">]</span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;">{}{</span></span>
<span class="line"><span style="color:#9ECBFF;">		&quot;timezone&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Local&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	}); err </span><span style="color:#F97583;">!=</span><span style="color:#79B8FF;"> nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		log.</span><span style="color:#B392F0;">Errorf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;store config failed: </span><span style="color:#79B8FF;">%v</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, err)</span></span>
<span class="line"><span style="color:#F97583;">		return</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">	// 读取配置</span></span>
<span class="line"><span style="color:#E1E4E8;">	timezone </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> config.</span><span style="color:#B392F0;">Get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;config.timezone&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;UTC&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">	log.</span><span style="color:#B392F0;">Infof</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;timezone: </span><span style="color:#79B8FF;">%s</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, timezone)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">	// 更新配置</span></span>
<span class="line"><span style="color:#F97583;">	if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> config.</span><span style="color:#B392F0;">Store</span><span style="color:#E1E4E8;">(context.</span><span style="color:#B392F0;">Background</span><span style="color:#E1E4E8;">(), nacos.Name, filename, </span><span style="color:#F97583;">map</span><span style="color:#E1E4E8;">[</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">]</span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;">{}{</span></span>
<span class="line"><span style="color:#9ECBFF;">		&quot;timezone&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;UTC&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	}); err </span><span style="color:#F97583;">!=</span><span style="color:#79B8FF;"> nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		log.</span><span style="color:#B392F0;">Errorf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;store config failed: </span><span style="color:#79B8FF;">%v</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, err)</span></span>
<span class="line"><span style="color:#F97583;">		return</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">	// 读取配置</span></span>
<span class="line"><span style="color:#E1E4E8;">	timezone </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> config.</span><span style="color:#B392F0;">Get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;config.timezone&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;UTC&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">	log.</span><span style="color:#B392F0;">Infof</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;timezone: </span><span style="color:#79B8FF;">%s</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, timezone)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre></div><h2 id="config-custom-example" tabindex="-1">自定义配置源示例 <a class="header-anchor" href="#config-custom-example" aria-label="Permalink to &quot;自定义配置源示例 {#config-custom-example}&quot;">​</a></h2><p>以下完整示例详见：<a href="https://github.com/dobyte/due-examples/tree/master/config/custom" target="_blank" rel="noreferrer">custom</a></p><p>创建自定义的Zookeeper源</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#B392F0;"> zookeeper</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">context</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2/config</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#79B8FF;"> Name</span><span style="color:#F97583;"> =</span><span style="color:#9ECBFF;"> &quot;zookeeper&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">type</span><span style="color:#B392F0;"> Source</span><span style="color:#F97583;"> struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> NewSource</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">*</span><span style="color:#B392F0;">Source</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#F97583;">	return</span><span style="color:#F97583;"> &amp;</span><span style="color:#B392F0;">Source</span><span style="color:#E1E4E8;">{}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Name 配置源名称</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">s </span><span style="color:#F97583;">*</span><span style="color:#B392F0;">Source</span><span style="color:#E1E4E8;">) </span><span style="color:#B392F0;">Name</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#F97583;">	return</span><span style="color:#E1E4E8;"> Name</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Load 加载配置项</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">s </span><span style="color:#F97583;">*</span><span style="color:#B392F0;">Source</span><span style="color:#E1E4E8;">) </span><span style="color:#B392F0;">Load</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">ctx</span><span style="color:#B392F0;"> context</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Context</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">file</span><span style="color:#F97583;"> ...</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">) ([]</span><span style="color:#F97583;">*</span><span style="color:#B392F0;">config</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Configuration</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#F97583;">	return</span><span style="color:#79B8FF;"> nil</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">nil</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Store 保存配置项</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">s </span><span style="color:#F97583;">*</span><span style="color:#B392F0;">Source</span><span style="color:#E1E4E8;">) </span><span style="color:#B392F0;">Store</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">ctx</span><span style="color:#B392F0;"> context</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Context</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">file</span><span style="color:#F97583;"> string</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">content</span><span style="color:#E1E4E8;"> []</span><span style="color:#F97583;">byte</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#F97583;">	return</span><span style="color:#79B8FF;"> nil</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Watch 监听配置项</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">s </span><span style="color:#F97583;">*</span><span style="color:#B392F0;">Source</span><span style="color:#E1E4E8;">) </span><span style="color:#B392F0;">Watch</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">ctx</span><span style="color:#B392F0;"> context</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Context</span><span style="color:#E1E4E8;">) (</span><span style="color:#B392F0;">config</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Watcher</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#F97583;">	return</span><span style="color:#F97583;"> &amp;</span><span style="color:#B392F0;">Watcher</span><span style="color:#E1E4E8;">{}, </span><span style="color:#79B8FF;">nil</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Close 关闭配置源</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">s </span><span style="color:#F97583;">*</span><span style="color:#B392F0;">Source</span><span style="color:#E1E4E8;">) </span><span style="color:#B392F0;">Close</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#F97583;">	return</span><span style="color:#79B8FF;"> nil</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">type</span><span style="color:#B392F0;"> Watcher</span><span style="color:#F97583;"> struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Next 返回配置列表</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">w </span><span style="color:#F97583;">*</span><span style="color:#B392F0;">Watcher</span><span style="color:#E1E4E8;">) </span><span style="color:#B392F0;">Next</span><span style="color:#E1E4E8;">() ([]</span><span style="color:#F97583;">*</span><span style="color:#B392F0;">config</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Configuration</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#F97583;">	return</span><span style="color:#79B8FF;"> nil</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">nil</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Stop 停止监听</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">w </span><span style="color:#F97583;">*</span><span style="color:#B392F0;">Watcher</span><span style="color:#E1E4E8;">) </span><span style="color:#B392F0;">Stop</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#F97583;">	return</span><span style="color:#79B8FF;"> nil</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre></div><p>使用自定义的Zookeeper配置源</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#B392F0;"> main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">context</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">due-examples/config/custom/zookeeper</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2/config</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2/log</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#79B8FF;"> filename</span><span style="color:#F97583;"> =</span><span style="color:#9ECBFF;"> &quot;config.toml&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#6A737D;">	// 设置zookeeper配置源</span></span>
<span class="line"><span style="color:#E1E4E8;">	config.</span><span style="color:#B392F0;">SetConfigurator</span><span style="color:#E1E4E8;">(config.</span><span style="color:#B392F0;">NewConfigurator</span><span style="color:#E1E4E8;">(config.</span><span style="color:#B392F0;">WithSources</span><span style="color:#E1E4E8;">(zookeeper.</span><span style="color:#B392F0;">NewSource</span><span style="color:#E1E4E8;">())))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">	// 更新配置</span></span>
<span class="line"><span style="color:#F97583;">	if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> config.</span><span style="color:#B392F0;">Store</span><span style="color:#E1E4E8;">(context.</span><span style="color:#B392F0;">Background</span><span style="color:#E1E4E8;">(), zookeeper.Name, filename, </span><span style="color:#F97583;">map</span><span style="color:#E1E4E8;">[</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">]</span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;">{}{</span></span>
<span class="line"><span style="color:#9ECBFF;">		&quot;timezone&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Local&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	}); err </span><span style="color:#F97583;">!=</span><span style="color:#79B8FF;"> nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		log.</span><span style="color:#B392F0;">Errorf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;store config failed: </span><span style="color:#79B8FF;">%v</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, err)</span></span>
<span class="line"><span style="color:#F97583;">		return</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">	// 读取配置</span></span>
<span class="line"><span style="color:#E1E4E8;">	timezone </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> config.</span><span style="color:#B392F0;">Get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;config.timezone&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;UTC&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">	log.</span><span style="color:#B392F0;">Infof</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;timezone: </span><span style="color:#79B8FF;">%s</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, timezone)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">	// 更新配置</span></span>
<span class="line"><span style="color:#F97583;">	if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> config.</span><span style="color:#B392F0;">Store</span><span style="color:#E1E4E8;">(context.</span><span style="color:#B392F0;">Background</span><span style="color:#E1E4E8;">(), zookeeper.Name, filename, </span><span style="color:#F97583;">map</span><span style="color:#E1E4E8;">[</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">]</span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;">{}{</span></span>
<span class="line"><span style="color:#9ECBFF;">		&quot;timezone&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;UTC&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	}); err </span><span style="color:#F97583;">!=</span><span style="color:#79B8FF;"> nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		log.</span><span style="color:#B392F0;">Errorf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;store config failed: </span><span style="color:#79B8FF;">%v</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, err)</span></span>
<span class="line"><span style="color:#F97583;">		return</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">	// 读取配置</span></span>
<span class="line"><span style="color:#E1E4E8;">	timezone </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> config.</span><span style="color:#B392F0;">Get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;config.timezone&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;UTC&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">	log.</span><span style="color:#B392F0;">Infof</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;timezone: </span><span style="color:#79B8FF;">%s</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, timezone)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre></div><h2 id="config-etc" tabindex="-1">启动配置 <a class="header-anchor" href="#config-etc" aria-label="Permalink to &quot;启动配置 {#config-etc}&quot;">​</a></h2><p>这里仅展示配置中心（config）相关配置参数，如需了解更多模块的参数配置，请查看<a href="/guide/etc.html">启动配置</a></p><div class="language-toml"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#6A737D;"># 配置中心</span></span>
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
<span class="line"><span style="color:#E1E4E8;">        logLevel = </span><span style="color:#9ECBFF;">&quot;info&quot;</span></span></code></pre></div>`,39))])}const m=l(E,[["render",y]]);export{d as __pageData,m as default};
