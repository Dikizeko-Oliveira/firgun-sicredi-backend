ALTER TABLE responses ALTER COLUMN id SET DEFAULT uuid_generate_v4();

pm2 start npm --name "nome da pasta" -- run start -- -p 3000
pm2 start npm --name "nome da pasta" -- run dev -- -p 3333


Front 
touch .env.local
nano .env.local -> Copiar as variaveis de ambiente e salva;
salvar mudancas -> ctrl + 0 ; ctrl + x e salvar

npm install
npm run build

pm2 ls

pm2 stop 0

pm2 start npm --name "nome da pasta" -- run start -- -p 3000

pm2 ls
pm2 restart "cod do server"

Back 
touch .env
nano .env -> Copiar as variaveis de ambiente e salva;
salvar mudancas -> ctrl + 0 ; ctrl + x e salvar

npm install
npm run build

pm2 ls

pm2 stop 0

pm2 start npm --name "nome da pasta" -- run start -- -p 3333

pm2 ls
pm2 restart "cod do server"