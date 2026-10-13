import sharp from 'sharp';
for(let n=1;n<=6;n++){const path=`docs/design/logo-candidates/d045-mascot-${n}`;const {data,info}=await sharp(path+'.webp').raw().toBuffer({resolveWithObject:true});let top=0,centre=408;
 for(let y=0;y<400;y++){const xs=[];for(let x=150;x<660;x++){const i=(y*info.width+x)*info.channels;if(data[i]<95&&data[i+1]<110&&data[i+2]>data[i]+15)xs.push(x);}if(xs.length>3){top=y;centre=xs.reduce((a,b)=>a+b,0)/xs.length;break;}}
 const left=Math.max(0,Math.min(576,Math.round(centre-120)));await sharp(path+'.webp').extract({left,top:Math.max(0,top-10),width:240,height:240}).resize(64,64).png().toFile(path+'-head.png');console.log(`Mascot ${n}: head preview saved.`);
}
