import{_ as t,C as n,c as l,o,a as s,q as r,b as p,m as i}from"./chunks/framework.BSdOUgs7.js";const d="/assets/route-stateless-dispatch.CP3xxskH.png",c="/assets/route-stateful-forward.Czq0evtX.png",b=JSON.parse('{"title":"路由设计","description":"","frontmatter":{},"headers":[{"level":2,"title":"路由注册","slug":"route-register","link":"#route-register","children":[]},{"level":2,"title":"路由状态","slug":"route-state","link":"#route-state","children":[]},{"level":2,"title":"无状态路由分发","slug":"route-stateless-dispatch","link":"#route-stateless-dispatch","children":[]},{"level":2,"title":"有状态路由定向转发","slug":"route-stateful-forward","link":"#route-stateful-forward","children":[]},{"level":2,"title":"消息流转","slug":"消息流转","link":"#消息流转","children":[]}],"relativePath":"guide/route.md","filePath":"guide/route.md"}'),u={name:"guide/route.md"};function E(g,e,h,y,N,f){const a=n("TextAd");return o(),l("div",null,[e[0]||(e[0]=s("h1",{id:"route",tabindex:"-1"},[i("路由设计 "),s("a",{class:"header-anchor",href:"#route","aria-label":'Permalink to "路由设计 {#route}"'},"​")],-1)),r(a),e[1]||(e[1]=p(`<h2 id="route-register" tabindex="-1">路由注册 <a class="header-anchor" href="#route-register" aria-label="Permalink to &quot;路由注册 {#route-register}&quot;">​</a></h2><p>在游戏服务器中，路由（route）作为消息（message）的标识，为消息在整个业务系统中的流转提供支撑。在<a href="https://github.com/dobyte/due" target="_blank" rel="noreferrer">due</a>框架中，路由处理器会被提前添加到节点服（node）上，在节点服启动的时候随着节点服信息一同被注入到注册中心中。集群中的其他服务器会通过服务发现（discovery）获取到这一节点服（node）的相关信息。</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#6A737D;">// AddRouteHandler 添加路由处理器</span></span>
<span class="line"><span style="color:#B392F0;">AddRouteHandler</span><span style="color:#E1E4E8;">(route </span><span style="color:#F97583;">int32</span><span style="color:#E1E4E8;">, stateful </span><span style="color:#F97583;">bool</span><span style="color:#E1E4E8;">, handler RouteHandler, middlewares </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">MiddlewareHandler)</span></span></code></pre></div><h2 id="route-state" tabindex="-1">路由状态 <a class="header-anchor" href="#route-state" aria-label="Permalink to &quot;路由状态 {#route-state}&quot;">​</a></h2><p>在<a href="https://github.com/dobyte/due" target="_blank" rel="noreferrer">due</a>框架中，路由被设计成了无状态（stateless）和有状态（stateful）两种模式。两种路由模式分别对应着分布式集群中不同的路由分发机制。但无论是哪种路由模式，一个路由号只能对应一种路由模式。</p><ul><li><p>无状态路由（stateless route）：无状态路由与HTTP路由比较类似。当网关（Gate）接收到无状态路由消息后会根据一定的<a href="/guide/route.html#route-stateless-dispatch">分发策略</a>分发到对应的节点（Node）进行消息处理。</p></li><li><p>有状态路由（stateful route）：有状态路由主要解决的是游戏业务中的消息定向转发问题。</p></li></ul><h2 id="route-stateless-dispatch" tabindex="-1">无状态路由分发 <a class="header-anchor" href="#route-stateless-dispatch" aria-label="Permalink to &quot;无状态路由分发 {#route-stateless-dispatch}&quot;">​</a></h2><p><img src="`+d+'" alt="无状态路由分发"></p><ul><li>随机（random）：默认策略，网关（Gate）在接收到无状态路由消息后会在已注册该路由号的节点（Node）中随机选择一个节点（Node）进行消息转发。</li><li>轮询（rr）：网关（Gate）在接收到无状态路由消息后会在已注册该路由号的节点（Node）中按照顺序依次转发到对应的节点（Node）。</li><li>加权轮询（wrr）：网关（Gate）在接收到无状态路由消息后会在已注册该路由号的节点（Node）中按照节点（Node）权重高低依次转发到对应的节点（Node）。</li></ul><h2 id="route-stateful-forward" tabindex="-1">有状态路由定向转发 <a class="header-anchor" href="#route-stateful-forward" aria-label="Permalink to &quot;有状态路由定向转发 {#route-stateful-forward}&quot;">​</a></h2><p><img src="'+c+`" alt="有状态路由定向转发"></p><p>有状态路由要实现定向转发须满足以下两个条件：</p><ul><li>用户已与他所连接的网关（Gate）建立了绑定关系</li><li>用户已与某一个节点（Node）建立了绑定关系</li></ul><p>在满足以上两个条件后，用户客户端后续发送的有状态路由消息均会被转发到用户绑定的节点（Node）上。</p><h2 id="消息流转" tabindex="-1">消息流转 <a class="header-anchor" href="#消息流转" aria-label="Permalink to &quot;消息流转&quot;">​</a></h2><p>以下用一个简单的流程图来模拟玩家从建立连接到发起登录、再到加入战斗、最后到攻击怪物的整个消息流转过程。</p><div class="language-mermaid"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki github-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#E1E4E8;">sequenceDiagram</span></span>
<span class="line"><span style="color:#E1E4E8;">participant Client as 客户端（Client）</span></span>
<span class="line"><span style="color:#E1E4E8;">participant Gate as 网关集群（Gate）</span></span>
<span class="line"><span style="color:#E1E4E8;">participant Node as 节点集群（Node）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">Client -&gt;&gt; Gate: 建立连接</span></span>
<span class="line"><span style="color:#E1E4E8;">Gate --&gt; Client: 连接建立成功</span></span>
<span class="line"><span style="color:#E1E4E8;">Client -&gt;&gt; Gate: 发送路由号为N（无状态）的登录消息</span></span>
<span class="line"><span style="color:#E1E4E8;">Gate -&gt;&gt; Node: 根据分发策略将路由消息分发到注册了该路由号N的节点服务器上</span></span>
<span class="line"><span style="color:#E1E4E8;">Node -&gt;&gt; Node: 解析登录消息，完成登录逻辑</span></span>
<span class="line"><span style="color:#E1E4E8;">Node -&gt;&gt; Gate: 调用BindGate命令，将用户与网关连接进行绑定</span></span>
<span class="line"><span style="color:#E1E4E8;">Gate -&gt;&gt; Node: 绑定网关连接成功</span></span>
<span class="line"><span style="color:#E1E4E8;">Node -&gt;&gt; Gate: 调用Push命令，将登录成功消息推送到网关</span></span>
<span class="line"><span style="color:#E1E4E8;">Gate -&gt;&gt; Client: 根据Push命令参数找到对应的连接，将登录成功消息下发到客户端</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">Client -&gt;&gt; Gate: 发送路由号为M（无状态）的加入游戏消息</span></span>
<span class="line"><span style="color:#E1E4E8;">Gate -&gt;&gt; Node: 根据分发策略将路由消息分发到注册了该路由号M的节点服务器上</span></span>
<span class="line"><span style="color:#E1E4E8;">Node -&gt;&gt; Node: 解析加入游戏消息，完成进入游戏逻辑</span></span>
<span class="line"><span style="color:#E1E4E8;">Node -&gt;&gt; Node: 调用BindNode命令，将用户与当前节点进行绑定</span></span>
<span class="line"><span style="color:#E1E4E8;">Node -&gt;&gt; Gate: 调用Push命令，将加入游戏成功消息推送到网关</span></span>
<span class="line"><span style="color:#E1E4E8;">Gate -&gt;&gt; Client: 根据Push命令参数找到对应的连接，将加入游戏成功消息下发到客户端</span></span>
<span class="line"><span style="color:#E1E4E8;">Client -&gt;&gt; Gate: 发送路由号为X（有状态）的攻击消息</span></span>
<span class="line"><span style="color:#E1E4E8;">Gate -&gt;&gt; Node: 将攻击消息转发到用户绑定好的并且已注册了路由号为X（有状态）的节点上</span></span>
<span class="line"><span style="color:#E1E4E8;">Node -&gt;&gt; Node: 解析攻击消息，完成攻击逻辑</span></span>
<span class="line"><span style="color:#E1E4E8;">Node -&gt;&gt; Gate: 调用Push命令，将攻击成功消息推送到网关</span></span>
<span class="line"><span style="color:#E1E4E8;">Gate -&gt;&gt; Client: 根据Push命令参数找到对应的连接，将攻击成功消息下发到客户端</span></span></code></pre></div>`,17))])}const G=t(u,[["render",E]]);export{b as __pageData,G as default};
