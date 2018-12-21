1) make sure you have latest and greatest npm:
sudo npm i -g npm


2) if needed:
npm install -g @angular/cli
npm install @angular/cli


3) Play it safe:
  438  ng update @angular/cli



4) 

ng new marty

cd marty

ng test

ng serve --open
or
ng serve --open --base-href '/angular/'








5) DO NOT FORGET!!!

npm install --save @angular/material @angular/cdk @angular/animations



6) 

cd src


 



7) 

rm -r app



8) 

git clone https://github.com/slarribeau/marty2.git app



9) Run jasmine tests:

ng test



11) run app itself
ng serve --open
or
ng serve --open --base-href '/angular/'


12) Move styles.css to src directory 
13) Copy assets to src/assets -- These are needed when you use "ng build --prod" to build the dist file.

14) ng serve --open --base-href '/angular/'
This is needed to match the href setting in index.html

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Baseball 2018</title>
  <base href="/angular/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>

15) Production builds:
ng build --prod --base-href /angular/ --deploy-url /angular/

tar -cvf ~/output409.tar -C ../../dist/marty6/ .
scp -r -i /Users/scottlarribeau/.ssh/gce ~/output409.tar slarribeau@35.197.78.56:/home/slarribeau

tar -xvf output409.tar -C /var/www/html/angular

16) nginx config file:
sudo systemctl restart nginx
sudo vi /etc/nginx/sites-available/default

server {
    listen 80 default_server;
    server_name _;
    return 301 https://$host$request_uri;
}

server {
	listen 443 ssl http2;
        add_header Strict-Transport-Security "max-age=63072000" always;

	server_name scottlarribeau.com www.scottlarribeau.com;
	ssl on;
	ssl_certificate /etc/nginx/ssl/ssl-bundle.crt;
	ssl_certificate_key /etc/nginx/ssl/scottlarribeau.key;
	ssl_prefer_server_ciphers on;

	root /var/www/html;

	index index.html index.htm index.nginx-debian.html;

	server_name _;

	location / {
		# First attempt to serve request as file, then
		# as directory, then fall back to displaying a 404.
	        try_files $uri $uri/ =404;
	}

	location /angular/ {
		#alias /var/www/html/angular/;
		root /var/www/html;
		#Angular requires everything default to index.html
		try_files $uri $uri/ /index.html;
	}
}

