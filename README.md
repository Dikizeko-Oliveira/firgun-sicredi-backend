ALTER TABLE responses ALTER COLUMN id SET DEFAULT uuid_generate_v4();

pm2 start npm --name firgun-scredi-front -- run start -- -p 3000
pm2 start npm --name firgun-scredi-backend -- run dev -- -p 80
