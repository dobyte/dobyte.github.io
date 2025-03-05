import{_ as l,C as p,c as o,o as e,a as n,q as t,b as c,m as r}from"./chunks/framework.BSdOUgs7.js";const g=JSON.parse('{"title":"网格服务器","description":"","frontmatter":{},"headers":[{"level":2,"title":"基础介绍","slug":"mesh-introduction","link":"#mesh-introduction","children":[]},{"level":2,"title":"GRPC示例","slug":"mesh-grpc-example","link":"#mesh-grpc-example","children":[]},{"level":2,"title":"RPCX示例","slug":"mesh-rpcx-example","link":"#mesh-rpcx-example","children":[]},{"level":2,"title":"启动服务","slug":"mesh-start","link":"#mesh-start","children":[]},{"level":2,"title":"启动配置","slug":"启动配置","link":"#启动配置","children":[]}],"relativePath":"guide/mesh.md","filePath":"guide/mesh.md"}'),E={name:"guide/mesh.md"};function y(F,s,i,B,u,d){const a=p("TextAd");return e(),o("div",null,[s[0]||(s[0]=n("h1",{id:"mesh",tabindex:"-1"},[r("网格服务器 "),n("a",{class:"header-anchor",href:"#mesh","aria-label":'Permalink to "网格服务器 {#mesh}"'},"​")],-1)),t(a),s[1]||(s[1]=c(`<h2 id="mesh-introduction" tabindex="-1">基础介绍 <a class="header-anchor" href="#mesh-introduction" aria-label="Permalink to &quot;基础介绍 {#mesh-introduction}&quot;">​</a></h2><p>网格服（mesh）其实就是我们日常口中所说的微服务（Micro Service），主要用于构建一些无状态的业务逻辑开发。开发者可用于游戏服务器集群的中台开发，为集群中的其他服务提供数据业务支撑。</p><p><a href="https://github.com/dobyte/due" target="_blank" rel="noreferrer">due</a> 框架目前已实现了 <a href="https://grpc.io/" target="_blank" rel="noreferrer">GRPC</a> 和 <a href="https://rpcx.io/" target="_blank" rel="noreferrer">RPCX</a> 两款主流RPC框架的接入。所有的开发方式和接入方式都保持了原有RPC框架的高度一致性，这样在保证用户开发习惯的同时可以极大地保证项目的稳定性。</p><h2 id="mesh-grpc-example" tabindex="-1">GRPC示例 <a class="header-anchor" href="#mesh-grpc-example" aria-label="Permalink to &quot;GRPC示例 {#mesh-grpc-example}&quot;">​</a></h2><p>以下完整示例详见：<a href="https://github.com/dobyte/due-examples/tree/master/cluster/service" target="_blank" rel="noreferrer">service</a></p><p>创建PB协议文件</p><div class="language-proto"><button title="Copy Code" class="copy"></button><span class="lang">proto</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">syntax</span><span style="color:#F97583;"> =</span><span style="color:#9ECBFF;"> &quot;proto3&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">option</span><span style="color:#79B8FF;"> go_package</span><span style="color:#F97583;"> =</span><span style="color:#9ECBFF;"> &quot;./pb&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">package</span><span style="color:#9ECBFF;"> pb</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">service</span><span style="color:#B392F0;"> Greeter</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#F97583;">  rpc</span><span style="color:#B392F0;"> Hello</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">HelloArgs</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">returns</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">HelloReply</span><span style="color:#E1E4E8;">) {}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">message</span><span style="color:#B392F0;"> HelloArgs</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#F97583;">  string</span><span style="color:#E1E4E8;"> Name </span><span style="color:#F97583;">=</span><span style="color:#79B8FF;"> 1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">message</span><span style="color:#B392F0;"> HelloReply</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#F97583;">  string</span><span style="color:#E1E4E8;"> Message </span><span style="color:#F97583;">=</span><span style="color:#79B8FF;"> 1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre></div><p>生成go文件</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#B392F0;">protoc</span><span style="color:#79B8FF;"> --go_out=..</span><span style="color:#79B8FF;"> --go-grpc_out=..</span><span style="color:#79B8FF;"> *</span><span style="color:#9ECBFF;">.proto</span></span></code></pre></div><p>构建服务端逻辑</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#B392F0;"> server</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">context</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">due-examples/cluster/service/internal/service/grpc/greeter/pb</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2/cluster/mesh</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">type</span><span style="color:#B392F0;"> Server</span><span style="color:#F97583;"> struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#B392F0;">	pb</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">UnimplementedGreeterServer</span></span>
<span class="line"><span style="color:#E1E4E8;">	proxy </span><span style="color:#F97583;">*</span><span style="color:#B392F0;">mesh</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Proxy</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> _ </span><span style="color:#B392F0;">pb</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">GreeterServer</span><span style="color:#F97583;"> =</span><span style="color:#F97583;"> &amp;</span><span style="color:#B392F0;">Server</span><span style="color:#E1E4E8;">{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> NewServer</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">proxy</span><span style="color:#F97583;"> *</span><span style="color:#B392F0;">mesh</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">*</span><span style="color:#B392F0;">Server</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#F97583;">	return</span><span style="color:#F97583;"> &amp;</span><span style="color:#B392F0;">Server</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">		proxy: proxy,</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">s </span><span style="color:#F97583;">*</span><span style="color:#B392F0;">Server</span><span style="color:#E1E4E8;">) </span><span style="color:#B392F0;">Init</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	s.proxy.</span><span style="color:#B392F0;">AddServiceProvider</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;greeter&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">pb.Greeter_ServiceDesc, s)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">s </span><span style="color:#F97583;">*</span><span style="color:#B392F0;">Server</span><span style="color:#E1E4E8;">) </span><span style="color:#B392F0;">Hello</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">_</span><span style="color:#B392F0;"> context</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Context</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">args</span><span style="color:#F97583;"> *</span><span style="color:#B392F0;">pb</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">HelloArgs</span><span style="color:#E1E4E8;">) (</span><span style="color:#F97583;">*</span><span style="color:#B392F0;">pb</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">HelloReply</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#F97583;">	return</span><span style="color:#F97583;"> &amp;</span><span style="color:#B392F0;">pb</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">HelloReply</span><span style="color:#E1E4E8;">{Message: </span><span style="color:#9ECBFF;">&quot;Hello &quot;</span><span style="color:#F97583;"> +</span><span style="color:#E1E4E8;"> args.Name}, </span><span style="color:#79B8FF;">nil</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre></div><p>构建调用客户端</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#B392F0;"> client</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">due-examples/cluster/service/internal/service/grpc/greeter/pb</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2/transport</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">google.golang.org/grpc</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#79B8FF;"> target</span><span style="color:#F97583;"> =</span><span style="color:#9ECBFF;"> &quot;discovery://greeter&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> NewClient</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">fn</span><span style="color:#B392F0;"> transport</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">NewMeshClient</span><span style="color:#E1E4E8;">) (</span><span style="color:#B392F0;">pb</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">GreeterClient</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	client, err </span><span style="color:#F97583;">:=</span><span style="color:#B392F0;"> fn</span><span style="color:#E1E4E8;">(target)</span></span>
<span class="line"><span style="color:#F97583;">	if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#79B8FF;"> nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#F97583;">		return</span><span style="color:#79B8FF;"> nil</span><span style="color:#E1E4E8;">, err</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">	return</span><span style="color:#E1E4E8;"> pb.</span><span style="color:#B392F0;">NewGreeterClient</span><span style="color:#E1E4E8;">(client.</span><span style="color:#B392F0;">Client</span><span style="color:#E1E4E8;">().(</span><span style="color:#B392F0;">grpc</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">ClientConnInterface</span><span style="color:#E1E4E8;">)), </span><span style="color:#79B8FF;">nil</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre></div><p>构建网格服务器</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#B392F0;"> main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">due-examples/cluster/service/internal/service/grpc/greeter/server</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/locate/redis/v2</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/registry/consul/v2</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/transport/grpc/v2</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2/cluster/mesh</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#6A737D;">	// 创建容器</span></span>
<span class="line"><span style="color:#E1E4E8;">	container </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> due.</span><span style="color:#B392F0;">NewContainer</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#6A737D;">	// 创建用户定位器</span></span>
<span class="line"><span style="color:#E1E4E8;">	locator </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> redis.</span><span style="color:#B392F0;">NewLocator</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#6A737D;">	// 创建服务发现</span></span>
<span class="line"><span style="color:#E1E4E8;">	registry </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> consul.</span><span style="color:#B392F0;">NewRegistry</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#6A737D;">	// 创建RPC传输器</span></span>
<span class="line"><span style="color:#E1E4E8;">	transporter </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> grpc.</span><span style="color:#B392F0;">NewTransporter</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#6A737D;">	// 创建网格组件</span></span>
<span class="line"><span style="color:#E1E4E8;">	component </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> mesh.</span><span style="color:#B392F0;">NewMesh</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">		mesh.</span><span style="color:#B392F0;">WithLocator</span><span style="color:#E1E4E8;">(locator),</span></span>
<span class="line"><span style="color:#E1E4E8;">		mesh.</span><span style="color:#B392F0;">WithRegistry</span><span style="color:#E1E4E8;">(registry),</span></span>
<span class="line"><span style="color:#E1E4E8;">		mesh.</span><span style="color:#B392F0;">WithTransporter</span><span style="color:#E1E4E8;">(transporter),</span></span>
<span class="line"><span style="color:#E1E4E8;">	)</span></span>
<span class="line"><span style="color:#6A737D;">	// 初始化应用</span></span>
<span class="line"><span style="color:#B392F0;">	initGRPCServer</span><span style="color:#E1E4E8;">(component.</span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#6A737D;">	// 添加网格组件</span></span>
<span class="line"><span style="color:#E1E4E8;">	container.</span><span style="color:#B392F0;">Add</span><span style="color:#E1E4E8;">(component)</span></span>
<span class="line"><span style="color:#6A737D;">	// 启动容器</span></span>
<span class="line"><span style="color:#E1E4E8;">	container.</span><span style="color:#B392F0;">Serve</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 初始化应用</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> initGRPCServer</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">proxy</span><span style="color:#F97583;"> *</span><span style="color:#B392F0;">mesh</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	server.</span><span style="color:#B392F0;">NewServer</span><span style="color:#E1E4E8;">(proxy).</span><span style="color:#B392F0;">Init</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre></div><p>调用方示例</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#6A737D;">// 构建客户端</span></span>
<span class="line"><span style="color:#E1E4E8;">cli, err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> client.</span><span style="color:#B392F0;">NewClient</span><span style="color:#E1E4E8;">(proxy.NewMeshClient)</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#79B8FF;"> nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  log.</span><span style="color:#B392F0;">Errorf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;create rpc client failed: </span><span style="color:#79B8FF;">%v</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, err)</span></span>
<span class="line"><span style="color:#F97583;">  return</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 发起RPC调用</span></span>
<span class="line"><span style="color:#E1E4E8;">reply, err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> cli.</span><span style="color:#B392F0;">Hello</span><span style="color:#E1E4E8;">(ctx.</span><span style="color:#B392F0;">Context</span><span style="color:#E1E4E8;">(), </span><span style="color:#F97583;">&amp;</span><span style="color:#B392F0;">pb</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">HelloArgs</span><span style="color:#E1E4E8;">{Name: req.Name})</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#79B8FF;"> nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  log.</span><span style="color:#B392F0;">Errorf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;invoke rpc func failed: </span><span style="color:#79B8FF;">%v</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, err)</span></span>
<span class="line"><span style="color:#F97583;">  return</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">log.</span><span style="color:#B392F0;">Infof</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;invoke rpc func replay: </span><span style="color:#79B8FF;">%v</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, reply)</span></span></code></pre></div><p>也可通过ctx.NewMeshClient来创建RPC客户端</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#6A737D;">// 构建客户端</span></span>
<span class="line"><span style="color:#E1E4E8;">cli, _ </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> client.</span><span style="color:#B392F0;">NewClient</span><span style="color:#E1E4E8;">(ctx.NewMeshClient)</span></span></code></pre></div><p>如果你的调用方压根不在节点服（node）、网格服（mesh）、Web服（http）中，你也可以通过直接构建传输器来实现调用</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#6A737D;">// 创建服务发现</span></span>
<span class="line"><span style="color:#E1E4E8;">registry </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> consul.</span><span style="color:#B392F0;">NewRegistry</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#6A737D;">// 构建传输器</span></span>
<span class="line"><span style="color:#E1E4E8;">transporter </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> rpcx.</span><span style="color:#B392F0;">NewTransporter</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#6A737D;">// 设置默认的服务发现组件</span></span>
<span class="line"><span style="color:#E1E4E8;">transporter.</span><span style="color:#B392F0;">SetDefaultDiscovery</span><span style="color:#E1E4E8;">(registry)</span></span>
<span class="line"><span style="color:#6A737D;">// 构建客户端</span></span>
<span class="line"><span style="color:#E1E4E8;">cli, _ </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> client.</span><span style="color:#B392F0;">NewClient</span><span style="color:#E1E4E8;">(transporter.NewClient)</span></span></code></pre></div><h2 id="mesh-rpcx-example" tabindex="-1">RPCX示例 <a class="header-anchor" href="#mesh-rpcx-example" aria-label="Permalink to &quot;RPCX示例 {#mesh-rpcx-example}&quot;">​</a></h2><p>以下完整示例详见：<a href="https://github.com/dobyte/due-examples/tree/master/cluster/service" target="_blank" rel="noreferrer">service</a></p><p>创建PB协议文件</p><div class="language-proto"><button title="Copy Code" class="copy"></button><span class="lang">proto</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">syntax</span><span style="color:#F97583;"> =</span><span style="color:#9ECBFF;"> &quot;proto3&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">option</span><span style="color:#79B8FF;"> go_package</span><span style="color:#F97583;"> =</span><span style="color:#9ECBFF;"> &quot;./pb&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">package</span><span style="color:#9ECBFF;"> pb</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">service</span><span style="color:#B392F0;"> Greeter</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#F97583;">  rpc</span><span style="color:#B392F0;"> Hello</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">HelloArgs</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">returns</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">HelloReply</span><span style="color:#E1E4E8;">) {}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">message</span><span style="color:#B392F0;"> HelloArgs</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#F97583;">  string</span><span style="color:#E1E4E8;"> Name </span><span style="color:#F97583;">=</span><span style="color:#79B8FF;"> 1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">message</span><span style="color:#B392F0;"> HelloReply</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#F97583;">  string</span><span style="color:#E1E4E8;"> Message </span><span style="color:#F97583;">=</span><span style="color:#79B8FF;"> 1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre></div><p>生成go文件</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#B392F0;">protoc</span><span style="color:#79B8FF;"> --go_out=..</span><span style="color:#79B8FF;"> --rpcx_out=..</span><span style="color:#79B8FF;"> *</span><span style="color:#9ECBFF;">.proto</span></span></code></pre></div><p>构建服务端逻辑</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#B392F0;"> server</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">context</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">due-examples/cluster/service/internal/service/rpcx/greeter/pb</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2/cluster/mesh</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#79B8FF;">	service</span><span style="color:#F97583;">     =</span><span style="color:#9ECBFF;"> &quot;greeter&quot;</span><span style="color:#6A737D;"> // 用于客户端定位服务，例如discovery://greeter</span></span>
<span class="line"><span style="color:#79B8FF;">	servicePath</span><span style="color:#F97583;"> =</span><span style="color:#9ECBFF;"> &quot;Greeter&quot;</span><span style="color:#6A737D;"> // 服务路径要与pb中的服务路径保持一致</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">type</span><span style="color:#B392F0;"> Server</span><span style="color:#F97583;"> struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	proxy </span><span style="color:#F97583;">*</span><span style="color:#B392F0;">mesh</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Proxy</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> _ </span><span style="color:#B392F0;">pb</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">GreeterAble</span><span style="color:#F97583;"> =</span><span style="color:#F97583;"> &amp;</span><span style="color:#B392F0;">Server</span><span style="color:#E1E4E8;">{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> NewServer</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">proxy</span><span style="color:#F97583;"> *</span><span style="color:#B392F0;">mesh</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">*</span><span style="color:#B392F0;">Server</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#F97583;">	return</span><span style="color:#F97583;"> &amp;</span><span style="color:#B392F0;">Server</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">		proxy: proxy,</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">s </span><span style="color:#F97583;">*</span><span style="color:#B392F0;">Server</span><span style="color:#E1E4E8;">) </span><span style="color:#B392F0;">Init</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	s.proxy.</span><span style="color:#B392F0;">AddServiceProvider</span><span style="color:#E1E4E8;">(service, servicePath, s)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">s </span><span style="color:#F97583;">*</span><span style="color:#B392F0;">Server</span><span style="color:#E1E4E8;">) </span><span style="color:#B392F0;">Hello</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">ctx</span><span style="color:#B392F0;"> context</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Context</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">args</span><span style="color:#F97583;"> *</span><span style="color:#B392F0;">pb</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">HelloArgs</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">reply</span><span style="color:#F97583;"> *</span><span style="color:#B392F0;">pb</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">HelloReply</span><span style="color:#E1E4E8;">) (</span><span style="color:#FFAB70;">err</span><span style="color:#F97583;"> error</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	reply.Message </span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;"> &quot;Hello &quot;</span><span style="color:#F97583;"> +</span><span style="color:#E1E4E8;"> args.Name</span></span>
<span class="line"><span style="color:#F97583;">	return</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre></div><p>构建调用客户端</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#B392F0;"> client</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">due-examples/cluster/service/internal/service/rpcx/greeter/pb</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2/transport</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/smallnest/rpcx/client</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#79B8FF;"> target</span><span style="color:#F97583;"> =</span><span style="color:#9ECBFF;"> &quot;discovery://greeter&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> NewClient</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">fn</span><span style="color:#B392F0;"> transport</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">NewMeshClient</span><span style="color:#E1E4E8;">) (</span><span style="color:#F97583;">*</span><span style="color:#B392F0;">pb</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">GreeterOneClient</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	c, err </span><span style="color:#F97583;">:=</span><span style="color:#B392F0;"> fn</span><span style="color:#E1E4E8;">(target)</span></span>
<span class="line"><span style="color:#F97583;">	if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#79B8FF;"> nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#F97583;">		return</span><span style="color:#79B8FF;"> nil</span><span style="color:#E1E4E8;">, err</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">	return</span><span style="color:#E1E4E8;"> pb.</span><span style="color:#B392F0;">NewGreeterOneClient</span><span style="color:#E1E4E8;">(c.</span><span style="color:#B392F0;">Client</span><span style="color:#E1E4E8;">().(</span><span style="color:#F97583;">*</span><span style="color:#B392F0;">client</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">OneClient</span><span style="color:#E1E4E8;">)), </span><span style="color:#79B8FF;">nil</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre></div><p>构建网格服务器</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#B392F0;"> main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">due-examples/cluster/service/internal/service/rpcx/greeter/server</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/locate/redis/v2</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/registry/consul/v2</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/transport/rpcx/v2</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;</span><span style="color:#B392F0;">github.com/dobyte/due/v2/cluster/mesh</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#6A737D;">	// 创建容器</span></span>
<span class="line"><span style="color:#E1E4E8;">	container </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> due.</span><span style="color:#B392F0;">NewContainer</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#6A737D;">	// 创建用户定位器</span></span>
<span class="line"><span style="color:#E1E4E8;">	locator </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> redis.</span><span style="color:#B392F0;">NewLocator</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#6A737D;">	// 创建服务发现</span></span>
<span class="line"><span style="color:#E1E4E8;">	registry </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> consul.</span><span style="color:#B392F0;">NewRegistry</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#6A737D;">	// 创建RPC传输器</span></span>
<span class="line"><span style="color:#E1E4E8;">	transporter </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> rpcx.</span><span style="color:#B392F0;">NewTransporter</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#6A737D;">	// 创建网格组件</span></span>
<span class="line"><span style="color:#E1E4E8;">	component </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> mesh.</span><span style="color:#B392F0;">NewMesh</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">		mesh.</span><span style="color:#B392F0;">WithLocator</span><span style="color:#E1E4E8;">(locator),</span></span>
<span class="line"><span style="color:#E1E4E8;">		mesh.</span><span style="color:#B392F0;">WithRegistry</span><span style="color:#E1E4E8;">(registry),</span></span>
<span class="line"><span style="color:#E1E4E8;">		mesh.</span><span style="color:#B392F0;">WithTransporter</span><span style="color:#E1E4E8;">(transporter),</span></span>
<span class="line"><span style="color:#E1E4E8;">	)</span></span>
<span class="line"><span style="color:#6A737D;">	// 初始化应用</span></span>
<span class="line"><span style="color:#B392F0;">	initRPCXServer</span><span style="color:#E1E4E8;">(component.</span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#6A737D;">	// 添加网格组件</span></span>
<span class="line"><span style="color:#E1E4E8;">	container.</span><span style="color:#B392F0;">Add</span><span style="color:#E1E4E8;">(component)</span></span>
<span class="line"><span style="color:#6A737D;">	// 启动容器</span></span>
<span class="line"><span style="color:#E1E4E8;">	container.</span><span style="color:#B392F0;">Serve</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 初始化应用</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#B392F0;"> initRPCXServer</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">proxy</span><span style="color:#F97583;"> *</span><span style="color:#B392F0;">mesh</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	server.</span><span style="color:#B392F0;">NewServer</span><span style="color:#E1E4E8;">(proxy).</span><span style="color:#B392F0;">Init</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre></div><p>调用方示例</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#6A737D;">// 构建客户端</span></span>
<span class="line"><span style="color:#E1E4E8;">cli, err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> client.</span><span style="color:#B392F0;">NewClient</span><span style="color:#E1E4E8;">(proxy.NewMeshClient)</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#79B8FF;"> nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  log.</span><span style="color:#B392F0;">Errorf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;create rpc client failed: </span><span style="color:#79B8FF;">%v</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, err)</span></span>
<span class="line"><span style="color:#F97583;">  return</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 发起RPC调用</span></span>
<span class="line"><span style="color:#E1E4E8;">reply, err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> cli.</span><span style="color:#B392F0;">Hello</span><span style="color:#E1E4E8;">(ctx.</span><span style="color:#B392F0;">Context</span><span style="color:#E1E4E8;">(), </span><span style="color:#F97583;">&amp;</span><span style="color:#B392F0;">pb</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">HelloArgs</span><span style="color:#E1E4E8;">{Name: req.Name})</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#79B8FF;"> nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  log.</span><span style="color:#B392F0;">Errorf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;invoke rpc func failed: </span><span style="color:#79B8FF;">%v</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, err)</span></span>
<span class="line"><span style="color:#F97583;">  return</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">log.</span><span style="color:#B392F0;">Infof</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;invoke rpc func replay: </span><span style="color:#79B8FF;">%v</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, reply)</span></span></code></pre></div><p>你也可通过ctx.NewMeshClient来创建RPC客户端</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#E1E4E8;">cli, _ </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> client.</span><span style="color:#B392F0;">NewClient</span><span style="color:#E1E4E8;">(ctx.NewMeshClient)</span></span></code></pre></div><p>如果你的调用方压根不在节点服（node）、网格服（mesh）、Web服（http）中，你也可以通过直接构建传输器来实现调用</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#6A737D;">// 创建服务发现</span></span>
<span class="line"><span style="color:#E1E4E8;">registry </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> consul.</span><span style="color:#B392F0;">NewRegistry</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#6A737D;">// 构建传输器</span></span>
<span class="line"><span style="color:#E1E4E8;">transporter </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> rpcx.</span><span style="color:#B392F0;">NewTransporter</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#6A737D;">// 设置默认的服务发现组件</span></span>
<span class="line"><span style="color:#E1E4E8;">transporter.</span><span style="color:#B392F0;">SetDefaultDiscovery</span><span style="color:#E1E4E8;">(registry)</span></span>
<span class="line"><span style="color:#6A737D;">// 构建客户端</span></span>
<span class="line"><span style="color:#E1E4E8;">cli, _ </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> client.</span><span style="color:#B392F0;">NewClient</span><span style="color:#E1E4E8;">(transporter.NewClient)</span></span></code></pre></div><h2 id="mesh-start" tabindex="-1">启动服务 <a class="header-anchor" href="#mesh-start" aria-label="Permalink to &quot;启动服务 {#mesh-start}&quot;">​</a></h2><p>启动GRPC网格服</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#9ECBFF;"> go</span><span style="color:#9ECBFF;"> run</span><span style="color:#9ECBFF;"> grpc.go</span></span>
<span class="line"><span style="color:#B392F0;">                    ____</span><span style="color:#9ECBFF;">  __</span><span style="color:#9ECBFF;">  ________</span></span>
<span class="line"><span style="color:#B392F0;">                   /</span><span style="color:#9ECBFF;"> __</span><span style="color:#79B8FF;"> \\/</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> ____/</span></span>
<span class="line"><span style="color:#B392F0;">                  /</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> __/</span></span>
<span class="line"><span style="color:#B392F0;">                 /</span><span style="color:#9ECBFF;"> /_/</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /_/</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /___</span></span>
<span class="line"><span style="color:#B392F0;">                /_____/\\____/_____/</span></span>
<span class="line"><span style="color:#B392F0;">┌──────────────────────────────────────────────────────┐</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> [Website] </span><span style="color:#B392F0;">https://github.com/dobyte/due</span><span style="color:#F97583;">              |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> [Version] </span><span style="color:#B392F0;">v2.2.3</span><span style="color:#F97583;">                                     |</span></span>
<span class="line"><span style="color:#B392F0;">└──────────────────────────────────────────────────────┘</span></span>
<span class="line"><span style="color:#B392F0;">┌────────────────────────Global────────────────────────┐</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> PID:</span><span style="color:#79B8FF;"> 21628</span><span style="color:#F97583;">                                           |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Mode:</span><span style="color:#9ECBFF;"> debug</span><span style="color:#F97583;">                                          |</span></span>
<span class="line"><span style="color:#B392F0;">└──────────────────────────────────────────────────────┘</span></span>
<span class="line"><span style="color:#B392F0;">┌─────────────────────────Mesh─────────────────────────┐</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Name:</span><span style="color:#9ECBFF;"> mesh</span><span style="color:#F97583;">                                           |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Codec:</span><span style="color:#9ECBFF;"> json</span><span style="color:#F97583;">                                          |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Locator:</span><span style="color:#9ECBFF;"> redis</span><span style="color:#F97583;">                                       |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Registry:</span><span style="color:#9ECBFF;"> consul</span><span style="color:#F97583;">                                     |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Encryptor:</span><span style="color:#9ECBFF;"> -</span><span style="color:#F97583;">                                         |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Transporter:</span><span style="color:#9ECBFF;"> grpc</span><span style="color:#F97583;">                                    |</span></span>
<span class="line"><span style="color:#B392F0;">└──────────────────────────────────────────────────────┘</span></span></code></pre></div><p>启动RPCX网格服</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#9ECBFF;"> go</span><span style="color:#9ECBFF;"> run</span><span style="color:#9ECBFF;"> rpcx.go</span></span>
<span class="line"><span style="color:#B392F0;">                    ____</span><span style="color:#9ECBFF;">  __</span><span style="color:#9ECBFF;">  ________</span></span>
<span class="line"><span style="color:#B392F0;">                   /</span><span style="color:#9ECBFF;"> __</span><span style="color:#79B8FF;"> \\/</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> ____/</span></span>
<span class="line"><span style="color:#B392F0;">                  /</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> __/</span></span>
<span class="line"><span style="color:#B392F0;">                 /</span><span style="color:#9ECBFF;"> /_/</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /_/</span><span style="color:#9ECBFF;"> /</span><span style="color:#9ECBFF;"> /___</span></span>
<span class="line"><span style="color:#B392F0;">                /_____/\\____/_____/</span></span>
<span class="line"><span style="color:#B392F0;">┌──────────────────────────────────────────────────────┐</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> [Website] </span><span style="color:#B392F0;">https://github.com/dobyte/due</span><span style="color:#F97583;">              |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> [Version] </span><span style="color:#B392F0;">v2.2.3</span><span style="color:#F97583;">                                     |</span></span>
<span class="line"><span style="color:#B392F0;">└──────────────────────────────────────────────────────┘</span></span>
<span class="line"><span style="color:#B392F0;">┌────────────────────────Global────────────────────────┐</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> PID:</span><span style="color:#79B8FF;"> 26436</span><span style="color:#F97583;">                                           |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Mode:</span><span style="color:#9ECBFF;"> debug</span><span style="color:#F97583;">                                          |</span></span>
<span class="line"><span style="color:#B392F0;">└──────────────────────────────────────────────────────┘</span></span>
<span class="line"><span style="color:#B392F0;">┌─────────────────────────Mesh─────────────────────────┐</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Name:</span><span style="color:#9ECBFF;"> mesh</span><span style="color:#F97583;">                                           |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Codec:</span><span style="color:#9ECBFF;"> json</span><span style="color:#F97583;">                                          |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Locator:</span><span style="color:#9ECBFF;"> redis</span><span style="color:#F97583;">                                       |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Registry:</span><span style="color:#9ECBFF;"> consul</span><span style="color:#F97583;">                                     |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Encryptor:</span><span style="color:#9ECBFF;"> -</span><span style="color:#F97583;">                                         |</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;"> Transporter:</span><span style="color:#9ECBFF;"> rpcx</span><span style="color:#F97583;">                                    |</span></span>
<span class="line"><span style="color:#B392F0;">└──────────────────────────────────────────────────────┘</span></span></code></pre></div><h2 id="启动配置" tabindex="-1">启动配置 <a class="header-anchor" href="#启动配置" aria-label="Permalink to &quot;启动配置&quot;">​</a></h2><p>这里仅展示网格服（mesh）相关配置参数，如需了解更多模块的参数配置，请查看<a href="/guide/etc.html">启动配置</a></p><div class="language-toml"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#6A737D;"># 进程号</span></span>
<span class="line"><span style="color:#E1E4E8;">pid = </span><span style="color:#9ECBFF;">&quot;./run/mesh.pid&quot;</span></span>
<span class="line"><span style="color:#6A737D;"># 开发模式。支持模式：debug、test、release（设置优先级：配置文件 &lt; 环境变量 &lt; 运行参数 &lt; mode.SetMode()）</span></span>
<span class="line"><span style="color:#E1E4E8;">mode = </span><span style="color:#9ECBFF;">&quot;debug&quot;</span></span>
<span class="line"><span style="color:#6A737D;"># 统一时区设置。项目中的时间获取请使用xtime.Now()</span></span>
<span class="line"><span style="color:#E1E4E8;">timezone = </span><span style="color:#9ECBFF;">&quot;Local&quot;</span></span>
<span class="line"><span style="color:#6A737D;"># 容器关闭最大等待时间。支持单位：纳秒（ns）、微秒（us | µs）、毫秒（ms）、秒（s）、分（m）、小时（h）、天（d）。默认为0</span></span>
<span class="line"><span style="color:#E1E4E8;">shutdownMaxWaitTime = </span><span style="color:#9ECBFF;">&quot;0s&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">cluster</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">mesh</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">    # 实例ID，网关集群中唯一。不填写默认自动生成唯一的实例ID</span></span>
<span class="line"><span style="color:#E1E4E8;">    id = </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 实例名称</span></span>
<span class="line"><span style="color:#E1E4E8;">    name = </span><span style="color:#9ECBFF;">&quot;mesh&quot;</span></span>
<span class="line"><span style="color:#6A737D;">    # 编解码器。可选：json | proto。默认json</span></span>
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
<span class="line"><span style="color:#E1E4E8;">    classifiedStorage = </span><span style="color:#79B8FF;">false</span></span>
<span class="line"></span>
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
<span class="line"><span style="color:#E1E4E8;">            poolSize = </span><span style="color:#79B8FF;">10</span></span></code></pre></div>`,47))])}const h=l(E,[["render",y]]);export{g as __pageData,h as default};
