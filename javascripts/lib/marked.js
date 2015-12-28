/**
 * marked - A markdown parser (https://github.com/chjj/marked)
 * Copyright (c) 2011-2012, Christopher Jeffrey. (MIT Licensed)
 */
(function(){function e(){var e="(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+";return e}function t(e){return e=e.source,function t(n,r){return n?(e=e.replace(n,r.source||r),t):new RegExp(e)}}function n(){}var r={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:n,hr:/^( *[\-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,lheading:/^([^\n]+)\n *(=|-){3,} *\n*/,blockquote:/^( *>[^\n]+(\n[^\n]+)*\n*)+/,list:/^( *)([*+-]|\d+\.) [^\0]+?(?:\n{2,}(?! )(?!\1bullet)\n*|\s*$)/,html:/^ *(?:comment|closed|closing) *(?:\n{2,}|\s*$)/,def:/^ *\[([^\]]+)\]: *([^\s]+)(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,paragraph:/^([^\n]+\n?(?!body))+\n*/,text:/^[^\n]+/};r.list=t(r.list)("bullet",/(?:[*+-](?!(?: *[-*]){2,})|\d+\.)/)(),r.html=t(r.html)("comment",/<!--[^\0]*?-->/)("closed",/<(tag)[^\0]+?<\/\1>/)("closing",/<tag(?!:\/|@)\b(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,e())(),r.paragraph=function(){var t=r.paragraph.source,n=[];return function s(e){return e=r[e]?r[e].source:e,n.push(e.replace(/(^|[^\[])\^/g,"$1")),s}("hr")("heading")("lheading")("blockquote")("<"+e())("def"),new RegExp(t.replace("body",n.join("|")))}(),r.normal={fences:r.fences,paragraph:r.paragraph},r.gfm={fences:/^ *``` *(\w+)? *\n([^\0]+?)\s*``` *(?:\n+|$)/,paragraph:/^/},r.gfm.paragraph=t(r.paragraph)("(?!","(?!"+r.gfm.fences.source.replace(/(^|[^\[])\^/g,"$1")+"|")(),r.lexer=function(e){var t=[];return t.links={},e=e.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    "),r.token(e,t,!0)},r.token=function(e,t,n){for(var s,l,i,a,c,g,o,e=e.replace(/^ +$/gm,"");e;)if((i=r.newline.exec(e))&&(e=e.substring(i[0].length),i[0].length>1&&t.push({type:"space"})),i=r.code.exec(e))e=e.substring(i[0].length),i=i[0].replace(/^ {4}/gm,""),t.push({type:"code",text:f.pedantic?i:i.replace(/\n+$/,"")});else if(i=r.fences.exec(e))e=e.substring(i[0].length),t.push({type:"code",lang:i[1],text:i[2]});else if(i=r.heading.exec(e))e=e.substring(i[0].length),t.push({type:"heading",depth:i[1].length,text:i[2]});else if(i=r.lheading.exec(e))e=e.substring(i[0].length),t.push({type:"heading",depth:"="===i[2]?1:2,text:i[1]});else if(i=r.hr.exec(e))e=e.substring(i[0].length),t.push({type:"hr"});else if(i=r.blockquote.exec(e))e=e.substring(i[0].length),t.push({type:"blockquote_start"}),i=i[0].replace(/^ *> ?/gm,""),r.token(i,t,n),t.push({type:"blockquote_end"});else if(i=r.list.exec(e)){for(e=e.substring(i[0].length),t.push({type:"list_start",ordered:isFinite(i[2])}),i=i[0].match(/^( *)([*+-]|\d+\.) [^\n]*(?:\n(?!\1(?:[*+-]|\d+\.) )[^\n]*)*/gm),s=!1,o=i.length,g=0;o>g;g++)a=i[g],c=a.length,a=a.replace(/^ *([*+-]|\d+\.) +/,""),~a.indexOf("\n ")&&(c-=a.length,a=f.pedantic?a.replace(/^ {1,4}/gm,""):a.replace(new RegExp("^ {1,"+c+"}","gm"),"")),l=s||/\n\n(?!\s*$)/.test(a),g!==o-1&&(s="\n"===a[a.length-1],l||(l=s)),t.push({type:l?"loose_item_start":"list_item_start"}),r.token(a,t),t.push({type:"list_item_end"});t.push({type:"list_end"})}else(i=r.html.exec(e))?(e=e.substring(i[0].length),t.push({type:"html",pre:"pre"===i[1],text:i[0]})):n&&(i=r.def.exec(e))?(e=e.substring(i[0].length),t.links[i[1].toLowerCase()]={href:i[2],title:i[3]}):n&&(i=r.paragraph.exec(e))?(e=e.substring(i[0].length),t.push({type:"paragraph",text:i[0]})):(i=r.text.exec(e))&&(e=e.substring(i[0].length),t.push({type:"text",text:i[0]}));return t};var s={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:n,tag:/^<!--[^\0]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([^\0]+?)__(?!_)|^\*\*([^\0]+?)\*\*(?!\*)/,em:/^\b_((?:__|[^\0])+?)_\b|^\*((?:\*\*|[^\0])+?)\*(?!\*)/,code:/^(`+)([^\0]*?[^`])\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,text:/^[^\0]+?(?=[\\<!\[_*`]| {2,}\n|$)/};s._linkInside=/(?:\[[^\]]*\]|[^\]]|\](?=[^\[]*\]))*/,s._linkHref=/\s*<?([^\s]*?)>?(?:\s+['"]([^\0]*?)['"])?\s*/,s.link=t(s.link)("inside",s._linkInside)("href",s._linkHref)(),s.reflink=t(s.reflink)("inside",s._linkInside)(),s.normal={url:s.url,strong:s.strong,em:s.em,text:s.text},s.pedantic={strong:/^__(?=\S)([^\0]*?\S)__(?!_)|^\*\*(?=\S)([^\0]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([^\0]*?\S)_(?!_)|^\*(?=\S)([^\0]*?\S)\*(?!\*)/},s.gfm={url:/^(https?:\/\/[^\s]+[^.,:;"')\]\s])/,text:/^[^\0]+?(?=[\\<!\[_*`]|https?:\/\/| {2,}\n|$)/},s.lexer=function(e){for(var t,n,r,i,c="",g=l.links;e;)if(i=s.escape.exec(e))e=e.substring(i[0].length),c+=i[1];else if(i=s.autolink.exec(e))e=e.substring(i[0].length),"@"===i[2]?(n=h(":"===i[1][6]?i[1].substring(7):i[1]),r=h("mailto:")+n):(n=u(i[1]),r=n),c+='<a href="'+r+'">'+n+"</a>";else if(i=s.url.exec(e))e=e.substring(i[0].length),n=u(i[1]),r=n,c+='<a href="'+r+'">'+n+"</a>";else if(i=s.tag.exec(e))e=e.substring(i[0].length),c+=f.sanitize?u(i[0]):i[0];else if(i=s.link.exec(e))e=e.substring(i[0].length),c+=a(i,{href:i[2],title:i[3]});else if((i=s.reflink.exec(e))||(i=s.nolink.exec(e))){if(e=e.substring(i[0].length),t=(i[2]||i[1]).replace(/\s+/g," "),t=g[t.toLowerCase()],!t||!t.href){c+=i[0][0],e=i[0].substring(1)+e;continue}c+=a(i,t)}else(i=s.strong.exec(e))?(e=e.substring(i[0].length),c+="<strong>"+s.lexer(i[2]||i[1])+"</strong>"):(i=s.em.exec(e))?(e=e.substring(i[0].length),c+="<em>"+s.lexer(i[2]||i[1])+"</em>"):(i=s.code.exec(e))?(e=e.substring(i[0].length),c+="<code>"+u(i[2],!0)+"</code>"):(i=s.br.exec(e))?(e=e.substring(i[0].length),c+="<br>"):(i=s.text.exec(e))&&(e=e.substring(i[0].length),c+=u(i[0]));return c};var l,i,a=function(e,t){return"!"!==e[0][0]?'<a href="'+u(t.href)+'"'+(t.title?' title="'+u(t.title)+'"':"")+">"+s.lexer(e[1])+"</a>":'<img src="'+u(t.href)+'" alt="'+u(e[1])+'"'+(t.title?' title="'+u(t.title)+'"':"")+">"},c=function(){return i=l.pop()},g=function(){switch(i.type){case"space":return"";case"hr":return"<hr>\n";case"heading":return"<h"+i.depth+">"+s.lexer(i.text)+"</h"+i.depth+">\n";case"code":return"<pre><code"+(i.lang?' class="'+i.lang+'"':"")+">"+(i.escaped?i.text:u(i.text,!0))+"</code></pre>\n";case"blockquote_start":for(var e="";"blockquote_end"!==c().type;)e+=g();return"<blockquote>\n"+e+"</blockquote>\n";case"list_start":for(var t=i.ordered?"ol":"ul",e="";"list_end"!==c().type;)e+=g();return"<"+t+">\n"+e+"</"+t+">\n";case"list_item_start":for(var e="";"list_item_end"!==c().type;)e+="text"===i.type?o():g();return"<li>"+e+"</li>\n";case"loose_item_start":for(var e="";"list_item_end"!==c().type;)e+=g();return"<li>"+e+"</li>\n";case"html":return f.sanitize?s.lexer(i.text):i.pre||f.pedantic?i.text:s.lexer(i.text);case"paragraph":return"<p>"+s.lexer(i.text)+"</p>\n";case"text":return"<p>"+o()+"</p>\n"}},o=function(){for(var e,t=i.text;(e=l[l.length-1])&&"text"===e.type;)t+="\n"+c().text;return s.lexer(t)},p=function(e){l=e.reverse();for(var t="";c();)t+=g();return l=null,i=null,t},u=function(e,t){return e.replace(t?/&/g:/&(?!#?\w+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")},h=function(e){for(var t,n="",r=e.length,s=0;r>s;s++)t=e.charCodeAt(s),Math.random()>.5&&(t="x"+t.toString(16)),n+="&#"+t+";";return n};n.exec=n;var f,d,x=function(e,t){return m(t),p(r.lexer(e))},m=function(e){e||(e=d),f!==e&&(f=e,f.gfm?(r.fences=r.gfm.fences,r.paragraph=r.gfm.paragraph,s.text=s.gfm.text,s.url=s.gfm.url):(r.fences=r.normal.fences,r.paragraph=r.normal.paragraph,s.text=s.normal.text,s.url=s.normal.url),f.pedantic?(s.em=s.pedantic.em,s.strong=s.pedantic.strong):(s.em=s.normal.em,s.strong=s.normal.strong))};x.options=x.setOptions=function(e){d=e,m(e)},x.options({gfm:!0,pedantic:!1,sanitize:!1}),x.parser=function(e,t){return m(t),p(e)},x.lexer=function(e,t){return m(t),r.lexer(e)},x.parse=x,"undefined"!=typeof module?module.exports=x:this.marked=x}).call(this);