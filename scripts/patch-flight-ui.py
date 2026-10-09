from pathlib import Path
p=Path('app/c/flight-case-view.tsx')
t=p.read_text(encoding='utf-8')
t=t.replace('inputId:data.newReply._id','inputId:data.newReply!._id')
t=t.replace('draft.body??"",cc):undefined','draft.body??"",cc).url:undefined')
t=t.replace('window.location.assign(url);','window.location.assign(url.url);')
p.write_text(t,encoding='utf-8')
