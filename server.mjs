import {createServer} from 'node:http';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const identity=JSON.parse(readFileSync(new URL('./build.json',import.meta.url),'utf8'));
const hash=(x)=>createHash('sha256').update(x??'ABSENT').digest('hex');
createServer((req,res)=>{
 res.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'});
 res.end(JSON.stringify({...identity,syntheticEnvFingerprint:hash(process.env['VELA_PROOF_SENTINEL'])}));
}).listen(Number(process.env.PORT||3000),'0.0.0.0');
